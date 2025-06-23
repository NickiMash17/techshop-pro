import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import MobileEnhancements from './components/common/MobileEnhancements';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './components/cart/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import NotificationProvider from './components/common/NotificationSystem';
import ScrollToTop from './components/common/ScrollToTop';
import Profile from './pages/Profile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import { initializePerformance } from './utils/performance';
import './styles/globals.css';
import { Toaster } from 'react-hot-toast';

// Global error handler
const handleGlobalError = (error, errorInfo) => {
  console.error('Global error caught:', error, errorInfo);
  // You can send this to an error reporting service
};

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-background to-surface">
    <div className="glass-card p-8 max-w-md w-full text-center">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
      <p className="text-gray-400 mb-6">We're sorry, but something unexpected happened.</p>
      <pre className="text-sm bg-surface/50 p-4 rounded-lg mb-6 overflow-auto max-h-32">
        {error.message}
      </pre>
      <div className="flex gap-4 justify-center">
        <button 
          onClick={resetErrorBoundary}
          className="btn-primary"
        >
          Try Again
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="btn-secondary"
        >
          Refresh Page
        </button>
      </div>
    </div>
  </div>
);

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-surface">
    <div className="glass-card p-8 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-gray-400">Loading...</p>
    </div>
  </div>
);

function App() {
  // Initialize performance optimizations
  useEffect(() => {
    initializePerformance();
  }, []);

  // Global error handling
  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      event.preventDefault();
    };

    const handleError = (event) => {
      console.error('Global error:', event.error);
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onError={handleGlobalError}
        onReset={() => {
          // Reset the state of your app here
          window.location.reload();
        }}
      >
        <NotificationProvider>
          <div className="min-h-screen bg-gradient-to-br from-background to-surface flex flex-col">
            {/* Temporarily disabled to fix infinite loop errors */}
            {/* <MobileEnhancements /> */}
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(30, 41, 59, 0.9)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                },
              }}
            />
            <Header />
            <Suspense fallback={<Loading />}>
              <main className="flex-1" role="main">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/order-success"
                    element={
                      <ProtectedRoute>
                        <OrderSuccess />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                  <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
                  {/* Catch-all route for other pages */}
                  <Route path="*" element={
                    <div className="container-responsive section-padding">
                      <div className="text-center py-20">
                        <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
                        <p className="text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
                        <Link to="/" className="btn-primary">
                          Go Back Home
                        </Link>
                      </div>
                    </div>
                  } />
                </Routes>
              </main>
            </Suspense>
            <Footer />
            <ScrollToTop />
          </div>
        </NotificationProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;