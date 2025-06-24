const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const additionalProducts = [
  // Gaming & Entertainment
  {
    name: "PlayStation 5",
    price: 499.99,
    description:
      "Next-gen gaming console with lightning-fast loading, haptic feedback, and stunning graphics.",
    stock: 25,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    specs: {
      Processor: "AMD Zen 2",
      Storage: "825GB SSD",
      Graphics: "AMD RDNA 2",
      Memory: "16GB GDDR6",
      Features: "4K Gaming, Ray Tracing",
    },
    featured: true,
  },
  {
    name: "Xbox Series X",
    price: 499.99,
    description:
      "The most powerful Xbox ever with 4K gaming, ray tracing, and 120 FPS support.",
    stock: 20,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500",
    specs: {
      Processor: "AMD Zen 2",
      Storage: "1TB SSD",
      Graphics: "AMD RDNA 2",
      Memory: "16GB GDDR6",
      Features: "4K Gaming, Ray Tracing",
    },
    featured: false,
  },
  {
    name: "Nintendo Switch OLED",
    price: 349.99,
    description:
      "Enhanced Nintendo Switch with 7-inch OLED screen and improved audio.",
    stock: 30,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=500",
    specs: {
      Display: "7-inch OLED",
      Storage: "64GB",
      Battery: "4.5-9 hours",
      Connectivity: "Wi-Fi, Bluetooth",
      Features: "Handheld & Dock Mode",
    },
    featured: false,
  },

  // Smart Home & IoT
  {
    name: "Amazon Echo Dot (5th Gen)",
    price: 49.99,
    description:
      "Smart speaker with Alexa, improved sound, and built-in temperature sensor.",
    stock: 50,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    specs: {
      Speaker: "1.6-inch",
      Connectivity: "Wi-Fi, Bluetooth",
      "Voice Assistant": "Alexa",
      Features: "Temperature Sensor, Clock Display",
      Power: "USB-C",
    },
    featured: false,
  },
  {
    name: "Google Nest Hub",
    price: 89.99,
    description:
      "Smart display with Google Assistant, perfect for home control and entertainment.",
    stock: 35,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
    specs: {
      Display: "7-inch Touchscreen",
      Speaker: "Full-range speaker",
      "Voice Assistant": "Google Assistant",
      Connectivity: "Wi-Fi, Bluetooth",
      Features: "Sleep Sensing, Photo Frame",
    },
    featured: false,
  },
  {
    name: "Philips Hue Starter Kit",
    price: 199.99,
    description:
      "Smart lighting starter kit with bridge and 3 color bulbs for complete home automation.",
    stock: 15,
    category: "Smart Home",
    imageUrl:
      "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=500",
    specs: {
      Bridge: "Wi-Fi enabled",
      Bulbs: "3x Color A19",
      Connectivity: "Zigbee, Wi-Fi",
      Compatibility: "Alexa, Google, Apple HomeKit",
      Features: "16 million colors, Scheduling",
    },
    featured: true,
  },

  // Photography & Video
  {
    name: "Canon EOS R6",
    price: 2499.99,
    description:
      "Full-frame mirrorless camera with 20MP sensor and 4K video recording.",
    stock: 12,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    specs: {
      Sensor: "20.1MP Full-frame CMOS",
      Video: "4K 60p",
      Autofocus: "Dual Pixel CMOS AF II",
      ISO: "100-102,400",
      Connectivity: "Wi-Fi, Bluetooth",
    },
    featured: true,
  },
  {
    name: "DJI Mini 3 Pro",
    price: 759.99,
    description:
      "Ultralight drone with 4K camera, obstacle avoidance, and 34-minute flight time.",
    stock: 18,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500",
    specs: {
      Weight: "249g",
      Camera: "4K/60fps",
      "Flight Time": "34 minutes",
      Range: "12km",
      Features: "Obstacle Avoidance, QuickShots",
    },
    featured: false,
  },
  {
    name: "GoPro HERO11 Black",
    price: 499.99,
    description:
      "Action camera with 5.3K video, 27MP photos, and HyperSmooth 5.0 stabilization.",
    stock: 25,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500",
    specs: {
      Video: "5.3K/60fps",
      Photo: "27MP",
      Stabilization: "HyperSmooth 5.0",
      Waterproof: "33ft (10m)",
      Features: "TimeWarp 3.0, LiveBurst",
    },
    featured: false,
  },

  // Audio & Music
  {
    name: "Audio-Technica ATH-M50x",
    price: 149.99,
    description:
      "Professional studio monitor headphones with exceptional clarity and comfort.",
    stock: 40,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    specs: {
      Driver: "45mm",
      Frequency: "15-28,000 Hz",
      Impedance: "38 ohms",
      Cable: "Detachable",
      Features: "Collapsible Design, Professional Sound",
    },
    featured: false,
  },
  {
    name: "Focusrite Scarlett 2i2",
    price: 169.99,
    description:
      "USB audio interface with 2 inputs, perfect for recording vocals and instruments.",
    stock: 22,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=500",
    specs: {
      Inputs: "2x XLR/TRS",
      Outputs: "2x TRS",
      "Sample Rate": "Up to 192kHz",
      "Bit Depth": "24-bit",
      Features: "Direct Monitor, Phantom Power",
    },
    featured: false,
  },
  {
    name: "Yamaha HS8 Studio Monitor",
    price: 349.99,
    description:
      "Professional studio monitor with 8-inch woofer for accurate sound reproduction.",
    stock: 15,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=500",
    specs: {
      Woofer: "8-inch",
      Tweeter: "1-inch",
      Power: "120W",
      Frequency: "38Hz-30kHz",
      Features: "Room Control, High Trim",
    },
    featured: false,
  },

  // Fitness & Health
  {
    name: "Peloton Bike+",
    price: 2495.0,
    description:
      "Premium smart bike with 24-inch rotating HD touchscreen and live classes.",
    stock: 8,
    category: "Fitness",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    specs: {
      Screen: "24-inch HD Touchscreen",
      Resistance: "100 levels",
      Connectivity: "Wi-Fi, Bluetooth",
      Membership: "All-Access Included",
      Features: "Live Classes, Performance Tracking",
    },
    featured: true,
  },
  {
    name: "Fitbit Sense 2",
    price: 299.99,
    description:
      "Advanced health smartwatch with ECG, stress tracking, and 6+ day battery life.",
    stock: 30,
    category: "Fitness",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    specs: {
      Display: "AMOLED Touchscreen",
      Battery: "6+ days",
      Sensors: "ECG, EDA, Temperature",
      "Water Resistance": "50m",
      Features: "Stress Management, Sleep Tracking",
    },
    featured: false,
  },
  {
    name: "Garmin Fenix 7",
    price: 699.99,
    description:
      "Premium multisport GPS watch with advanced training metrics and solar charging.",
    stock: 12,
    category: "Fitness",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    specs: {
      Display: "1.3-inch Solar Charging",
      Battery: "18 days (smartwatch)",
      GPS: "Multi-band GNSS",
      "Water Resistance": "100m",
      Features: "Training Load, Recovery Time",
    },
    featured: false,
  },

  // Office & Productivity
  {
    name: "Ergonomic Office Chair",
    price: 299.99,
    description:
      "Premium ergonomic office chair with adjustable lumbar support and breathable mesh.",
    stock: 20,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    specs: {
      Material: "Breathable Mesh",
      Adjustments: "Height, Armrests, Lumbar",
      "Weight Capacity": "300 lbs",
      Warranty: "5 years",
      Features: "Tilt Tension, Lock Mechanism",
    },
    featured: false,
  },
  {
    name: "Standing Desk Converter",
    price: 199.99,
    description:
      "Electric standing desk converter with memory presets and smooth height adjustment.",
    stock: 25,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    specs: {
      "Height Range": "5.3-20.1 inches",
      "Weight Capacity": "176 lbs",
      Motor: "Dual Electric",
      Memory: "4 Presets",
      Features: "Anti-collision, Cable Management",
    },
    featured: false,
  },
  {
    name: "Blue Yeti X USB Microphone",
    price: 169.99,
    description:
      "Professional USB microphone with LED metering and multiple pickup patterns.",
    stock: 18,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=500",
    specs: {
      Patterns: "4 Pickup Patterns",
      "Sample Rate": "48kHz",
      "Bit Depth": "24-bit",
      Connectivity: "USB-C",
      Features: "LED Metering, Blue VO!CE",
    },
    featured: false,
  },
];

async function addProducts() {
  try {
    console.log("Adding additional products...");

    for (const product of additionalProducts) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`✅ Added: ${product.name}`);
      } else {
        console.log(`⏭️  Skipped (already exists): ${product.name}`);
      }
    }

    console.log("\n🎉 Product addition completed!");

    // Show total count
    const totalProducts = await Product.countDocuments();
    console.log(`📊 Total products in database: ${totalProducts}`);

    // Show products by category
    const categories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    console.log("\n📈 Products by category:");
    categories.forEach((cat) => {
      console.log(`  ${cat._id}: ${cat.count} products`);
    });
  } catch (error) {
    console.error("Error adding products:", error);
  } finally {
    mongoose.connection.close();
  }
}

addProducts();
