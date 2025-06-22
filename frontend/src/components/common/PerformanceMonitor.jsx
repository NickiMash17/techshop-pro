import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

const PerformanceMonitor = ({ 
  totalItems, 
  visibleItems, 
  renderRatio, 
  scrollPercentage, 
  isScrolledToBottom,
  className = "" 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [fps, setFps] = useState(60);
  const [memoryUsage, setMemoryUsage] = useState(0);
  
  // Calculate performance metrics
  const performanceScore = useMemo(() => {
    const baseScore = Math.round((1 - renderRatio) * 100);
    const fpsBonus = Math.max(0, (fps - 30) / 30 * 20);
    return Math.min(100, baseScore + fpsBonus);
  }, [renderRatio, fps]);
  
  const getPerformanceColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  const getPerformanceLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };
  
  // Monitor FPS
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    const animationId = requestAnimationFrame(measureFPS);
    
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  // Monitor memory usage (if available)
  useEffect(() => {
    if ('memory' in performance) {
      const updateMemory = () => {
        const memory = performance.memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        setMemoryUsage(usedMB);
      };
      
      updateMemory();
      const interval = setInterval(updateMemory, 1000);
      
      return () => clearInterval(interval);
    }
  }, []);
  
  // Show/hide based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`fixed bottom-4 left-4 z-50 bg-surface/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl ${className}`}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold text-white">Performance</h4>
          <div className={`text-xs font-medium ${getPerformanceColor(performanceScore)}`}>
            {getPerformanceLabel(performanceScore)}
          </div>
        </div>
        
        {/* Performance Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Score:</span>
            <span className={`font-semibold ${getPerformanceColor(performanceScore)}`}>
              {performanceScore}/100
            </span>
          </div>
          <div className="w-full bg-gray-700/50 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${
                performanceScore >= 80 ? 'bg-green-500' :
                performanceScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${performanceScore}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Metrics */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Items:</span>
            <span className="text-white">{visibleItems}/{totalItems}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Render:</span>
            <span className="text-white">{Math.round(renderRatio * 100)}%</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">FPS:</span>
            <span className={`font-medium ${
              fps >= 50 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {fps}
            </span>
          </div>
          
          {memoryUsage > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Memory:</span>
              <span className="text-white">{memoryUsage}MB</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Scroll:</span>
            <span className="text-white">{Math.round(scrollPercentage)}%</span>
          </div>
        </div>
        
        {/* Status indicators */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <div className={`w-2 h-2 rounded-full ${
            isScrolledToBottom ? 'bg-green-400' : 'bg-gray-400'
          }`} />
          <span className="text-xs text-gray-400">
            {isScrolledToBottom ? 'End reached' : 'Scrolling'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceMonitor; 