// controllers/userController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        const newUser = await user.save();
        // console.log("🔹 Hashed Password Before Saving:", hashedPassword);
        res.status(201).json({
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user and get a token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the provided password with the hashed password
        // console.log("🔹 Input Password:", password);
        // console.log("🔹 Hashed Password from DB:", user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔹 Password Match:", isMatch);
        if (!isMatch) {
            console.log("isnotmatch");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create and assign a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Include user data in the response
        res.json({ message: "Login successful", token, user: user }); // Return user data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user information
// @route   GET /api/users/me
// @access  Protected
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // console.log("🔹 User found:", user); // Log user data
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user information
// @route   PUT /api/users/me
// @access  Protected
export const updateUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user fields if provided
        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a user
// @route   DELETE /api/users/me
// @access  Protected
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await user.remove();
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
