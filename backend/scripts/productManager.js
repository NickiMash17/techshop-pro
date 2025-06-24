const mongoose = require("mongoose");
const Product = require("../models/Product");
const readline = require("readline");
require("dotenv").config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function showMenu() {
  console.log("\n🛍️  Product Management System");
  console.log("============================");
  console.log("1. View all products");
  console.log("2. View products by category");
  console.log("3. Search products");
  console.log("4. Add new product");
  console.log("5. Update product");
  console.log("6. Delete product");
  console.log("7. Product statistics");
  console.log("8. Exit");
  console.log("============================");
}

async function viewAllProducts() {
  try {
    const products = await Product.find().sort({ name: 1 });
    console.log(`\n📦 Total Products: ${products.length}\n`);

    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   💰 Price: $${product.price}`);
      console.log(`   📂 Category: ${product.category}`);
      console.log(`   📦 Stock: ${product.stock}`);
      console.log(`   ⭐ Featured: ${product.featured ? "Yes" : "No"}`);
      console.log(`   🆔 ID: ${product._id}`);
      console.log("");
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

async function viewProductsByCategory() {
  try {
    const categories = await Product.distinct("category");
    console.log("\n📂 Available categories:");
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat}`);
    });

    const categoryChoice = await question("\nEnter category number: ");
    const selectedCategory = categories[parseInt(categoryChoice) - 1];

    if (!selectedCategory) {
      console.log("❌ Invalid category selection");
      return;
    }

    const products = await Product.find({ category: selectedCategory }).sort({
      name: 1,
    });
    console.log(`\n📦 Products in ${selectedCategory}: ${products.length}\n`);

    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   💰 Price: $${product.price}`);
      console.log(`   📦 Stock: ${product.stock}`);
      console.log(`   ⭐ Featured: ${product.featured ? "Yes" : "No"}`);
      console.log("");
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
  }
}

async function searchProducts() {
  try {
    const searchTerm = await question("\n🔍 Enter search term: ");
    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({ name: 1 });

    console.log(
      `\n🔍 Search results for "${searchTerm}": ${products.length} products\n`,
    );

    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name}`);
      console.log(`   💰 Price: $${product.price}`);
      console.log(`   📂 Category: ${product.category}`);
      console.log(`   📦 Stock: ${product.stock}`);
      console.log("");
    });
  } catch (error) {
    console.error("Error searching products:", error);
  }
}

async function addNewProduct() {
  try {
    console.log("\n➕ Adding new product...");

    const name = await question("Product name: ");
    const price = parseFloat(await question("Price: "));
    const description = await question("Description: ");
    const stock = parseInt(await question("Stock quantity: "));

    const categories = await Product.distinct("category");
    console.log("\nAvailable categories:");
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat}`);
    });

    const categoryChoice = await question("Category (enter number): ");
    const category = categories[parseInt(categoryChoice) - 1];

    const imageUrl = await question("Image URL (optional): ");
    const featured =
      (await question("Featured? (y/n): ")).toLowerCase() === "y";

    const newProduct = new Product({
      name,
      price,
      description,
      stock,
      category,
      imageUrl: imageUrl || undefined,
      featured,
    });

    await newProduct.save();
    console.log("✅ Product added successfully!");
  } catch (error) {
    console.error("Error adding product:", error);
  }
}

async function updateProduct() {
  try {
    const products = await Product.find().sort({ name: 1 });
    console.log("\n📦 Select product to update:");
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.category})`);
    });

    const productChoice =
      parseInt(await question("\nEnter product number: ")) - 1;
    const product = products[productChoice];

    if (!product) {
      console.log("❌ Invalid product selection");
      return;
    }

    console.log(`\n🔄 Updating: ${product.name}`);
    console.log("Press Enter to keep current value");

    const name = await question(`Name (${product.name}): `);
    const price = await question(`Price (${product.price}): `);
    const description = await question(
      `Description (${product.description.substring(0, 50)}...): `,
    );
    const stock = await question(`Stock (${product.stock}): `);

    const categories = await Product.distinct("category");
    console.log("\nAvailable categories:");
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat}`);
    });

    const categoryChoice = await question(
      `Category (current: ${product.category}): `,
    );
    const featured = await question(
      `Featured (current: ${product.featured ? "y" : "n"}) (y/n): `,
    );

    const updates = {};
    if (name) updates.name = name;
    if (price) updates.price = parseFloat(price);
    if (description) updates.description = description;
    if (stock) updates.stock = parseInt(stock);
    if (categoryChoice)
      updates.category = categories[parseInt(categoryChoice) - 1];
    if (featured) updates.featured = featured.toLowerCase() === "y";

    await Product.findByIdAndUpdate(product._id, updates);
    console.log("✅ Product updated successfully!");
  } catch (error) {
    console.error("Error updating product:", error);
  }
}

async function deleteProduct() {
  try {
    const products = await Product.find().sort({ name: 1 });
    console.log("\n🗑️  Select product to delete:");
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} (${product.category})`);
    });

    const productChoice =
      parseInt(await question("\nEnter product number: ")) - 1;
    const product = products[productChoice];

    if (!product) {
      console.log("❌ Invalid product selection");
      return;
    }

    const confirm = await question(
      `\n⚠️  Are you sure you want to delete "${product.name}"? (y/n): `,
    );
    if (confirm.toLowerCase() === "y") {
      await Product.findByIdAndDelete(product._id);
      console.log("✅ Product deleted successfully!");
    } else {
      console.log("❌ Deletion cancelled");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

async function showStatistics() {
  try {
    const totalProducts = await Product.countDocuments();
    const categories = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

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

    const featuredCount = await Product.countDocuments({ featured: true });
    const lowStock = await Product.countDocuments({ stock: { $lt: 10 } });

    console.log("\n📊 Product Statistics");
    console.log("====================");
    console.log(`📦 Total Products: ${totalProducts}`);
    console.log(`⭐ Featured Products: ${featuredCount}`);
    console.log(`⚠️  Low Stock (<10): ${lowStock}`);

    if (priceStats.length > 0) {
      const stats = priceStats[0];
      console.log(
        `💰 Price Range: $${stats.minPrice.toFixed(2)} - $${stats.maxPrice.toFixed(2)}`,
      );
      console.log(`📊 Average Price: $${stats.avgPrice.toFixed(2)}`);
      console.log(`💵 Total Inventory Value: $${stats.totalValue.toFixed(2)}`);
    }

    console.log("\n📂 Products by Category:");
    categories.forEach((cat) => {
      console.log(`  ${cat._id}: ${cat.count} products`);
    });
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
}

async function main() {
  while (true) {
    await showMenu();
    const choice = await question("\nEnter your choice (1-8): ");

    switch (choice) {
      case "1":
        await viewAllProducts();
        break;
      case "2":
        await viewProductsByCategory();
        break;
      case "3":
        await searchProducts();
        break;
      case "4":
        await addNewProduct();
        break;
      case "5":
        await updateProduct();
        break;
      case "6":
        await deleteProduct();
        break;
      case "7":
        await showStatistics();
        break;
      case "8":
        console.log("👋 Goodbye!");
        rl.close();
        mongoose.connection.close();
        return;
      default:
        console.log("❌ Invalid choice. Please try again.");
    }

    await question("\nPress Enter to continue...");
  }
}

main().catch(console.error);
