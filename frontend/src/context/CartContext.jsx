import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    try {
      // Get cart based on user ID or guest cart
      const cartKey = user?.id ? `cart_${user.id}` : 'guest_cart';
      const saved = localStorage.getItem(cartKey);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      return [];
    }
  });

  // Update cart in localStorage whenever it changes or user changes
  useEffect(() => {
    try {
      const cartKey = user?.id ? `cart_${user.id}` : 'guest_cart';
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems, user]);

  // Handle cart migration when user logs in
  useEffect(() => {
    if (user?.id) {
      try {
        // Get guest cart
        const guestCart = localStorage.getItem('guest_cart');
        if (guestCart) {
          const parsedGuestCart = JSON.parse(guestCart);
          if (parsedGuestCart.length > 0) {
            // Merge guest cart with user cart
            setCartItems(prev => [...prev, ...parsedGuestCart]);
            // Clear guest cart
            localStorage.removeItem('guest_cart');
          }
        }
      } catch (error) {
        console.error('Error migrating cart:', error);
      }
    }
  }, [user]);

  const addToCart = (product, quantity = 1) => {
    if (!product?.id) return;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        const updated = prev.map(item => 
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        toast.success('Cart updated');
        return updated;
      }
      
      toast.success('Added to cart');
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartCount,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;