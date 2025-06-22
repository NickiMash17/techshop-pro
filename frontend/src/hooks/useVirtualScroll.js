import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

const useVirtualScroll = ({
  items,
  itemHeight = 450,
  containerHeight = 800,
  itemsPerRow = 4,
  overscan = 2
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  
  // Calculate dimensions
  const totalHeight = useMemo(() => {
    return Math.ceil(items.length / itemsPerRow) * itemHeight;
  }, [items.length, itemsPerRow, itemHeight]);
  
  // Calculate visible range with overscan
  const visibleRange = useMemo(() => {
    const startRow = Math.floor(scrollTop / itemHeight);
    const endRow = Math.ceil((scrollTop + containerHeight) / itemHeight);
    
    const startIndex = Math.max(0, (startRow - overscan) * itemsPerRow);
    const endIndex = Math.min(items.length, (endRow + overscan) * itemsPerRow);
    
    return { startIndex, endIndex, startRow, endRow };
  }, [scrollTop, containerHeight, itemHeight, itemsPerRow, items.length, overscan]);
  
  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.startIndex, visibleRange.endIndex);
  }, [items, visibleRange.startIndex, visibleRange.endIndex]);
  
  // Calculate offset for positioning
  const offsetY = useMemo(() => {
    return Math.floor(visibleRange.startIndex / itemsPerRow) * itemHeight;
  }, [visibleRange.startIndex, itemsPerRow, itemHeight]);
  
  // Handle scroll
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);
  
  // Handle resize
  const handleResize = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);
  
  // Set up resize listener
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);
  
  // Scroll to specific item
  const scrollToItem = useCallback((index) => {
    const row = Math.floor(index / itemsPerRow);
    const targetScrollTop = row * itemHeight;
    
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: 'smooth'
      });
    }
  }, [itemsPerRow, itemHeight]);
  
  // Scroll to top
  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, []);
  
  // Get scroll percentage
  const scrollPercentage = useMemo(() => {
    if (totalHeight <= containerHeight) return 0;
    return Math.min(100, Math.max(0, (scrollTop / (totalHeight - containerHeight)) * 100));
  }, [scrollTop, totalHeight, containerHeight]);
  
  // Check if scrolled to bottom
  const isScrolledToBottom = useMemo(() => {
    return scrollTop + containerHeight >= totalHeight - 1;
  }, [scrollTop, containerHeight, totalHeight]);
  
  // Performance metrics
  const performanceMetrics = useMemo(() => ({
    totalItems: items.length,
    visibleItems: visibleItems.length,
    renderRatio: visibleItems.length / items.length,
    scrollPercentage,
    isScrolledToBottom
  }), [items.length, visibleItems.length, scrollPercentage, isScrolledToBottom]);
  
  return {
    // State
    scrollTop,
    visibleItems,
    visibleRange,
    offsetY,
    totalHeight,
    containerWidth,
    scrollPercentage,
    isScrolledToBottom,
    performanceMetrics,
    
    // Refs
    containerRef,
    
    // Actions
    handleScroll,
    scrollToItem,
    scrollToTop,
    handleResize
  };
};

export default useVirtualScroll; 