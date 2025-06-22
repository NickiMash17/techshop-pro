import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth() || {};
  const { getCartCount = () => 0 } = useCart() || {};
  const { getWishlistCount = () => 0 } = useWishlist() || {};
  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header role="banner" className="sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-white/10 safe-area-top">
      <div className="container-responsive">
        <nav role="navigation" className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="text-lg sm:text-xl lg:text-2xl font-bold text-primary hover:text-primary/90 transition-colors duration-200 touch-target">
            TechShop Pro
          </Link>

          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/products" className="nav-link">Products</Link>
              {user?.isAdmin && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}
            </div>

            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className="relative p-2 sm:p-3 hover:text-primary transition-colors duration-200 touch-target"
              aria-label={`Shopping Cart with ${cartCount} items`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 sm:h-6 sm:w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Wishlist Icon */}
            <Link 
              to="/wishlist" 
              className="relative p-2 sm:p-3 hover:text-primary transition-colors duration-200 touch-target"
              aria-label={`Wishlist with ${wishlistCount} items`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 sm:h-6 sm:w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button 
                  className="flex items-center space-x-1 sm:space-x-2 p-2 sm:p-3 rounded-lg hover:bg-slate-800 transition-colors duration-200 touch-target"
                  aria-label="User menu"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden lg:block text-sm">{user.name}</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-slate-700 transition-colors duration-200">
                      Profile
                    </Link>
                    <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-slate-700 transition-colors duration-200">
                      Orders
                    </Link>
                    <hr className="my-2 border-slate-700" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link to="/login" className="px-3 py-2 text-sm hover:text-primary transition-colors duration-200 touch-target">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 bg-gradient-to-r from-primary to-secondary rounded-lg text-sm font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-105 touch-target">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 sm:p-3 rounded-lg hover:bg-slate-800 transition-colors duration-200 touch-target"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-700 bg-surface/95 backdrop-blur-xl safe-area-bottom">
          <div className="container-responsive py-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="mobile-menu-item" 
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Home</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                to="/products" 
                className="mobile-menu-item" 
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Products</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link 
                to="/wishlist" 
                className="mobile-menu-item" 
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Wishlist</span>
                <div className="flex items-center space-x-2">
                  {wishlistCount > 0 && (
                    <span className="mobile-menu-badge-red">
                      {wishlistCount > 99 ? '99+' : wishlistCount}
                    </span>
                  )}
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              <Link 
                to="/cart" 
                className="mobile-menu-item" 
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Cart</span>
                <div className="flex items-center space-x-2">
                  {cartCount > 0 && (
                    <span className="mobile-menu-badge">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
              {user?.isAdmin && (
                <Link 
                  to="/admin" 
                  className="mobile-menu-item" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Admin</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
              {!user && (
                <>
                  <hr className="my-2 border-slate-700" />
                  <Link 
                    to="/login" 
                    className="mobile-menu-item" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Login</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link 
                    to="/register" 
                    className="mobile-menu-item bg-gradient-to-r from-primary to-secondary text-white" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Sign Up</span>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </>
              )}
              {user && (
                <>
                  <hr className="my-2 border-slate-700" />
                  <Link 
                    to="/profile" 
                    className="mobile-menu-item" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Profile</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link 
                    to="/orders" 
                    className="mobile-menu-item" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>Orders</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="mobile-menu-item text-left w-full"
                  >
                    <span>Logout</span>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;