// Copyright (c) 2025 Nickimash17. All rights reserved.
// Trademark: "TechShop Pro" is a trademark of Nickimash17.
// This code was written by Nickimash17. Unauthorized copying or distribution is prohibited.

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import EnhancedImage from '../components/common/EnhancedImage';
import { formatCurrency } from '../utils/currency';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist, moveToCart } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [isClearing, setIsClearing] = useState(false);

  const handleMoveToCart = (productId) => {
    moveToCart(productId, addToCart);
    toast.success('Item moved to cart!');
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
    toast.success('Item removed from wishlist');
  };

  const handleClearWishlist = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearWishlist();
      toast.success('Wishlist cleared');
      setIsClearing(false);
    }, 500);
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  if (!wishlistItems?.length) {
    return (
      <div className="container-responsive section-padding">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-32 h-32 mx-auto mb-8 bg-primary/20 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-lg">
            Start adding products to your wishlist to save them for later. You can move them to your cart whenever you're ready to purchase.
          </p>
          <Link 
            to="/products" 
            className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Browse Products
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-responsive section-padding">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Wishlist</h1>
          <p className="text-gray-400 text-lg">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearWishlist}
            disabled={isClearing}
            className="px-4 py-2 bg-red-500/80 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-medium"
          >
            {isClearing ? 'Clearing...' : 'Clear All'}
          </motion.button>
          <Link
            to="/products"
            className="px-4 py-2 bg-surface/50 text-white rounded-xl hover:bg-surface/70 transition-colors text-sm font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </motion.div>

      {/* Enhanced Wishlist Items */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="popLayout">
          {wishlistItems.map((item, index) => {
            const isInUserCart = isInCart(item.id || item._id);
            
            return (
              <motion.div
                key={item.id || item._id}
                className="group relative glass-card rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                {/* Remove Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveFromWishlist(item.id || item._id)}
                  className="absolute top-3 right-3 z-10 p-2 bg-red-500/80 hover:bg-red-600 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>

                {/* Stock Status Badge */}
                {item.stock === 0 && (
                  <div className="absolute top-3 left-3 z-10 badge-error">
                    Out of Stock
                  </div>
                )}

                {/* Product Image */}
                <div className="relative h-48 overflow-hidden">
                  <EnhancedImage
                    src={item.image || item.imageUrl || item.images?.[0]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-3">
                    {item.category && (
                      <span className="badge-primary text-xs">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors text-lg">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-4">
                    {item.originalPrice && item.originalPrice > item.price && (
                      <>
                        <span className="text-sm text-gray-500 line-through">
                          {formatCurrency(item.originalPrice)}
                        </span>
                        <span className="badge-success text-xs">
                          {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                    <span className="text-xl font-bold text-primary">
                      {formatCurrency(item.price)}
                    </span>
                  </div>

                  {/* Rating */}
                  {item.rating && (
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex">
                        {renderStars(item.rating)}
                      </div>
                      <span className="text-sm text-gray-400">({item.rating.toFixed(1)})</span>
                    </div>
                  )}

                  {/* Stock Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-2 h-2 rounded-full ${item.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-gray-400">
                      {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                    </span>
                    {item.stock > 0 && item.stock <= 5 && (
                      <span className="badge-warning text-xs">Low Stock</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleMoveToCart(item.id || item._id)}
                      disabled={item.stock === 0 || isInUserCart}
                      className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        item.stock === 0 
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                          : isInUserCart
                            ? 'bg-green-600 text-white'
                            : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 text-white'
                      }`}
                    >
                      {isInUserCart ? 'In Cart' : item.stock === 0 ? 'Out of Stock' : 'Move to Cart'}
                    </motion.button>
                    <Link
                      to={`/products/${item.id || item._id}`}
                      className="px-4 py-3 bg-surface/50 text-white rounded-xl hover:bg-surface/70 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Wishlist; 