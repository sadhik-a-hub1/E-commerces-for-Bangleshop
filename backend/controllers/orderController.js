const Order = require("../models/Order");
const Cart = require("../models/Cart");


// CREATE ORDER
exports.createOrder = async (req, res) => {

    try {

        const {
            shippingAddress,
            paymentMethod,
            razorpayOrderId
        } = req.body;


        const cartItems = await Cart
            .find({
                user: req.user._id
            })
            .populate("product");


        if (cartItems.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });

        }


        let totalAmount = 0;


        const items = cartItems.map(item => {

            const price =
                item.product.discountPrice > 0
                ? item.product.discountPrice
                : item.product.price;


            totalAmount += price * item.quantity;


            return {
                product: item.product._id,
                name: item.product.name,
                image: item.product.images[0],
                quantity: item.quantity,
                price
            };

        });


        const order = await Order.create({

            user: req.user._id,

            items,

            shippingAddress,

            totalAmount,

            paymentMethod,

            razorpayOrderId

        });


        // clear cart after order
        await Cart.deleteMany({
            user: req.user._id
        });


        res.status(201).json({

            success: true,
            message: "Order placed successfully",
            order

        });


    } catch (error) {


        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};


// GET MY ORDERS
exports.getOrders = async (req, res) => {

    try {

        const orders = await Order
            .find({
                user: req.user._id
            })
            .populate("shippingAddress")
            .sort({
                createdAt: -1
            });


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


// GET SINGLE ORDER
exports.getOrderById = async (req, res) => {

    try {


        const order = await Order
            .findOne({
                _id: req.params.id,
                user: req.user._id
            })
            .populate("shippingAddress");


        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }


        res.status(200).json({
            success: true,
            order
        });


    } catch (error) {


        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// CANCEL ORDER
exports.cancelOrder = async (req, res) => {

    try {

        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        });


        if (!order) {

            return res.status(404).json({
                success: false,
                message: "Order not found"
            });

        }


        order.orderStatus = "CANCELLED";


        await order.save();


        res.status(200).json({

            success: true,
            message: "Order cancelled successfully",
            order

        });


    } catch (error) {


        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};