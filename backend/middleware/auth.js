const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // TODO: Implement auth middleware
  next();
};

module.exports = authMiddleware;