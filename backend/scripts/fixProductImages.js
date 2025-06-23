import mongoose from 'mongoose';
import Product from '../models/Product.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Enhanced image mapping with more diverse and relevant images
const getImageForProduct = (product) => {
  const name = product.name.toLowerCase();
  const category = product.category.toLowerCase();
  
  // Laptops
  if (name.includes('macbook') || name.includes('laptop') || name.includes('xps') || name.includes('surface')) {
    return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Smartphones
  if (name.includes('iphone') || name.includes('samsung') || name.includes('galaxy') || name.includes('pixel')) {
    return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Headphones & Audio
  if (name.includes('headphone') || name.includes('sony wh') || name.includes('bose') || name.includes('airpods') || name.includes('sennheiser')) {
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Watches & Wearables
  if (name.includes('watch') || name.includes('fitbit') || name.includes('garmin') || name.includes('whoop')) {
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Tablets
  if (name.includes('ipad') || name.includes('tablet')) {
    return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Gaming
  if (name.includes('playstation') || name.includes('xbox') || name.includes('nintendo') || name.includes('switch') || name.includes('gaming')) {
    return 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Cameras & Photography
  if (name.includes('camera') || name.includes('canon') || name.includes('nikon') || name.includes('sony a7') || name.includes('lens') || name.includes('fe 24-70')) {
    return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Smart Home
  if (name.includes('echo') || name.includes('nest') || name.includes('philips hue') || name.includes('smart home') || name.includes('ring')) {
    return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Office & Furniture
  if (name.includes('chair') || name.includes('desk') || name.includes('steelcase') || name.includes('office')) {
    return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Audio Equipment
  if (name.includes('microphone') || name.includes('focusrite') || name.includes('yamaha') || name.includes('native instruments') || name.includes('komplete')) {
    return 'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Fitness & Health
  if (name.includes('fitness') || name.includes('peloton') || name.includes('nordictrack') || name.includes('treadmill') || name.includes('exercise')) {
    return 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Monitors & Displays
  if (name.includes('monitor') || name.includes('display') || name.includes('benq') || name.includes('lg') || name.includes('dell')) {
    return 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Mice & Keyboards
  if (name.includes('mouse') || name.includes('keyboard') || name.includes('logitech') || name.includes('mx master')) {
    return 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Storage & Accessories
  if (name.includes('storage') || name.includes('ssd') || name.includes('hard drive') || name.includes('owc') || name.includes('thunderbay')) {
    return 'https://images.unsplash.com/photo-1597872200969-2c65bbbe6467?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Chargers & Power
  if (name.includes('charger') || name.includes('boost charge') || name.includes('belkin') || name.includes('wireless')) {
    return 'https://images.unsplash.com/photo-1609592806596-b43bada2f2d2?w=800&h=800&fit=crop&crop=center&q=80';
  }
  
  // Category-based fallbacks
  switch (category) {
    case 'laptops':
      return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop&crop=center&q=80';
    case 'smartphones':
      return 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=800&fit=crop&crop=center&q=80';
    case 'accessories':
      return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop&crop=center&q=80';
    case 'tablets':
      return 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=800&fit=crop&crop=center&q=80';
    case 'gaming':
      return 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&h=800&fit=crop&crop=center&q=80';
    case 'photography':
      return 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=800&fit=crop&crop=center&q=80';
    case 'audio':
      return 'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=800&h=800&fit=crop&crop=center&q=80';
    case 'fitness':
      return 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop&crop=center&q=80';
    case 'office':
      return 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop&crop=center&q=80';
    default:
      return 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop&crop=center&q=80';
  }
};

const fixProductImages = async () => {
  try {
    console.log('🚀 Fixing product images with diverse, relevant images...\n');
    
    // Get all products
    const allProducts = await Product.find({});
    console.log(`📦 Found ${allProducts.length} products to update`);
    
    let updated = 0;
    let unchanged = 0;
    
    for (const product of allProducts) {
      const newImageUrl = getImageForProduct(product);
      
      // Only update if the image is different
      if (product.imageUrl !== newImageUrl) {
        await Product.findByIdAndUpdate(product._id, { imageUrl: newImageUrl });
        console.log(`✅ Updated: ${product.name} (${product.category})`);
        updated++;
      } else {
        console.log(`⏭️  Skipped: ${product.name} (already has correct image)`);
        unchanged++;
      }
    }
    
    console.log(`\n🎉 Summary:`);
    console.log(`✅ Updated: ${updated} products`);
    console.log(`⏭️  Unchanged: ${unchanged} products`);
    
    // Show some examples of updated products
    console.log('\n📸 Sample products with their new images:');
    const sampleProducts = await Product.find().limit(10);
    sampleProducts.forEach(product => {
      console.log(`  ${product.name} (${product.category}): ${product.imageUrl ? '✅ Has image' : '❌ No image'}`);
    });
    
    console.log('\n🚀 Images have been fixed!');
    console.log('💡 Refresh your browser to see the new images');
    
  } catch (error) {
    console.error('Error fixing images:', error);
  } finally {
    mongoose.connection.close();
  }
};

fixProductImages(); 