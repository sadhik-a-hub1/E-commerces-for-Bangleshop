const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

exports.addWishlist = async (req, res) => {

    try {

        const { product } = req.body;


        const productExists = await Product.findById(product);


        if (!productExists) {

            return res.status(404).json({
                success: false,
                message: "Product not found"
            });

        }


        const alreadyExist =
        await Wishlist.findOne({
            user: req.user._id,
            product
        });


        if(alreadyExist){

            return res.status(400).json({
                success:false,
                message:"Product already in wishlist"
            });

        }


        const wishlist =
        await Wishlist.create({
            user:req.user._id,
            product
        });


        res.status(201).json({
            success:true,
            message:"Added to wishlist",
            wishlist
        });


    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};

// GET USER WISHLIST
exports.getWishlist = async (req, res) => {

    try {

        const wishlist = await Wishlist.find({
            user: req.user._id
        })
        .populate("product")
        .sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            totalItems: wishlist.length,
            wishlist
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// REMOVE FROM WISHLIST
exports.removeWishlist = async (req, res) => {

    try {

        const item = await Wishlist.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });


        if (!item) {

            return res.status(404).json({
                success: false,
                message: "Wishlist item not found"
            });

        }


        res.status(200).json({
            success: true,
            message: "Removed from wishlist"
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};