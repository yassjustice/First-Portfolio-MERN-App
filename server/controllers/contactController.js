import Contact from "../models/Contact.js";

/**
 * Get all contact messages
 */
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Get a single contact message by ID
 */
export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact message not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new contact message
 */
export const createContact = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Email and message are required" });
    }

    const newContact = new Contact({ email, message });
    await newContact.save();

    res.status(201).json({ message: "Message sent successfully", contact: newContact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update a contact message (e.g., mark as responded)
 */
export const updateContact = async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    contact.status = status || contact.status;
    await contact.save();

    res.status(200).json({ message: "Contact message updated", contact });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete a contact message
 */
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact message not found" });
    }

    await contact.deleteOne();
    res.status(200).json({ message: "Contact message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
