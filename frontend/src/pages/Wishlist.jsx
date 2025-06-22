import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import LazyImage from '../components/common/LazyImage';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist, moveToCart } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (productId) => {
    moveToCart(productId, addToCart);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  if (!wishlistItems?.length) {
    return (
      <div className="container-responsive section-padding">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Start adding products to your wishlist to save them for later. You can move them to your cart whenever you're ready to purchase.
          </p>
          <Link 
            to="/products" 
            className="btn-primary inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive section-padding">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Wishlist</h1>
          <p className="text-gray-400">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <button
            onClick={clearWishlist}
            className="px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Clear All
          </button>
          <Link
            to="/products"
            className="px-4 py-2 bg-surface/50 text-white rounded-lg hover:bg-surface/70 transition-colors text-sm font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Wishlist Items */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="popLayout">
          {wishlistItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative bg-surface/30 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="absolute top-3 right-3 z-10 p-2 bg-red-500/80 hover:bg-red-600 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                  {item.description}
                </p>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  {item.originalPrice && item.originalPrice > item.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${item.originalPrice}
                    </span>
                  )}
                  <span className="text-lg font-bold text-white">
                    ${item.price}
                  </span>
                </div>

                {/* Rating */}
                {item.rating && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">({item.rating})</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(item.id)}
                    className="flex-1 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    Move to Cart
                  </button>
                  <Link
                    to={`/products/${item.id}`}
                    className="px-3 py-2 bg-surface/50 text-white rounded-lg hover:bg-surface/70 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Wishlist; 