import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutStep = ({ children, isActive }) => (
  <div className={`p-6 rounded-xl ${isActive ? 'bg-surface/50' : 'opacity-50'}`}>
    {children}
  </div>
);

const Checkout = () => {
  const { cartItems, calculateSubtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    // TODO: Implement order submission
    clearCart();
    navigate('/order-success');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>
        
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((step) => (
            <div 
              key={step}
              className={`flex items-center ${step < currentStep ? 'text-primary' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${step <= currentStep ? 'bg-primary' : 'bg-surface'}`}>
                {step}
              </div>
              {step < 3 && <div className="flex-1 h-1 mx-2 bg-surface"></div>}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmitOrder}>
          {/* Shipping Details */}
          <CheckoutStep isActive={currentStep === 1}>
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={shippingDetails.fullName}
                onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})}
                className="w-full p-3 bg-surface rounded-lg"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={shippingDetails.email}
                onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                className="w-full p-3 bg-surface rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={shippingDetails.address}
                onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                className="w-full p-3 bg-surface rounded-lg md:col-span-2"
                required
              />
              <input
                type="text"
                placeholder="City"
                value={shippingDetails.city}
                onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                className="w-full p-3 bg-surface rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Postal Code"
                value={shippingDetails.postalCode}
                onChange={(e) => setShippingDetails({...shippingDetails, postalCode: e.target.value})}
                className="w-full p-3 bg-surface rounded-lg"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="mt-6 px-8 py-3 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              Continue to Payment
            </button>
          </CheckoutStep>

          {/* Order Summary */}
          <div className="mt-8 bg-surface/50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between py-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-700 my-4"></div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;