const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


// CREATE RAZORPAY ORDER
exports.createPaymentOrder = async (req, res) => {

    try {

        const { amount } = req.body;


        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };


        const paymentOrder =
            await razorpay.orders.create(options);


        res.status(200).json({
            success: true,
            paymentOrder
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// VERIFY PAYMENT
exports.verifyPayment = async (req, res) => {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            orderId
        } = req.body;


        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;


        const generatedSignature =
            crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(body)
            .digest("hex");


        if (generatedSignature !== razorpay_signature) {

            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });

        }


        await Order.findByIdAndUpdate(
            orderId,
            {
                paymentStatus: "PAID",
                razorpayPaymentId: razorpay_payment_id
            }
        );


        res.status(200).json({
            success: true,
            message: "Payment verified successfully"
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};