import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth() || {};
  const { getCartCount = () => 0 } = useCart() || {};
  const cartCount = getCartCount();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-surface/95 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20' 
          : 'bg-surface/50 backdrop-blur-lg border-b border-white/5'
      }`}
    >
      <div className="container-responsive">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Link to="/" className="text-2xl font-bold text-gradient hover:opacity-90 transition-all duration-300 relative">
              TechShop Pro
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.2 }}
              />
            </Link>
          </motion.div>

          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { path: '/', label: 'Home' },
                { path: '/products', label: 'Products' },
                ...(user?.role === 'admin' ? [{ path: '/admin', label: 'Admin' }] : [])
              ].map((item) => (
                <motion.div
                  key={item.path}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="relative"
                >
                  <Link 
                    to={item.path} 
                    className={`nav-link ${isActive(item.path) ? 'text-primary' : ''} relative group`}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                        layoutId="activeTab"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Cart Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative group"
            >
              <Link 
                to="/cart" 
                className="relative p-2 hover:text-primary transition-all duration-300 group"
                aria-label={`Shopping Cart with ${cartCount} items`}
              >
                <div className="relative">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" 
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
                    <motion.span 
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="absolute -top-1 -right-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-glow shadow-lg"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </div>
              </Link>
            </motion.div>

            {/* User Menu */}
            {user ? (
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.05 }}
              >
                <button 
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300 group"
                  aria-label="User menu"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300">
                    <span className="text-white text-sm font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm group-hover:text-primary transition-colors">
                    {user.name}
                  </span>
                  <motion.svg 
                    className="w-4 h-4 transition-transform group-hover:rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: isMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                
                {/* Dropdown Menu */}
                <AnimatePresence>
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 glass-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl"
                  >
                    <div className="py-2">
                      <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-slate-700/50 transition-all duration-200 rounded-lg mx-2 link-hover">
                        Profile
                      </Link>
                      <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-slate-700/50 transition-all duration-200 rounded-lg mx-2 link-hover">
                        Orders
                      </Link>
                      <hr className="my-2 border-slate-700/50" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700/50 transition-all duration-200 rounded-lg mx-2 link-hover"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/login" className="px-4 py-2 text-sm hover:text-primary transition-all duration-300 link-hover">
                    Login
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/register" className="btn-primary text-sm">
                    Sign Up
                  </Link>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-slate-700/50"
          >
            <div className="flex flex-col space-y-2 pt-4">
              {[
                { path: '/', label: 'Home' },
                { path: '/products', label: 'Products' },
                ...(user?.role === 'admin' ? [{ path: '/admin', label: 'Admin' }] : [])
              ].map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={item.path} 
                    className={`nav-link-mobile ${isActive(item.path) ? 'bg-primary/20 text-primary' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;