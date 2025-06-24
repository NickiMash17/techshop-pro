import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import Button, { ButtonIcon } from './Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  ...props
}) => {
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, closeOnEscape]);

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOnOverlayClick ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            className={`relative w-full ${sizes[size]} ${className}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3 
            }}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            <div className="glass-card overflow-hidden">
              {/* Header */}
              {(title || showCloseButton) && (
                <motion.div
                  className="flex items-center justify-between p-6 border-b border-white/10"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {title && (
                    <motion.h2
                      className="text-xl font-semibold text-white"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {title}
                    </motion.h2>
                  )}
                  
                  {showCloseButton && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="p-2 hover:bg-white/10"
                        icon={<ButtonIcon.Close />}
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Content */}
              <motion.div
                className="p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal to render modal at the top level
  return createPortal(modalContent, document.body);
};

// Modal Header component
export const ModalHeader = ({ children, className = '' }) => (
  <motion.div
    className={`flex items-center justify-between p-6 border-b border-white/10 ${className}`}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
  >
    {children}
  </motion.div>
);

// Modal Body component
export const ModalBody = ({ children, className = '' }) => (
  <motion.div
    className={`p-6 ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    {children}
  </motion.div>
);

// Modal Footer component
export const ModalFooter = ({ children, className = '' }) => (
  <motion.div
    className={`flex items-center justify-end space-x-3 p-6 border-t border-white/10 ${className}`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
  >
    {children}
  </motion.div>
);

// Confirmation Modal
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  ...props
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size="sm"
    {...props}
  >
    <ModalBody>
      <p className="text-gray-300 mb-6">{message}</p>
    </ModalBody>
    
    <ModalFooter>
      <Button
        variant="secondary"
        onClick={onClose}
      >
        {cancelText}
      </Button>
      <Button
        variant={variant}
        onClick={() => {
          onConfirm();
          onClose();
        }}
      >
        {confirmText}
      </Button>
    </ModalFooter>
  </Modal>
);

// Alert Modal
export const AlertModal = ({
  isOpen,
  onClose,
  title = 'Alert',
  message,
  variant = 'primary',
  buttonText = 'OK',
  ...props
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title={title}
    size="sm"
    {...props}
  >
    <ModalBody>
      <p className="text-gray-300 mb-6">{message}</p>
    </ModalBody>
    
    <ModalFooter>
      <Button
        variant={variant}
        onClick={onClose}
        fullWidth
      >
        {buttonText}
      </Button>
    </ModalFooter>
  </Modal>
);

export default Modal; 