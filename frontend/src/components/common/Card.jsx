import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  hover = true,
  clickable = false,
  onClick,
  ...props
}) => {
  const variants = {
    default: 'glass-card',
    elevated: 'glass-card shadow-2xl',
    bordered: 'glass-card border border-white/20',
    filled: 'bg-surface/80 backdrop-blur-sm border border-white/10',
    outline: 'bg-transparent border-2 border-white/20'
  };

  const sizes = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const cardClasses = `
    rounded-2xl transition-all duration-300
    ${variants[variant]}
    ${sizes[size]}
    ${hover ? 'hover:shadow-xl hover:shadow-black/20' : ''}
    ${clickable ? 'cursor-pointer hover:scale-[1.02]' : ''}
    ${className}
  `;

  const MotionComponent = clickable ? motion.button : motion.div;

  return (
    <MotionComponent
      className={cardClasses}
      onClick={onClick}
      whileHover={hover ? { y: -2 } : {}}
      whileTap={clickable ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

// Card Header component
export const CardHeader = ({ children, className = '', ...props }) => (
  <motion.div
    className={`mb-4 ${className}`}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    {...props}
  >
    {children}
  </motion.div>
);

// Card Title component
export const CardTitle = ({ children, className = '', ...props }) => (
  <motion.h3
    className={`text-xl font-semibold text-white mb-2 ${className}`}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
    {...props}
  >
    {children}
  </motion.h3>
);

// Card Subtitle component
export const CardSubtitle = ({ children, className = '', ...props }) => (
  <motion.p
    className={`text-gray-400 text-sm ${className}`}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 }}
    {...props}
  >
    {children}
  </motion.p>
);

// Card Body component
export const CardBody = ({ children, className = '', ...props }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    {...props}
  >
    {children}
  </motion.div>
);

// Card Footer component
export const CardFooter = ({ children, className = '', ...props }) => (
  <motion.div
    className={`mt-6 pt-4 border-t border-white/10 ${className}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    {...props}
  >
    {children}
  </motion.div>
);

// Card Image component
export const CardImage = ({ src, alt, className = '', ...props }) => (
  <motion.div
    className={`overflow-hidden rounded-xl mb-4 ${className}`}
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.1 }}
    {...props}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
    />
  </motion.div>
);

// Card Badge component
export const CardBadge = ({ children, variant = 'default', className = '', ...props }) => {
  const badgeVariants = {
    default: 'bg-primary/20 text-primary border border-primary/30',
    success: 'bg-green-500/20 text-green-400 border border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    danger: 'bg-red-500/20 text-red-400 border border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
  };

  return (
    <motion.span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeVariants[variant]} ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.4, type: "spring", damping: 15, stiffness: 200 }}
      {...props}
    >
      {children}
    </motion.span>
  );
};

// Card Stats component
export const CardStats = ({ items, className = '', ...props }) => (
  <motion.div
    className={`grid grid-cols-2 gap-4 ${className}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    {...props}
  >
    {items.map((item, index) => (
      <motion.div
        key={index}
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 + index * 0.1 }}
      >
        <div className="text-2xl font-bold text-white">{item.value}</div>
        <div className="text-sm text-gray-400">{item.label}</div>
      </motion.div>
    ))}
  </motion.div>
);

// Card Action component
export const CardAction = ({ children, className = '', ...props }) => (
  <motion.div
    className={`mt-4 ${className}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5 }}
    {...props}
  >
    {children}
  </motion.div>
);

export default Card; 