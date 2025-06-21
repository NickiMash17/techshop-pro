import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import CountdownTimer from '../components/common/CountdownTimer';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call with mock data
    const mockProducts = [
      {
        id: '1',
        name: 'Premium Wireless Headphones',
        description: 'High-quality sound with noise cancellation',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
      },
      {
        id: '2',
        name: 'Smart Watch Pro',
        description: 'Track your fitness and stay connected',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
      },
      {
        id: '3',
        name: 'Wireless Gaming Mouse',
        description: 'Precision control for professional gaming',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'
      },
      {
        id: '4',
        name: 'Ultra HD Webcam',
        description: 'Crystal clear video calls and streaming',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500'
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setFeaturedProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  const categories = [
    {
      id: 1,
      name: 'Laptops',
      icon: '💻',
      count: 24
    },
    {
      id: 2,
      name: 'Smartphones',
      icon: '📱',
      count: 18
    },
    {
      id: 3,
      name: 'Audio',
      icon: '🎧',
      count: 12
    },
    {
      id: 4,
      name: 'Accessories',
      icon: '⌚',
      count: 30
    }
  ];

  const specialOffers = [
    {
      id: 'offer1',
      title: 'Summer Sale',
      discount: '20% OFF',
      description: 'On all premium headphones',
      bgColor: 'from-blue-500/20 to-purple-500/20',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300'
    },
    {
      id: 'offer2',
      title: 'New Arrival',
      discount: '10% OFF',
      description: 'Latest gaming accessories',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300'
    }
  ];

  const trendingDeals = [
    {
      id: 'trend1',
      name: 'Gaming Laptop Pro',
      price: 1299.99,
      originalPrice: 1499.99,
      image: 'https://images.unsplash.com/photo-1605134513573-384dcf99a44c?w=500',
      endTime: new Date().getTime() + 24 * 60 * 60 * 1000 // 24 hours from now
    },
    {
      id: 'trend2',
      name: 'Noise-Canceling Earbuds',
      price: 149.99,
      originalPrice: 199.99,
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
      endTime: new Date().getTime() + 12 * 60 * 60 * 1000 // 12 hours from now
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setSubscribeStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
      // Reset status after 3 seconds
      setTimeout(() => setSubscribeStatus(''), 3000);
    }, 1000);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero Section - Add motion */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-xl"
      >
        <div className="relative z-10 px-6 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
              Next-Gen Tech
            </span>
            <br />
            <span className="text-white">at Your Fingertips</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            Discover premium tech products with exclusive deals and lightning-fast delivery.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/products"
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium hover:opacity-90 transition-all duration-200 transform hover:scale-105"
            >
              Explore Products
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/20 rounded-full blur-3xl" />
        </div>
      </motion.div>

      {/* Search Bar - Add this after the hero section */}
      <div className="max-w-2xl mx-auto px-4">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="w-full px-4 py-3 pl-12 bg-surface/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>
      </div>

      {/* Special Offers Section - Add this before featured products */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Special Offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialOffers.map((offer) => (
            <Link
              key={offer.id}
              to="/products"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br backdrop-blur-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${offer.bgColor} opacity-60`} />
              <div className="relative z-10 p-6 md:p-8 flex justify-between items-center">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-primary">{offer.title}</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">{offer.discount}</h3>
                  <p className="text-sm text-gray-300">{offer.description}</p>
                  <button className="mt-4 px-4 py-2 bg-white/10 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors">
                    Shop Now
                  </button>
                </div>
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg transform group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Deals Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Trending Deals</h2>
          <Link 
            to="/products?sort=trending" 
            className="text-primary hover:text-primary/80 transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingDeals.map((deal) => (
            <div
              key={deal.id}
              className="group bg-surface/50 backdrop-blur-sm rounded-xl overflow-hidden"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <CountdownTimer endTime={deal.endTime} />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">{deal.name}</h3>
                <div className="mt-2 flex items-baseline space-x-3">
                  <span className="text-2xl font-bold text-primary">
                    ${deal.price}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${deal.originalPrice}
                  </span>
                  <span className="text-sm text-green-500">
                    {Math.round((1 - deal.price / deal.originalPrice) * 100)}% OFF
                  </span>
                </div>
                <button className="mt-4 w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium hover:opacity-90 transition-opacity">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Featured Products</h2>
          <Link 
            to="/products" 
            className="text-primary hover:text-primary/80 transition-colors"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            Array(4).fill(null).map((_, index) => (
              <div 
                key={index} 
                className="bg-surface/50 rounded-xl h-[300px] animate-pulse"
              >
                <div className="h-48 bg-slate-700/50 rounded-t-xl" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-slate-700/50 rounded w-3/4" />
                  <div className="h-4 bg-slate-700/50 rounded w-1/2" />
                </div>
              </div>
            ))
          ) : (
            featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </motion.div>

      {/* Categories Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="group bg-surface/50 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-surface/70 transition-all duration-300 hover:scale-105"
            >
              <span className="text-4xl mb-4 block">{category.icon}</span>
              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
              <p className="text-sm text-gray-400">{category.count} Products</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-xl p-8 md:p-12"
      >
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stay Updated with Latest Tech
          </h2>
          <p className="text-gray-400 mb-6">
            Subscribe to our newsletter and get exclusive deals, new product alerts, and tech news.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={subscribeStatus === 'loading'}
              className={`px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium 
                hover:opacity-90 transition-all duration-200 whitespace-nowrap
                ${subscribeStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {subscribeStatus === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Subscribing...
                </span>
              ) : subscribeStatus === 'success' ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Subscribed!
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          {subscribeStatus === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-green-500 text-sm"
            >
              Thank you for subscribing! Check your email for confirmation.
            </motion.p>
          )}
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group bg-surface/50 backdrop-blur-sm rounded-xl p-6 space-y-4 hover:bg-surface/70 transition-colors">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Fast Delivery</h3>
          <p className="text-gray-400">Get your products delivered at your doorstep within 24 hours.</p>
        </div>
        <div className="group bg-surface/50 backdrop-blur-sm rounded-xl p-6 space-y-4 hover:bg-surface/70 transition-colors">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18M3 12h18M3 21h18" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Best Prices</h3>
          <p className="text-gray-400">We offer the most competitive prices on the market.</p>
        </div>
        <div className="group bg-surface/50 backdrop-blur-sm rounded-xl p-6 space-y-4 hover:bg-surface/70 transition-colors">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v8m4-4H8" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold">Wide Selection</h3>
          <p className="text-gray-400">Choose from a vast array of products across all categories.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
