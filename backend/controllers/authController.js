const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");


// =============================
// REGISTER USER
// POST /api/auth/register
// =============================

exports.register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            phone
        } = req.body;


        const existingUser =
            await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone
        });


        res.status(201).json({
            success: true,
            message: "Registration successful",
            token: generateToken(
                user._id,
                user.role
            ),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// =============================
// LOGIN USER
// POST /api/auth/login
// =============================

exports.login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;


        const user =
            await User.findOne({ email });


        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        const match =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!match) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }


        res.status(200).json({
            success: true,
            message: "Login successful",
            token: generateToken(
                user._id,
                user.role
            ),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role
            }
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};


// =============================
// GET CURRENT USER PROFILE
// GET /api/auth/profile
// =============================

exports.getProfile = async (req, res) => {

try {

    const user = await User.findById(req.user._id)
        .select("-password");

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    res.status(200).json({
        success: true,
        user
    });

} catch (error) {

    res.status(500).json({
        success: false,
        message: error.message
    });

}


};



// =============================
// UPDATE USER PROFILE
// PUT /api/auth/profile
// =============================

exports.updateProfile = async (req, res) => {

try {

    const { name, phone } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
        }
    });

} catch (error) {

    res.status(500).json({
        success: false,
        message: error.message
    });

}

};
// ADMIN REGISTER
exports.adminRegister = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            phone,
            adminSecret
        } = req.body;

        if (adminSecret !== process.env.ADMIN_SECRET) {

            return res.status(403).json({
                success: false,
                message: "Invalid admin secret"
            });

        }

        const userExists =
            await User.findOne({ email });

        if (userExists) {

            return res.status(400).json({
                success: false,
                message: "User already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const admin =
            await User.create({
                name,
                email,
                password: hashedPassword,
                phone,
                role: "admin"
            });

        res.status(201).json({
            success: true,
            message: "Admin registered successfully",
            token: generateToken(
                admin._id,
                admin.role
            ),
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};