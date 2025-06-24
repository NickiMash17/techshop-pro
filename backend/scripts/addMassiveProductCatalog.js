const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const massiveProductCatalog = [
  // Smartphones - Premium & Mid-range
  {
    name: "iPhone 15 Pro Max",
    price: 1199.99,
    description:
      "Apple's flagship with A17 Pro chip, titanium design, and 5x optical zoom.",
    stock: 15,
    category: "Smartphones",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    specs: {
      Display: "6.7-inch Super Retina XDR",
      Processor: "A17 Pro",
      Camera: "48MP + 12MP + 12MP",
      Battery: "4441mAh",
      Features: "5x Optical Zoom, Action Button",
    },
    featured: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1299.99,
    description:
      "Ultimate Android flagship with S Pen, AI features, and titanium frame.",
    stock: 12,
    category: "Smartphones",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    specs: {
      Display: "6.8-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 3",
      Camera: "200MP + 12MP + 50MP + 10MP",
      Battery: "5000mAh",
      Features: "S Pen, AI Features, 5x Optical Zoom",
    },
    featured: true,
  },
  {
    name: "Xiaomi 14 Ultra",
    price: 999.99,
    description:
      "Photography-focused flagship with Leica optics and 1-inch sensor.",
    stock: 18,
    category: "Smartphones",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    specs: {
      Display: "6.73-inch LTPO AMOLED",
      Processor: "Snapdragon 8 Gen 3",
      Camera: "50MP + 50MP + 50MP + 50MP",
      Battery: "5000mAh",
      Features: "Leica Optics, 1-inch Sensor",
    },
    featured: false,
  },
  {
    name: "Nothing Phone (2)",
    price: 599.99,
    description:
      "Unique design with Glyph interface and clean Android experience.",
    stock: 25,
    category: "Smartphones",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    specs: {
      Display: "6.7-inch LTPO OLED",
      Processor: "Snapdragon 8+ Gen 1",
      Camera: "50MP + 50MP",
      Battery: "4500mAh",
      Features: "Glyph Interface, Nothing OS",
    },
    featured: false,
  },

  // Tablets - Premium & Productivity
  {
    name: "iPad Pro 12.9 (6th Gen)",
    price: 1099.99,
    description:
      "Professional tablet with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
    stock: 20,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    specs: {
      Display: "12.9-inch Liquid Retina XDR",
      Processor: "Apple M2",
      Storage: "128GB",
      "Apple Pencil": "2nd Gen Compatible",
      Features: "ProMotion 120Hz, Thunderbolt 4",
    },
    featured: true,
  },
  {
    name: "Microsoft Surface Pro 9",
    price: 999.99,
    description:
      "2-in-1 laptop-tablet with Intel processor and detachable keyboard.",
    stock: 15,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    specs: {
      Display: "13-inch PixelSense Flow",
      Processor: "Intel Core i5-1235U",
      RAM: "8GB LPDDR5",
      Storage: "256GB SSD",
      Features: "Windows 11, Surface Pen",
    },
    featured: false,
  },
  {
    name: "Lenovo Tab P12 Pro",
    price: 649.99,
    description:
      "Android tablet with AMOLED display and productivity features.",
    stock: 22,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    specs: {
      Display: "12.6-inch AMOLED",
      Processor: "Snapdragon 870",
      RAM: "6GB",
      Storage: "128GB",
      Features: "Precision Pen 3, DeX Mode",
    },
    featured: false,
  },

  // Laptops - Gaming & Professional
  {
    name: "Alienware x16",
    price: 2999.99,
    description:
      "Premium gaming laptop with RTX 4090 and 16-inch QHD+ display.",
    stock: 8,
    category: "Laptops",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    specs: {
      Display: "16-inch QHD+ 240Hz",
      Processor: "Intel Core i9-13900HK",
      Graphics: "RTX 4090 16GB",
      RAM: "32GB DDR5",
      Features: "AlienFX, Cherry MX Keyboard",
    },
    featured: true,
  },
  {
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1899.99,
    description:
      "Business ultrabook with 14-inch display and enterprise features.",
    stock: 12,
    category: "Laptops",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    specs: {
      Display: "14-inch 2.8K OLED",
      Processor: "Intel Core i7-1355U",
      RAM: "16GB LPDDR5",
      Storage: "512GB SSD",
      Features: "ThinkShield, MIL-STD-810H",
    },
    featured: false,
  },
  {
    name: "HP Spectre x360 14",
    price: 1399.99,
    description: "Convertible laptop with 360-degree hinge and premium design.",
    stock: 18,
    category: "Laptops",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    specs: {
      Display: "14-inch 3K2K OLED",
      Processor: "Intel Core i7-1355U",
      RAM: "16GB LPDDR5",
      Storage: "1TB SSD",
      Features: "360° Hinge, HP Pen",
    },
    featured: false,
  },

  // Gaming - Consoles & Accessories
  {
    name: "Nintendo Switch 2",
    price: 399.99,
    description:
      "Next-generation Nintendo console with enhanced graphics and performance.",
    stock: 30,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    specs: {
      Display: "7-inch OLED",
      Processor: "Custom NVIDIA Tegra",
      Storage: "128GB",
      Battery: "4.5-9 hours",
      Features: "4K Output, Backward Compatibility",
    },
    featured: true,
  },
  {
    name: "Valve Steam Deck OLED",
    price: 549.99,
    description:
      "Enhanced Steam Deck with OLED display and improved battery life.",
    stock: 20,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    specs: {
      Display: "7.4-inch OLED",
      Processor: "AMD APU",
      Storage: "1TB NVMe SSD",
      Battery: "3-12 hours",
      Features: "SteamOS 3.0, Custom Controls",
    },
    featured: false,
  },
  {
    name: "PlayStation VR2",
    price: 549.99,
    description:
      "Next-generation VR headset for PlayStation 5 with 4K HDR display.",
    stock: 15,
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    specs: {
      Display: "4K HDR OLED",
      "Field of View": "110°",
      Tracking: "Eye Tracking, Head Tracking",
      Controllers: "Sense Controllers",
      Features: "Haptic Feedback, Adaptive Triggers",
    },
    featured: false,
  },

  // Smart Home - Security & Automation
  {
    name: "Arlo Pro 4 Security Camera",
    price: 199.99,
    description:
      "Wireless security camera with 2K video and color night vision.",
    stock: 35,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    specs: {
      Video: "2K HDR",
      "Field of View": "160°",
      "Night Vision": "Color Night Vision",
      Battery: "6 months",
      Features: "Wireless, Weather Resistant",
    },
    featured: false,
  },
  {
    name: "Eufy RoboVac G30",
    price: 299.99,
    description: "Smart robot vacuum with mapping and app control.",
    stock: 25,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    specs: {
      Suction: "2000Pa",
      Battery: "100 minutes",
      Mapping: "Smart Mapping",
      "App Control": "EufyHome App",
      Features: "Auto Return, Schedule",
    },
    featured: false,
  },
  {
    name: "August Smart Lock Pro",
    price: 249.99,
    description: "Smart lock with auto-lock/unlock and remote access.",
    stock: 20,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    specs: {
      Installation: "Over existing deadbolt",
      Connectivity: "Wi-Fi, Bluetooth",
      "Auto-lock": "Configurable",
      Compatibility: "Most deadbolts",
      Features: "Remote Access, Activity Log",
    },
    featured: false,
  },

  // Photography - Cameras & Lenses
  {
    name: "Fujifilm X-T5",
    price: 1699.99,
    description: "Mirrorless camera with 40MP sensor and 5-axis stabilization.",
    stock: 12,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    specs: {
      Sensor: "40MP APS-C X-Trans",
      Video: "6.2K 30p",
      Stabilization: "5-axis IBIS",
      Autofocus: "425-point AF",
      Features: "Film Simulations, Dual SD",
    },
    featured: false,
  },
  {
    name: "Canon RF 70-200mm f/2.8L",
    price: 2699.99,
    description:
      "Professional telephoto zoom lens with constant f/2.8 aperture.",
    stock: 8,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    specs: {
      "Focal Length": "70-200mm",
      Aperture: "f/2.8",
      Stabilization: "5-stop IS",
      Elements: "17 elements",
      Features: "Weather Sealed, Nano USM",
    },
    featured: true,
  },
  {
    name: "DJI Air 3",
    price: 1099.99,
    description: "Dual-camera drone with 4K video and 46-minute flight time.",
    stock: 15,
    category: "Photography",
    imageUrl:
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500",
    specs: {
      Cameras: "Dual 4K Cameras",
      "Flight Time": "46 minutes",
      Range: "20km",
      Weight: "720g",
      Features: "O4 Video Transmission, APAS 5.0",
    },
    featured: false,
  },

  // Audio - Studio & Consumer
  {
    name: "Beyerdynamic DT 900 Pro X",
    price: 299.99,
    description:
      "Open-back studio headphones with exceptional detail and comfort.",
    stock: 18,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    specs: {
      Driver: "45mm",
      Impedance: "48 ohms",
      Frequency: "5-40,000 Hz",
      Cable: "Detachable",
      Features: "Open-back, Studio-grade",
    },
    featured: false,
  },
  {
    name: "Universal Audio Apollo Twin X",
    price: 899.99,
    description:
      "Professional audio interface with DSP processing and premium preamps.",
    stock: 10,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=500",
    specs: {
      Inputs: "2x XLR/TRS",
      Outputs: "4x TRS",
      "Sample Rate": "Up to 192kHz",
      DSP: "Real-time UAD Processing",
      Features: "Premium Preamps, Console Emulation",
    },
    featured: true,
  },
  {
    name: "KRK Rokit 7 G4",
    price: 199.99,
    description:
      "Professional studio monitor with DSP room tuning and bi-amp design.",
    stock: 25,
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=500",
    specs: {
      Woofer: "7-inch",
      Tweeter: "1-inch",
      Power: "55W + 25W",
      DSP: "Room Tuning",
      Features: "Bi-amp, DSP EQ",
    },
    featured: false,
  },

  // Fitness - Wearables & Equipment
  {
    name: "Garmin Fenix 7X Sapphire",
    price: 999.99,
    description:
      "Premium multisport watch with solar charging and advanced metrics.",
    stock: 12,
    category: "Fitness",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    specs: {
      Display: "1.4-inch Solar Sapphire",
      Battery: "28 days (smartwatch)",
      GPS: "Multi-band GNSS",
      "Water Resistance": "100m",
      Features: "Solar Charging, Advanced Metrics",
    },
    featured: true,
  },
  {
    name: "Bowflex SelectTech 552",
    price: 429.99,
    description: "Adjustable dumbbells with 15 weight settings in one pair.",
    stock: 20,
    category: "Fitness",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    specs: {
      "Weight Range": "5-52.5 lbs",
      Settings: "15 weight settings",
      Material: "Steel plates",
      Storage: "Included stand",
      Features: "Quick adjustment, Space saving",
    },
    featured: false,
  },
  {
    name: "Concept2 Model D Rower",
    price: 999.99,
    description:
      "Professional rowing machine with PM5 monitor and smooth performance.",
    stock: 8,
    category: "Fitness",
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    specs: {
      Resistance: "Air resistance",
      Monitor: "PM5 Performance Monitor",
      "Weight Capacity": "500 lbs",
      Footprint: "8' x 2'",
      Features: "Smooth performance, Durable",
    },
    featured: false,
  },

  // Office - Productivity & Ergonomics
  {
    name: "Herman Miller Aeron Chair",
    price: 1495.0,
    description:
      "Iconic ergonomic office chair with PostureFit SL and breathable mesh.",
    stock: 10,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    specs: {
      Material: "Pellicle mesh",
      Adjustments: "8-way adjustment",
      "Weight Capacity": "350 lbs",
      Warranty: "12 years",
      Features: "PostureFit SL, Breathable",
    },
    featured: true,
  },
  {
    name: "LG 38WN95C-W Monitor",
    price: 1499.99,
    description: "Ultrawide curved monitor with Thunderbolt 3 and HDR support.",
    stock: 8,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    specs: {
      Display: "38-inch Curved IPS",
      Resolution: "3840x1600",
      "Refresh Rate": "144Hz",
      Ports: "Thunderbolt 3, HDMI, DP",
      Features: "HDR 600, USB-C",
    },
    featured: false,
  },
  {
    name: "Das Keyboard 4 Professional",
    price: 169.99,
    description:
      "Mechanical keyboard with Cherry MX switches and aluminum frame.",
    stock: 30,
    category: "Office",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    specs: {
      Switches: "Cherry MX Brown",
      Layout: "Full-size",
      Material: "Aluminum frame",
      Connectivity: "USB-C",
      Features: "Media controls, Volume knob",
    },
    featured: false,
  },

  // Accessories - Cables & Storage
  {
    name: "Anker 737 Power Bank",
    price: 149.99,
    description:
      "High-capacity power bank with 140W output and digital display.",
    stock: 40,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1609592806598-04d4d2d88548?w=500",
    specs: {
      Capacity: "24000mAh",
      Output: "140W Max",
      Input: "100W USB-C",
      Display: "Digital LCD",
      Features: "Power Delivery, PPS",
    },
    featured: false,
  },
  {
    name: "Cable Matters USB-C Hub",
    price: 39.99,
    description: "10-in-1 USB-C hub with 4K HDMI and multiple ports.",
    stock: 50,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1609592806598-04d4d2d88548?w=500",
    specs: {
      Ports: "10-in-1",
      HDMI: "4K@30Hz",
      USB: "3 USB-A, 1 USB-C",
      "Card Reader": "SD/TF",
      Features: "Ethernet, Audio",
    },
    featured: false,
  },
  {
    name: "LaCie Rugged SSD Pro",
    price: 299.99,
    description:
      "Rugged portable SSD with Thunderbolt 3 and military-grade protection.",
    stock: 20,
    category: "Accessories",
    imageUrl:
      "https://images.unsplash.com/photo-1609592806598-04d4d2d88548?w=500",
    specs: {
      Capacity: "2TB",
      Speed: "2800 MB/s",
      Interface: "Thunderbolt 3",
      Protection: "IP67, 3m drop",
      Features: "Military-grade, Waterproof",
    },
    featured: false,
  },
];

async function addMassiveCatalog() {
  try {
    console.log("🚀 Adding massive product catalog...");

    let addedCount = 0;
    let skippedCount = 0;

    for (const product of massiveProductCatalog) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`✅ Added: ${product.name}`);
        addedCount++;
      } else {
        console.log(`⏭️  Skipped (already exists): ${product.name}`);
        skippedCount++;
      }
    }

    console.log("\n🎉 Massive catalog addition completed!");
    console.log(`📊 Added: ${addedCount} products`);
    console.log(`⏭️  Skipped: ${skippedCount} products`);

    // Show total count
    const totalProducts = await Product.countDocuments();
    console.log(`📦 Total products in database: ${totalProducts}`);

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
          totalValue: { $sum: { $multiply: ["$price", "$stock"] } },
        },
      },
    ]);

    if (priceStats.length > 0) {
      const stats = priceStats[0];
      console.log(
        `\n💰 Price range: $${stats.minPrice.toFixed(2)} - $${stats.maxPrice.toFixed(2)}`,
      );
      console.log(`📊 Average price: $${stats.avgPrice.toFixed(2)}`);
      console.log(`💵 Total inventory value: $${stats.totalValue.toFixed(2)}`);
    }

    // Show featured products count
    const featuredCount = await Product.countDocuments({ featured: true });
    console.log(`⭐ Featured products: ${featuredCount}`);
  } catch (error) {
    console.error("Error adding massive catalog:", error);
  } finally {
    mongoose.connection.close();
  }
}

addMassiveCatalog();
