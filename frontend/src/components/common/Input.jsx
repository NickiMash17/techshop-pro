import React, { useState, forwardRef } from 'react';
import { ButtonIcon } from './Button';
import { motion } from 'framer-motion';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  success,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  className = '',
  size = 'md',
  variant = 'default',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  };

  const variants = {
    default: 'bg-surface/50 border-white/10 focus:border-primary/50 focus:ring-primary/50',
    filled: 'bg-surface/70 border-white/20 focus:border-primary/50 focus:ring-primary/50',
    outline: 'bg-transparent border-2 border-white/20 focus:border-primary focus:ring-primary/50'
  };

  const inputClasses = `
    w-full rounded-xl border transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background
    placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed
    ${sizes[size]}
    ${variants[variant]}
    ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}
    ${success ? 'border-green-500 focus:border-green-500 focus:ring-green-500/50' : ''}
    ${className}
  `;

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative">
      {/* Label */}
      {label && (
        <motion.label
          className={`block text-sm font-medium mb-2 ${
            error ? 'text-red-400' : success ? 'text-green-400' : 'text-gray-300'
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </motion.label>
      )}

      {/* Input Container */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Left Icon */}
        {icon && iconPosition === 'left' && (
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {icon}
          </motion.div>
        )}

        {/* Input Field */}
        <input
          ref={ref}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`${inputClasses} ${
            icon && iconPosition === 'left' ? 'pl-12' : ''
          } ${
            (type === 'password' || (icon && iconPosition === 'right')) ? 'pr-12' : ''
          }`}
          {...props}
        />

        {/* Right Icon or Password Toggle */}
        {(type === 'password' || (icon && iconPosition === 'right')) && (
          <motion.div
            className="absolute right-4 top-1/2 -translate-y-1/2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {type === 'password' ? (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <ButtonIcon.Eye /> : <ButtonIcon.EyeOff />}
              </button>
            ) : (
              <div className="text-gray-400">
                {icon}
              </div>
            )}
          </motion.div>
        )}

        {/* Focus Indicator */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-primary/50 pointer-events-none"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="flex items-center mt-2 text-red-400 text-sm"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ButtonIcon.Alert className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Success Message */}
      {success && (
        <motion.div
          className="flex items-center mt-2 text-green-400 text-sm"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <ButtonIcon.Check className="w-4 h-4 mr-2 flex-shrink-0" />
          <span>{success}</span>
        </motion.div>
      )}
    </div>
  );
});

// Add missing icons to ButtonIcon
ButtonIcon.Eye = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

ButtonIcon.EyeOff = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

ButtonIcon.Alert = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

Input.displayName = 'Input';

export default Input; 