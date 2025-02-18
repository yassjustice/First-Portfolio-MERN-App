// routes/interestRoutes.js
import express from "express";
import { authenticate } from "../middlewares/authenticate.js"; // Import the authenticate middleware
import {
  getInterests,
  getInterestById,
  createInterest,
  updateInterest,
  deleteInterest,
} from "../controllers/interestController.js";

const router = express.Router();

// Apply the authenticate middleware to the routes for protection

// GET /api/interest - Retrieve all interests
router.get("/", authenticate, getInterests);

// GET /api/interest/:id - Retrieve a single interest by ID
router.get("/:id", authenticate, getInterestById);

// POST /api/interest - Create a new interest
router.post("/", authenticate, createInterest);

// PUT /api/interest/:id - Update an existing interest
router.put("/:id", authenticate, updateInterest);

// DELETE /api/interest/:id - Delete an interest
router.delete("/:id", authenticate, deleteInterest);

export default router;
