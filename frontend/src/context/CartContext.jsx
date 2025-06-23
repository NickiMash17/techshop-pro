import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage and update totals whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const price = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setTotalItems(total);
    setTotalPrice(price);
  }, [cartItems]);

  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared', {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#1f2937',
        color: '#fff',
        border: '1px solid #374151',
      },
    });
  };

  const addToCart = (product, quantity = 1) => {
    console.log('addToCart called with:', product.name, 'quantity:', quantity);
    setCartItems(prevItems => {
      // Handle both id and _id fields
      const productId = product.id || product._id;
      const existingItem = prevItems.find(item => (item.id || item._id) === productId);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > (product.stock || 999)) {
          toast.error(`Only ${product.stock} items available in stock`, {
            duration: 3000,
            position: 'top-right',
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
            },
          });
          return prevItems;
        }
        
        toast.success(`Updated ${product.name} quantity`, {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        });
        return prevItems.map(item =>
          (item.id || item._id) === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      
      if (quantity > (product.stock || 999)) {
        toast.error(`Only ${product.stock} items available in stock`, {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        });
        return prevItems;
      }
      
      toast.success(`${product.name} added to cart`, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151',
        },
      });
      return [...prevItems, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => (item.id || item._id) === productId);
      if (item) {
        toast.success(`${item.name} removed from cart`, {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        });
      }
      return prevItems.filter(item => (item.id || item._id) !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const item = prevItems.find(item => (item.id || item._id) === productId);
      if (item && newQuantity > (item.stock || 999)) {
        toast.error(`Only ${item.stock} items available in stock`, {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        });
        return prevItems;
      }
      
      return prevItems.map(item =>
        (item.id || item._id) === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  const getCartCount = () => {
    return totalItems;
  };

  const getCartTotal = () => {
    return totalPrice;
  };

  const getCartItems = () => {
    return cartItems;
  };

  const isInCart = (productId) => {
    return cartItems.some(item => (item.id || item._id) === productId);
  };

  const getItemQuantity = (productId) => {
    const item = cartItems.find(item => (item.id || item._id) === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    cartItems,
    totalItems,
    totalPrice,
    getCartCount,
    getCartTotal,
    getCartItems,
    isInCart,
    getItemQuantity,
    clearCart,
    addToCart,
    removeFromCart,
    updateQuantity
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;