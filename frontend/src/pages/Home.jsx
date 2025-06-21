import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "MacBook Pro M3",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    category: "Laptops",
    rating: 4.9
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500",
    category: "Smartphones",
    rating: 4.8
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500",
    category: "Audio",
    rating: 4.7
  }
];

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setFeaturedProducts(FEATURED_PRODUCTS);
        setIsLoading(false);
      } catch (err) {
        setError(`Failed to load products: ${err.message}`);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-500 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-cyan-900/20">
          {/* ✅ Escaped SVG background */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40" />
        </div>

        {/* Floating Elements (make sure you have animation classes defined!) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-sm animate-ping"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-sm animate-ping delay-200"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-sm animate-ping delay-500"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent animate-pulse">
            TechShop Pro
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover the latest in cutting-edge technology. Premium devices, unbeatable prices, lightning-fast delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/products"
              className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex items-center">
                Shop Now
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              to="/products"
              className="px-8 py-4 border-2 border-slate-600 rounded-full text-lg font-semibold hover:border-purple-500 hover:text-purple-400 transition-all duration-300 transform hover:scale-105"
            >
              Browse Catalog
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">10k+</div>
              <div className="text-slate-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">500+</div>
              <div className="text-slate-400">Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">24/7</div>
              <div className="text-slate-400">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">99%</div>
              <div className="text-slate-400">Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Handpicked selection of the most innovative and popular tech products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {isLoading ? (
              Array(3).fill(null).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-slate-800 rounded-2xl h-80"></div>
                </div>
              ))
            ) : (
              featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="transition-opacity duration-500"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* You can continue with the Features section (no changes needed unless animation classes are missing) */}
    </div>
  );
};

export default Home;
