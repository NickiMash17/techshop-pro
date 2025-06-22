import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../utils/currency';

const AdvancedFilters = ({
  products = [],
  onFiltersChange,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    categories: [],
    brands: [],
    ratings: [],
    inStock: false,
    onSale: false,
    sortBy: 'relevance'
  });
  
  // Extract unique values from products
  const availableFilters = useMemo(() => {
    const categories = [...new Set(products.map(p => p.category))];
    const brands = [...new Set(products.map(p => p.brand || p.name.split(' ')[0]))];
    const maxPrice = Math.max(...products.map(p => p.price));
    const minPrice = Math.min(...products.map(p => p.price));
    
    return {
      categories,
      brands,
      priceRange: [minPrice, maxPrice],
      maxPrice,
      minPrice
    };
  }, [products]);
  
  // Apply filters
  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    if (onFiltersChange) {
      onFiltersChange(newFilters);
    }
  }, [onFiltersChange]);
  
  // Handle individual filter changes
  const handleFilterChange = useCallback((filterType, value) => {
    const newFilters = { ...filters };
    
    switch (filterType) {
      case 'priceRange':
        newFilters.priceRange = value;
        break;
      case 'categories':
        newFilters.categories = newFilters.categories.includes(value)
          ? newFilters.categories.filter(c => c !== value)
          : [...newFilters.categories, value];
        break;
      case 'brands':
        newFilters.brands = newFilters.brands.includes(value)
          ? newFilters.brands.filter(b => b !== value)
          : [...newFilters.brands, value];
        break;
      case 'ratings':
        newFilters.ratings = newFilters.ratings.includes(value)
          ? newFilters.ratings.filter(r => r !== value)
          : [...newFilters.ratings, value];
        break;
      case 'inStock':
        newFilters.inStock = value;
        break;
      case 'onSale':
        newFilters.onSale = value;
        break;
      case 'sortBy':
        newFilters.sortBy = value;
        break;
    }
    
    applyFilters(newFilters);
  }, [filters, applyFilters]);
  
  // Clear all filters
  const clearAllFilters = useCallback(() => {
    const clearedFilters = {
      priceRange: availableFilters.priceRange,
      categories: [],
      brands: [],
      ratings: [],
      inStock: false,
      onSale: false,
      sortBy: 'relevance'
    };
    applyFilters(clearedFilters);
  }, [availableFilters, applyFilters]);
  
  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.ratings.length > 0) count += filters.ratings.length;
    if (filters.inStock) count += 1;
    if (filters.onSale) count += 1;
    if (filters.priceRange[0] !== availableFilters.priceRange[0] || 
        filters.priceRange[1] !== availableFilters.priceRange[1]) count += 1;
    return count;
  }, [filters, availableFilters]);
  
  return (
    <div className={className}>
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-surface/50 rounded-lg border border-white/10 
                     hover:bg-surface/70 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          <span className="text-white">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
        
        {activeFilterCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-400 hover:text-red-400 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 space-y-6"
          >
            {/* Price Range */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{formatCurrency(filters.priceRange[0])}</span>
                  <span>{formatCurrency(filters.priceRange[1])}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={availableFilters.minPrice}
                    max={availableFilters.maxPrice}
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <input
                    type="range"
                    min={availableFilters.minPrice}
                    max={availableFilters.maxPrice}
                    value={filters.priceRange[0]}
                    onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                    className="absolute top-0 w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
            
            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableFilters.categories.map(category => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => handleFilterChange('categories', category)}
                      className="w-4 h-4 text-primary bg-surface/50 border-white/20 rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-300">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Brands */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Brands</h3>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {availableFilters.brands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => handleFilterChange('brands', brand)}
                      className="w-4 h-4 text-primary bg-surface/50 border-white/20 rounded focus:ring-primary"
                    />
                    <span className="text-sm text-gray-300">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Ratings */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.ratings.includes(rating)}
                      onChange={() => handleFilterChange('ratings', rating)}
                      className="w-4 h-4 text-primary bg-surface/50 border-white/20 rounded focus:ring-primary"
                    />
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm text-gray-300 ml-1">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Quick Filters */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Quick Filters</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    className="w-4 h-4 text-primary bg-surface/50 border-white/20 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-300">In Stock Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.onSale}
                    onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                    className="w-4 h-4 text-primary bg-surface/50 border-white/20 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-300">On Sale</span>
                </label>
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Sort By</h3>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full px-3 py-2 bg-surface/50 border border-white/10 rounded-lg text-white 
                         focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedFilters; 