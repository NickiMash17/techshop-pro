import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center py-16"
    >
      <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
      <p className="text-gray-400 mb-8">
        Thank you for your purchase. We'll send you an email with your order details.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/products"
          className="px-6 py-3 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          to="/orders"
          className="px-6 py-3 bg-surface rounded-lg hover:bg-surface/70 transition-colors"
        >
          View Orders
        </Link>
      </div>
    </motion.div>
  );
};

export default OrderSuccess;