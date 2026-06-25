const express = require("express");

const {
    register,
    login,
    adminRegister,
    getProfile,
    updateProfile
} = require("../controllers/authController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// ==========================
// PUBLIC ROUTES
// ==========================

// User Register
router.post(
    "/register",
    register
);

// Admin Register
router.post(
    "/admin-register",
    adminRegister
);

// Login
router.post(
    "/login",
    login
);


// ==========================
// PROTECTED ROUTES
// ==========================

// Get Profile
router.get(
    "/profile",
    protect,
    getProfile
);

// Update Profile
router.put(
    "/profile",
    protect,
    updateProfile
);


module.exports = router;