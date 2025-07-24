const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const curatedProducts = [
  {
    name: "Apple MacBook Pro 16\" M2",
    price: 2499.99,
    description: "The most powerful MacBook Pro ever, with M2 Pro chip and Liquid Retina XDR display.",
    stock: 10,
    category: "Laptops",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    featured: true,
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    price: 1199.99,
    description: "Flagship Android phone with 200MP camera, S Pen, and AI features.",
    stock: 15,
    category: "Smartphones",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    featured: true,
  },
  {
    name: "Sony WH-1000XM5 Headphones",
    price: 399.99,
    description: "Industry-leading noise canceling headphones with 30-hour battery life.",
    stock: 20,
    category: "Audio",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    featured: true,
  },
  {
    name: "Apple iPad Pro 12.9\" M2",
    price: 1099.99,
    description: "The most powerful iPad with M2 chip and Liquid Retina XDR display.",
    stock: 12,
    category: "Tablets",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
    featured: false,
  },
  {
    name: "Apple Watch Series 9",
    price: 399.99,
    description: "Advanced health and fitness smartwatch with ECG, Blood Oxygen, and more.",
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
    description: "14.6-inch AMOLED tablet with S Pen and powerful performance.",
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
  // Add more curated tech gadgets here as needed
];

async function addCuratedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    for (const product of curatedProducts) {
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
    console.error("Error adding curated products:", error);
  } finally {
    mongoose.connection.close();
  }
}

addCuratedProducts(); 