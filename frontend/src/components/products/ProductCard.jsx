import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import LazyImage from '../common/LazyImage';

const ProductCard = ({ product, index = 0, viewMode = 'grid' }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isInUserCart = isInCart(product.id);
  const cartQuantity = getItemQuantity(product.id);
  const isInUserWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Add to Cart clicked for:', product.name);
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInUserWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      rotate: 2,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        delay: 0.3 + index * 0.1,
        type: "spring",
        damping: 15,
        stiffness: 200
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    }
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

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="glass-card p-6"
      >
        <div className="flex items-center space-x-6">
          {/* Image */}
          <Link to={`/products/${product.id}`} className="relative w-32 h-32 flex-shrink-0">
            <LazyImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              variants={imageVariants}
              whileHover="hover"
            />
            
            {/* Category Badge */}
            {product.category && (
              <motion.div 
                className="absolute top-2 left-2 badge-primary text-xs"
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
              >
                {product.category}
              </motion.div>
            )}
          </Link>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Link to={`/products/${product.id}`}>
              <h3 className="text-xl font-semibold text-white hover:text-primary transition-colors mb-2">
                {product.name}
              </h3>
              <p className="text-gray-400 mb-3 line-clamp-2">
                {product.description}
              </p>
            </Link>
            
            {/* Rating and Reviews */}
            {product.rating && (
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-3 mb-4">
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-white">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="badge-warning text-xs">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Stock Status */}
            {product.stock !== undefined && (
              <div className="text-sm text-gray-400 mb-4">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </div>
            )}
          </div>

          {/* Action */}
          <div className="flex flex-col items-end space-y-3">
            {isInUserCart && (
              <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                {cartQuantity} in cart
              </span>
            )}
            <div className="flex items-center gap-2">
              {isInUserCart && (
                <motion.span 
                  className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                >
                  {cartQuantity} in cart
                </motion.span>
              )}
              
              {/* Wishlist Button */}
              <motion.button
                onClick={handleWishlistToggle}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isInUserWishlist 
                    ? 'bg-red-500/80 text-white hover:bg-red-600' 
                    : 'bg-surface/50 text-gray-400 hover:bg-surface/70 hover:text-white'
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.95 + index * 0.1 }}
              >
                <svg className="w-4 h-4" fill={isInUserWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.button>
              
              <motion.button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`card-button ${
                  product.stock === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''
                }`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view (original design)
  return (
    <motion.div 
      className="card-container"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <div className="block h-full group">
        <div className="card-wrapper">
          {/* Image Container */}
          <div className="card-image-wrapper">
            <Link to={`/products/${product.id}`} className="block">
              <LazyImage
                src={product.image}
                alt={product.name}
                className="card-image"
                variants={imageVariants}
                whileHover="hover"
              />
            </Link>
            
            {/* Category Badge */}
            {product.category && (
              <motion.div 
                className="absolute top-4 left-4 badge-primary z-10"
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                {product.category}
              </motion.div>
            )}

            {/* Stock Badge */}
            {product.stock !== undefined && (
              <motion.div 
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium z-10 backdrop-blur-sm ${
                  product.stock > 0 
                    ? 'badge-success' 
                    : 'badge-error'
                }`}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </motion.div>
            )}

            {/* Discount Badge */}
            {product.originalPrice && product.originalPrice > product.price && (
              <motion.div 
                className="absolute bottom-4 left-4 badge-warning z-10"
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </motion.div>
            )}

            {/* Quick View Overlay */}
            <Link to={`/products/${product.id}`}>
              <motion.div
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <motion.div
                  className="bg-white/20 backdrop-blur-sm rounded-full p-3 text-white"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ delay: 0.1 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </motion.div>
              </motion.div>
            </Link>
          </div>

          {/* Content Container */}
          <div className="card-content">
            <Link to={`/products/${product.id}`}>
              <motion.h3 
                className="card-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                {product.name}
              </motion.h3>
              
              <motion.p 
                className="card-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {product.description}
              </motion.p>
            </Link>

            {/* Rating */}
            {product.rating && (
              <motion.div 
                className="flex items-center space-x-1 mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 + index * 0.1 }}
              >
                {renderStars(product.rating)}
                <span className="text-xs text-gray-400 ml-1">
                  ({product.reviews})
                </span>
              </motion.div>
            )}
            
            {/* Price and Action */}
            <motion.div 
              className="mt-auto flex items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="flex flex-col">
                {product.originalPrice && product.originalPrice > product.price && (
                  <motion.span 
                    className="text-sm text-gray-500 line-through"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    ${product.originalPrice}
                  </motion.span>
                )}
                <motion.span 
                  className="text-xl font-bold text-white group-hover:text-primary transition-all duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  ${product.price}
                </motion.span>
              </div>
              
              <div className="flex items-center gap-2">
                {isInUserCart && (
                  <motion.span 
                    className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    {cartQuantity} in cart
                  </motion.span>
                )}
                
                {/* Wishlist Button */}
                <motion.button
                  onClick={handleWishlistToggle}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isInUserWishlist 
                      ? 'bg-red-500/80 text-white hover:bg-red-600' 
                      : 'bg-surface/50 text-gray-400 hover:bg-surface/70 hover:text-white'
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.95 + index * 0.1 }}
                >
                  <svg className="w-4 h-4" fill={isInUserWishlist ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </motion.button>
                
                <motion.button 
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`card-button ${
                    product.stock === 0 
                      ? 'opacity-50 cursor-not-allowed' 
                      : ''
                  }`}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Shine Effect Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>

          {/* Corner Accent */}
          <motion.div
            className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    image: PropTypes.string.isRequired,
    category: PropTypes.string,
    stock: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.number
  }).isRequired,
  index: PropTypes.number,
  viewMode: PropTypes.oneOf(['grid', 'list'])
};

export default ProductCard;