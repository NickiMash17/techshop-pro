import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const MOCK_PRODUCTS = {
  '1': {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality sound with noise cancellation',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500'
    ],
    specs: [
      { label: 'Battery Life', value: '30 hours' },
      { label: 'Connectivity', value: 'Bluetooth 5.0' },
      { label: 'Noise Cancellation', value: 'Active' }
    ],
    stock: 10
  },
  '2': {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Track your fitness and stay connected',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500'
    ],
    specs: [
      { label: 'Battery Life', value: '48 hours' },
      { label: 'Water Resistance', value: '5ATM' },
      { label: 'Health Sensors', value: 'Heart Rate, SpO2' }
    ],
    stock: 8
  },
  '3': {
    id: '3',
    name: 'Wireless Gaming Mouse',
    description: 'Precision control for professional gaming',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'
    ],
    specs: [
      { label: 'DPI', value: '16000' },
      { label: 'Battery Life', value: '70 hours' },
      { label: 'Response Time', value: '1ms' }
    ],
    stock: 15
  },
  '4': {
    id: '4',
    name: 'Ultra HD Webcam',
    description: 'Crystal clear video calls and streaming',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500'
    ],
    specs: [
      { label: 'Resolution', value: '4K Ultra HD' },
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Field of View', value: '90°' }
    ],
    stock: 12
  }
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(MOCK_PRODUCTS[id] || null);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    setIsAdding(true);
    addToCart(product, quantity);
    setTimeout(() => setIsAdding(false), 1000);
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-surface/50 rounded-2xl overflow-hidden">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 
                  ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold text-primary mt-2">${product.price}</p>
          </div>

          <p className="text-gray-400">{product.description}</p>

          {/* Specs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Specifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.specs.map((spec, index) => (
                <div key={index} className="bg-surface/50 p-4 rounded-xl">
                  <span className="text-sm text-gray-400">{spec.label}</span>
                  <p className="font-medium">{spec.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-surface/50 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-surface/70"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 hover:bg-surface/70"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-400">
                {product.stock} units available
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`w-full py-3 bg-gradient-to-r from-primary to-secondary 
                rounded-lg font-medium transition-all duration-300
                ${isAdding ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90'}`}
            >
              {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;