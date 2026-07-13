const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const generateToken = require("../utils/generateToken");

// Register User
const registerUser = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            token: generateToken(user._id, user.role),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
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

// Login User
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            });

        }

        res.status(200).json({

            success: true,
            message: "Login Successful",

            token: generateToken(user._id, user.role),

            user: {

                id: user._id,
                name: user.name,
                email: user.email,
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

const getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select("-password");

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

module.exports = {
    registerUser,
    loginUser,
    getProfile
};