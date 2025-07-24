import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import CountdownTimer from '../components/common/CountdownTimer';
import HeroSection from '../components/common/HeroSection';
import FeaturesShowcase from '../components/common/FeaturesShowcase';
import TestimonialsSection from '../components/common/TestimonialsSection';
import { formatCurrency } from '../utils/currency';
import { productsAPI } from '../utils/api';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch real featured products from backend API
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll({ limit: 4 }); // Get first 4 products as featured
        console.log('API Response:', response);
        
        // Ensure we have an array of products
        const products = Array.isArray(response.data) ? response.data : 
                        Array.isArray(response.data.products) ? response.data.products :
                        Array.isArray(response.data.data) ? response.data.data : [];
        
        console.log('Processed products:', products);
        
        // Log the first product to see its structure
        if (products.length > 0) {
          console.log('First product structure:', products[0]);
          console.log('Available keys:', Object.keys(products[0]));
          console.log('Image field:', products[0].image);
          console.log('Images field:', products[0].images);
          console.log('All product fields:', JSON.stringify(products[0], null, 2));
        }
        
        setFeaturedProducts(products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setFeaturedProducts([]); // Set empty array on error
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    {
      id: 1,
      name: 'Laptops',
      icon: '💻',
      count: 24,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Smartphones',
      icon: '📱',
      count: 18,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      name: 'Audio',
      icon: '🎧',
      count: 12,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 4,
      name: 'Accessories',
      icon: '⌚',
      count: 30,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const specialOffers = [
    {
      id: 'offer1',
      title: 'Summer Sale',
      discount: '20% OFF',
      description: 'On all premium headphones',
      bgColor: 'from-blue-500/20 to-purple-500/20',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      endTime: new Date().getTime() + 48 * 60 * 60 * 1000 // 48 hours
    },
    {
      id: 'offer2',
      title: 'New Arrival',
      discount: '10% OFF',
      description: 'Latest gaming accessories',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300',
      endTime: new Date().getTime() + 24 * 60 * 60 * 1000 // 24 hours
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

  return (
    <>
      <Helmet>
        <title>TechShop Pro | Next-Gen Tech at Your Fingertips</title>
        <meta name="description" content="Discover premium tech products, exclusive deals, and lightning-fast delivery at TechShop Pro." />
        {/* Open Graph tags */}
        <meta property="og:title" content="TechShop Pro | Next-Gen Tech at Your Fingertips" />
        <meta property="og:description" content="Discover premium tech products, exclusive deals, and lightning-fast delivery at TechShop Pro." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800" />
        <meta property="og:type" content="website" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TechShop Pro | Next-Gen Tech at Your Fingertips" />
        <meta name="twitter:description" content="Discover premium tech products, exclusive deals, and lightning-fast delivery at TechShop Pro." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800" />
      </Helmet>
      <div className="space-y-0">
        {/* Hero Section */}
        <HeroSection onSearch={handleSearch} />

        {/* Search Bar */}
        <section className="py-8 bg-gradient-to-br from-surface/30 to-surface/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full px-6 py-4 pl-14 bg-surface/50 backdrop-blur-sm rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary border border-white/10 text-lg"
                />
                <svg
                  className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
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
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Limited Time{" "}
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  Offers
                </span>
              </h2>
              <p className="text-xl text-gray-400">Don't miss out on these exclusive deals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {specialOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br backdrop-blur-xl hover:scale-[1.02] transition-all duration-500 block"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${offer.bgColor} opacity-60`} />
                  <div className="relative z-10 p-8 md:p-10 flex justify-between items-center">
                    <div className="space-y-4">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {offer.title}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white">{offer.discount}</h3>
                      <p className="text-lg text-gray-300">{offer.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span>Ends in:</span>
                        <CountdownTimer endTime={offer.endTime} />
                      </div>
                      <button className="mt-4 px-6 py-3 bg-white/10 rounded-xl text-sm font-medium hover:bg-white/20 transition-colors">
                        Shop Now
                      </button>
                    </div>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-2xl transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gradient-to-br from-surface/20 to-surface/10">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Browse{" "}
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  Categories
                </span>
              </h2>
              <p className="text-xl text-gray-400">Explore our wide range of tech products</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="group glass-card p-8 text-center hover:bg-surface/70 transition-all duration-500 block"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-400">{category.count} Products</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Deals Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Trending{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                    Deals
                  </span>
                </h2>
                <p className="text-xl text-gray-400">Hottest products with amazing discounts</p>
              </div>
              <Link 
                to="/products?sort=trending" 
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {trendingDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="group glass-card overflow-hidden"
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <CountdownTimer endTime={deal.endTime} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold text-white mb-4">{deal.name}</h3>
                    <div className="flex items-baseline space-x-4 mb-6">
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(deal.price)}
                      </span>
                      {deal.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {formatCurrency(deal.originalPrice)}
                        </span>
                      )}
                      <span className="text-sm text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
                        {Math.round((1 - deal.price / deal.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                    <button className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold hover:scale-105 transition-all duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Showcase */}
        <FeaturesShowcase />

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Featured{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                    Products
                  </span>
                </h2>
                <p className="text-xl text-gray-400">Handpicked products for you</p>
              </div>
              <Link 
                to="/products" 
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                Array(4).fill(null).map((_, idx) => (
                  <div 
                    key={idx} 
                    className="glass-card h-[400px] animate-pulse"
                  >
                    <div className="h-48 bg-slate-700/50 rounded-t-xl" />
                    <div className="p-6 space-y-4">
                      <div className="h-4 bg-slate-700/50 rounded w-3/4" />
                      <div className="h-4 bg-slate-700/50 rounded w-1/2" />
                      <div className="h-8 bg-slate-700/50 rounded w-1/3" />
                    </div>
                  </div>
                ))
              ) : (
                Array.isArray(featuredProducts) && featuredProducts.map((product) => (
                  <div
                    key={product.id || product._id}
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-3xl glass-card p-8 md:p-12 max-w-4xl mx-auto">
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Stay Updated with Latest{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                    Tech
                  </span>
                </h2>
                <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter and get exclusive deals, new product alerts, and tech news delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-6 py-4 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary border border-white/20 text-white placeholder:text-gray-400"
                  />
                  <button
                    type="submit"
                    disabled={subscribeStatus === 'loading'}
                    className={`px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-xl font-semibold 
                      hover:scale-105 transition-all duration-300 whitespace-nowrap
                      ${subscribeStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {subscribeStatus === 'loading' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Subscribing...
                      </span>
                    ) : subscribeStatus === 'success' ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <p
                    className="mt-4 text-green-400 text-sm"
                  >
                    Thank you for subscribing! Check your email for confirmation.
                  </p>
                )}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
