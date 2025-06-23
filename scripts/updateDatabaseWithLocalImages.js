import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Map product names to their local image URLs
const productImageMap = {
  'iPhone 15 Pro Max': '/product-images/iphone-15-pro-max.jpg',
  'Samsung Galaxy S24 Ultra': '/product-images/samsung-galaxy-s24-ultra.jpg',
  'MacBook Pro 16" M2': '/product-images/macbook-pro-16-m2.jpg',
  'Sony WH-1000XM5': '/product-images/sony-wh-1000xm5.jpg',
  'Apple Watch Series 9': '/product-images/apple-watch-series-9.jpg',
  // Add more mappings as needed
};

async function updateDatabaseWithLocalImages() {
  try {
    console.log('🚀 Updating database with local product images...\n');
    
    let updated = 0;
    let notFound = 0;
    
    for (const [productName, imageUrl] of Object.entries(productImageMap)) {
      console.log(`🔍 Looking for: ${productName}`);
      
      // Find the product in the database
      const product = await Product.findOne({ 
        name: { $regex: new RegExp(productName, 'i') } 
      });
      
      if (product) {
        // Update the product's image URL
        await Product.findByIdAndUpdate(product._id, { imageUrl });
        console.log(`✅ Updated: ${productName} -> ${imageUrl}`);
        updated++;
      } else {
        console.log(`❌ Not found: ${productName}`);
        notFound++;
      }
    }
    
    console.log('\n📋 Summary:');
    console.log(`✅ Updated: ${updated} products`);
    console.log(`❌ Not found: ${notFound} products`);
    
    // Show some examples of updated products
    const sampleProducts = await Product.find({
      name: { $in: Object.keys(productImageMap) }
    }).limit(5);
    
    console.log('\n📸 Sample updated products:');
    sampleProducts.forEach(product => {
      console.log(`  ${product.name}: ${product.imageUrl ? '✅ Has image' : '❌ No image'}`);
    });
    
  } catch (error) {
    console.error('Error updating database:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the script
updateDatabaseWithLocalImages(); 