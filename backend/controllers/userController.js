const User = require("../models/User");


// GET ALL USERS
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

    } catch(error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET SINGLE USER
exports.getUserById = async (req, res) => {

    try {

        const user = await User
            .findById(req.params.id)
            .select("-password");


        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }


        res.status(200).json({
            success:true,
            user
        });

    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};


// UPDATE USER
exports.updateUser = async (req, res) => {

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");


        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }


        res.status(200).json({
            success:true,
            message:"User updated successfully",
            user
        });

    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};


// DELETE USER
exports.deleteUser = async (req, res) => {

    try {

        const user = await User.findByIdAndDelete(
            req.params.id
        );


        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }


        res.status(200).json({
            success:true,
            message:"User deleted successfully"
        });


    } catch(error) {

        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};