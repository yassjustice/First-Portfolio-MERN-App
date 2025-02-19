import express from "express";
import { funcNah } from "../controllers/funcNahController.js";
const router = express.Router();

router.get("/", funcNah);

export default router;
