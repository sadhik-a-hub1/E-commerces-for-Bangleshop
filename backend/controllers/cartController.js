const Cart = require("../models/Cart");
const Product = require("../models/Product");


// ADD TO CART
exports.addToCart = async (req, res) => {

    try {

        const { product, quantity } = req.body;


        const productExists =
            await Product.findById(product);


        if (!productExists) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            });
        }


        const existingCart =
            await Cart.findOne({
                user: req.user._id,
                product
            });


        if (existingCart) {

            existingCart.quantity += quantity || 1;

            await existingCart.save();


            return res.status(200).json({
                success:true,
                message:"Cart updated",
                cart: existingCart
            });
        }


        const cart = await Cart.create({
            user: req.user._id,
            product,
            quantity: quantity || 1
        });


        res.status(201).json({
            success:true,
            message:"Added to cart",
            cart
        });


    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
exports.getCart = async (req, res) => {
    try {

        const cart = await Cart.find({
            user: req.user._id
        })
        .populate("product")
        .sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            totalItems: cart.length,
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// UPDATE CART QUANTITY
exports.updateCart = async (req, res) => {

    try {

        const { quantity } = req.body;


        const cart = await Cart.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            {
                quantity
            },
            {
                new: true,
                runValidators: true
            }
        );


        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// REMOVE SINGLE CART ITEM
exports.removeCartItem = async (req, res) => {

    try {

        const cart = await Cart.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });


        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });

        }


        res.status(200).json({
            success: true,
            message: "Item removed from cart"
        });


    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


// CLEAR CART
exports.clearCart = async (req, res) => {

    try {

        await Cart.deleteMany({
            user: req.user._id
        });


        res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });


    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};