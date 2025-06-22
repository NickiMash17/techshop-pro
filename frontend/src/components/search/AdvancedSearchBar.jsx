import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useDebounce from '../../hooks/useDebounce';
import { formatCurrency } from '../../utils/currency';

const AdvancedSearchBar = ({
  products = [],
  onSearch,
  onSuggestionSelect,
  placeholder = "Search products...",
  className = "",
  showSuggestions = true,
  maxSuggestions = 8
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);
  
  // Get recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);
  
  // Generate popular searches based on product data
  useEffect(() => {
    const popular = products
      .reduce((acc, product) => {
        const words = product.name.toLowerCase().split(' ');
        words.forEach(word => {
          if (word.length > 2) {
            acc[word] = (acc[word] || 0) + 1;
          }
        });
        return acc;
      }, {});
    
    const sorted = Object.entries(popular)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 6)
      .map(([word]) => word);
    
    setPopularSearches(sorted);
  }, [products]);
  
  // Generate search suggestions
  const suggestions = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    
    const queryLower = debouncedQuery.toLowerCase();
    const results = [];
    
    // Search in product names and descriptions
    products.forEach(product => {
      const nameMatch = product.name.toLowerCase().includes(queryLower);
      const descMatch = product.description.toLowerCase().includes(queryLower);
      const categoryMatch = product.category.toLowerCase().includes(queryLower);
      
      if (nameMatch || descMatch || categoryMatch) {
        const relevance = nameMatch ? 3 : descMatch ? 2 : 1;
        results.push({
          type: 'product',
          data: product,
          relevance,
          match: nameMatch ? 'name' : descMatch ? 'description' : 'category'
        });
      }
    });
    
    // Add category suggestions
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(category => {
      if (category.toLowerCase().includes(queryLower)) {
        results.push({
          type: 'category',
          data: { name: category, count: products.filter(p => p.category === category).length },
          relevance: 2,
          match: 'category'
        });
      }
    });
    
    // Sort by relevance and limit results
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, maxSuggestions);
  }, [debouncedQuery, products, maxSuggestions]);
  
  // Handle search input change
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);
    
    if (onSearch) {
      onSearch(value);
    }
  }, [onSearch]);
  
  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion) => {
    let searchTerm = '';
    
    if (suggestion.type === 'product') {
      searchTerm = suggestion.data.name;
    } else if (suggestion.type === 'category') {
      searchTerm = suggestion.data.name;
    } else {
      searchTerm = suggestion;
    }
    
    setQuery(searchTerm);
    setIsFocused(false);
    setSelectedIndex(-1);
    
    // Save to recent searches
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    if (onSuggestionSelect) {
      onSuggestionSelect(searchTerm);
    }
  }, [recentSearches, onSuggestionSelect]);
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!showSuggestions) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        } else if (query.trim()) {
          handleSuggestionSelect(query);
        }
        break;
      case 'Escape':
        setIsFocused(false);
        setSelectedIndex(-1);
        break;
    }
  }, [suggestions, selectedIndex, query, showSuggestions, handleSuggestionSelect]);
  
  // Voice search functionality
  const startVoiceSearch = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice search is not supported in this browser');
      return;
    }
    
    // Prevent multiple instances
    if (isListening) {
      return;
    }
    
    setIsListening(true);
    setShowVoiceSearch(true);
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      if (onSearch) onSearch(transcript);
      setIsListening(false);
      setShowVoiceSearch(false);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setShowVoiceSearch(false);
      
      // Show user-friendly error message
      if (event.error === 'not-allowed') {
        alert('Please allow microphone access to use voice search');
      } else if (event.error === 'no-speech') {
        alert('No speech detected. Please try again.');
      } else {
        alert('Voice search error. Please try again.');
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
      setShowVoiceSearch(false);
    };
    
    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      setIsListening(false);
      setShowVoiceSearch(false);
      alert('Failed to start voice search. Please try again.');
    }
  }, [isListening, onSearch]);
  
  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setSelectedIndex(-1);
    if (onSearch) onSearch('');
  }, [onSearch]);
  
  // Remove recent search
  const removeRecentSearch = useCallback((searchTerm, e) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== searchTerm);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);
  
  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="w-full px-4 py-3 pl-12 pr-20 bg-surface/50 backdrop-blur-sm rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-primary border border-white/10
                     text-white placeholder:text-gray-400 transition-all duration-300 prevent-zoom"
        />
        
        {/* Search Icon */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        {/* Voice Search Button */}
        <button
          onClick={startVoiceSearch}
          disabled={isListening}
          className={`absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-300 touch-target
                     ${isListening 
                       ? 'bg-red-500/20 text-red-400 animate-pulse shadow-lg shadow-red-500/25' 
                       : 'text-gray-400 hover:text-primary hover:bg-primary/20'
                     }`}
          title={isListening ? 'Listening... Click to stop' : 'Voice search'}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
          {isListening && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
          )}
        </button>
        
        {/* Clear Button */}
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white 
                       hover:bg-white/10 rounded-lg transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </div>
      
      {/* Search Suggestions */}
      <AnimatePresence>
        {isFocused && showSuggestions && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-surface/95 backdrop-blur-xl 
                       border border-white/10 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
          >
            {/* Search Results */}
            {query && suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-gray-400 px-3 py-2 font-medium">
                  Search Results
                </div>
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={`${suggestion.type}-${suggestion.data.id || suggestion.data.name}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200
                               ${selectedIndex === index 
                                 ? 'bg-primary/20 text-primary' 
                                 : 'hover:bg-white/10 text-white'
                               }`}
                  >
                    {/* Icon */}
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      {suggestion.type === 'product' ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {suggestion.type === 'product' ? suggestion.data.name : suggestion.data.name}
                      </div>
                      {suggestion.type === 'product' && (
                        <div className="text-sm text-gray-400 truncate">
                          {suggestion.data.description}
                        </div>
                      )}
                      {suggestion.type === 'category' && (
                        <div className="text-sm text-gray-400">
                          {suggestion.data.count} products
                        </div>
                      )}
                    </div>
                    
                    {/* Price for products */}
                    {suggestion.type === 'product' && (
                      <div className="text-sm font-medium text-primary">
                        {formatCurrency(suggestion.data.price)}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-2 border-b border-white/10">
                <div className="text-xs text-gray-400 px-3 py-2 font-medium">
                  Recent Searches
                </div>
                {recentSearches.map((search, index) => (
                  <motion.div
                    key={search}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionSelect(search)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer 
                               hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white">{search}</span>
                    </div>
                    <button
                      onClick={(e) => removeRecentSearch(search, e)}
                      className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
            
            {/* Popular Searches */}
            {!query && popularSearches.length > 0 && (
              <div className="p-2">
                <div className="text-xs text-gray-400 px-3 py-2 font-medium">
                  Popular Searches
                </div>
                <div className="flex flex-wrap gap-2 px-3 py-2">
                  {popularSearches.map((search, index) => (
                    <motion.button
                      key={search}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSuggestionSelect(search)}
                      className="px-3 py-1 bg-white/10 hover:bg-primary/20 text-white rounded-full 
                                 text-sm transition-all duration-200 hover:scale-105"
                    >
                      {search}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            
            {/* No Results */}
            {query && suggestions.length === 0 && (
              <div className="p-4 text-center text-gray-400">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p>No results found for "{query}"</p>
                <p className="text-sm">Try different keywords or browse categories</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearchBar; 