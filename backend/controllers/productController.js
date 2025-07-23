// Copyright (c) 2024 Nickimash17. All rights reserved.
// Trademark: "TechShop Pro" is a trademark of Nickimash17.
// This code was written by Nickimash17. Unauthorized copying or distribution is prohibited.

const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// Get all products
exports.getAllProducts = asyncHandler(async (req, res) => {
  const { category, search, sort, limit = 10, page = 1 } = req.query;
  let query = {};
  if (category) query.category = category;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }
  let sortObj = {};
  if (sort) {
    const [field, order] = sort.split(":");
    sortObj[field] = order === "desc" ? -1 : 1;
  } else {
    sortObj = { createdAt: -1 };
  }
  const skip = (page - 1) * limit;
  const products = await Product.find(query)
    .sort(sortObj)
    .limit(parseInt(limit))
    .skip(skip);
  const total = await Product.countDocuments(query);
  res.json({
    products,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      hasNext: skip + products.length < total,
      hasPrev: page > 1,
    },
  });
});

// Get single product
exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// Create new product (Admin only)
exports.createProduct = asyncHandler(async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
});

// Update product (Admin only)
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// Delete product (Admin only)
exports.deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json({ message: "Product deleted successfully" });
});

// Add a review to a product
exports.addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user.id
  );
  if (alreadyReviewed) {
    return res.status(400).json({ message: "You have already reviewed this product" });
  }
  const review = { user: req.user.id, rating: Number(rating), comment };
  product.reviews.push(review);
  await product.save();
  res.status(201).json({ message: "Review added" });
});

// Get all reviews for a product
exports.getReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "reviews.user",
    "name email"
  );
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product.reviews);
});

// Get products by category (stub)
exports.getProductsByCategory = asyncHandler(async (req, res) => {
  res.status(501).json({ message: 'Not implemented: getProductsByCategory' });
});

// Get featured products (stub)
exports.getFeaturedProducts = asyncHandler(async (req, res) => {
  res.status(501).json({ message: 'Not implemented: getFeaturedProducts' });
});

// Advanced search (stub)
exports.advancedSearch = asyncHandler(async (req, res) => {
  res.status(501).json({ message: 'Not implemented: advancedSearch' });
});
