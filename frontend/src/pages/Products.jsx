import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
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
  const [selectedForComparison] = useState([]);
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
  // const filteredAndSortedProducts = useMemo(() => { ... });
  // For emergency fix: always show all products
  const filteredAndSortedProducts = Array.isArray(products) ? products : [];

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

  const openComparison = () => {
    setIsComparisonOpen(true);
  };

  if (loading) {
    return (
      <div className="container-responsive section-padding">
        <div className="space-y-8">
          {/* Header Skeleton */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="h-8 bg-gray-700 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-700 rounded w-64 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-gray-700 rounded-lg animate-pulse"></div>
              <div className="h-10 w-10 bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Search and Filters Skeleton */}
          <div className="space-y-6">
            <div className="h-12 bg-gray-700 rounded-lg animate-pulse"></div>
            <div className="h-32 bg-gray-700 rounded-lg animate-pulse"></div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="products-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="card-skeleton">
                <div className="card-skeleton-image"></div>
                <div className="card-skeleton-content">
                  <div className="card-skeleton-title"></div>
                  <div className="card-skeleton-description"></div>
                  <div className="card-skeleton-description w-3/4"></div>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="card-skeleton-price"></div>
                    <div className="w-16 h-4 bg-gray-700 rounded animate-pulse"></div>
                  </div>
                  <div className="card-skeleton-button"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive section-padding mobile-scroll-container">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Our Products
            </h1>
            <div className="flex items-center gap-4 text-gray-400">
              <p className="text-lg">
                Discover {filteredAndSortedProducts.length} amazing products
              </p>
              {useVirtualScroll && (
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium bg-primary/10 px-2 py-1 rounded-full">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Virtual scrolling enabled
                </span>
              )}
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-3">
            {/* Comparison Button */}
            {selectedForComparison.length > 0 && (
              <button
                onClick={openComparison}
                className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2 touch-target"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Compare ({selectedForComparison.length})
              </button>
            )}
            
            <div className="flex items-center bg-surface/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-300 touch-target ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                    : 'text-gray-400 hover:text-white hover:bg-surface'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all duration-300 touch-target ${
                  viewMode === 'list' 
                    ? 'bg-primary text-white shadow-lg shadow-primary/25' 
                    : 'text-gray-400 hover:text-white hover:bg-surface'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Search and Filters */}
        <div className="space-y-6">
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
        </div>

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
              <div
                key={viewMode}
                className={
                  viewMode === 'grid'
                    ? "products-grid mobile-scroll-vertical"
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
                {/* If no products rendered, show a warning and always show Clear Filters */}
                {filteredAndSortedProducts.length === 0 && (
                  <div style={{color: 'red', fontWeight: 'bold', marginTop: '2rem'}}>
                    No products rendered. Check filters, API, or rendering logic.<br />
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFilters({
                          priceRange: [0, 3000],
                          categories: [],
                          brands: [],
                          ratings: [],
                          inStock: false,
                          onSale: false,
                          sortBy: 'relevance'
                        });
                      }}
                      style={{marginTop: 12, background: '#8B5CF6', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer'}}
                    >Clear Filters</button>
                  </div>
                )}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search terms or filters to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      priceRange: [0, 3000],
                      categories: [],
                      brands: [],
                      ratings: [],
                      inStock: false,
                      onSale: false,
                      sortBy: 'relevance'
                    });
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            </div>
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