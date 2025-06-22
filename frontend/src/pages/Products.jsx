import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/products/ProductCard';
import VirtualProductGrid from '../components/products/VirtualProductGrid';
import ProductComparison from '../components/products/ProductComparison';
import PerformanceMonitor from '../components/common/PerformanceMonitor';
import AdvancedSearchBar from '../components/search/AdvancedSearchBar';
import AdvancedFilters from '../components/filters/AdvancedFilters';
import { toast } from 'react-hot-toast';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality sound with noise cancellation',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Audio',
    stock: 15,
    rating: 4.8,
    reviews: 124
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Track your fitness and stay connected',
    price: 299.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Wearables',
    stock: 8,
    rating: 4.6,
    reviews: 89
  },
  {
    id: '3',
    name: 'Wireless Gaming Mouse',
    description: 'Precision control for professional gaming',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    category: 'Gaming',
    stock: 25,
    rating: 4.9,
    reviews: 203
  },
  {
    id: '4',
    name: 'Ultra HD Webcam',
    description: 'Crystal clear video calls and streaming',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500',
    category: 'Video',
    stock: 12,
    rating: 4.7,
    reviews: 156
  },
  {
    id: '5',
    name: 'Mechanical Keyboard',
    description: 'Premium typing experience with RGB lighting',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
    category: 'Accessories',
    stock: 20,
    rating: 4.5,
    reviews: 98
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=500',
    category: 'Audio',
    stock: 30,
    rating: 4.4,
    reviews: 167
  },
  {
    id: '7',
    name: 'Portable SSD',
    description: 'Ultra-fast external storage for your data',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&auto=format&fit=crop&q=80',
    category: 'Storage',
    stock: 18,
    rating: 4.8,
    reviews: 134
  },
  {
    id: '8',
    name: 'Gaming Headset',
    description: 'Immersive gaming audio with microphone',
    price: 119.99,
    originalPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Gaming',
    stock: 22,
    rating: 4.6,
    reviews: 112
  },
  {
    id: '9',
    name: '4K Monitor',
    description: 'Ultra-high definition display for professionals',
    price: 399.99,
    originalPrice: 499.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    category: 'Displays',
    stock: 10,
    rating: 4.9,
    reviews: 78
  },
  {
    id: '10',
    name: 'Wireless Charger',
    description: 'Fast wireless charging for all devices',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Accessories',
    stock: 35,
    rating: 4.3,
    reviews: 89
  },
  // Additional products for virtual scrolling demo
  {
    id: '11',
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with 360-degree sound',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Audio',
    stock: 28,
    rating: 4.5,
    reviews: 156
  },
  {
    id: '12',
    name: 'Fitness Tracker',
    description: 'Monitor your health and activity levels',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
    category: 'Wearables',
    stock: 42,
    rating: 4.4,
    reviews: 203
  },
  {
    id: '13',
    name: 'Gaming Controller',
    description: 'Ergonomic controller for console gaming',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=500',
    category: 'Gaming',
    stock: 31,
    rating: 4.7,
    reviews: 178
  },
  {
    id: '14',
    name: 'USB-C Hub',
    description: 'Expand your connectivity options',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Accessories',
    stock: 55,
    rating: 4.2,
    reviews: 92
  },
  {
    id: '15',
    name: 'External Hard Drive',
    description: 'Reliable storage for your important files',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Storage',
    stock: 24,
    rating: 4.6,
    reviews: 145
  },
  {
    id: '16',
    name: 'Curved Gaming Monitor',
    description: 'Immersive gaming experience with curved display',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500',
    category: 'Displays',
    stock: 16,
    rating: 4.8,
    reviews: 87
  },
  {
    id: '17',
    name: 'Wireless Keyboard',
    description: 'Slim and responsive wireless keyboard',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500',
    category: 'Accessories',
    stock: 38,
    rating: 4.3,
    reviews: 134
  },
  {
    id: '18',
    name: 'Studio Headphones',
    description: 'Professional-grade audio monitoring',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Audio',
    stock: 12,
    rating: 4.9,
    reviews: 67
  },
  {
    id: '19',
    name: 'Smart Ring',
    description: 'Discrete health and activity tracking',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
    category: 'Wearables',
    stock: 8,
    rating: 4.5,
    reviews: 43
  },
  {
    id: '20',
    name: 'Gaming Mouse Pad',
    description: 'Large surface for precise mouse control',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
    category: 'Gaming',
    stock: 67,
    rating: 4.1,
    reviews: 89
  },
  {
    id: '21',
    name: 'Laptop Stand',
    description: 'Ergonomic laptop positioning',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Accessories',
    stock: 45,
    rating: 4.4,
    reviews: 112
  },
  {
    id: '22',
    name: 'Microphone',
    description: 'Professional streaming and recording',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500',
    category: 'Audio',
    stock: 19,
    rating: 4.7,
    reviews: 156
  },
  {
    id: '23',
    name: 'Gaming Chair',
    description: 'Comfortable seating for long gaming sessions',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Gaming',
    stock: 14,
    rating: 4.6,
    reviews: 78
  },
  {
    id: '24',
    name: 'Tablet Stand',
    description: 'Adjustable stand for tablets and phones',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Accessories',
    stock: 52,
    rating: 4.2,
    reviews: 95
  },
  {
    id: '25',
    name: 'Wireless Presenter',
    description: 'Control presentations from anywhere',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Accessories',
    stock: 29,
    rating: 4.3,
    reviews: 67
  },
  {
    id: '26',
    name: 'Gaming Glasses',
    description: 'Reduce eye strain during gaming',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Gaming',
    stock: 23,
    rating: 4.4,
    reviews: 89
  },
  {
    id: '27',
    name: 'USB Microphone',
    description: 'Plug-and-play audio recording',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?w=500',
    category: 'Audio',
    stock: 36,
    rating: 4.5,
    reviews: 123
  },
  {
    id: '28',
    name: 'Smart Scale',
    description: 'Track your weight and body composition',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
    category: 'Wearables',
    stock: 18,
    rating: 4.6,
    reviews: 234
  },
  {
    id: '29',
    name: 'Gaming Desk',
    description: 'Spacious desk for gaming setup',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Gaming',
    stock: 9,
    rating: 4.8,
    reviews: 45
  },
  {
    id: '30',
    name: 'Cable Organizer',
    description: 'Keep your cables neat and organized',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500',
    category: 'Accessories',
    stock: 78,
    rating: 4.1,
    reviews: 156
  }
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    categories: [],
    brands: [],
    ratings: [],
    inStock: false,
    onSale: false,
    sortBy: 'relevance'
  });
  const [viewMode, setViewMode] = useState('grid');
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [useVirtualScroll, setUseVirtualScroll] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    totalItems: 0,
    visibleItems: 0,
    renderRatio: 0,
    scrollPercentage: 0,
    isScrolledToBottom: false
  });

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setLoading(false);
    }, 500);
  }, []);

  // Filter and sort products with advanced filtering
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
        filters.categories.includes(product.category);
      
      // Brand filter
      const productBrand = product.brand || product.name.split(' ')[0];
      const matchesBrand = filters.brands.length === 0 || 
        filters.brands.includes(productBrand);
      
      // Price filter
      const matchesPrice = product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1];
      
      // Rating filter
      const matchesRating = filters.ratings.length === 0 || 
        filters.ratings.some(rating => product.rating >= rating);
      
      // Stock filter
      const matchesStock = !filters.inStock || product.stock > 0;
      
      // Sale filter
      const matchesSale = !filters.onSale || product.originalPrice;
      
      return matchesSearch && matchesCategory && matchesBrand && 
             matchesPrice && matchesRating && matchesStock && matchesSale;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'relevance':
        default:
          // Relevance sorting based on search query
          if (searchQuery) {
            const queryLower = searchQuery.toLowerCase();
            const aRelevance = a.name.toLowerCase().includes(queryLower) ? 3 : 
                              a.description.toLowerCase().includes(queryLower) ? 2 : 1;
            const bRelevance = b.name.toLowerCase().includes(queryLower) ? 3 : 
                              b.description.toLowerCase().includes(queryLower) ? 2 : 1;
            return bRelevance - aRelevance;
          }
          return 0;
      }
    });

    return filtered;
  }, [products, searchQuery, filters]);

  // Enable virtual scrolling for large lists
  useEffect(() => {
    setUseVirtualScroll(filteredAndSortedProducts.length > 20);
  }, [filteredAndSortedProducts.length]);

  // Update performance metrics when virtual scrolling is used
  useEffect(() => {
    if (useVirtualScroll) {
      setPerformanceMetrics({
        totalItems: filteredAndSortedProducts.length,
        visibleItems: Math.min(20, filteredAndSortedProducts.length),
        renderRatio: Math.min(20, filteredAndSortedProducts.length) / filteredAndSortedProducts.length,
        scrollPercentage: 0,
        isScrolledToBottom: false
      });
    }
  }, [useVirtualScroll, filteredAndSortedProducts.length]);

  // Handle search
  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion) => {
    setSearchQuery(suggestion);
  }, []);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const handleAddToComparison = (product) => {
    if (selectedForComparison.length >= 3) {
      toast.error('Maximum 3 products can be compared at once');
      return;
    }
    if (!selectedForComparison.find(p => p.id === product.id)) {
      setSelectedForComparison(prev => [...prev, product]);
    }
  };

  const handleRemoveFromComparison = (productId) => {
    setSelectedForComparison(prev => prev.filter(p => p.id !== productId));
  };

  const openComparison = () => {
    setIsComparisonOpen(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (loading) {
    return (
      <div className="container-responsive section-padding">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive section-padding">
      <div className="space-y-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white">Our Products</h1>
            <p className="text-gray-400 mt-2">
              Discover {filteredAndSortedProducts.length} amazing products
              {useVirtualScroll && (
                <span className="ml-2 text-primary text-sm">
                  (Virtual scrolling enabled for performance)
                </span>
              )}
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            {/* Comparison Button */}
            {selectedForComparison.length > 0 && (
              <button
                onClick={openComparison}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Compare ({selectedForComparison.length})
              </button>
            )}
            
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface/50 text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-primary text-white' 
                  : 'bg-surface/50 text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Advanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Advanced Search Bar */}
          <AdvancedSearchBar
            products={products}
            onSearch={handleSearch}
            onSuggestionSelect={handleSuggestionSelect}
            placeholder="Search products, categories, or brands..."
            className="w-full"
          />

          {/* Advanced Filters */}
          <AdvancedFilters
            products={products}
            onFiltersChange={handleFiltersChange}
            className="w-full"
          />
        </motion.div>

        {/* Products Grid/List */}
        <AnimatePresence mode="wait">
          {filteredAndSortedProducts.length > 0 ? (
            viewMode === 'grid' && useVirtualScroll ? (
              // Virtual scrolling for large lists
              <VirtualProductGrid
                products={filteredAndSortedProducts}
                containerHeight={600}
                itemsPerRow={4}
                itemHeight={450}
                className="min-h-[600px]"
              />
            ) : (
              // Regular grid/list for smaller lists
              <motion.div
                key={viewMode}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={
                  viewMode === 'grid'
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredAndSortedProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index}
                    viewMode={viewMode}
                  />
                ))}
              </motion.div>
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 text-lg">No products found</div>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Product Comparison Modal */}
      <ProductComparison
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        products={selectedForComparison}
      />

      {/* Performance Monitor */}
      {useVirtualScroll && (
        <PerformanceMonitor
          totalItems={performanceMetrics.totalItems}
          visibleItems={performanceMetrics.visibleItems}
          renderRatio={performanceMetrics.renderRatio}
          scrollPercentage={performanceMetrics.scrollPercentage}
          isScrolledToBottom={performanceMetrics.isScrolledToBottom}
        />
      )}
    </div>
  );
};

export default Products;