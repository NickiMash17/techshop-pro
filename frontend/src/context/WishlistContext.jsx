import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist);
        setWishlistItems(parsedWishlist);
      } catch (error) {
        console.error('Error parsing saved wishlist:', error);
        localStorage.removeItem('wishlist');
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        toast.success(`${product.name} is already in your wishlist`, {
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
      
      toast.success(`${product.name} added to wishlist`, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151',
        },
      });
      return [...prevItems, { ...product, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => {
      const item = prevItems.find(item => item.id === productId);
      if (item) {
        toast.success(`${item.name} removed from wishlist`, {
          duration: 3000,
          position: 'top-right',
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        });
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    toast.success('Wishlist cleared', {
      duration: 3000,
      position: 'top-right',
      style: {
        background: '#1f2937',
        color: '#fff',
        border: '1px solid #374151',
      },
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  const getWishlistItems = () => {
    return wishlistItems;
  };

  const moveToCart = (productId, addToCart) => {
    const item = wishlistItems.find(item => item.id === productId);
    if (item) {
      addToCart(item, 1);
      removeFromWishlist(productId);
      toast.success(`${item.name} moved to cart`, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#1f2937',
          color: '#fff',
          border: '1px solid #374151',
        },
      });
    }
  };

  const value = {
    wishlistItems,
    getWishlistCount,
    getWishlistItems,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    moveToCart
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext; 