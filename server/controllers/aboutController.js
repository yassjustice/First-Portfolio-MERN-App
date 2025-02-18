// controllers/aboutController.js
import About from "../models/About.js";

/**
 * Get the About section details
 */
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new About section
 */
export const createAbout = async (req, res) => {
  try {
    const { photo, title, description, links } = req.body;

    const existingAbout = await About.findOne();
    if (existingAbout) {
      return res.status(400).json({ message: "About section already exists. Update instead." });
    }

    const newAbout = new About({ photo, title, description, links });
    await newAbout.save();

    res.status(201).json({ message: "About section created successfully", about: newAbout });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update the About section details
 */
export const updateAbout = async (req, res) => {
  try {
    const { photo, title, description, links } = req.body;

    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    about.photo = photo || about.photo;
    about.title = title || about.title;
    about.description = description || about.description;
    about.links = links || about.links;

    await about.save();
    res.status(200).json({ message: "About section updated", about });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete the About section
 */
export const deleteAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    await about.deleteOne();
    res.status(200).json({ message: "About section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
