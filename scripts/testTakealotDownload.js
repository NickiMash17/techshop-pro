import axios from 'axios';

// Test with a real Takealot product URL
const testUrl = 'https://www.takealot.com/apple-iphone-15-pro-max-256gb-natural-titanium/PLID95234567';

async function testTakealotAccess() {
  console.log('🧪 Testing Takealot access...\n');
  
  try {
    console.log(`🔍 Testing URL: ${testUrl}`);
    
    const response = await axios.get(testUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 10000
    });

    console.log(`✅ Successfully accessed Takealot page`);
    console.log(`📄 Page length: ${response.data.length} characters`);
    
    // Look for any image tags
    const imageMatches = response.data.match(/<img[^>]+>/g);
    console.log(`🖼️  Found ${imageMatches ? imageMatches.length : 0} image tags`);
    
    if (imageMatches) {
      console.log('\n📸 Sample image tags:');
      imageMatches.slice(0, 5).forEach((img, index) => {
        console.log(`${index + 1}. ${img.substring(0, 100)}...`);
      });
    }
    
    // Look for specific product image patterns
    const patterns = [
      /<img[^>]*class="[^"]*product-image[^"]*"[^>]*src="([^"]+)"/i,
      /<img[^>]*data-src="([^"]+)"[^>]*class="[^"]*product[^"]*"/i,
      /<img[^>]*src="([^"]+)"[^>]*alt="[^"]*product[^"]*"/i,
      /<img[^>]*src="([^"]+)"[^>]*class="[^"]*image[^"]*"/i
    ];
    
    console.log('\n🔍 Testing image extraction patterns:');
    patterns.forEach((pattern, index) => {
      const match = response.data.match(pattern);
      if (match) {
        console.log(`✅ Pattern ${index + 1} found: ${match[1]}`);
      } else {
        console.log(`❌ Pattern ${index + 1}: No match`);
      }
    });
    
  } catch (error) {
    console.log(`❌ Failed to access Takealot: ${error.message}`);
    
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Headers:`, error.response.headers);
    }
  }
}

testTakealotAccess(); 