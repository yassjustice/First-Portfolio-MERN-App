// routes/userRoutes.js
import express from "express";
import { authenticate } from "../middlewares/authenticate.js"; // Import the authenticate middleware
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  uploadProfilePicture,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);  // Register a new user
router.post("/login", loginUser);        // Login and get JWT token

// Protected Routes
router.get("/me", authenticate, getUser);          // Get current user info
router.put("/me", authenticate, updateUser);      // Update current user info
router.delete("/me", authenticate, deleteUser);   // Delete current user

router.post("/me/upload", authenticate, uploadProfilePicture); // Upload profile picture

// Admin Routes
router.get("/users", authenticate, getAllUsers); // Get all users (Admin only)
router.get("/users/:id", authenticate, getUserById); // Get specific user by ID

export default router;
