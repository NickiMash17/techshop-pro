import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
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
import './styles/globals.css';
import { Toaster } from 'react-hot-toast';

// Error Fallback Component
const ErrorFallback = ({ error }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
    <pre className="text-sm bg-surface/50 p-4 rounded-lg">{error.message}</pre>
  </div>
);

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <NotificationProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <div className="min-h-screen bg-gradient-to-br from-background to-surface flex flex-col">
                  <MobileEnhancements />
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
                      </Routes>
                    </main>
                  </Suspense>
                  <Footer />
                  <ScrollToTop />
                </div>
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </NotificationProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;