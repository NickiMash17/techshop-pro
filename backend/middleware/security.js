const rateLimit = require("express-rate-limit");
const promClient = require("prom-client");

// Blacklist configuration
const blacklistedIPs = new Set();
const suspiciousAttempts = new Map();

// Custom metrics for security
const securityMetrics = {
  blacklistHits: new promClient.Counter({
    name: "blacklist_hits_total",
    help: "Number of requests from blacklisted IPs",
    labelNames: ["ip"],
  }),
  suspiciousAttempts: new promClient.Counter({
    name: "suspicious_attempts_total",
    help: "Number of suspicious requests detected",
    labelNames: ["ip", "reason"],
  }),
};

// Rate limit configurations
const rateLimits = {
  api: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { status: "error", message: "Too many API requests" },
  }),
  auth: rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: {
      status: "error",
      message: "Too many login attempts. Please try again later.",
    },
  }),
  products: rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: { status: "error", message: "Too many product requests" },
  }),
};

// IP Blacklist middleware
const checkBlacklist = (req, res, next) => {
  const clientIP = req.ip;

  if (blacklistedIPs.has(clientIP)) {
    securityMetrics.blacklistHits.labels(clientIP).inc();
    return res.status(403).json({
      status: "error",
      message: "Access denied",
    });
  }

  next();
};

// Suspicious activity detection
const detectSuspiciousActivity = (req, res, next) => {
  const clientIP = req.ip;
  const now = Date.now();

  if (!suspiciousAttempts.has(clientIP)) {
    suspiciousAttempts.set(clientIP, {
      count: 0,
      firstAttempt: now,
    });
  }

  const attempts = suspiciousAttempts.get(clientIP);
  attempts.count++;

  // Check for suspicious patterns
  if (attempts.count > 10 && now - attempts.firstAttempt < 60000) {
    blacklistedIPs.add(clientIP);
    securityMetrics.suspiciousAttempts.labels(clientIP, "rapid_requests").inc();
    return res.status(403).json({
      status: "error",
      message: "Suspicious activity detected",
    });
  }

  next();
};

module.exports = {
  rateLimits,
  checkBlacklist,
  detectSuspiciousActivity,
  securityMetrics,
};
