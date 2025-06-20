const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Test route (can keep for debugging)
router.get('/test', (req, res) => {
  res.json({ message: 'Auth route is working' });
});

// Auth routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;