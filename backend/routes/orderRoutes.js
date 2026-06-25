const express = require("express");

const {
    createOrder,
    getOrders,
    getOrderById,
    cancelOrder
} = require("../controllers/orderController");

const {
    protect
} = require("../middleware/authMiddleware");


const router = express.Router();


router.post(
    "/",
    protect,
    createOrder
);


router.get(
    "/",
    protect,
    getOrders
);


router.get(
    "/:id",
    protect,
    getOrderById
);


router.put(
    "/cancel/:id",
    protect,
    cancelOrder
);


module.exports = router;