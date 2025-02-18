// routes/index.js
import express from "express";
import aboutRoutes from "./aboutRoutes.js";
import contactRoutes from "./contactRoutes.js";
import heroRoutes from "./heroRoutes.js";
import interestRoutes from "./interestRoutes.js";
import projectRoutes from "./projectRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

// Public Routes
router.use("/about", aboutRoutes);
router.use("/contact", contactRoutes);
router.use("/hero", heroRoutes);

// Protected Routes (Require Authentication)
router.use("/interest", interestRoutes);
router.use("/projects",  projectRoutes);
router.use("/users",  userRoutes);

export default router;
