const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const curatedProProducts = [
  {
    name: "Apple MacBook Pro 16\" M2",
    price: 2499.99,
    description: "The most powerful MacBook Pro ever, with M2 Pro chip and Liquid Retina XDR display. Perfect for professionals and creators.",
    stock: 10,
    category: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    featured: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    description: "Flagship Android phone with 200MP camera, S Pen, and AI features. The ultimate device for productivity and photography.",
    stock: 15,
    category: "Smartphones",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    featured: true,
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 399.99,
    description: "Industry-leading noise canceling headphones with 30-hour battery life and crystal-clear sound.",
    stock: 20,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    featured: true,
  },
  {
    name: "Apple iPad Pro 12.9\" M2",
    price: 1099.99,
    description: "The most powerful iPad with M2 chip and Liquid Retina XDR display. Ideal for design, art, and productivity.",
    stock: 12,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
    featured: false,
  },
  {
    name: "Apple Watch Series 9",
    price: 399.99,
    description: "Advanced health and fitness smartwatch with ECG, Blood Oxygen, and more. Stay connected and healthy.",
    stock: 18,
    category: "Fitness",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    featured: false,
  },
  {
    name: "Dell XPS 13 Plus",
    price: 1499.99,
    description: "Ultra-thin premium laptop with stunning display and powerful performance for professionals.",
    stock: 14,
    category: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1605134513573-384dcf99a44c?w=800",
    featured: false,
  },
  {
    name: "Google Pixel 8 Pro",
    price: 999.99,
    description: "Google's flagship with AI-powered camera, 7 years of updates, and advanced features.",
    stock: 13,
    category: "Smartphones",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    featured: false,
  },
  {
    name: "Bose QuietComfort Ultra Earbuds",
    price: 299.99,
    description: "Premium noise-canceling earbuds with immersive sound and long battery life.",
    stock: 25,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800",
    featured: false,
  },
  {
    name: "Samsung Galaxy Tab S9 Ultra",
    price: 1199.99,
    description: "14.6-inch AMOLED tablet with S Pen and powerful performance. Perfect for work and play.",
    stock: 10,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
    featured: false,
  },
  {
    name: "Fitbit Sense 2",
    price: 299.99,
    description: "Advanced health smartwatch with ECG, stress tracking, and 6+ day battery life.",
    stock: 20,
    category: "Fitness",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    featured: false,
  },
  {
    name: "Microsoft Surface Pro 9",
    price: 999.99,
    description: "2-in-1 laptop-tablet with Intel processor and detachable keyboard. Versatile for any task.",
    stock: 10,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
    featured: false,
  },
  {
    name: "Alienware x16 Gaming Laptop",
    price: 2999.99,
    description: "Premium gaming laptop with RTX 4090 and 16-inch QHD+ display. For serious gamers.",
    stock: 8,
    category: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    featured: true,
  },
  {
    name: "Sony PlayStation 5",
    price: 499.99,
    description: "Next-gen gaming console with lightning-fast loading, haptic feedback, and stunning graphics.",
    stock: 20,
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800",
    featured: true,
  },
  {
    name: "Nintendo Switch OLED",
    price: 349.99,
    description: "Enhanced Nintendo Switch with 7-inch OLED screen and improved audio.",
    stock: 30,
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800",
    featured: false,
  },
  {
    name: "Canon EOS R6 Camera",
    price: 2499.99,
    description: "Full-frame mirrorless camera with 20MP sensor and 4K video recording.",
    stock: 12,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800",
    featured: true,
  },
  {
    name: "GoPro HERO11 Black",
    price: 499.99,
    description: "Action camera with 5.3K video, 27MP photos, and HyperSmooth 5.0 stabilization.",
    stock: 25,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800",
    featured: false,
  },
  {
    name: "Apple AirPods Pro (2nd Gen)",
    price: 249.99,
    description: "Active noise cancellation, adaptive transparency, and personalized spatial audio.",
    stock: 30,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800",
    featured: false,
  },
  {
    name: "Samsung Galaxy Watch 6",
    price: 399.99,
    description: "Smartwatch with advanced health tracking, AMOLED display, and long battery life.",
    stock: 18,
    category: "Fitness",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    featured: false,
  },
  {
    name: "DJI Mini 3 Pro Drone",
    price: 759.99,
    description: "Ultralight drone with 4K camera, obstacle avoidance, and 34-minute flight time.",
    stock: 10,
    category: "Photography",
    imageUrl: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800",
    featured: false,
  },
  {
    name: "Logitech MX Master 3S Mouse",
    price: 99.99,
    description: "Premium wireless mouse with ultra-quiet clicks and precision scrolling for productivity.",
    stock: 25,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1609592806598-04d4d2d88548?w=800",
    featured: false,
  },
  {
    name: "Anker PowerCore 26800 Charger",
    price: 59.99,
    description: "High-capacity portable charger with 3 USB ports and fast charging.",
    stock: 40,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1609592806598-04d4d2d88548?w=800",
    featured: false,
  },
  {
    name: "Amazon Echo Dot (5th Gen)",
    price: 49.99,
    description: "Smart speaker with Alexa, improved sound, and built-in temperature sensor.",
    stock: 50,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?w=800",
    featured: false,
  },
  {
    name: "Philips Hue Starter Kit",
    price: 199.99,
    description: "Smart lighting starter kit with bridge and 3 color bulbs for complete home automation.",
    stock: 15,
    category: "Smart Home",
    imageUrl: "https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=800",
    featured: false,
  },
];

async function addCuratedProProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const product of curatedProProducts) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (!existingProduct) {
        await Product.create(product);
        console.log(`✅ Added: ${product.name}`);
      } else {
        console.log(`⏭️  Skipped (already exists): ${product.name}`);
      }
    }

    const totalProducts = await Product.countDocuments();
    console.log(`📦 Total products in database: ${totalProducts}`);
  } catch (error) {
    console.error("Error adding curated pro products:", error);
  } finally {
    mongoose.connection.close();
  }
}

addCuratedProProducts(); 