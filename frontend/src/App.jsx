import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartProvider from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from 'react-error-boundary';
import Header from './components/common/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './components/cart/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ProductDetail from './pages/ProductDetail';
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
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-background to-surface">
              <Toaster position="top-right" />
              <Header />
              <Suspense fallback={<Loading />}>
                <main className="container mx-auto px-4 py-8">
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
                  </Routes>
                </main>
              </Suspense>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;