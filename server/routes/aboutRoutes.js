// routes/aboutRoutes.js
import express from "express";
import { getAbout, createAbout, updateAbout, deleteAbout } from "../controllers/aboutController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", getAbout); // Public: Fetch the About section
router.post("/", authenticate, createAbout); // Private: Create a new About section
router.put("/", authenticate, updateAbout); // Private: Update the About section
router.delete("/", authenticate, deleteAbout); // Private: Delete the About section

export default router;
