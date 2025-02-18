import express from "express";
import { getHero, createHero, updateHero, deleteHero } from "../controllers/heroController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", getHero); // Public: Fetch hero section
router.post("/", authenticate, createHero); // Private: Create hero section
router.put("/", authenticate, updateHero); // Private: Update hero section
router.delete("/", authenticate, deleteHero); // Private: Delete hero section

export default router;
