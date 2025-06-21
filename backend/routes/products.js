const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory
} = require('../controllers/productController');

// Public routes
router.get('/', getAllProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProductById);

// Protected routes (require authentication)
router.use(protect);

// Admin routes (require admin privileges)
router.post('/', admin, createProduct);
router.put('/:id', admin, updateProduct);
router.delete('/:id', admin, deleteProduct);

module.exports = router;