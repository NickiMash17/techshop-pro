import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';

const VirtualProductGrid = ({ 
  products, 
  itemsPerRow = 4, 
  itemHeight = 450, 
  containerHeight = 800,
  className = "",
  onProductClick = null 
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  // Calculate dimensions
  const itemsPerPage = useMemo(() => Math.ceil(containerHeight / itemHeight) * itemsPerRow, [containerHeight, itemHeight, itemsPerRow]);
  
  // Calculate visible range
  const startIndex = Math.floor(scrollTop / itemHeight) * itemsPerRow;
  const endIndex = Math.min(startIndex + itemsPerPage + itemsPerRow, products.length);
  
  // Get visible products
  const visibleProducts = useMemo(() => {
    return products.slice(startIndex, endIndex);
  }, [products, startIndex, endIndex]);
  
  // Calculate total height
  const totalHeight = Math.ceil(products.length / itemsPerRow) * itemHeight;
  
  // Calculate offset for positioning
  const offsetY = Math.floor(startIndex / itemsPerRow) * itemHeight;
  
  // Handle scroll
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  // Intersection Observer for lazy loading
  const observerRef = useRef();
  const lastElementRef = useCallback(node => {
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && endIndex < products.length) {
        // Load more products when reaching the end
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 500); // Simulate loading
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [endIndex, products.length]);
  
  // Cleanup observer
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <motion.div
          key={`skeleton-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card h-[450px] overflow-hidden"
        >
          <div className="animate-pulse">
            <div className="h-[240px] bg-gray-700/50 rounded-t-2xl" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-700/50 rounded w-3/4" />
              <div className="h-3 bg-gray-700/50 rounded w-1/2" />
              <div className="h-3 bg-gray-700/50 rounded w-2/3" />
              <div className="h-8 bg-gray-700/50 rounded w-1/3 mt-4" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
  
  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-gray-700/50 rounded-full flex items-center justify-center mb-6"
        >
          <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">No Products Found</h3>
        <p className="text-gray-400 max-w-md">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      {/* Virtual Scroll Container */}
      <div
        className="overflow-auto"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        {/* Spacer for total height */}
        <div style={{ height: totalHeight, position: 'relative' }}>
          {/* Visible products container */}
          <div
            style={{
              position: 'absolute',
              top: offsetY,
              left: 0,
              right: 0,
              height: (endIndex - startIndex) * itemHeight / itemsPerRow
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product, index) => {
                  const actualIndex = startIndex + index;
                  const isLastElement = actualIndex === endIndex - 1;
                  
                  return (
                    <motion.div
                      key={product.id || actualIndex}
                      ref={isLastElement ? lastElementRef : null}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{
                        duration: 0.3,
                        delay: (index % itemsPerRow) * 0.1,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      className="group"
                    >
                      <ProductCard 
                        product={product}
                        onClick={onProductClick}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
      
      {/* Loading indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center py-8"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        </motion.div>
      )}
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 right-4 bg-surface/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
        <div className="text-xs text-gray-400">
          {Math.ceil((scrollTop / (totalHeight - containerHeight)) * 100)}%
        </div>
      </div>
    </div>
  );
};

export default VirtualProductGrid; 