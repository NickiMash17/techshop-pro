const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'MacBook Pro 16" M2',
    description: 'The most powerful MacBook Pro ever with the M2 Pro or M2 Max chip. Perfect for professionals and power users.',
    price: 2499.99,
    originalPrice: 2799.99,
    stock: 15,
    category: 'Laptops',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    specs: {
      'Processor': 'M2 Pro/M2 Max',
      'Memory': '16GB/32GB/64GB',
      'Storage': '512GB/1TB/2TB/4TB',
      'Display': '16-inch Liquid Retina XDR',
      'Battery': 'Up to 22 hours'
    }
  },
  {
    name: 'iPhone 15 Pro Max',
    description: 'The most advanced iPhone with A17 Pro chip, titanium design, and revolutionary camera system.',
    price: 1199.99,
    originalPrice: 1299.99,
    stock: 25,
    category: 'Smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
    specs: {
      'Processor': 'A17 Pro',
      'Storage': '256GB/512GB/1TB',
      'Display': '6.7-inch Super Retina XDR',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      'Battery': 'Up to 29 hours'
    }
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality and 30-hour battery life.',
    price: 399.99,
    originalPrice: 449.99,
    stock: 30,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    specs: {
      'Noise Canceling': 'Industry-leading',
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.2',
      'Weight': '250g',
      'Features': 'Touch controls, Speak-to-Chat'
    }
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'The ultimate Android experience with S Pen, AI features, and pro-grade camera system.',
    price: 1299.99,
    originalPrice: 1399.99,
    stock: 20,
    category: 'Smartphones',
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
    specs: {
      'Processor': 'Snapdragon 8 Gen 3',
      'Storage': '256GB/512GB/1TB',
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Camera': '200MP Main + 12MP Ultra Wide + 50MP Telephoto + 10MP Telephoto',
      'S Pen': 'Built-in'
    }
  },
  {
    name: 'Dell XPS 13 Plus',
    description: 'Ultra-thin premium laptop with stunning display and powerful performance for professionals.',
    price: 1499.99,
    originalPrice: 1699.99,
    stock: 12,
    category: 'Laptops',
    imageUrl: 'https://images.unsplash.com/photo-1605134513573-384dcf99a44c?w=500',
    specs: {
      'Processor': 'Intel Core i7-1360P',
      'Memory': '16GB LPDDR5',
      'Storage': '512GB PCIe SSD',
      'Display': '13.4-inch 3.5K OLED',
      'Battery': 'Up to 12 hours'
    }
  },
  {
    name: 'Apple Watch Series 9',
    description: 'The most advanced Apple Watch with faster performance and new health features.',
    price: 399.99,
    originalPrice: 449.99,
    stock: 35,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    specs: {
      'Processor': 'S9 SiP',
      'Display': 'Always-On Retina',
      'Battery': 'Up to 18 hours',
      'Features': 'ECG, Blood Oxygen, Fall Detection',
      'Water Resistance': '50m'
    }
  },
  {
    name: 'Logitech MX Master 3S',
    description: 'Premium wireless mouse with ultra-quiet clicks and precision scrolling for productivity.',
    price: 99.99,
    originalPrice: 119.99,
    stock: 40,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    specs: {
      'Sensor': '8000 DPI',
      'Battery': '70 days',
      'Connectivity': 'Bluetooth/2.4GHz',
      'Buttons': '7 programmable',
      'Scroll': 'MagSpeed electromagnetic'
    }
  },
  {
    name: 'iPad Pro 12.9" M2',
    description: 'The most powerful iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support.',
    price: 1099.99,
    originalPrice: 1199.99,
    stock: 18,
    category: 'Tablets',
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    specs: {
      'Processor': 'M2',
      'Storage': '128GB/256GB/512GB/1TB/2TB',
      'Display': '12.9-inch Liquid Retina XDR',
      'Camera': '12MP Ultra Wide + 10MP Wide',
      'Apple Pencil': '2nd generation'
    }
  },
  {
    name: 'Bose QuietComfort 45',
    description: 'Premium noise-canceling headphones with world-class comfort and sound quality.',
    price: 329.99,
    originalPrice: 379.99,
    stock: 22,
    category: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
    specs: {
      'Noise Canceling': 'Acoustic Noise Canceling',
      'Battery': '24 hours',
      'Connectivity': 'Bluetooth 5.1',
      'Weight': '240g',
      'Features': 'TriPort acoustic architecture'
    }
  },
  {
    name: 'Microsoft Surface Laptop 5',
    description: 'Elegant design meets powerful performance with premium materials and all-day battery life.',
    price: 999.99,
    originalPrice: 1099.99,
    stock: 15,
    category: 'Laptops',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
    specs: {
      'Processor': 'Intel Core i5-1235U',
      'Memory': '8GB LPDDR5x',
      'Storage': '256GB SSD',
      'Display': '13.5-inch PixelSense',
      'Battery': 'Up to 18 hours'
    }
  }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@techshop.com',
      password: hashedPassword,
      role: 'admin'
    });
    console.log('Created admin user:', adminUser.email);

    // Create regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: await bcrypt.hash('password123', 12),
      role: 'user'
    });
    console.log('Created regular user:', regularUser.email);

    // Create products
    const products = await Product.create(sampleProducts);
    console.log(`Created ${products.length} products`);

    console.log('Database seeded successfully!');
    console.log('\nTest Accounts:');
    console.log('Admin: admin@techshop.com / admin123');
    console.log('User: john@example.com / password123');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedData();
}

module.exports = seedData; 