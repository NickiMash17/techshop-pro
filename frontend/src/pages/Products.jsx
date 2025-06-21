import React, { useState, useEffect } from 'react';
import ProductCard from '../components/products/ProductCard';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality sound with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Audio'
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Track your fitness and stay connected',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Wearables'
  },
  {
    id: '3',
    name: 'Wireless Gaming Mouse',
    description: 'Precision control for professional gaming',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    category: 'Gaming'
  },
  {
    id: '4',
    name: 'Ultra HD Webcam',
    description: 'Crystal clear video calls and streaming',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500',
    category: 'Video'
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    description: 'Premium typing experience with RGB lighting',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
    category: 'Accessories'
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500',
    category: 'Audio'
  },
  {
    id: '7',
    name: 'Portable SSD',
    description: 'Ultra-fast external storage for your data',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&auto=format&fit=crop&q=80',
    category: 'Storage'
  },
  {
    id: '8',
    name: 'Gaming Headset',
    description: 'Immersive gaming audio with microphone',
    price: 119.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Gaming'
  }
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Our Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;