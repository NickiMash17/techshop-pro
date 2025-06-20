const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Product = require('../models/Product');

// Get all products (public route)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().select('-__v');
    res.status(200).json({
      status: 'success',
      count: products.length,
      data: products
    });
  } catch (error) {
    console.error('Products fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch products'
    });
  }
});

// Protected routes
router.use(protect);

// Create new product (protected)
router.post('/', async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    console.error('Product creation error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Failed to create product'
    });
  }
});

// Get single product (protected)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select('-__v');
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'Product not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: product
    });
  } catch (error) {
    console.error('Product fetch error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch product'
    });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;