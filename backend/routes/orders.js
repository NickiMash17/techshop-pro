// Copyright (c) 2025 Nickimash17. All rights reserved.
// Trademark: "TechShop Pro" is a trademark of Nickimash17.
// This code was written by Nickimash17. Unauthorized copying or distribution is prohibited.

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  confirmPayment,
} = require("../controllers/orderController");
const Order = require("../models/Order");

// All order routes require authentication
router.use(protect);

// User routes
router.post("/", createOrder);
router.get("/my-orders", getUserOrders);
router.get("/:id", getOrderById);
router.post("/confirm-payment", confirmPayment);

// Admin routes
router.get("/", admin, getAllOrders);
router.put("/:id/status", admin, updateOrderStatus);

// DEBUG: List all orders (remove after debugging!)
router.get("/debug/all", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
