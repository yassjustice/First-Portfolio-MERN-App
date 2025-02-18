// routes/projectRoutes.js
import express from "express";
import { authenticate } from "../middlewares/authenticate.js"; // Import the authenticate middleware
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Apply the authenticate middleware to the routes for protection

// GET /api/projects - Retrieve all projects
router.get("/", authenticate, getProjects);

// GET /api/projects/:id - Retrieve a single project by ID
router.get("/:id", authenticate, getProjectById);

// POST /api/projects - Create a new project
router.post("/", authenticate, createProject);

// PUT /api/projects/:id - Update an existing project
router.put("/:id", authenticate, updateProject);

// DELETE /api/projects/:id - Delete a project
router.delete("/:id", authenticate, deleteProject);

export default router;
