// Copyright (c) 2024 Nickimash17. All rights reserved.
// Trademark: "TechShop Pro" is a trademark of Nickimash17.
// This code was written by Nickimash17. Unauthorized copying or distribution is prohibited.

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`🗄️  MongoDB connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
