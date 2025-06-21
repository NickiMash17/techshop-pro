import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastProvider } from './components/common/Toast';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { FullScreenLoading } from './components/common/Loading';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './components/cart/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import './styles/globals.css';

// Error Fallback Component
const ErrorFallback = ({ error }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4">
    <div className="glass-card p-8 text-center max-w-md">
      <h2 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h2>
      <p className="text-gray-400 mb-4">We're sorry, but something unexpected happened.</p>
      <pre className="text-sm bg-surface/50 p-4 rounded-lg overflow-auto max-h-32">
        {error.message}
      </pre>
      <button 
        onClick={() => window.location.reload()} 
        className="btn-primary mt-4"
      >
        Reload Page
      </button>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-gradient-to-br from-background to-surface flex flex-col">
              <Header />
              <main className="flex-1 w-full" role="main">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                  <Suspense fallback={<FullScreenLoading text="Loading TechShop Pro..." />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/products/:id" element={<ProductDetail />} />
                      <Route
                        path="/cart"
                        element={
                          <ProtectedRoute>
                            <Cart />
                          </ProtectedRoute>
                        }
                      />
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
                  </Suspense>
                </div>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;