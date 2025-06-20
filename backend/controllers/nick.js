imash17/techshop-pro/backend/routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Get all products
router.get('/', productController.getAllProducts);

// Get single product
router.get('/:id', productController.getProductById);

// Create new product
router.post('/', productController.createProduct);

module.exports = router;