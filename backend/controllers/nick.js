// Copyright (c) 2025 Nickimash17. All rights reserved.
// Trademark: "TechShop Pro" is a trademark of Nickimash17.
// This code was written by Nickimash17. Unauthorized copying or distribution is prohibited.
imash17 / techshop - pro / backend / routes / products.js;
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Get all products
router.get("/", productController.getAllProducts);

// Get single product
router.get("/:id", productController.getProductById);

// Create new product
router.post("/", productController.createProduct);

module.exports = router;
