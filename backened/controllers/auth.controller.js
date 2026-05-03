import User from "../models/user.js"
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
import { generateToken } from "../utils/utils.js";
import { sendWelcomeEmail } from "../src/emails/EmailHandlers.js";
import dotenv from 'dotenv'
// import {ENV} from '../lib/env.js'
dotenv.config();


// SIGNUP
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = generateToken(newUser._id, res);

        //  Send Welcome Email (background)
        try {
            await sendWelcomeEmail(
                newUser.email,
                newUser.name,
                process.env.CLIENT_URL
            );

        } catch (error) {
            console.log("Failed to send welcome email", error);

        }


        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });



    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({
            message: "Server Error",
        });
    }
};



//  LOGIN 
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required"
            });
        }

        // 2. Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // 3. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // 4. Generate token
        const token = generateToken(user._id, res);

        // 5. Success response
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//  LOGOUT 
export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            maxAge:0,
            httpOnly: true,
            expires: new Date(0) // instantly expire
        });

        res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};