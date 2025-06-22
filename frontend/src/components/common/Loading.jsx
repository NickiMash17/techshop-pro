import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Loading = ({ 
  type = 'spinner', 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false,
  color = 'primary' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  const Spinner = () => (
    <motion.div
      className={`${sizeClasses[size]} border-2 border-gray-600 border-t-${color === 'primary' ? 'primary' : color} rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  const Dots = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-3 h-3' : 'w-4 h-4'} bg-${color === 'primary' ? 'primary' : color} rounded-full`}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  const Pulse = () => (
    <motion.div
      className={`${sizeClasses[size]} bg-${color === 'primary' ? 'primary' : color} rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  const Wave = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className={`${size === 'small' ? 'w-1 h-4' : size === 'medium' ? 'w-1 h-6' : 'w-2 h-8'} bg-${color === 'primary' ? 'primary' : color} rounded-full`}
          animate={{
            height: [
              size === 'small' ? 16 : size === 'medium' ? 24 : 32,
              size === 'small' ? 32 : size === 'medium' ? 48 : 64,
              size === 'small' ? 16 : size === 'medium' ? 24 : 32
            ]
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  const Ring = () => (
    <div className="relative">
      <motion.div
        className={`${sizeClasses[size]} border-4 border-gray-600 border-t-${color === 'primary' ? 'primary' : color} rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`${sizeClasses[size]} border-4 border-transparent border-t-${color === 'primary' ? 'primary' : color} rounded-full absolute inset-0`}
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );

  const Cube = () => (
    <div className="relative">
      <motion.div
        className={`${sizeClasses[size]} bg-${color === 'primary' ? 'primary' : color} rounded-lg`}
        animate={{
          rotateX: [0, 180, 360],
          rotateY: [0, 180, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transformStyle: 'preserve-3d' }}
      />
    </div>
  );

  const Skeleton = () => (
    <div className="space-y-4">
      <motion.div
        className="h-4 bg-gray-600 rounded"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="h-4 bg-gray-600 rounded w-3/4"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.2,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="h-4 bg-gray-600 rounded w-1/2"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.4,
          ease: "easeInOut"
        }}
      />
    </div>
  );

  const ProductSkeleton = () => (
    <div className="glass-card overflow-hidden">
      <motion.div
        className="h-48 bg-gray-600"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <div className="p-6 space-y-4">
        <motion.div
          className="h-4 bg-gray-600 rounded w-3/4"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="h-4 bg-gray-600 rounded w-1/2"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.2,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="h-6 bg-gray-600 rounded w-1/3"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.4,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );

  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return <Dots />;
      case 'pulse':
        return <Pulse />;
      case 'wave':
        return <Wave />;
      case 'ring':
        return <Ring />;
      case 'cube':
        return <Cube />;
      case 'skeleton':
        return <Skeleton />;
      case 'product-skeleton':
        return <ProductSkeleton />;
      default:
        return <Spinner />;
    }
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          {renderLoader()}
          {text && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-gray-400 font-medium"
            >
              {text}
            </motion.p>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {renderLoader()}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-400 font-medium text-center"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

Loading.propTypes = {
  type: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'wave', 'ring', 'cube', 'skeleton', 'product-skeleton']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'gray'])
};

export default Loading;