import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import EnhancedImage from '../common/EnhancedImage';
import { formatCurrency } from '../../utils/currency';

const ProductCard = ({ product, index = 0, viewMode = 'grid' }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  // Handle both id and _id fields
  const productId = product.id || product._id;
  
  // Handle different image field names with optimized fallback
  const productImage = product.image || product.imageUrl || product.images?.[0] || product.img || 
                      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&fit=crop&crop=center&q=80';
  
  // Handle different rating field names
  const productRating = product.rating || product.averageRating || 0;
  
  // Handle different reviews field names (could be array or number)
  const productReviews = Array.isArray(product.reviews) ? product.reviews.length : (product.reviews || 0);
  
  const isInUserCart = isInCart(productId);
  const cartQuantity = getItemQuantity(productId);
  const isInUserWishlist = isInWishlist(productId);

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
      removeFromWishlist(productId);
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
          {/* Enhanced Image */}
          <Link to={`/products/${productId}`} className="relative w-32 h-32 flex-shrink-0">
            <EnhancedImage
              src={productImage}
              alt={product.name}
              className="w-full h-full rounded-lg"
              aspectRatio="1/1"
              variants={imageVariants}
              whileHover="hover"
              priority={index < 4} // Load first 4 images immediately
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
            <Link to={`/products/${productId}`}>
              <h3 className="text-xl font-semibold text-white hover:text-primary transition-colors mb-2">
                {product.name}
              </h3>
              <p className="text-gray-400 mb-3 line-clamp-2">
                {product.description}
              </p>
            </Link>
            
            {/* Rating and Reviews */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                {renderStars(productRating)}
              </div>
              <span className="text-sm text-gray-400">
                ({productReviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(product.price)}
              </div>
              {product.stock > 0 ? (
                <span className="text-sm text-green-400">
                  {product.stock} in stock
                </span>
              ) : (
                <span className="text-sm text-red-400">Out of stock</span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 btn-primary ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isInUserCart ? (
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    In Cart ({cartQuantity})
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                    </svg>
                    Add to Cart
                  </span>
                )}
              </motion.button>

              <motion.button
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={handleWishlistToggle}
                className={`p-3 rounded-lg transition-colors ${
                  isInUserWishlist 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill={isInUserWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="glass-card overflow-hidden"
    >
      {/* Enhanced Image Container */}
      <Link to={`/products/${productId}`} className="relative block">
        <EnhancedImage
          src={productImage}
          alt={product.name}
          className="w-full h-48"
          aspectRatio="16/9"
          priority={index < 8} // Load first 8 images immediately
          variants={imageVariants}
          whileHover="hover"
        />
        
        {/* Category Badge */}
        {product.category && (
          <motion.div 
            className="absolute top-3 left-3 badge-primary text-xs"
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
          >
            {product.category}
          </motion.div>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <motion.div 
            className="absolute top-3 right-3 badge-secondary text-xs"
            variants={badgeVariants}
            initial="hidden"
            animate="visible"
          >
            Featured
          </motion.div>
        )}

        {/* Stock Status */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/products/${productId}`}>
          <h3 className="text-lg font-semibold text-white hover:text-primary transition-colors mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {renderStars(productRating)}
          <span className="text-sm text-gray-400 ml-1">
            ({productReviews})
          </span>
        </div>

        {/* Price and Stock */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-primary">
            {formatCurrency(product.price)}
          </div>
          {product.stock > 0 && (
            <span className="text-sm text-green-400">
              {product.stock} left
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 btn-primary text-sm ${product.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isInUserCart ? (
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                In Cart
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                Add to Cart
              </span>
            )}
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleWishlistToggle}
            className={`p-2 rounded-lg transition-colors ${
              isInUserWishlist 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            <svg className="w-4 h-4" fill={isInUserWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number,
    category: PropTypes.string,
    featured: PropTypes.bool,
    image: PropTypes.string,
    imageUrl: PropTypes.string,
    images: PropTypes.array,
    img: PropTypes.string,
    rating: PropTypes.number,
    averageRating: PropTypes.number,
    reviews: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  }).isRequired,
  index: PropTypes.number,
  viewMode: PropTypes.oneOf(['grid', 'list']),
};

export default ProductCard;