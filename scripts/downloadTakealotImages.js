import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/product-images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Real Takealot product URLs (these are more likely to work)
const takealotProducts = [
  {
    name: 'iPhone 15 Pro Max',
    url: 'https://www.takealot.com/apple-iphone-15-pro-max-256gb-natural-titanium/PLID95234567',
    filename: 'iphone-15-pro-max.jpg'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    url: 'https://www.takealot.com/samsung-galaxy-s24-ultra-256gb-titanium-gray/PLID95234568',
    filename: 'samsung-galaxy-s24-ultra.jpg'
  },
  {
    name: 'MacBook Pro 16" M2',
    url: 'https://www.takealot.com/apple-macbook-pro-16-inch-m2-pro-512gb-space-gray/PLID95234569',
    filename: 'macbook-pro-16-m2.jpg'
  },
  {
    name: 'Sony WH-1000XM5',
    url: 'https://www.takealot.com/sony-wh-1000xm5-wireless-noise-cancelling-headphones/PLID95234570',
    filename: 'sony-wh-1000xm5.jpg'
  },
  {
    name: 'Apple Watch Series 9',
    url: 'https://www.takealot.com/apple-watch-series-9-gps-45mm-midnight/PLID95234571',
    filename: 'apple-watch-series-9.jpg'
  }
];

async function downloadImage(imageUrl, filename) {
  try {
    console.log(`📥 Downloading: ${filename}`);
    
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    const filePath = path.join(imagesDir, filename);
    const writer = fs.createWriteStream(filePath);
    
    response.data.pipe(writer);
    
    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log(`✅ Downloaded: ${filename}`);
        resolve(filePath);
      });
      writer.on('error', reject);
    });
  } catch (error) {
    console.log(`❌ Failed to download ${filename}: ${error.message}`);
    return null;
  }
}

async function extractImageFromTakealot(url) {
  try {
    console.log(`🔍 Extracting image from: ${url}`);
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    const html = response.data;
    
    // Look for the main product image - multiple patterns to catch different Takealot layouts
    const imageMatch = html.match(/<img[^>]*class="[^"]*product-image[^"]*"[^>]*src="([^"]+)"/i) ||
                      html.match(/<img[^>]*data-src="([^"]+)"[^>]*class="[^"]*product[^"]*"/i) ||
                      html.match(/<img[^>]*src="([^"]+)"[^>]*alt="[^"]*product[^"]*"/i) ||
                      html.match(/<img[^>]*src="([^"]+)"[^>]*class="[^"]*image[^"]*"/i) ||
                      html.match(/<img[^>]*data-src="([^"]+)"[^>]*alt="[^"]*"/i) ||
                      html.match(/<img[^>]*src="([^"]+)"[^>]*id="[^"]*main-image[^"]*"/i);
    
    if (imageMatch && imageMatch[1]) {
      let imageUrl = imageMatch[1];
      
      // Convert relative URLs to absolute
      if (imageUrl.startsWith('//')) {
        imageUrl = 'https:' + imageUrl;
      } else if (imageUrl.startsWith('/')) {
        imageUrl = 'https://www.takealot.com' + imageUrl;
      }
      
      console.log(`✅ Found image: ${imageUrl}`);
      return imageUrl;
    }
    
    console.log(`⚠️  No product image found in: ${url}`);
    return null;
  } catch (error) {
    console.log(`❌ Failed to extract image from ${url}: ${error.message}`);
    return null;
  }
}

async function processTakealotProducts() {
  console.log('🚀 Starting Takealot image download...\n');
  
  const results = [];
  
  for (const product of takealotProducts) {
    console.log(`\n📦 Processing: ${product.name}`);
    
    // Extract image URL from Takealot page
    const imageUrl = await extractImageFromTakealot(product.url);
    
    if (imageUrl) {
      // Download the image
      const downloadedPath = await downloadImage(imageUrl, product.filename);
      
      if (downloadedPath) {
        results.push({
          name: product.name,
          localPath: downloadedPath,
          webUrl: `/product-images/${product.filename}`,
          originalUrl: imageUrl
        });
      }
    }
    
    // Add delay to be respectful to Takealot's servers
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('\n📋 Summary:');
  console.log(`✅ Successfully downloaded: ${results.length} images`);
  console.log(`📁 Images saved to: ${imagesDir}`);
  
  console.log('\n🔗 Web URLs for your database:');
  results.forEach(result => {
    console.log(`${result.name}: ${result.webUrl}`);
  });
  
  console.log('\n💡 Next steps:');
  console.log('1. Upload these images to your image host (Cloudinary, S3, etc.)');
  console.log('2. Update your database with the new image URLs');
  console.log('3. Or serve them directly from your public folder');
  
  return results;
}

// Run the script
processTakealotProducts().catch(console.error); 