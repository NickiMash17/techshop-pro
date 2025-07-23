// asyncHandler.js
// Middleware to wrap async route handlers and forward errors to Express error handler

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler; 