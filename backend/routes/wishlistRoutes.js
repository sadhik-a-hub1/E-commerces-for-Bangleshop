const express = require("express");
const router = express.Router();

const {
    addWishlist,
    getWishlist,
    removeWishlist
} = require("../controllers/wishlistController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addWishlist);
router.get("/", protect, getWishlist);
router.delete("/:id", protect, removeWishlist);

module.exports = router;