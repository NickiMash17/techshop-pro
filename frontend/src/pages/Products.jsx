import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import VirtualProductGrid from '../components/products/VirtualProductGrid';
import ProductComparison from '../components/products/ProductComparison';
import PerformanceMonitor from '../components/common/PerformanceMonitor';
import AdvancedSearchBar from '../components/search/AdvancedSearchBar';
import AdvancedFilters from '../components/filters/AdvancedFilters';
import { productsAPI } from '../utils/api';
import { toast } from 'react-hot-toast';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priceRange: [0, 3000],
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

  // Handle URL parameters on component mount and URL changes
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (category) {
      setFilters(prev => ({
        ...prev,
        categories: [category]
      }));
    }
    
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  // Update URL when filters or search change
  useEffect(() => {
    const newSearchParams = new URLSearchParams();
    
    if (filters.categories.length > 0) {
      newSearchParams.set('category', filters.categories[0]);
    }
    
    if (searchQuery) {
      newSearchParams.set('search', searchQuery);
    }
    
    setSearchParams(newSearchParams, { replace: true });
  }, [filters.categories, searchQuery, setSearchParams]);

  useEffect(() => {
    // Fetch real products from backend API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll();
        console.log('Products API Response:', response);
        
        // Ensure we have an array of products
        const products = Array.isArray(response.data) ? response.data : 
                        Array.isArray(response.data.products) ? response.data.products :
                        Array.isArray(response.data.data) ? response.data.data : [];
        
        console.log('Processed products:', products);
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products. Please try again.');
        setProducts([]); // Set empty array on error
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products with advanced filtering
  const filteredAndSortedProducts = useMemo(() => {
    // Ensure products is an array
    if (!Array.isArray(products)) {
      return [];
    }
    
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
    <div className="container-responsive section-padding mobile-scroll-container">
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
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 touch-target"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Compare ({selectedForComparison.length})
              </button>
            )}
            
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors touch-target ${
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
              className={`p-2 rounded-lg transition-colors touch-target ${
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
                className="min-h-[600px] mobile-scroll-vertical"
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
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mobile-scroll-vertical"
                    : "space-y-4 mobile-scroll-vertical"
                }
              >
                {filteredAndSortedProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id || product._id || index} 
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