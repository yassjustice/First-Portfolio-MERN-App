// routes/userRoutes.js
import express from "express";
import { authenticate } from "../middlewares/authenticate.js"; // Import the authenticate middleware
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);  // Register a new user
router.post("/login", loginUser);        // Login and get JWT token

// Protected Routes
router.get("/me", authenticate, getUser);          // Get current user info
router.put("/me", authenticate, updateUser);      // Update current user info
router.delete("/me", authenticate, deleteUser);   // Delete current user

export default router;
