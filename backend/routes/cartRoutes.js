const express = require("express");

const {
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart
} = require("../controllers/cartController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/", protect, addToCart);

router.get("/", protect, getCart);

router.put("/:id", protect, updateCart);

router.delete("/:id", protect, removeCartItem);

router.delete("/clear/all", protect, clearCart);


module.exports = router;