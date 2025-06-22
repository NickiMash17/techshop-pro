import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import LazyImage from '../components/common/LazyImage';

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
    
    // Show success toast notification
    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#1f2937',
        color: '#fff',
        border: '1px solid #374151',
      },
    });
    
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
    <div className="container-responsive section-padding">
      <div className="space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-400">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-surface/30 rounded-2xl overflow-hidden">
              <LazyImage
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
              <p className="text-gray-400 text-lg">{product.description}</p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-400">({product.reviews} reviews)</span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${
                product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
              }`}></span>
              <span className="text-gray-400">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/10 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-surface/50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-white/10">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-surface/50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Product Details</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="text-white">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>SKU:</span>
                  <span className="text-white">#{product.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;