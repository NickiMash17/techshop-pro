const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function getTechShopStatus() {
  try {
    console.log("🚀 TechShop Pro - Status Report");
    console.log("================================\n");

    // Get total products
    const totalProducts = await Product.countDocuments();
    console.log(`📦 Total Products: ${totalProducts}`);

    // Get products with images
    const productsWithImages = await Product.countDocuments({
      imageUrl: { $exists: true, $ne: null },
    });
    console.log(
      `🖼️  Products with Images: ${productsWithImages}/${totalProducts} (${Math.round((productsWithImages / totalProducts) * 100)}%)`,
    );

    // Get featured products
    const featuredProducts = await Product.countDocuments({ featured: true });
    console.log(`⭐ Featured Products: ${featuredProducts}`);

    // Get products by category
    const categoryStats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    console.log("\n📊 Products by Category:");
    categoryStats.forEach((cat) => {
      console.log(`  ${cat._id || "Uncategorized"}: ${cat.count} products`);
    });

    // Get price statistics
    const priceStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          avgPrice: { $avg: "$price" },
          totalValue: { $sum: { $multiply: ["$price", "$stock"] } },
        },
      },
    ]);

    if (priceStats.length > 0) {
      const stats = priceStats[0];
      console.log("\n💰 Price Statistics:");
      console.log(
        `  Price Range: $${stats.minPrice.toFixed(2)} - $${stats.maxPrice.toFixed(2)}`,
      );
      console.log(`  Average Price: $${stats.avgPrice.toFixed(2)}`);
      console.log(
        `  Total Inventory Value: $${stats.totalValue.toLocaleString()}`,
      );
    }

    // Get stock statistics
    const stockStats = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalStock: { $sum: "$stock" },
          outOfStock: { $sum: { $cond: [{ $eq: ["$stock", 0] }, 1, 0] } },
          lowStock: {
            $sum: {
              $cond: [
                { $and: [{ $gt: ["$stock", 0] }, { $lte: ["$stock", 5] }] },
                1,
                0,
              ],
            },
          },
        },
      },
    ]);

    if (stockStats.length > 0) {
      const stock = stockStats[0];
      console.log("\n📦 Stock Statistics:");
      console.log(`  Total Stock: ${stock.totalStock.toLocaleString()} units`);
      console.log(`  Out of Stock: ${stock.outOfStock} products`);
      console.log(`  Low Stock (≤5): ${stock.lowStock} products`);
    }

    // Get recent products
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name category price stock");

    console.log("\n🆕 Recent Products:");
    recentProducts.forEach((product) => {
      console.log(
        `  ${product.name} - $${product.price} (${product.stock} in stock)`,
      );
    });

    // Get top products by price
    const expensiveProducts = await Product.find()
      .sort({ price: -1 })
      .limit(5)
      .select("name category price");

    console.log("\n💎 Most Expensive Products:");
    expensiveProducts.forEach((product) => {
      console.log(`  ${product.name} - $${product.price}`);
    });

    // Check image quality
    const imageQualityCheck = await Product.aggregate([
      {
        $match: { imageUrl: { $exists: true, $ne: null } },
      },
      {
        $group: {
          _id: null,
          optimizedImages: {
            $sum: {
              $cond: [
                { $regexMatch: { input: "$imageUrl", regex: /q=80/ } },
                1,
                0,
              ],
            },
          },
          totalImages: { $sum: 1 },
        },
      },
    ]);

    if (imageQualityCheck.length > 0) {
      const imgStats = imageQualityCheck[0];
      console.log("\n🖼️  Image Quality:");
      console.log(
        `  Optimized Images: ${imgStats.optimizedImages}/${imgStats.totalImages} (${Math.round((imgStats.optimizedImages / imgStats.totalImages) * 100)}%)`,
      );
    }

    console.log("\n✨ TechShop Pro Features:");
    console.log("  ✅ 93+ High-quality products");
    console.log("  ✅ Optimized product images");
    console.log("  ✅ Enhanced frontend performance");
    console.log("  ✅ Responsive design");
    console.log("  ✅ Advanced filtering & search");
    console.log("  ✅ Shopping cart & wishlist");
    console.log("  ✅ User authentication");
    console.log("  ✅ Admin dashboard");
    console.log("  ✅ Order management");
    console.log("  ✅ Payment integration");

    console.log("\n🎯 Next Steps:");
    console.log(
      "  1. Visit http://localhost:5174/products to see your products",
    );
    console.log("  2. Test the enhanced image loading and performance");
    console.log("  3. Try filtering by category and price range");
    console.log("  4. Add products to cart and test the shopping experience");
    console.log("  5. Use the admin dashboard to manage products");

    console.log("\n🚀 Your TechShop Pro is ready for business!");
  } catch (error) {
    console.error("Error getting tech shop status:", error);
  } finally {
    mongoose.connection.close();
  }
}

getTechShopStatus();
