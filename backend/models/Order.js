const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

            name: String,

            image: String,

            quantity: Number,

            price: Number
        }
    ],

    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    paymentMethod: {
        type: String,
        enum: [
            "COD",
            "RAZORPAY"
        ],
        default: "RAZORPAY"
    },

    paymentStatus: {
        type: String,
        enum: [
            "PENDING",
            "PAID",
            "FAILED"
        ],
        default: "PENDING"
    },

    razorpayOrderId: {
        type: String,
        default: ""
    },

    razorpayPaymentId: {
        type: String,
        default: ""
    },

    orderStatus: {
        type: String,
        enum: [
            "PLACED",
            "CONFIRMED",
            "PROCESSING",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED"
        ],
        default: "PLACED"
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Order", orderSchema);