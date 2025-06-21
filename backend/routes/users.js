const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getProfile,
  updateProfile
} = require('../controllers/userController');

// All user routes require authentication
router.use(protect);

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

module.exports = router; 