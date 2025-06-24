import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useClickAway } from 'react-use';

const SearchBar = ({ placeholder = "Search for products...", className = "" }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  // Close suggestions when clicking outside
  useClickAway(searchRef, () => {
    setIsFocused(false);
  });

  // Mock suggestions - in real app, this would come from API
  const mockSuggestions = [
    'MacBook Pro',
    'iPhone 15',
    'Sony Headphones',
    'Gaming Mouse',
    'Smart Watch',
    'Wireless Earbuds',
    'Laptop Stand',
    'USB-C Cable'
  ];

  useEffect(() => {
    if (query.trim()) {
      setIsLoading(true);
      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockSuggestions.filter(item =>
          item.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    navigate(`/products?search=${encodeURIComponent(suggestion)}`);
    setIsFocused(false);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="relative"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-12 pr-12 bg-surface/50 backdrop-blur-sm rounded-xl 
                     border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 
                     focus:border-primary/50 transition-all duration-300 placeholder:text-gray-500
                     hover:bg-surface/70 hover:border-white/20"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
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
          </div>

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full 
                       hover:bg-white/10 transition-all duration-200"
            >
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && (suggestions.length > 0 || query.trim()) && (
          <div
            className="absolute top-full left-0 right-0 mt-2 glass-card overflow-hidden z-50"
          >
            {suggestions.length > 0 ? (
              <div className="py-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all duration-200 
                             flex items-center space-x-3 group"
                  >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {suggestion}
                    </span>
                  </button>
                ))}
              </div>
            ) : query.trim() && !isLoading ? (
              <div
                className="px-4 py-3 text-gray-400 text-center"
              >
                No results found for "{query}"
              </div>
            ) : null}
            
            {/* Search All Results */}
            {query.trim() && (
              <div
                className="border-t border-white/10"
              >
                <button
                  onClick={() => handleSuggestionClick(query)}
                  className="w-full px-4 py-3 text-left hover:bg-white/5 transition-all duration-200 
                           flex items-center space-x-3 group text-primary"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search for "{query}"</span>
                </button>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar; 