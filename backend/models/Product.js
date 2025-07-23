// Copyright (c) 2024 Nickimash17. All rights reserved.
// Trademark: "TechShop Pro" is a trademark of Nickimash17.
// This code was written by Nickimash17. Unauthorized copying or distribution is prohibited.

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: Object.values(require("../utils/constants").PRODUCT_CATEGORIES),
    },
    imageUrl: String,
    specs: {
      type: Map,
      of: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Recalculate average rating before saving
productSchema.pre("save", function (next) {
  if (this.isModified("reviews") && this.reviews.length > 0) {
    const totalRating = this.reviews.reduce((acc, item) => item.rating + acc, 0);
    this.averageRating = totalRating / this.reviews.length;
  } else if (this.reviews.length === 0) {
    this.averageRating = 0;
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
