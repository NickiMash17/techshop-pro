// Product data utility - This would typically come from a backend API
// In a real application, this data would be fetched from your backend server

export const PRODUCT_CATEGORIES = {
  AUDIO: 'Audio',
  GAMING: 'Gaming',
  WEARABLES: 'Wearables',
  ACCESSORIES: 'Accessories',
  STORAGE: 'Storage',
  DISPLAYS: 'Displays',
  VIDEO: 'Video'
};

// Accurate product images mapped to product types
const PRODUCT_IMAGES = {
  // Audio Products
  HEADPHONES: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  EARBUDS: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500',
  GAMING_HEADSET: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
  SPEAKER: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
  MICROPHONE: 'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500',
  STUDIO_HEADPHONES: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
  
  // Gaming Products
  GAMING_MOUSE: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
  GAMING_CONTROLLER: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500',
  GAMING_CHAIR: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
  GAMING_DESK: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500',
  GAMING_GLASSES: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500',
  GAMING_MOUSE_PAD: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
  
  // Wearables
  SMART_WATCH: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
  FITNESS_TRACKER: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
  SMART_RING: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
  SMART_SCALE: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
  
  // Accessories
  KEYBOARD: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
  WIRELESS_KEYBOARD: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
  WIRELESS_CHARGER: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
  USB_HUB: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
  LAPTOP_STAND: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
  TABLET_STAND: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
  WIRELESS_PRESENTER: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
  CABLE_ORGANIZER: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
  
  // Storage
  PORTABLE_SSD: 'https://images.unsplash.com/photo-1597872200969-74b1c0b0c0c0?w=500',
  EXTERNAL_HDD: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
  
  // Displays
  MONITOR: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
  GAMING_MONITOR: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
  
  // Video
  WEBCAM: 'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500'
};

export const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality sound with noise cancellation',
    price: 199.99,
    originalPrice: 249.99,
    image: PRODUCT_IMAGES.HEADPHONES,
    category: PRODUCT_CATEGORIES.AUDIO,
    stock: 15,
    rating: 4.8,
    reviews: 124,
    brand: 'AudioTech'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Track your fitness and stay connected',
    price: 299.99,
    originalPrice: 349.99,
    image: PRODUCT_IMAGES.SMART_WATCH,
    category: PRODUCT_CATEGORIES.WEARABLES,
    stock: 8,
    rating: 4.6,
    reviews: 89,
    brand: 'TechWear'
  },
  {
    id: '3',
    name: 'Wireless Gaming Mouse',
    description: 'Precision control for professional gaming',
    price: 79.99,
    image: PRODUCT_IMAGES.GAMING_MOUSE,
    category: PRODUCT_CATEGORIES.GAMING,
    stock: 25,
    rating: 4.9,
    reviews: 203,
    brand: 'GameTech'
  },
  {
    id: '4',
    name: 'Ultra HD Webcam',
    description: 'Crystal clear video calls and streaming',
    price: 129.99,
    originalPrice: 159.99,
    image: PRODUCT_IMAGES.WEBCAM,
    category: PRODUCT_CATEGORIES.VIDEO,
    stock: 12,
    rating: 4.7,
    reviews: 156,
    brand: 'VideoPro'
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    description: 'Premium typing experience with RGB lighting',
    price: 149.99,
    image: PRODUCT_IMAGES.KEYBOARD,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    stock: 20,
    rating: 4.5,
    reviews: 98,
    brand: 'KeyTech'
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation',
    price: 89.99,
    originalPrice: 119.99,
    image: PRODUCT_IMAGES.EARBUDS,
    category: PRODUCT_CATEGORIES.AUDIO,
    stock: 30,
    rating: 4.4,
    reviews: 167,
    brand: 'AudioTech'
  },
  {
    id: '7',
    name: 'Portable SSD',
    description: 'Ultra-fast external storage for your data',
    price: 199.99,
    image: PRODUCT_IMAGES.PORTABLE_SSD,
    category: PRODUCT_CATEGORIES.STORAGE,
    stock: 18,
    rating: 4.8,
    reviews: 134,
    brand: 'StorageTech'
  },
  {
    id: '8',
    name: 'Gaming Headset',
    description: 'Immersive gaming audio with microphone',
    price: 119.99,
    originalPrice: 149.99,
    image: PRODUCT_IMAGES.GAMING_HEADSET,
    category: PRODUCT_CATEGORIES.GAMING,
    stock: 22,
    rating: 4.6,
    reviews: 112,
    brand: 'GameTech'
  },
  {
    id: '9',
    name: '4K Monitor',
    description: 'Ultra-high definition display for professionals',
    price: 399.99,
    originalPrice: 499.99,
    image: PRODUCT_IMAGES.MONITOR,
    category: PRODUCT_CATEGORIES.DISPLAYS,
    stock: 10,
    rating: 4.9,
    reviews: 78,
    brand: 'DisplayTech'
  },
  {
    id: '10',
    name: 'Wireless Charger',
    description: 'Fast wireless charging for all devices',
    price: 49.99,
    image: PRODUCT_IMAGES.WIRELESS_CHARGER,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    stock: 35,
    rating: 4.3,
    reviews: 89,
    brand: 'ChargeTech'
  },
  {
    id: '11',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with 360-degree sound',
    price: 79.99,
    image: PRODUCT_IMAGES.SPEAKER,
    category: PRODUCT_CATEGORIES.AUDIO,
    stock: 28,
    rating: 4.5,
    reviews: 156,
    brand: 'AudioTech'
  },
  {
    id: '12',
    name: 'Fitness Tracker',
    description: 'Monitor your health and activity levels',
    price: 89.99,
    image: PRODUCT_IMAGES.FITNESS_TRACKER,
    category: PRODUCT_CATEGORIES.WEARABLES,
    stock: 42,
    rating: 4.4,
    reviews: 203,
    brand: 'HealthTech'
  },
  {
    id: '13',
    name: 'Gaming Controller',
    description: 'Ergonomic controller for console gaming',
    price: 59.99,
    image: PRODUCT_IMAGES.GAMING_CONTROLLER,
    category: PRODUCT_CATEGORIES.GAMING,
    stock: 31,
    rating: 4.7,
    reviews: 178,
    brand: 'GameTech'
  },
  {
    id: '14',
    name: 'USB-C Hub',
    description: 'Expand your connectivity options',
    price: 39.99,
    image: PRODUCT_IMAGES.USB_HUB,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    stock: 55,
    rating: 4.2,
    reviews: 92,
    brand: 'ConnectTech'
  },
  {
    id: '15',
    name: 'External Hard Drive',
    description: 'Reliable storage for your important files',
    price: 89.99,
    image: PRODUCT_IMAGES.EXTERNAL_HDD,
    category: PRODUCT_CATEGORIES.STORAGE,
    stock: 24,
    rating: 4.6,
    reviews: 145,
    brand: 'StorageTech'
  },
  {
    id: '16',
    name: 'Curved Gaming Monitor',
    description: 'Immersive gaming experience with curved display',
    price: 299.99,
    image: PRODUCT_IMAGES.GAMING_MONITOR,
    category: PRODUCT_CATEGORIES.DISPLAYS,
    stock: 16,
    rating: 4.8,
    reviews: 87,
    brand: 'DisplayTech'
  },
  {
    id: '17',
    name: 'Wireless Keyboard',
    description: 'Slim and responsive wireless keyboard',
    price: 69.99,
    image: PRODUCT_IMAGES.WIRELESS_KEYBOARD,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    stock: 38,
    rating: 4.3,
    reviews: 134,
    brand: 'KeyTech'
  },
  {
    id: '18',
    name: 'Studio Headphones',
    description: 'Professional-grade audio monitoring',
    price: 249.99,
    image: PRODUCT_IMAGES.STUDIO_HEADPHONES,
    category: PRODUCT_CATEGORIES.AUDIO,
    stock: 12,
    rating: 4.9,
    reviews: 67,
    brand: 'AudioTech'
  },
  {
    id: '19',
    name: 'Smart Ring',
    description: 'Discrete health and activity tracking',
    price: 199.99,
    image: PRODUCT_IMAGES.SMART_RING,
    category: PRODUCT_CATEGORIES.WEARABLES,
    stock: 8,
    rating: 4.5,
    reviews: 43,
    brand: 'HealthTech'
  },
  {
    id: '20',
    name: 'Gaming Mouse Pad',
    description: 'Large surface for precise mouse control',
    price: 29.99,
    image: PRODUCT_IMAGES.GAMING_MOUSE_PAD,
    category: PRODUCT_CATEGORIES.GAMING,
    stock: 67,
    rating: 4.1,
    reviews: 89,
    brand: 'GameTech'
  },
  {
    id: '21',
    name: 'Laptop Stand',
    description: 'Ergonomic laptop positioning',
    price: 49.99,
    image: PRODUCT_IMAGES.LAPTOP_STAND,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    stock: 45,
    rating: 4.4,
    reviews: 112,
    brand: 'ErgoTech'
  },
  {
    id: '22',
    name: 'Microphone',
    description: 'Professional streaming and recording',
    price: 129.99,
    image: PRODUCT_IMAGES.MICROPHONE,
    category: PRODUCT_CATEGORIES.AUDIO,
    stock: 19,
    rating: 4.7,
    reviews: 156,
    brand: 'AudioTech'
  },
  {
    id: '23',
    name: 'Gaming Chair',
    description: 'Comfortable seating for long gaming sessions',
    price: 199.99,
    image: PRODUCT_IMAGES.GAMING_CHAIR,
    category: PRODUCT_CATEGORIES.GAMING,
    stock: 14,
    rating: 4.6,
    reviews: 78,
    brand: 'ComfortTech'
  },
  {
    id: '24',
    name: 'Tablet Stand',
    description: 'Adjustable stand for tablets and phones',
    price: 34.99,
    image: PRODUCT_IMAGES.TABLET_STAND,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    stock: 52,
    rating: 4.2,
    reviews: 95,
    brand: 'ErgoTech'
  },
  {
    id: '25',
    name: 'Wireless Presenter',
    description: 'Control presentations from anywhere',
    price: 39.99,
    image: PRODUCT_IMAGES.WIRELESS_PRESENTER,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    stock: 29,
    rating: 4.3,
    reviews: 67,
    brand: 'PresentTech'
  },
  {
    id: '26',
    name: 'Gaming Glasses',
    description: 'Reduce eye strain during gaming',
    price: 79.99,
    image: PRODUCT_IMAGES.GAMING_GLASSES,
    category: PRODUCT_CATEGORIES.GAMING,
    stock: 23,
    rating: 4.4,
    reviews: 89,
    brand: 'EyeTech'
  },
  {
    id: '27',
    name: 'USB Microphone',
    description: 'Plug-and-play audio recording',
    price: 89.99,
    image: PRODUCT_IMAGES.MICROPHONE,
    category: PRODUCT_CATEGORIES.AUDIO,
    stock: 36,
    rating: 4.5,
    reviews: 123,
    brand: 'AudioTech'
  },
  {
    id: '28',
    name: 'Smart Scale',
    description: 'Track your weight and body composition',
    price: 149.99,
    image: PRODUCT_IMAGES.SMART_SCALE,
    category: PRODUCT_CATEGORIES.WEARABLES,
    stock: 18,
    rating: 4.6,
    reviews: 234,
    brand: 'HealthTech'
  },
  {
    id: '29',
    name: 'Gaming Desk',
    description: 'Spacious desk for gaming setup',
    price: 299.99,
    image: PRODUCT_IMAGES.GAMING_DESK,
    category: PRODUCT_CATEGORIES.GAMING,
    stock: 9,
    rating: 4.8,
    reviews: 45,
    brand: 'ComfortTech'
  },
  {
    id: '30',
    name: 'Cable Organizer',
    description: 'Keep your cables neat and organized',
    price: 19.99,
    image: PRODUCT_IMAGES.CABLE_ORGANIZER,
    category: PRODUCT_CATEGORIES.ACCESSORIES,
    stock: 78,
    rating: 4.1,
    reviews: 156,
    brand: 'OrganizeTech'
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  return MOCK_PRODUCTS.filter(product => product.category === category);
};

// Helper function to get products by brand
export const getProductsByBrand = (brand) => {
  return MOCK_PRODUCTS.filter(product => product.brand === brand);
};

// Helper function to search products
export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase();
  return MOCK_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.brand.toLowerCase().includes(searchTerm)
  );
};

// Helper function to get product by ID
export const getProductById = (id) => {
  return MOCK_PRODUCTS.find(product => product.id === id);
}; 