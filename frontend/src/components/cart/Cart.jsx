import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (!cartItems?.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link 
          to="/products" 
          className="inline-block px-6 py-3 bg-primary rounded-full hover:bg-primary/90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-surface/50 p-4 rounded-xl">
              <img 
                src={item.images?.[0] || item.image} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => {
                      const newQuantity = item.quantity - 1;
                      updateQuantity(item.id, newQuantity);
                      if (newQuantity > 0) {
                        toast.success(`Quantity updated to ${newQuantity}`, {
                          duration: 1500,
                          position: 'top-right',
                          style: {
                            background: '#1f2937',
                            color: '#fff',
                            border: '1px solid #374151',
                          },
                        });
                      }
                    }}
                    className="px-3 py-1 bg-surface rounded-lg hover:bg-surface/70 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => {
                      const newQuantity = item.quantity + 1;
                      updateQuantity(item.id, newQuantity);
                      toast.success(`Quantity updated to ${newQuantity}`, {
                        duration: 1500,
                        position: 'top-right',
                        style: {
                          background: '#1f2937',
                          color: '#fff',
                          border: '1px solid #374151',
                        },
                      });
                    }}
                    className="px-3 py-1 bg-surface rounded-lg hover:bg-surface/70 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => {
                    removeFromCart(item.id);
                    toast.success(`${item.name} removed from cart`, {
                      duration: 2000,
                      position: 'top-right',
                      style: {
                        background: '#1f2937',
                        color: '#fff',
                        border: '1px solid #374151',
                      },
                    });
                  }}
                  className="text-sm text-red-500 hover:text-red-400 mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-surface/50 p-6 rounded-xl sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-700 my-4"></div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;