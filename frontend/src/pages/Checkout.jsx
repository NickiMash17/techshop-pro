// Copyright (c) 2024 Nickimash17. All rights reserved.
// Trademark: "TechShop Pro" is a trademark of Nickimash17.
// This code was written by Nickimash17. Unauthorized copying or distribution is prohibited.

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { calculateSubtotal } from '../utils/cartUtils';
import toast from 'react-hot-toast';
import { formatCurrency } from '../utils/currency';
import { ordersAPI } from '../utils/api';
import EnhancedImage from '../components/common/EnhancedImage';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
    country: 'South Africa'
  });
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const [cardData, setCardData] = React.useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });
  const [errors, setErrors] = React.useState({});

  // Calculate totals
  const subtotal = calculateSubtotal(cartItems);
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Form validation
  const validateForm = () => {
    console.log('DEBUG: validateForm called');
    const newErrors = {};

    // Shipping validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      console.log('DEBUG: name validation failed');
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      console.log('DEBUG: email validation failed - empty');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      console.log('DEBUG: email validation failed - invalid format');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      console.log('DEBUG: phone validation failed');
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      console.log('DEBUG: address validation failed');
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      console.log('DEBUG: city validation failed');
    }
    if (!formData.province.trim()) {
      newErrors.province = 'Province is required';
      console.log('DEBUG: province validation failed');
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
      console.log('DEBUG: postalCode validation failed');
    }

    // Payment validation
    if (paymentMethod === 'card') {
      if (!cardData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(cardData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number format';
      }
      if (!cardData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) newErrors.expiryDate = 'Invalid expiry date format';
      if (!cardData.cvv.trim()) newErrors.cvv = 'CVV is required';
      else if (!/^\d{3,4}$/.test(cardData.cvv)) newErrors.cvv = 'Invalid CVV';
      if (!cardData.cardholderName.trim()) newErrors.cardholderName = 'Cardholder name is required';
    }

    console.log('DEBUG: newErrors:', newErrors);
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('DEBUG: isValid:', isValid);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return; // Max 16 digits + 3 spaces
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    }

    // Format CVV
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }

    setCardData(prevState => ({
      ...prevState,
      [name]: formattedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNextStep = () => {
    console.log('DEBUG: handleNextStep called');
    console.log('DEBUG: formData before validation:', formData);
    
    // Check if all required fields are filled
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'province', 'postalCode'];
    const missingFields = requiredFields.filter(field => !formData[field] || !formData[field].trim());
    
    // Check email format
    const emailValid = /\S+@\S+\.\S+/.test(formData.email);
    
    if (missingFields.length > 0) {
      console.log('DEBUG: Missing fields:', missingFields);
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }
    
    if (!emailValid) {
      console.log('DEBUG: Invalid email format');
      toast.error('Please enter a valid email address');
      return;
    }
    
    console.log('DEBUG: All validation passed, proceeding to payment');
    setCurrentStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚨 handleSubmit called!');
    
    // Validate payment form
    if (paymentMethod === 'card') {
      const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
      const missingCardFields = cardFields.filter(field => !cardData[field] || !cardData[field].trim());
      
      if (missingCardFields.length > 0) {
        console.log('DEBUG: Missing card fields:', missingCardFields);
        toast.error(`Please fill in: ${missingCardFields.join(', ')}`);
        return;
      }
      
      // Validate card number format (16 digits)
      const cardNumberClean = cardData.cardNumber.replace(/\s/g, '');
      if (!/^\d{16}$/.test(cardNumberClean)) {
        toast.error('Please enter a valid 16-digit card number');
        return;
      }
      
      // Validate expiry date format (MM/YY)
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
        toast.error('Please enter expiry date in MM/YY format');
        return;
      }
      
      // Validate CVV (3-4 digits)
      if (!/^\d{3,4}$/.test(cardData.cvv)) {
        toast.error('Please enter a valid CVV (3-4 digits)');
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Prepare order data for backend
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id || item._id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.province,
          zipCode: formData.postalCode,
          country: formData.country
        },
        paymentMethod: paymentMethod,
        total: total,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax
      };

      console.log('Sending order data:', orderData);

      // Create order in backend
      const response = await ordersAPI.create(orderData);
      
      console.log('Order created:', response.data);

      clearCart();
      toast.success('Order placed successfully!');
      navigate('/order-success');
    } catch (error) {
      console.error('Order creation failed:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to create order. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container-responsive section-padding">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-32 h-32 bg-red-500/20 rounded-full mx-auto mb-8 flex items-center justify-center">
            <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-white">Your cart is empty</h2>
          <p className="text-gray-400 mb-8 text-lg">Add some products to your cart before checkout</p>
          <button 
            onClick={() => navigate('/products')}
            className="btn-primary px-8 py-4 text-lg"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-gray-400">Complete your purchase</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-primary' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-500'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-500'}`}></div>
            <div className={`flex items-center ${currentStep >= 2 ? 'text-primary' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                currentStep >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-500'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <div
                  key="shipping"
                  className="space-y-8"
                >
                  {/* Shipping Information */}
                  <div className="glass-card p-8 rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-white">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      Shipping Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                            errors.name ? 'border-red-500' : 'border-white/10'
                          }`}
                          required
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                            errors.email ? 'border-red-500' : 'border-white/10'
                          }`}
                          required
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+27..."
                          className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                            errors.phone ? 'border-red-500' : 'border-white/10'
                          }`}
                          required
                        />
                        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Country</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-surface/30 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        >
                          <option value="South Africa">South Africa</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Egypt">Egypt</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Morocco">Morocco</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Tanzania">Tanzania</option>
                          <option value="Uganda">Uganda</option>
                          <option value="Algeria">Algeria</option>
                          <option value="Angola">Angola</option>
                          <option value="Botswana">Botswana</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Ivory Coast">Ivory Coast</option>
                          <option value="Democratic Republic of the Congo">Democratic Republic of the Congo</option>
                          <option value="Republic of the Congo">Republic of the Congo</option>
                          <option value="Mozambique">Mozambique</option>
                          <option value="Namibia">Namibia</option>
                          <option value="Rwanda">Rwanda</option>
                          <option value="Senegal">Senegal</option>
                          <option value="Tunisia">Tunisia</option>
                          <option value="Zambia">Zambia</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 text-white">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                            errors.address ? 'border-red-500' : 'border-white/10'
                          }`}
                          required
                        />
                        {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                            errors.city ? 'border-red-500' : 'border-white/10'
                          }`}
                          required
                        />
                        {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Province</label>
                        <input
                          type="text"
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                            errors.province ? 'border-red-500' : 'border-white/10'
                          }`}
                          required
                        />
                        {errors.province && <p className="text-red-400 text-sm mt-1">{errors.province}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2 text-white">Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                            errors.postalCode ? 'border-red-500' : 'border-white/10'
                          }`}
                          required
                        />
                        {errors.postalCode && <p className="text-red-400 text-sm mt-1">{errors.postalCode}</p>}
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="btn-primary px-8 py-3"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div
                  key="payment"
                  className="space-y-8"
                >
                  <form onSubmit={handleSubmit}>
                    {/* Payment Method */}
                    <div className="glass-card p-8 rounded-2xl">
                      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-white">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        Payment Method
                      </h2>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 border border-white/10 rounded-xl hover:border-primary/30 transition-colors">
                          <input
                            type="radio"
                            id="card"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-5 h-5 text-primary"
                          />
                          <label htmlFor="card" className="flex items-center gap-3 cursor-pointer text-white">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            Credit/Debit Card
                          </label>
                        </div>
                        
                        <div className="flex items-center gap-4 p-4 border border-white/10 rounded-xl hover:border-primary/30 transition-colors">
                          <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-5 h-5 text-primary"
                          />
                          <label htmlFor="paypal" className="flex items-center gap-3 cursor-pointer text-white">
                            <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.067 8.478c.492.315.844.825.844 1.478 0 .653-.352 1.163-.844 1.478-.492.315-1.163.478-1.844.478H18.5v-1.956h-.203c-.681 0-1.352-.163-1.844-.478-.492-.315-.844-.825-.844-1.478 0-.653.352-1.163.844-1.478.492-.315 1.163-.478 1.844-.478H18.5V5h.203c.681 0 1.352.163 1.844.478zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm-1-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm7 7h-2v-2h2v2zm0-4h-2v-6h2v6z"/>
                            </svg>
                            PayPal
                          </label>
                        </div>
                      </div>

                      {paymentMethod === 'card' && (
                        <div 
                          className="mt-8 space-y-6"
                        >
                          <div>
                            <label className="block text-sm font-medium mb-2 text-white">Card Number</label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={cardData.cardNumber}
                              onChange={handleCardChange}
                              placeholder="1234 5678 9012 3456"
                              className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                                errors.cardNumber ? 'border-red-500' : 'border-white/10'
                              }`}
                              required
                            />
                            {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2 text-white">Expiry Date</label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={cardData.expiryDate}
                                onChange={handleCardChange}
                                placeholder="MM/YY"
                                className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                                  errors.expiryDate ? 'border-red-500' : 'border-white/10'
                                }`}
                                required
                              />
                              {errors.expiryDate && <p className="text-red-400 text-sm mt-1">{errors.expiryDate}</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2 text-white">CVV</label>
                              <input
                                type="text"
                                name="cvv"
                                value={cardData.cvv}
                                onChange={handleCardChange}
                                placeholder="123"
                                className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                                  errors.cvv ? 'border-red-500' : 'border-white/10'
                                }`}
                                required
                              />
                              {errors.cvv && <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2 text-white">Cardholder Name</label>
                              <input
                                type="text"
                                name="cardholderName"
                                value={cardData.cardholderName}
                                onChange={handleCardChange}
                                className={`w-full px-4 py-3 bg-surface/30 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                                  errors.cardholderName ? 'border-red-500' : 'border-white/10'
                                }`}
                                required
                              />
                              {errors.cardholderName && <p className="text-red-400 text-sm mt-1">{errors.cardholderName}</p>}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-8 flex justify-between">
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="px-6 py-3 bg-surface/50 text-white rounded-xl hover:bg-surface/70 transition-colors"
                        >
                          Back to Shipping
                        </button>
                        <button
                          type="submit"
                          disabled={isProcessing}
                          onClick={() => {
                            console.log('🚨 Place Order button clicked!');
                            console.log('🚨 isProcessing:', isProcessing);
                          }}
                          className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                            isProcessing 
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 text-white'
                          }`}
                        >
                          {isProcessing ? (
                            <span className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Processing...
                            </span>
                          ) : (
                            `Place Order - ${formatCurrency(total.toFixed(2))}`
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced Order Summary */}
          <div className="lg:col-span-1">
            <div 
              className="glass-card p-6 rounded-2xl sticky top-24"
            >
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id || item._id} className="flex items-center gap-3 p-3 bg-surface/20 rounded-xl">
                    <EnhancedImage
                      src={item.image || item.imageUrl || item.images?.[0]} 
                      alt={item.name} 
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-white">{item.name}</h4>
                      <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-white">{formatCurrency((item.price * item.quantity).toFixed(2))}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-white">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal.toFixed(2))}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400' : ''}>
                    {shipping === 0 ? 'Free' : formatCurrency(shipping.toFixed(2))}
                  </span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (8%)</span>
                  <span>{formatCurrency(tax.toFixed(2))}</span>
                </div>
                {shipping > 0 && (
                  <div className="text-sm text-green-400 bg-green-400/10 p-3 rounded-lg">
                    Add {formatCurrency((50 - subtotal).toFixed(2))} more for free shipping!
                  </div>
                )}
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between font-bold text-xl text-white">
                    <span>Total</span>
                    <span>{formatCurrency(total.toFixed(2))}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;