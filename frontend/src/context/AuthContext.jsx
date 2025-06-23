import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { authAPI } from '../utils/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      const { token, ...userData } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Login successful!');
      return userData;
    } catch (error) {
      let message = 'Failed to login';
      
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.status === 429) {
        message = 'Too many login attempts. Please wait a moment and try again.';
      } else if (error.response?.status === 401) {
        message = 'Invalid email or password';
      } else if (error.message) {
        message = error.message;
      }
      
      toast.error(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const res = await authAPI.register(userData);
      const { token, ...userWithoutToken } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutToken));
      setUser(userWithoutToken);
      toast.success('Registration successful!');
      return userWithoutToken;
    } catch (error) {
      let message = 'Failed to register';
      
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.response?.status === 429) {
        message = 'Too many registration attempts. Please wait a moment and try again.';
      } else if (error.response?.status === 400) {
        message = error.response.data.message || 'Invalid registration data';
      } else if (error.message) {
        message = error.message;
      }
      
      toast.error(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register,
      logout, 
      updateUser,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};