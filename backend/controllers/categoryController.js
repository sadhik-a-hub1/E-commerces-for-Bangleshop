const Category = require("../models/Category");


// CREATE CATEGORY
exports.createCategory = async (req, res) => {

    try {

        const { name, description, image } = req.body;

        const exist = await Category.findOne({ name });

        if (exist) {
            return res.status(400).json({
                success: false,
                message: "Category already exists"
            });
        }


        const category = await Category.create({
            name,
            description,
            image
        });


        res.status(201).json({
            success: true,
            message: "Category created successfully",
            category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {

    try {

        const categories =
            await Category.find()
            .sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            total: categories.length,
            categories
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET SINGLE CATEGORY
exports.getCategoryById = async (req, res) => {

    try {

        const category =
            await Category.findById(req.params.id);


        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }


        res.json({
            success: true,
            category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {

    try {

        const category =
            await Category.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }


        res.json({
            success: true,
            message: "Category updated",
            category
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {

    try {

        const category =
            await Category.findByIdAndDelete(req.params.id);


        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }


        res.json({
            success: true,
            message: "Category deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};