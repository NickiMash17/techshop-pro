const Order = require("../models/Order");
const Product = require("../models/Product");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");
const nodemailer = require("nodemailer");

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Order must contain at least one item" });
    }

    // Calculate total and validate stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const productId = item.productId || item.product;
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product ${productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`,
        });
      }

      totalAmount += product.price * item.quantity;
      orderItems.push({
        product: productId,
        quantity: item.quantity,
        price: product.price,
      });

      // Update stock
      await Product.findByIdAndUpdate(productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // Convert USD total to ZAR (approximate rate)
    const USD_TO_ZAR_RATE = 18.5;
    const totalAmountZAR = totalAmount * USD_TO_ZAR_RATE;

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmountZAR * 100), // Convert ZAR to cents
      currency: "zar", // Changed from 'usd' to 'zar' for South African Rand
      metadata: {
        userId: req.user.id,
      },
    });

    const order = new Order({
      user: req.user.id,
      items: orderItems,
      totalAmount: totalAmountZAR, // Store total in ZAR
      paymentMethod,
      shippingAddress,
      stripePaymentIntentId: paymentIntent.id,
    });

    await order.save();

    // Send order confirmation email
    const user = await User.findById(req.user.id);
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    let itemsList = orderItems
      .map(
        (item) =>
          `- ${item.quantity} x Product ID: ${item.product} ($${item.price})`,
      )
      .join("\n");
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Order Confirmation",
      text: `Thank you for your order!\n\nOrder ID: ${order._id}\nTotal: $${order.totalAmount}\nItems:\n${itemsList}\n\nWe will notify you when your order ships.`,
    };
    await transporter.sendMail(mailOptions);

    res.status(201).json({
      order,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if user owns the order or is admin
    if (
      order.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status (Admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    ).populate("items.product user");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Send status update email
    const user = order.user;
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: `Order Status Update: ${status}`,
      text: `Hello ${user.name},\n\nYour order (ID: ${order._id}) status has been updated to: ${status}.\n\nThank you for shopping with us!`,
    };
    await transporter.sendMail(mailOptions);
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let query = {};
    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate("user", "name email")
      .populate("items.product")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalOrders: total,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Confirm payment
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const order = await Order.findOne({
      stripePaymentIntentId: paymentIntentId,
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Verify payment with Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === "succeeded") {
      order.paymentStatus = "completed";
      order.status = "processing";
      await order.save();

      res.json({ message: "Payment confirmed", order });
    } else {
      res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
