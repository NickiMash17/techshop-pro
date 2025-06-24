import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import toast from 'react-hot-toast';
import { formatCurrency } from '../../utils/currency';
import EnhancedImage from '../common/EnhancedImage';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isClearing, setIsClearing] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 50 ? 0 : 5.99; // Free shipping over $50
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleMoveToWishlist = (item) => {
    if (!isInWishlist(item.id || item._id)) {
      addToWishlist(item);
      removeFromCart(item.id || item._id);
      toast.success(`${item.name} moved to wishlist`);
    } else {
      toast.error('Item already in wishlist');
    }
  };

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      clearCart();
      toast.success('Cart cleared');
      setIsClearing(false);
    }, 500);
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout clicked');
    console.log('Current user:', user);
    if (!user) {
      // User is not logged in, redirect to login with checkout as destination
      navigate('/login', { state: { from: '/checkout' } });
      toast.info('Please log in to proceed to checkout');
    } else {
      // User is logged in, proceed to checkout
      navigate('/checkout');
    }
  };

  // Debug log for cartItems
  console.log('DEBUG: cartItems:', cartItems);
  if (!Array.isArray(cartItems) || cartItems.some(item => !item || typeof item !== 'object')) {
    return (
      <div className="container-responsive section-padding">
        <div className="text-center py-16">
          <h2 className="text-3xl font-bold mb-4 text-red-500">Cart Data Error</h2>
          <p className="text-gray-400 mb-8 text-lg">There is a problem with your cart data. Please refresh the page or contact support.</p>
          <pre className="bg-surface/80 text-white p-4 rounded-lg overflow-x-auto text-left text-xs max-w-xl mx-auto">
            {JSON.stringify(cartItems, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  if (!cartItems?.length) {
    return (
      <div className="container-responsive section-padding">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-32 h-32 mx-auto mb-8 bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">Your cart is empty</h2>
          <p className="text-gray-400 mb-8 text-lg">Looks like you haven't added any items to your cart yet.</p>
          <Link 
            to="/products" 
            className="btn-primary inline-flex items-center gap-3 text-lg px-8 py-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-responsive section-padding">
      <div className="space-y-8">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
            <p className="text-gray-400">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearCart}
            disabled={isClearing}
            className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
          >
            {isClearing ? 'Clearing...' : 'Clear Cart'}
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enhanced Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id || item._id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl"
                >
                  <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div className="relative">
                      <EnhancedImage
                        src={item.image || item.imageUrl || item.images?.[0]} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      {item.stock === 0 && (
                        <div className="absolute inset-0 bg-red-500/20 rounded-xl flex items-center justify-center">
                          <span className="text-xs text-red-400 font-medium">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-3">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{item.name}</h3>
                        <p className="text-gray-400 text-sm">{item.category}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold text-primary">
                          {formatCurrency(item.price)}
                        </span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-gray-500 line-through">
                            {formatCurrency(item.originalPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center glass-card border border-white/10 rounded-xl overflow-hidden">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              const newQuantity = Math.max(1, item.quantity - 1);
                              updateQuantity(item.id || item._id, newQuantity);
                              toast.success(`Quantity updated to ${newQuantity}`);
                            }}
                            className="px-4 py-2 hover:bg-surface/50 transition-colors text-white"
                            disabled={item.quantity <= 1}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </motion.button>
                          <span className="px-6 py-2 border-x border-white/10 text-white font-semibold min-w-[50px] text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              const newQuantity = item.quantity + 1;
                              updateQuantity(item.id || item._id, newQuantity);
                              toast.success(`Quantity updated to ${newQuantity}`);
                            }}
                            className="px-4 py-2 hover:bg-surface/50 transition-colors text-white"
                            disabled={item.stock > 0 && item.quantity >= item.stock}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </motion.button>
                        </div>

                        <span className="text-gray-400 text-sm">
                          {item.stock > 0 ? `${item.stock} in stock` : 'Out of stock'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="text-right space-y-4">
                      <div>
                        <p className="text-2xl font-bold text-white">
                          {formatCurrency((item.price * item.quantity).toFixed(2))}
                        </p>
                        <p className="text-sm text-gray-400">
                          {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleMoveToWishlist(item)}
                          className="px-3 py-2 text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                        >
                          Move to Wishlist
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            removeFromCart(item.id || item._id);
                            toast.success(`${item.name} removed from cart`);
                          }}
                          className="px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          Remove
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Enhanced Cart Summary */}
          <div className="lg:col-span-1">
            <div 
              className="glass-card p-6 rounded-2xl sticky top-24"
              style={{ pointerEvents: 'auto', zIndex: 1 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-white">
                  <span>Subtotal</span>
                  <span>{formatCurrency(calculateSubtotal().toFixed(2))}</span>
                </div>
                
                <div className="flex justify-between text-gray-400">
                  <span>Tax (8%)</span>
                  <span>{formatCurrency(calculateTax().toFixed(2))}</span>
                </div>
                
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={calculateShipping() === 0 ? 'text-green-400' : ''}>
                    {calculateShipping() === 0 ? 'Free' : formatCurrency(calculateShipping().toFixed(2))}
                  </span>
                </div>

                {calculateShipping() > 0 && (
                  <div className="text-sm text-green-400 bg-green-400/10 p-3 rounded-lg">
                    Add {formatCurrency((50 - calculateSubtotal()).toFixed(2))} more for free shipping!
                  </div>
                )}

                <div className="border-t border-gray-700 my-4"></div>
                
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span>{formatCurrency(calculateTotal().toFixed(2))}</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <button
                  onClick={handleCheckout}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 text-white"
                  style={{ pointerEvents: 'auto', zIndex: 1 }}
                >
                  {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                </button>
                <Link 
                  to="/products" 
                  className="text-primary hover:text-primary/80 transition-colors font-medium text-center"
                  style={{ pointerEvents: 'auto', zIndex: 1 }}
                >
                  Continue Shopping →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;