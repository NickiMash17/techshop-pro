const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const winston = require("winston");
const mongoose = require("mongoose");
const connectDB = require("./config/database");
const cluster = require("cluster");
const os = require("os");
const promClient = require("prom-client");
const {
  rateLimits,
  checkBlacklist,
  detectSuspiciousActivity,
} = require("./middleware/security");

// Initialize metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Registry = promClient.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

// Add custom metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  registers: [register],
});
const rateLimitHits = new promClient.Counter({
  name: "rate_limit_hits_total",
  help: "Number of requests that hit rate limit",
  registers: [register],
});

dotenv.config();
const app = express();

// Serve uploaded avatars statically
app.use("/uploads", express.static(require("path").join(__dirname, "uploads")));

// Configure Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

// Configure rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors());
app.use(express.json());

// Apply rate limiter to all routes
app.use(limiter);

// Apply security middleware
app.use(checkBlacklist);
app.use(detectSuspiciousActivity);

// Apply route-specific rate limits
app.use("/api/auth", rateLimits.auth);
app.use("/api/products", rateLimits.products);
app.use("/api", rateLimits.api);

// Add metrics middleware
app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const duration = process.hrtime(start);
    const durationInSeconds = duration[0] + duration[1] / 1e9;

    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(durationInSeconds);
  });

  next();
});

// Add request logging middleware
app.use((req, res, next) => {
  const start = process.hrtime();

  res.on("finish", () => {
    const duration = process.hrtime(start);
    const durationInMs = duration[0] * 1000 + duration[1] / 1e6;

    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${durationInMs.toFixed(2)}ms`,
      ip: req.ip,
    });
  });

  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error({
    error: err.message,
    stack: err.stack,
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  res.status(500).json({
    status: "error",
    message: "Something went wrong!",
  });
});

// Routes
app.use("/api/products", require("./routes/products"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/admin", require("./routes/admin"));

// User profile routes
app.use("/api/users", require("./routes/users"));

// Add metrics endpoint
app.get("/api/metrics", async (req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.send(await register.metrics());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Enhanced health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    server: "running",
    pid: process.pid,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    cpu: {
      load: os.loadavg(),
      cores: os.cpus().length,
    },
  });
});

const PORT = process.env.PORT || 3001;

const startServer = async (port = PORT, retryCount = 0) => {
  try {
    if (cluster.isMaster && process.env.NODE_ENV === "production") {
      const numCPUs = os.cpus().length;
      console.log(`🚀 Starting production server with ${numCPUs} workers...`);

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        console.log(`⚠️  Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
      });
    } else {
      await connectDB();

      const server = app.listen(port, "0.0.0.0", () => {
        console.log(`🚀 Server running on port ${port} (PID: ${process.pid})`);
        console.log(
          `📡 API endpoints available at http://localhost:${port}/api`,
        );
      });

      // Graceful shutdown handling
      const shutdown = (signal) => {
        console.log(`\n${signal} received. Starting graceful shutdown...`);
        server.close(() => {
          console.log("🛑 HTTP server closed");
          mongoose.connection
            .close()
            .then(() => {
              console.log("📋 MongoDB connection closed");
              process.exit(0);
            })
            .catch((err) => {
              console.log(
                "📋 MongoDB connection closed with error:",
                err.message,
              );
              process.exit(0);
            });
        });
      };

      // Handle various shutdown signals
      process.on("SIGTERM", () => shutdown("SIGTERM"));
      process.on("SIGINT", () => shutdown("SIGINT"));

      server.on("error", (error) => {
        if (error.code === "EADDRINUSE" && retryCount < 5) {
          console.error(`⚠️  Port ${port} is already in use`);
          const newPort = Math.min(port + 1, 3010); // Limit to reasonable range
          console.log(`🔄 Trying port ${newPort}...`);

          // Try the next port with retry count
          startServer(newPort, retryCount + 1);
        } else if (retryCount >= 5) {
          console.error(
            "❌ Maximum port retry attempts reached. Please check available ports.",
          );
          process.exit(1);
        } else {
          console.error("Server error:", error);
          process.exit(1);
        }
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
