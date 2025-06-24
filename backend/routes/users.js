const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const {
  getProfile,
  updateProfile,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  uploadAvatar,
} = require("../controllers/userController");

// All user routes require authentication
router.use(protect);

// Multer config for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/avatars"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, req.user.id + "-" + Date.now() + ext);
  },
});
const upload = multer({ storage });

// User profile routes
router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.post("/profile/avatar", upload.single("avatar"), uploadAvatar);
router.get("/wishlist", getWishlist);
router.post("/wishlist/:productId", addToWishlist);
router.delete("/wishlist/:productId", removeFromWishlist);

module.exports = router;
