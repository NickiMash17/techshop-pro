// Performance optimization utilities

// Image optimization utilities
export const optimizeImageUrl = (url, options = {}) => {
  if (!url) return '';
  
  const {
    width = 500,
    height,
    quality = 80,
    format = 'auto',
    fit = 'crop',
    crop = 'center'
  } = options;

  // If it's already an Unsplash URL, optimize it
  if (url.includes('unsplash.com')) {
    const urlObj = new URL(url);
    urlObj.searchParams.set('w', width.toString());
    urlObj.searchParams.set('q', quality.toString());
    urlObj.searchParams.set('fit', fit);
    urlObj.searchParams.set('crop', crop);
    if (height) urlObj.searchParams.set('h', height.toString());
    if (format !== 'auto') urlObj.searchParams.set('fm', format);
    return urlObj.toString();
  }

  // For other URLs, return as is
  return url;
};

// Generate different image sizes for responsive loading
export const generateImageSrcSet = (url, sizes = [300, 500, 800, 1200]) => {
  if (!url) return '';
  
  return sizes
    .map(size => `${optimizeImageUrl(url, { width: size })} ${size}w`)
    .join(', ');
};

// Lazy loading utilities
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Debounce utility for performance
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility for performance
export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Cache utilities
export class ImageCache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  set(key, value) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }

  get(key) {
    return this.cache.get(key);
  }

  has(key) {
    return this.cache.has(key);
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

// Preload critical images
export const preloadImages = (urls, priority = false) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    if (priority) {
      link.setAttribute('fetchpriority', 'high');
    }
    document.head.appendChild(link);
  });
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Memory management
export const cleanupResources = () => {
  // Clear image cache if it gets too large
  if (window.imageCache && window.imageCache.size() > 200) {
    window.imageCache.clear();
  }
  
  // Force garbage collection if available
  if (window.gc) {
    window.gc();
  }
};

// Initialize performance optimizations
export const initializePerformance = () => {
  // Create global image cache
  window.imageCache = new ImageCache(100);
  
  // Set up periodic cleanup
  setInterval(cleanupResources, 30000); // Every 30 seconds
  
  // Preload critical images
  const criticalImages = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&fit=crop&crop=center&q=80'
  ];
  preloadImages(criticalImages, true);
  
  console.log('🚀 Performance optimizations initialized');
};

// Export default instance
export default {
  optimizeImageUrl,
  generateImageSrcSet,
  createIntersectionObserver,
  debounce,
  throttle,
  ImageCache,
  preloadImages,
  measurePerformance,
  cleanupResources,
  initializePerformance
}; 