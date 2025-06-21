import React from 'react';
import { motion } from 'framer-motion';

const Loading = ({ size = 'default', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      {/* Enhanced Animated Spinner */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-secondary animate-pulse shadow-glow"></div>
        
        {/* Middle Ring */}
        <motion.div 
          className="absolute inset-1 rounded-full border-2 border-transparent border-t-secondary border-r-accent"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner Ring */}
        <motion.div 
          className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent border-r-primary"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Center Dot */}
        <motion.div 
          className="absolute inset-4 rounded-full bg-gradient-to-r from-primary to-secondary shadow-glow"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Enhanced Loading Text */}
      {text && (
        <motion.div
          className={`${textSizes[size]} text-gray-400 font-medium text-center`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {text}
        </motion.div>
      )}

      {/* Enhanced Floating Dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full shadow-glow"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div 
        className="w-32 h-1 bg-surface/30 rounded-full overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-secondary"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

// Enhanced Full Screen Loading
export const FullScreenLoading = ({ text = 'Loading...' }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center space-y-8">
        {/* Enhanced Logo Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl font-bold text-gradient"
        >
          TechShop Pro
        </motion.div>
        
        <Loading size="large" text={text} />
        
        {/* Enhanced Progress Bar */}
        <motion.div 
          className="w-64 h-2 bg-surface/30 rounded-full overflow-hidden shadow-lg"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary shadow-glow"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Loading Message */}
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Preparing your experience...
        </motion.p>
      </div>
    </motion.div>
  );
};

// Enhanced Skeleton Loading for Cards
export const CardSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="card-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="card-wrapper">
            {/* Enhanced Image Skeleton */}
            <div className="card-image-wrapper">
              <motion.div 
                className="w-full h-full bg-gradient-to-br from-surface/50 to-surface/30 rounded-t-2xl"
                animate={{ 
                  background: [
                    "linear-gradient(90deg, rgba(30, 41, 59, 0.5) 25%, rgba(30, 41, 59, 0.3) 50%, rgba(30, 41, 59, 0.5) 75%)",
                    "linear-gradient(90deg, rgba(30, 41, 59, 0.3) 25%, rgba(30, 41, 59, 0.5) 50%, rgba(30, 41, 59, 0.3) 75%)",
                    "linear-gradient(90deg, rgba(30, 41, 59, 0.5) 25%, rgba(30, 41, 59, 0.3) 50%, rgba(30, 41, 59, 0.5) 75%)"
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Enhanced Content Skeleton */}
            <div className="card-content">
              <motion.div 
                className="h-6 bg-surface/50 rounded animate-pulse mb-2"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div 
                className="h-4 bg-surface/50 rounded animate-pulse mb-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div 
                className="h-4 bg-surface/50 rounded animate-pulse mb-4 w-3/4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
              
              <div className="mt-auto flex items-center justify-between">
                <div className="space-y-1">
                  <motion.div 
                    className="h-5 bg-surface/50 rounded animate-pulse w-16"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  />
                  <motion.div 
                    className="h-6 bg-surface/50 rounded animate-pulse w-20"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
                  />
                </div>
                <motion.div 
                  className="h-8 bg-surface/50 rounded-full animate-pulse w-24"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Button Loading
export const ButtonLoading = ({ size = 'default' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-5 h-5',
    large: 'w-6 h-6'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} loading-spinner`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export default Loading;