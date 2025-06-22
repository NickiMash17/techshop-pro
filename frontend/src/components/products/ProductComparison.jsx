import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';
import LazyImage from '../common/LazyImage';

const ProductComparison = ({ isOpen, onClose, products = [] }) => {
  const { addToCart } = useCart();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (isOpen && products.length > 0) {
      setSelectedProducts(products.slice(0, 3)); // Max 3 products for comparison
    }
  }, [isOpen, products]);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`, {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#1f2937',
        color: '#fff',
        border: '1px solid #374151',
      },
    });
  };

  const removeProduct = (productId) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addProduct = (product) => {
    if (selectedProducts.length >= 3) {
      toast.error('Maximum 3 products can be compared at once', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151',
        },
      });
      return;
    }
    if (!selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(prev => [...prev, product]);
    }
  };

  const getComparisonData = () => {
    if (selectedProducts.length === 0) return [];

    const specs = [
      { key: 'price', label: 'Price', type: 'price' },
      { key: 'category', label: 'Category', type: 'text' },
      { key: 'stock', label: 'Stock', type: 'number' },
      { key: 'rating', label: 'Rating', type: 'rating' },
      { key: 'reviews', label: 'Reviews', type: 'number' }
    ];

    return specs.map(spec => ({
      ...spec,
      values: selectedProducts.map(product => product[spec.key])
    }));
  };

  const renderValue = (value, type) => {
    switch (type) {
      case 'price':
        return `$${value?.toFixed(2) || 'N/A'}`;
      case 'rating':
        if (!value) return 'N/A';
        return (
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(value) ? 'text-yellow-400' : 'text-gray-600'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-400">({value})</span>
          </div>
        );
      default:
        return value || 'N/A';
    }
  };

  const getBestValue = (values, type) => {
    if (type === 'price') {
      return Math.min(...values.filter(v => v !== null && v !== undefined));
    }
    if (type === 'rating') {
      return Math.max(...values.filter(v => v !== null && v !== undefined));
    }
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-2xl font-bold text-white">Product Comparison</h2>
                <p className="text-gray-400 mt-1">
                  Compare {selectedProducts.length} products
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="overflow-auto max-h-[calc(90vh-120px)]">
              {selectedProducts.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Products Selected</h3>
                  <p className="text-gray-400 mb-4">
                    Select up to 3 products to compare their features and specifications
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="p-6">
                  {/* Product Headers */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {selectedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        className="relative bg-surface/50 rounded-xl p-4 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {/* Remove Button */}
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="absolute top-2 right-2 p-1 hover:bg-red-500/20 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>

                        {/* Product Image */}
                        <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                          <LazyImage
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <h3 className="font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>

                        {/* Price */}
                        <div className="flex items-center space-x-2 mb-3">
                          {product.originalPrice && product.originalPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                          <span className="text-lg font-bold text-white">
                            ${product.price}
                          </span>
                        </div>

                        {/* Rating */}
                        {product.rating && (
                          <div className="flex items-center space-x-2 mb-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-400">({product.rating})</span>
                          </div>
                        )}

                        {/* Add to Cart Button */}
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                        >
                          Add to Cart
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Comparison Table */}
                  <div className="bg-surface/30 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-surface/50">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Feature</th>
                            {selectedProducts.map((product, index) => (
                              <th key={product.id} className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                                {product.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          {getComparisonData().map((spec, index) => (
                            <tr key={spec.key} className="hover:bg-white/5">
                              <td className="px-6 py-4 text-sm font-medium text-gray-300">
                                {spec.label}
                              </td>
                              {spec.values.map((value, valueIndex) => {
                                const bestValue = getBestValue(spec.values, spec.type);
                                const isBest = value === bestValue;
                                
                                return (
                                  <td key={valueIndex} className="px-6 py-4">
                                    <div className={`flex items-center space-x-2 ${isBest ? 'text-green-400' : 'text-white'}`}>
                                      <span className="text-sm">
                                        {renderValue(value, spec.type)}
                                      </span>
                                      {isBest && (
                                        <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductComparison; 