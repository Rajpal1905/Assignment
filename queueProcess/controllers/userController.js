const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config()

exports.signup = async (req, res) => {
    try {
        const { name, password ,confirmPassword } = req.body;
        if (!name || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success:false,
                msg:"Password not match"
            })
        }
        const existUser = await User.findOne({ name });

        if (existUser) {
            return res.status(400).json({
                success: false,
                msg: "Username already taken"
            });
        }
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            password: hashPass
        });
        const savedUser = await newUser.save();

        return res.status(201).json({
            success: true,
            msg: "User registered successfully",
            data: savedUser
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "An error occurred while creating a new user",
            error: error.message
        });
    }
};
exports.signin = async (req, res) => {
    try {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({
                success: false,
                msg: "Both username and password are required"
            });
        }
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({
                success: false,
                msg: "Username does not exist"
            });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect password"
            });
        }

        const payload = {
            name: user.name,
            id: user._id
        };

        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '2h' });
        return res.status(200).json({
            success: true,
            msg: "Login successful",
            user: { id: user._id, name: user.name },
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            msg: "An error occurred during login",
            error: error.message
        });
    }
};
