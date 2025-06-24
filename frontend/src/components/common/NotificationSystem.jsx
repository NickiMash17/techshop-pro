import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createContext, useContext } from 'react';
import { motion } from 'framer-motion';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      title: '',
      message: '',
      duration: 5000,
      ...notification
    };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto remove notification
    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Convenience methods
  const success = (message, title = 'Success', options = {}) => {
    return addNotification({ type: 'success', message, title, ...options });
  };

  const error = (message, title = 'Error', options = {}) => {
    return addNotification({ type: 'error', message, title, ...options });
  };

  const warning = (message, title = 'Warning', options = {}) => {
    return addNotification({ type: 'warning', message, title, ...options });
  };

  const info = (message, title = 'Info', options = {}) => {
    return addNotification({ type: 'info', message, title, ...options });
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NotificationItem = ({ notification, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500/90',
          border: 'border-green-400/50',
          icon: 'text-green-100',
          text: 'text-green-100'
        };
      case 'error':
        return {
          bg: 'bg-red-500/90',
          border: 'border-red-400/50',
          icon: 'text-red-100',
          text: 'text-red-100'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/90',
          border: 'border-yellow-400/50',
          icon: 'text-yellow-100',
          text: 'text-yellow-100'
        };
      default:
        return {
          bg: 'bg-blue-500/90',
          border: 'border-blue-400/50',
          icon: 'text-blue-100',
          text: 'text-blue-100'
        };
    }
  };

  const styles = getStyles(notification.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 300
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`${styles.bg} ${styles.border} backdrop-blur-xl border rounded-xl shadow-xl overflow-hidden min-w-80`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <motion.div
            className={`${styles.icon} flex-shrink-0 mt-0.5`}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
          >
            {getIcon(notification.type)}
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {notification.title && (
              <h4 className={`${styles.text} font-semibold text-sm mb-1`}>
                {notification.title}
              </h4>
            )}
            <p className={`${styles.text} text-sm leading-relaxed`}>
              {notification.message}
            </p>
          </div>

          {/* Close Button */}
          <motion.button
            onClick={() => onRemove(notification.id)}
            className={`${styles.text} hover:text-white transition-colors p-1 rounded-full hover:bg-white/20`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      {notification.duration > 0 && (
        <motion.div
          className="h-1 bg-white/20"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: notification.duration / 1000, ease: "linear" }}
        />
      )}
    </motion.div>
  );
};

export default NotificationProvider; 