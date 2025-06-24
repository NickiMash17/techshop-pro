const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      status: "error",
      message: "Access denied. Admin privileges required.",
    });
  }
};

module.exports = { admin };
