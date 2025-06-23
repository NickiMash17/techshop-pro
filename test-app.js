import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Test configuration
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'testpassword123'
};

let authToken = null;
let testOrderId = null;

// Helper function to make authenticated requests
const makeAuthRequest = (method, endpoint, data = null) => {
  const config = {
    method,
    url: `${API_BASE_URL}${endpoint}`,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` })
    }
  };
  
  if (data) {
    config.data = data;
  }
  
  return axios(config);
};

// Test functions
const testHealthCheck = async () => {
  console.log('🔍 Testing health check...');
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check passed:', response.data.status);
    return true;
  } catch (error) {
    console.error('❌ Health check failed:', error.message);
    return false;
  }
};

const testRegistration = async () => {
  console.log('🔍 Testing user registration...');
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, testUser);
    authToken = response.data.token;
    console.log('✅ Registration successful:', response.data.email);
    return true;
  } catch (error) {
    if (error.response?.data?.message === 'Email already registered') {
      console.log('⚠️  User already exists, trying login...');
      return await testLogin();
    }
    console.error('❌ Registration failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testLogin = async () => {
  console.log('🔍 Testing user login...');
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password
    });
    authToken = response.data.token;
    console.log('✅ Login successful:', response.data.email);
    return true;
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testGetProducts = async () => {
  console.log('🔍 Testing products endpoint...');
  try {
    const response = await makeAuthRequest('GET', '/products');
    console.log(`✅ Products loaded: ${response.data.products?.length || 0} products`);
    return response.data.products?.length > 0;
  } catch (error) {
    console.error('❌ Products fetch failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testCreateOrder = async () => {
  console.log('🔍 Testing order creation...');
  try {
    // First get a product to order
    const productsResponse = await makeAuthRequest('GET', '/products');
    const products = productsResponse.data.products;
    
    if (!products || products.length === 0) {
      console.log('⚠️  No products available for testing order creation');
      return false;
    }
    
    const testOrder = {
      items: [{
        product: products[0]._id,
        quantity: 1
      }],
      shippingAddress: {
        street: '123 Test St',
        city: 'Test City',
        state: 'TS',
        zipCode: '12345',
        country: 'Test Country'
      },
      paymentMethod: 'card'
    };
    
    const response = await makeAuthRequest('POST', '/orders', testOrder);
    testOrderId = response.data.order._id;
    console.log('✅ Order created successfully:', testOrderId);
    return true;
  } catch (error) {
    console.error('❌ Order creation failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testGetUserOrders = async () => {
  console.log('🔍 Testing user orders fetch...');
  try {
    const response = await makeAuthRequest('GET', '/orders/my-orders');
    console.log(`✅ User orders loaded: ${response.data.orders?.length || 0} orders`);
    return response.data.orders?.length >= 0;
  } catch (error) {
    console.error('❌ User orders fetch failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testGetOrderById = async () => {
  if (!testOrderId) {
    console.log('⚠️  No test order ID available');
    return false;
  }
  
  console.log('🔍 Testing get order by ID...');
  try {
    const response = await makeAuthRequest('GET', `/orders/${testOrderId}`);
    console.log('✅ Order details loaded:', response.data._id);
    return true;
  } catch (error) {
    console.error('❌ Get order by ID failed:', error.response?.data?.message || error.message);
    return false;
  }
};

const testUserProfile = async () => {
  console.log('🔍 Testing user profile...');
  try {
    const response = await makeAuthRequest('GET', '/users/profile');
    console.log('✅ User profile loaded:', response.data.email);
    return true;
  } catch (error) {
    console.error('❌ User profile fetch failed:', error.response?.data?.message || error.message);
    return false;
  }
};

// Main test runner
const runTests = async () => {
  console.log('🚀 Starting TechShop Pro Application Tests\n');
  
  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'Registration/Login', fn: testRegistration },
    { name: 'Get Products', fn: testGetProducts },
    { name: 'Create Order', fn: testCreateOrder },
    { name: 'Get User Orders', fn: testGetUserOrders },
    { name: 'Get Order by ID', fn: testGetOrderById },
    { name: 'User Profile', fn: testUserProfile }
  ];
  
  let passedTests = 0;
  let totalTests = tests.length;
  
  for (const test of tests) {
    console.log(`\n--- ${test.name} ---`);
    const result = await test.fn();
    if (result) {
      passedTests++;
    }
    console.log(`--- End ${test.name} ---\n`);
  }
  
  console.log('📊 Test Results:');
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 All tests passed! Your application is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
};

// Run tests if this file is executed directly
runTests().catch(console.error); 