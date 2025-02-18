import express from "express";
import { getContacts, getContact, createContact, updateContact, deleteContact } from "../controllers/contactController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/",authenticate, getContacts); // Public: Get all contact messages
router.get("/:id",authenticate, getContact); // Public: Get a single contact message
router.post("/", createContact); // Public: Allow users to send messages
router.put("/:id", authenticate, updateContact); // Private: Update a message (e.g., mark as responded)
router.delete("/:id", authenticate, deleteContact); // Private: Delete a message

export default router;
