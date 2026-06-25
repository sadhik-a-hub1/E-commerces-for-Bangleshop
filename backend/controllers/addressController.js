const Address = require("../models/Address");


// CREATE ADDRESS
exports.createAddress = async (req, res) => {

    try {

        const address = await Address.create({
            ...req.body,
            user: req.user._id
        });


        res.status(201).json({
            success: true,
            message: "Address added successfully",
            address
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET ALL USER ADDRESSES
exports.getAddresses = async (req, res) => {

    try {

        const addresses = await Address.find({
            user: req.user._id
        })
        .sort({ createdAt: -1 });


        res.status(200).json({
            success: true,
            total: addresses.length,
            addresses
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// GET SINGLE ADDRESS
exports.getAddressById = async (req, res) => {

    try {

        const address = await Address.findOne({
            _id: req.params.id,
            user: req.user._id
        });


        if (!address) {

            return res.status(404).json({
                success: false,
                message: "Address not found"
            });

        }


        res.status(200).json({
            success: true,
            address
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// UPDATE ADDRESS
exports.updateAddress = async (req, res) => {

    try {

        const address = await Address.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );


        if (!address) {

            return res.status(404).json({
                success: false,
                message: "Address not found"
            });

        }


        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// DELETE ADDRESS
exports.deleteAddress = async (req, res) => {

    try {

        const address = await Address.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });


        if (!address) {

            return res.status(404).json({
                success: false,
                message: "Address not found"
            });

        }


        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};