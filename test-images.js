import axios from 'axios';

// Test the updated images
const testImageUrls = [
  'https://www.apple.com/v/iphone-15-pro/a/images/overview/hero/hero_iphone15pro__i70z9oz3hj2i_large.jpg',
  'https://www.apple.com/v/apple-watch-series-9/b/images/overview/hero/hero_watch_series_9__b3u6x8g1g6um_large.jpg',
  'https://images.samsung.com/is/image/samsung/p6pim/levant/2401/gallery/levant-galaxy-s24-ultra-sm-s928bzkgmea-thumb-539181314?imwidth=720'
];

async function testUpdatedImages() {
  console.log('🔍 Testing updated product images...\n');
  
  for (const imageUrl of testImageUrls) {
    try {
      const response = await axios.head(imageUrl, { timeout: 5000 });
      console.log(`✅ ${imageUrl.substring(0, 50)}... - Status: ${response.status}`);
    } catch (error) {
      console.log(`❌ ${imageUrl.substring(0, 50)}... - Error: ${error.message}`);
    }
  }
  
  console.log('\n🎯 Next steps:');
  console.log('1. Hard refresh your browser (Ctrl+Shift+R)');
  console.log('2. Check browser developer tools for any errors');
  console.log('3. Clear browser cache if needed');
  console.log('4. The updated images should now be visible!');
}

testUpdatedImages(); 