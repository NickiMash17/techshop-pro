const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const {
  getAllUsers,
  getUserById,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

// All admin routes require authentication and admin privileges
router.use(protect);
router.use(admin);

// User management routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id/role", updateUserRole);
router.delete("/users/:id", deleteUser);

module.exports = router;
