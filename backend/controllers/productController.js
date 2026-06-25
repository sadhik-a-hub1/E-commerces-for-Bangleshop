const Product = require("../models/Product");


// ==============================
// CREATE PRODUCT
// POST /api/products
// ==============================

exports.createProduct = async (req, res) => {
    try {

        const {
            name,
            description,
            category,
            price,
            discountPrice,
            material,
            color,
            size,
            stock,
            isFeatured
        } = req.body;


        const images = req.files
            ? req.files.map(file => file.path)
            : [];


        const product = await Product.create({
            name,
            description,
            category,
            price,
            discountPrice,
            material,
            color,
            size,
            stock,
            isFeatured,
            images
        });


        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ==============================
// GET ALL PRODUCTS
// GET /api/products
// ==============================

exports.getProducts = async (req, res) => {

    try {

        const products = await Product
            .find({ status: true })
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


// ==============================
// GET SINGLE PRODUCT
// GET /api/products/:id
// ==============================

exports.getProductById = async (req, res) => {

    try {

        const product = await Product
            .findById(req.params.id)
            .populate("category");


        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }


        res.status(200).json({
            success: true,
            product
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ==============================
// UPDATE PRODUCT
// PUT /api/products/:id
// ==============================

exports.updateProduct = async (req, res) => {

    try {

        const data = { ...req.body };


        if (req.files && req.files.length > 0) {
            data.images = req.files.map(
                file => file.path
            );
        }


        const product = await Product.findByIdAndUpdate(
            req.params.id,
            data,
            {
                new: true,
                runValidators: true
            }
        );


        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }


        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// ==============================
// DELETE PRODUCT
// DELETE /api/products/:id
// ==============================

exports.deleteProduct = async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(
            req.params.id
        );


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


// ==============================
// SEARCH PRODUCTS
// GET /api/products/search?q=value
// ==============================

exports.searchProducts = async (req, res) => {

    try {

        const keyword = req.query.q || "";


        const products = await Product.find({
            name: {
                $regex: keyword,
                $options: "i"
            }
        });


        res.status(200).json({
            success: true,
            products
        });


    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


// ==============================
// GET PRODUCTS BY CATEGORY
// GET /api/products/category/:id
// ==============================

exports.getProductsByCategory = async (req,res) => {

    try {

        const products = await Product
        .find({
            category: req.params.id
        })
        .populate("category");


        res.status(200).json({
            success:true,
            products
        });


    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


// ==============================
// FEATURED PRODUCTS
// GET /api/products/featured
// ==============================

exports.getFeaturedProducts = async(req,res)=>{

    try {

        const products = await Product.find({
            isFeatured:true,
            status:true
        });


        res.status(200).json({
            success:true,
            products
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};