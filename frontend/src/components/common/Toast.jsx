import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ButtonIcon } from './Button';

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = {
      id,
      ...toast,
      duration: toast.duration || 5000,
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove toast
    if (newToast.duration !== Infinity) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message, options = {}) => {
    return addToast({ type: 'success', message, ...options });
  }, [addToast]);

  const error = useCallback((message, options = {}) => {
    return addToast({ type: 'error', message, ...options });
  }, [addToast]);

  const warning = useCallback((message, options = {}) => {
    return addToast({ type: 'warning', message, ...options });
  }, [addToast]);

  const info = useCallback((message, options = {}) => {
    return addToast({ type: 'info', message, ...options });
  }, [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

// Toast Container
const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return createPortal(
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

// Individual Toast Component
const Toast = ({ toast, onRemove }) => {
  const { id, type, title, message, duration, action } = toast;

  const variants = {
    success: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      className: 'bg-gradient-to-r from-green-500 to-green-600 border-green-400/50',
      iconClassName: 'text-green-100',
    },
    error: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      ),
      className: 'bg-gradient-to-r from-red-500 to-red-600 border-red-400/50',
      iconClassName: 'text-red-100',
    },
    warning: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ),
      className: 'bg-gradient-to-r from-yellow-500 to-yellow-600 border-yellow-400/50',
      iconClassName: 'text-yellow-100',
    },
    info: {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      className: 'bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400/50',
      iconClassName: 'text-blue-100',
    },
  };

  const variant = variants[type] || variants.info;

  return (
    <div
      className={`min-w-80 max-w-md glass-card border ${variant.className} shadow-xl`}
    >
      <div className="flex items-start p-4">
        {/* Icon */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${variant.iconClassName} bg-white/20`}
        >
          {variant.icon}
        </div>

        {/* Content */}
        <div className="ml-3 flex-1 min-w-0">
          {title && (
            <h4
              className="text-sm font-semibold text-white mb-1"
            >
              {title}
            </h4>
          )}
          
          <p
            className="text-sm text-white/90"
          >
            {message}
          </p>

          {/* Action Button */}
          {action && (
            <div
              className="mt-3"
            >
              <button
                onClick={() => {
                  action.onClick?.();
                  onRemove(id);
                }}
                className="text-xs font-medium text-white/90 hover:text-white underline transition-colors"
              >
                {action.label}
              </button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => onRemove(id)}
          className="flex-shrink-0 ml-3 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <ButtonIcon.Close />
        </button>
      </div>

      {/* Progress Bar */}
      {duration !== Infinity && (
        <div
          className="h-1 bg-white/20"
        />
      )}
    </div>
  );
};

// Hook for easy toast usage
export const useToastNotifications = () => {
  const toast = useToast();

  return {
    showSuccess: (message, options) => toast.success(message, options),
    showError: (message, options) => toast.error(message, options),
    showWarning: (message, options) => toast.warning(message, options),
    showInfo: (message, options) => toast.info(message, options),
    removeToast: toast.removeToast,
  };
};

export default Toast; 