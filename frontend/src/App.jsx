import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/common/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './components/cart/Cart';
import './styles/globals.css';

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-background to-surface">
            <Header />
            <Suspense fallback={<Loading />}>
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </main>
            </Suspense>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;