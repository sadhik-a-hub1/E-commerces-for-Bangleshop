const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");


// ==========================
// Dashboard Statistics
// GET /api/admin/dashboard
// ==========================
exports.getDashboard = async (req, res) => {
    try {

        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalOrders = await Order.countDocuments();

        const orders = await Order.find();

        const totalRevenue = orders.reduce(
            (sum, order) => sum + order.totalAmount,
            0
        );

        res.status(200).json({
            success: true,
            dashboard: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ==========================
// GET ALL USERS
// GET /api/admin/users
// ==========================
exports.getUsers = async (req, res) => {

    try {

        const users = await User
            .find()
            .select("-password")
            .sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            total: users.length,
            users
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ==========================
// DELETE USER
// DELETE /api/admin/users/:id
// ==========================
exports.deleteUser = async (req, res) => {

    try {

        const user = await User.findByIdAndDelete(req.params.id);


        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ==========================
// GET ALL PRODUCTS
// GET /api/admin/products
// ==========================
exports.getProducts = async (req, res) => {

    try {

        const products = await Product
            .find()
            .populate("category")
            .sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            total: products.length,
            products
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ==========================
// DELETE PRODUCT
// DELETE /api/admin/products/:id
// ==========================
exports.deleteProduct = async (req, res) => {

    try {

        const product =
            await Product.findByIdAndDelete(req.params.id);


        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }


        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ==========================
// GET ALL ORDERS
// GET /api/admin/orders
// ==========================
exports.getOrders = async (req, res) => {

    try {

        const orders = await Order
            .find()
            .populate("user", "name email")
            .populate("shippingAddress")
            .sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            total: orders.length,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


/// ==========================
// UPDATE ORDER STATUS
// PUT /api/admin/orders/:id
// ==========================
exports.updateOrderStatus = async (req, res) => {

    try {

        const {
            orderStatus,
            paymentStatus
        } = req.body;

        const order =
            await Order.findById(req.params.id);

        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }

        if (orderStatus) {
            order.orderStatus = orderStatus;
        }

        if (paymentStatus) {
            order.paymentStatus = paymentStatus;
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};