const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const finalProducts = [
  // More Smartphones
  {
    name: "ASUS ROG Phone 8",
    price: 999.99,
    description: "Gaming smartphone with Snapdragon 8 Gen 3 and advanced cooling system.",
    stock: 15,
    category: "Smartphones",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500",
    specs: {
      "Display": "6.78-inch AMOLED 165Hz",
      "Processor": "Snapdragon 8 Gen 3",
      "Camera": "50MP + 13MP + 32MP",
      "Battery": "5500mAh",
      "Features": "AirTrigger, AeroActive Cooler"
    },
    featured: false
  },
  {
    name: "Motorola Edge 50 Ultra",
    price: 799.99,
    description: "Premium smartphone with 144Hz display and 125W charging.",
    stock: 20,
    category: "Smartphones",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
    specs: {
      "Display": "6.7-inch pOLED 144Hz",
      "Processor": "Snapdragon 8s Gen 3",
      "Camera": "50MP + 50MP + 64MP",
      "Battery": "4500mAh",
      "Features": "125W Charging, Ready For"
    },
    featured: false
  },

  // More Tablets
  {
    name: "Samsung Galaxy Tab S9 FE",
    price: 449.99,
    description: "Affordable tablet with S Pen and 10.9-inch display.",
    stock: 30,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    specs: {
      "Display": "10.9-inch LCD",
      "Processor": "Exynos 1380",
      "Storage": "128GB",
      "S Pen": "Included",
      "Features": "One UI, DeX Mode"
    },
    featured: false
  },
  {
    name: "iPad mini (6th Gen)",
    price: 499.99,
    description: "Compact tablet with A15 Bionic chip and 8.3-inch display.",
    stock: 25,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500",
    specs: {
      "Display": "8.3-inch Liquid Retina",
      "Processor": "A15 Bionic",
      "Storage": "64GB",
      "Apple Pencil": "2nd Gen Compatible",
      "Features": "Center Stage, 5G"
    },
    featured: false
  },

  // More Laptops
  {
    name: "MSI GE78 HX Raider",
    price: 3499.99,
    description: "Premium gaming laptop with RTX 4090 and 17-inch QHD display.",
    stock: 5,
    category: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    specs: {
      "Display": "17-inch QHD 240Hz",
      "Processor": "Intel Core i9-13950HX",
      "Graphics": "RTX 4090 16GB",
      "RAM": "32GB DDR5",
      "Features": "Mystic Light, SteelSeries Keyboard"
    },
    featured: true
  },
  {
    name: "Acer Swift 3",
    price: 699.99,
    description: "Lightweight ultrabook with AMD Ryzen processor and all-day battery.",
    stock: 22,
    category: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    specs: {
      "Display": "14-inch FHD IPS",
      "Processor": "AMD Ryzen 7 7735U",
      "RAM": "16GB LPDDR5",
      "Storage": "512GB SSD",
      "Features": "Fingerprint Reader, Backlit Keyboard"
    },
    featured: false
  },

  // More Gaming
  {
    name: "Meta Quest 3",
    price: 499.99,
    description: "Standalone VR headset with pancake lenses and mixed reality.",
    stock: 18,
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    specs: {
      "Display": "2064x2208 per eye",
      "Processor": "Snapdragon XR2 Gen 2",
      "Storage": "128GB",
      "Battery": "2-3 hours",
      "Features": "Mixed Reality, Pancake Lenses"
    },
    featured: false
  },
  {
    name: "Logitech G Pro X Superlight",
    price: 149.99,
    description: "Ultralight wireless gaming mouse with HERO 25K sensor.",
    stock: 35,
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=500",
    specs: {
      "Weight": "63g",
      "Sensor": "HERO 25K",
      "Battery": "70 hours",
      "Connectivity": "LIGHTSPEED Wireless",
      "Features": "5 Programmable Buttons"
    },
    featured: false
  },

  // More Smart Home
  {
    name: "Wyze Cam v4",
    price: 35.99,
    description: "Affordable security camera with 2K video and night vision.",
    stock: 50,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    specs: {
      "Video": "2K HD",
      "Field of View": "130°",
      "Night Vision": "Color Night Vision",
      "Storage": "MicroSD up to 256GB",
      "Features": "Motion Detection, Two-way Audio"
    },
    featured: false
  },
  {
    name: "Kasa Smart Plug HS103",
    price: 19.99,
    description: "Wi-Fi smart plug with energy monitoring and scheduling.",
    stock: 60,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=500",
    specs: {
      "Power": "15A Max",
      "Connectivity": "Wi-Fi 2.4GHz",
      "App Control": "Kasa App",
      "Compatibility": "Alexa, Google, IFTTT",
      "Features": "Energy Monitoring, Scheduling"
    },
    featured: false
  },

  // More Photography
  {
    name: "Nikon Z6 II",
    price: 1999.99,
    description: "Full-frame mirrorless camera with dual processors and 4K video.",
    stock: 12,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    specs: {
      "Sensor": "24.5MP Full-frame",
      "Video": "4K 60p",
      "Autofocus": "273-point AF",
      "ISO": "100-51,200",
      "Features": "Dual Processors, 5-axis IBIS"
    },
    featured: false
  },
  {
    name: "Sony FE 24-70mm f/2.8 GM II",
    price: 2199.99,
    description: "Professional zoom lens with constant f/2.8 aperture and fast AF.",
    stock: 8,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    specs: {
      "Focal Length": "24-70mm",
      "Aperture": "f/2.8",
      "Elements": "20 elements",
      "Weight": "695g",
      "Features": "XD Linear Motors, Weather Sealed"
    },
    featured: true
  },

  // More Audio
  {
    name: "Sennheiser HD 660S",
    price: 399.99,
    description: "Open-back headphones with exceptional detail and natural sound.",
    stock: 15,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    specs: {
      "Driver": "Dynamic",
      "Impedance": "150 ohms",
      "Frequency": "10-41,000 Hz",
      "Cable": "Detachable",
      "Features": "Open-back, Velour Earpads"
    },
    featured: false
  },
  {
    name: "Native Instruments Komplete Kontrol S61",
    price: 599.99,
    description: "MIDI keyboard with 61 keys and integrated software control.",
    stock: 12,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=500",
    specs: {
      "Keys": "61 Semi-weighted",
      "Display": "2x Color LCD",
      "Integration": "Komplete Kontrol",
      "Connectivity": "USB, MIDI",
      "Features": "Light Guide, Touch Strip"
    },
    featured: false
  },

  // More Fitness
  {
    name: "NordicTrack Commercial 1750",
    price: 1799.99,
    description: "Commercial-grade treadmill with 10-inch HD touchscreen.",
    stock: 8,
    category: "Fitness",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    specs: {
      "Motor": "3.75 CHP",
      "Speed": "0-12 mph",
      "Incline": "0-15%",
      "Display": "10-inch HD Touchscreen",
      "Features": "iFit, Auto Incline"
    },
    featured: false
  },
  {
    name: "Whoop 4.0",
    price: 30.00,
    description: "Subscription-based fitness tracker with recovery insights.",
    stock: 40,
    category: "Fitness",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    specs: {
      "Battery": "5 days",
      "Sensors": "Heart Rate, Skin Temperature",
      "Water Resistance": "10ATM",
      "Subscription": "Required",
      "Features": "Recovery Score, Strain Coach"
    },
    featured: false
  },

  // More Office
  {
    name: "Steelcase Leap V2",
    price: 1099.99,
    description: "Ergonomic office chair with LiveBack technology and adjustable lumbar.",
    stock: 12,
    category: "Office",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    specs: {
      "Material": "Fabric or Leather",
      "Adjustments": "LiveBack Technology",
      "Weight Capacity": "400 lbs",
      "Warranty": "12 years",
      "Features": "Adjustable Lumbar, Armrests"
    },
    featured: false
  },
  {
    name: "BenQ PD3220U",
    price: 899.99,
    description: "32-inch 4K monitor with Thunderbolt 3 and HDR support.",
    stock: 15,
    category: "Office",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
    specs: {
      "Display": "32-inch 4K UHD",
      "Resolution": "3840x2160",
      "Color": "100% sRGB",
      "Ports": "Thunderbolt 3, USB-C",
      "Features": "HDR, Dual View"
    },
    featured: false
  },

  // More Accessories
  {
    name: "Belkin Boost Charge Pro",
    price: 79.99,
    description: "3-in-1 wireless charger for iPhone, Apple Watch, and AirPods.",
    stock: 30,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1609592806598-04d4d2d88548?w=500",
    specs: {
      "iPhone Charging": "15W MagSafe",
      "Watch Charging": "5W",
      "AirPods Charging": "5W",
      "Power": "25W Total",
      "Features": "LED Indicator, Non-slip Base"
    },
    featured: false
  },
  {
    name: "OWC ThunderBay 4",
    price: 399.99,
    description: "4-bay Thunderbolt 3 storage enclosure with hardware RAID.",
    stock: 10,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1609592806598-04d4d2d88548?w=500",
    specs: {
      "Bays": "4x 3.5-inch",
      "Interface": "Thunderbolt 3",
      "RAID": "Hardware RAID 0/1/5/10",
      "Capacity": "Up to 64TB",
      "Features": "Fan Cooling, LED Status"
    },
    featured: false
  }
];

async function addFinalProducts() {
  try {
    console.log('🚀 Adding final batch of products...');
    
    let addedCount = 0;
    let skippedCount = 0;
    
    for (const product of finalProducts) {
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
    
    console.log('\n🎉 Final products added!');
    console.log(`📊 Added: ${addedCount} products`);
    console.log(`⏭️  Skipped: ${skippedCount} products`);
    
    // Show total count
    const totalProducts = await Product.countDocuments();
    console.log(`📦 Total products in database: ${totalProducts}`);
    
    // Show products by category
    const categories = await Product.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📈 Products by category:');
    categories.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count} products`);
    });
    
    // Show price range
    const priceStats = await Product.aggregate([
      { $group: { 
        _id: null, 
        minPrice: { $min: '$price' }, 
        maxPrice: { $max: '$price' },
        avgPrice: { $avg: '$price' },
        totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
      }}
    ]);
    
    if (priceStats.length > 0) {
      const stats = priceStats[0];
      console.log(`\n💰 Price range: $${stats.minPrice.toFixed(2)} - $${stats.maxPrice.toFixed(2)}`);
      console.log(`📊 Average price: $${stats.avgPrice.toFixed(2)}`);
      console.log(`💵 Total inventory value: $${stats.totalValue.toFixed(2)}`);
    }
    
    // Show featured products count
    const featuredCount = await Product.countDocuments({ featured: true });
    console.log(`⭐ Featured products: ${featuredCount}`);
    
    console.log('\n🎊 Congratulations! You now have a massive tech shop! 🎊');
    
  } catch (error) {
    console.error('Error adding final products:', error);
  } finally {
    mongoose.connection.close();
  }
}

addFinalProducts(); 