const express = require("express");

const {
    getDashboard,
    getUsers,
    deleteUser,
    getProducts,
    deleteProduct,
    getOrders,
    updateOrderStatus
} = require("../controllers/adminController");

const { protect } = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");


const router = express.Router();


// Dashboard
router.get(
    "/dashboard",
    protect,
    admin,
    getDashboard
);


// User Management
router.get(
    "/users",
    protect,
    admin,
    getUsers
);

router.delete(
    "/users/:id",
    protect,
    admin,
    deleteUser
);


// Product Management
router.get(
    "/products",
    protect,
    admin,
    getProducts
);

router.delete(
    "/products/:id",
    protect,
    admin,
    deleteProduct
);


// Order Management
router.get(
    "/orders",
    protect,
    admin,
    getOrders
);

router.put(
    "/orders/:id",
    protect,
    admin,
    updateOrderStatus
);


module.exports = router;