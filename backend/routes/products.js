// Copyright (c) 2025 Nickimash17. All rights reserved.
// Trademark: "TechShop Pro" is a trademark of Nickimash17.
// This code was written by Nickimash17. Unauthorized copying or distribution is prohibited.

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getFeaturedProducts,
  advancedSearch,
  addReview,
  getReviews,
} = require("../controllers/productController");

// Public routes
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/search", advancedSearch);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);
router.get("/:id/reviews", getReviews);

// Protected routes (require authentication)
router.use(protect);

// Admin routes (require admin privileges)
router.post("/", admin, createProduct);
router.put("/:id", admin, updateProduct);
router.delete("/:id", admin, deleteProduct);
router.post("/:id/reviews", addReview);

module.exports = router;
