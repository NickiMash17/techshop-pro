// Copyright (c) 2024 Nickimash17. All rights reserved.
// Trademark: "TechShop Pro" is a trademark of Nickimash17.
// This code was written by Nickimash17. Unauthorized copying or distribution is prohibited.

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'react-hot-toast';
import { formatCurrency } from '../utils/currency';
import EnhancedImage from '../components/common/EnhancedImage';
import ProductCard from '../components/products/ProductCard';
import { productsAPI } from '../utils/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Fetch real product from backend API
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getById(id);
        console.log('Product Detail API Response:', response);
        console.log('Product structure:', response.data);
        
        // Handle different image field names
        const productData = response.data;
        if (productData) {
          productData.productImage = productData.image || productData.imageUrl || productData.images?.[0] || productData.img || 
                                    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500';
          
          // Handle different rating field names
          productData.productRating = productData.rating || productData.averageRating || 0;
          
          // Handle different reviews field names
          productData.productReviews = Array.isArray(productData.reviews) ? productData.reviews.length : (productData.reviews || 0);
        }
        
        setProduct(productData);
        
        // Fetch related products
        if (productData?.category) {
          try {
            const relatedResponse = await productsAPI.getAll({ category: productData.category, limit: 4 });
            const related = Array.isArray(relatedResponse.data) ? relatedResponse.data : 
                           Array.isArray(relatedResponse.data.products) ? relatedResponse.data.products :
                           Array.isArray(relatedResponse.data.data) ? relatedResponse.data.data : [];
            setRelatedProducts(related.filter(p => p.id !== productData.id).slice(0, 4));
          } catch (error) {
            console.error('Error fetching related products:', error);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product. Please try again.');
        setLoading(false);
      }
    };

    fetchProduct();
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

  const handleWishlistToggle = () => {
    if (!product) return;
    
    if (isInWishlist(product.id || product._id)) {
      removeFromWishlist(product.id || product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const isInUserCart = product ? isInCart(product.id || product._id) : false;
  const cartQuantity = product ? getItemQuantity(product.id || product._id) : 0;
  const isInUserWishlist = product ? isInWishlist(product.id || product._id) : false;

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
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
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="container-responsive section-padding">
        <div className="space-y-8">
          {/* Breadcrumb Skeleton */}
          <div className="flex items-center space-x-2">
            <div className="h-4 bg-gray-700 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-4 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-4 animate-pulse"></div>
            <div className="h-4 bg-gray-700 rounded w-24 animate-pulse"></div>
          </div>

          {/* Product Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-700 rounded-2xl animate-pulse"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-6 bg-gray-700 rounded w-1/3 animate-pulse"></div>
              <div className="h-12 bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-responsive section-padding">
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Product Not Found</h3>
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive section-padding">
      <div className="space-y-8">
        {/* Enhanced Breadcrumb */}
        <AnimatePresence>
          <nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-400"
          >
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            {product.category && (
              <>
                <span>/</span>
                <Link to={`/products?category=${product.category}`} className="hover:text-primary transition-colors">
                  {product.category}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-white font-medium">{product.name}</span>
          </nav>
        </AnimatePresence>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <AnimatePresence>
            <div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="aspect-square glass-card overflow-hidden relative group">
                <EnhancedImage
                  src={product.productImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Wishlist Button */}
                <button
                  onClick={handleWishlistToggle}
                  className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill={isInUserWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                {/* Stock Status Badge */}
                {product.stock === 0 && (
                  <div className="absolute top-4 left-4 badge-error">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>
          </AnimatePresence>

          {/* Product Info */}
          <AnimatePresence>
            <div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              {/* Title and Category */}
              <div className="space-y-4">
                {product.category && (
                  <span className="badge-primary">
                    {product.category}
                  </span>
                )}
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {product.name}
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.productRating)}
                </div>
                <span className="text-gray-400">
                  {product.productRating.toFixed(1)} ({product.productReviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-primary">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-2xl text-gray-500 line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                      <span className="badge-success">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-400">
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
                {product.stock > 0 && product.stock <= 5 && (
                  <span className="badge-warning">Low Stock</span>
                )}
              </div>

              {/* Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center glass-card border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 hover:bg-surface/50 transition-colors text-white"
                      disabled={quantity <= 1}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="px-6 py-3 border-x border-white/10 text-white font-semibold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 hover:bg-surface/50 transition-colors text-white"
                      disabled={product.stock > 0 && quantity >= product.stock}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0 || isAdding}
                    className={`flex-1 py-4 px-8 rounded-xl font-semibold transition-all duration-300 ${
                      product.stock === 0 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : isInUserCart
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 text-white'
                    }`}
                  >
                    {isAdding ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Adding...
                      </span>
                    ) : isInUserCart ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        In Cart ({cartQuantity})
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="glass-card p-6 space-y-4">
                <h3 className="text-xl font-semibold text-white">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-white font-medium">{product.category || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">SKU:</span>
                    <span className="text-white font-medium">#{product.id || product._id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Brand:</span>
                    <span className="text-white font-medium">{product.brand || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Availability:</span>
                    <span className={`font-medium ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatePresence>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <AnimatePresence>
            <section 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">
                  Related <span className="text-gradient">Products</span>
                </h2>
                <Link 
                  to={`/products?category=${product.category}`}
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  View All →
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct, index) => (
                  <div
                    key={relatedProduct.id || relatedProduct._id || index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={relatedProduct} index={index} />
                  </div>
                ))}
              </div>
            </section>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;