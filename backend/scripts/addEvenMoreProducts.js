const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const evenMoreProducts = [
  // More Smartphones
  {
    name: "Google Pixel 8 Pro",
    price: 999.99,
    description:
      "Google's flagship with AI-powered camera, 7 years of updates, and advanced features.",
    stock: 15,
    category: "Smartphones",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    specs: {
      Display: "6.7-inch OLED",
      Processor: "Google Tensor G3",
      Camera: "50MP + 48MP + 48MP",
      Battery: "4950mAh",
      Features: "AI Camera, 7 Years Updates",
    },
    featured: true,
  },
  {
    name: "OnePlus 11",
    price: 699.99,
    description:
      "Fast performance with Hasselblad camera system and 100W charging.",
    stock: 20,
    category: "Smartphones",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    specs: {
      Display: "6.7-inch AMOLED",
      Processor: "Snapdragon 8 Gen 2",
      Camera: "50MP + 48MP + 32MP",
      Battery: "5000mAh",
      Features: "100W Charging, Hasselblad",
    },
    featured: false,
  },

  // More Tablets
  {
    name: "Samsung Galaxy Tab S9 Ultra",
    price: 1199.99,
    description: "14.6-inch AMOLED tablet with S Pen and powerful performance.",
    stock: 12,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    specs: {
      Display: "14.6-inch AMOLED",
      Processor: "Snapdragon 8 Gen 2",
      Storage: "256GB",
      "S Pen": "Included",
      Features: "DeX Mode, Multi-window",
    },
    featured: true,
  },
  {
    name: "iPad Air (5th Gen)",
    price: 599.99,
    description:
      "Powerful tablet with M1 chip, perfect for creativity and productivity.",
    stock: 25,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    specs: {
      Display: "10.9-inch Liquid Retina",
      Processor: "Apple M1",
      Storage: "64GB",
      "Apple Pencil": "2nd Gen Compatible",
      Features: "Center Stage, 5G",
    },
    featured: false,
  },

  // More Laptops
  {
    name: "Dell XPS 13 Plus",
    price: 1299.99,
    description:
      "Premium ultrabook with 13th Gen Intel processor and stunning display.",
    stock: 18,
    category: "Laptops",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    specs: {
      Display: "13.4-inch 4K OLED",
      Processor: "Intel Core i7-1360P",
      RAM: "16GB LPDDR5",
      Storage: "512GB SSD",
      Features: "InfinityEdge, Backlit Keyboard",
    },
    featured: false,
  },
  {
    name: "ASUS ROG Zephyrus G14",
    price: 1499.99,
    description:
      "Gaming laptop with AMD Ryzen 9 and RTX 4060, perfect for gaming and work.",
    stock: 10,
    category: "Laptops",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    specs: {
      Display: "14-inch QHD 165Hz",
      Processor: "AMD Ryzen 9 7940HS",
      Graphics: "RTX 4060 8GB",
      RAM: "16GB DDR5",
      Features: "AniMe Matrix, ROG Boost",
    },
    featured: true,
  },

  // More Gaming
  {
    name: "Steam Deck",
    price: 399.99,
    description:
      "Handheld gaming PC with AMD APU, perfect for PC gaming on the go.",
    stock: 15,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    specs: {
      Display: "7-inch 1280x800",
      Processor: "AMD APU",
      Storage: "64GB eMMC",
      Battery: "40Whr",
      Features: "SteamOS, Custom Controls",
    },
    featured: false,
  },
  {
    name: "Razer Blade 15",
    price: 2499.99,
    description: "Premium gaming laptop with RTX 4070 and QHD display.",
    stock: 8,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    specs: {
      Display: "15.6-inch QHD 240Hz",
      Processor: "Intel Core i7-13700H",
      Graphics: "RTX 4070 8GB",
      RAM: "16GB DDR5",
      Features: "Razer Chroma, Vapor Chamber",
    },
    featured: true,
  },

  // More Smart Home
  {
    name: "Ring Video Doorbell Pro 2",
    price: 249.99,
    description: "Smart doorbell with 3D motion detection and HD video.",
    stock: 30,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    specs: {
      Video: "1536p HD",
      "Field of View": "150°",
      "Motion Detection": "3D Motion",
      Power: "Hardwired or Battery",
      Features: "Two-way Talk, Night Vision",
    },
    featured: false,
  },
  {
    name: "Nest Learning Thermostat",
    price: 249.99,
    description: "Smart thermostat that learns your schedule and saves energy.",
    stock: 20,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    specs: {
      Display: "3.5-inch Color",
      Connectivity: "Wi-Fi, Bluetooth",
      Compatibility: "Most HVAC Systems",
      Learning: "Auto-schedule",
      Features: "Energy History, Remote Control",
    },
    featured: false,
  },

  // More Photography
  {
    name: "Sony A7 IV",
    price: 2499.99,
    description: "Full-frame mirrorless with 33MP sensor and 4K 60p video.",
    stock: 10,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    specs: {
      Sensor: "33MP Full-frame",
      Video: "4K 60p",
      Autofocus: "Real-time Eye AF",
      ISO: "100-51,200",
      Features: "5-axis Stabilization",
    },
    featured: true,
  },
  {
    name: "Insta360 X3",
    price: 449.99,
    description:
      "360-degree action camera with 5.7K video and FlowState stabilization.",
    stock: 25,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500",
    specs: {
      Video: "5.7K 360°",
      Photo: "72MP",
      Stabilization: "FlowState",
      Waterproof: "33ft (10m)",
      Features: "Invisible Selfie Stick, AI Editing",
    },
    featured: false,
  },

  // More Audio
  {
    name: "Sony WH-1000XM5",
    price: 399.99,
    description:
      "Premium noise-canceling headphones with 30-hour battery life.",
    stock: 35,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    specs: {
      Driver: "30mm",
      "Noise Canceling": "Multi-point NC",
      Battery: "30 hours",
      Connectivity: "Bluetooth 5.2",
      Features: "Quick Charge, Speak-to-Chat",
    },
    featured: true,
  },
  {
    name: "Shure SM7B",
    price: 399.99,
    description: "Dynamic microphone perfect for podcasting and broadcasting.",
    stock: 15,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=500",
    specs: {
      Type: "Dynamic",
      "Polar Pattern": "Cardioid",
      Frequency: "50Hz-20kHz",
      "Output Impedance": "150 ohms",
      Features: "Shock Mount, Windscreen",
    },
    featured: false,
  },

  // More Fitness
  {
    name: "Apple Watch Series 9",
    price: 399.99,
    description: "Latest Apple Watch with S9 chip and Double Tap gesture.",
    stock: 40,
    category: "Fitness",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    specs: {
      Display: "Always-On Retina",
      Processor: "S9 SiP",
      Battery: "18 hours",
      "Water Resistance": "50m",
      Features: "Double Tap, ECG, Fall Detection",
    },
    featured: true,
  },
  {
    name: "Oura Ring Gen 3",
    price: 299.99,
    description:
      "Smart ring that tracks sleep, activity, and recovery with precision.",
    stock: 25,
    category: "Fitness",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    specs: {
      Sensors: "Temperature, Heart Rate, Movement",
      Battery: "7 days",
      "Water Resistance": "100m",
      Materials: "Titanium",
      Features: "Sleep Score, Readiness Score",
    },
    featured: false,
  },

  // More Office
  {
    name: "Logitech MX Master 3S",
    price: 99.99,
    description: "Premium wireless mouse with 8000 DPI and silent clicks.",
    stock: 30,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    specs: {
      DPI: "8000",
      Battery: "70 days",
      Connectivity: "Bluetooth, USB-C",
      Buttons: "7 Programmable",
      Features: "Silent Clicks, MagSpeed Scroll",
    },
    featured: false,
  },
  {
    name: "Dell UltraSharp 32 4K",
    price: 699.99,
    description: "32-inch 4K monitor with USB-C and HDR support.",
    stock: 12,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    specs: {
      Display: "32-inch 4K UHD",
      Resolution: "3840x2160",
      Ports: "USB-C, HDMI, DisplayPort",
      Color: "99% sRGB",
      Features: "HDR, Built-in Speakers",
    },
    featured: false,
  },

  // More Accessories
  {
    name: "Anker PowerCore 26800",
    price: 59.99,
    description:
      "High-capacity portable charger with 3 USB ports and fast charging.",
    stock: 50,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1609592806598-04d4d2d88548?w=500",
    specs: {
      Capacity: "26800mAh",
      Output: "3 USB Ports",
      "Fast Charging": "Power Delivery",
      Input: "USB-C",
      Features: "LED Indicator, Safety Protection",
    },
    featured: false,
  },
  {
    name: "Samsung T7 Shield",
    price: 89.99,
    description: "Rugged portable SSD with 1TB storage and IP65 rating.",
    stock: 25,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1609592806598-04d4d2d88548?w=500",
    specs: {
      Capacity: "1TB",
      Speed: "1050 MB/s",
      Durability: "IP65, 3m Drop",
      Connectivity: "USB 3.2 Gen 2",
      Features: "Password Protection, AES 256-bit",
    },
    featured: false,
  },
];

async function addMoreProducts() {
  try {
    console.log("Adding even more products...");

    for (const product of evenMoreProducts) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`✅ Added: ${product.name}`);
      } else {
        console.log(`⏭️  Skipped (already exists): ${product.name}`);
      }
    }

    console.log("\n🎉 Additional products added!");

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

    // Show price range
    const priceStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          avgPrice: { $avg: "$price" },
        },
      },
    ]);

    if (priceStats.length > 0) {
      const stats = priceStats[0];
      console.log(
        `\n💰 Price range: $${stats.minPrice.toFixed(2)} - $${stats.maxPrice.toFixed(2)}`,
      );
      console.log(`📊 Average price: $${stats.avgPrice.toFixed(2)}`);
    }
  } catch (error) {
    console.error("Error adding products:", error);
  } finally {
    mongoose.connection.close();
  }
}

addMoreProducts();
