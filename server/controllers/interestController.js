// controllers/interestController.js
import Interest from "../models/Interest.js";

// @desc    Get all interests
// @route   GET /api/interest
// @access  Protected
export const getInterests = async (req, res) => {
  try {
    const interests = await Interest.find();
    res.json(interests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single interest by ID
// @route   GET /api/interest/:id
// @access  Protected
export const getInterestById = async (req, res) => {
  try {
    const interest = await Interest.findById(req.params.id);
    if (!interest) {
      return res.status(404).json({ message: "Interest not found" });
    }
    res.json(interest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new interest
// @route   POST /api/interest
// @access  Protected
export const createInterest = async (req, res) => {
  const { services, hobbiesGallery, books } = req.body;
  try {
    const interest = new Interest({
      services,
      hobbiesGallery,
      books,
    });
    const newInterest = await interest.save();
    res.status(201).json(newInterest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an interest
// @route   PUT /api/interest/:id
// @access  Protected
export const updateInterest = async (req, res) => {
  try {
    const interest = await Interest.findById(req.params.id);
    if (!interest) {
      return res.status(404).json({ message: "Interest not found" });
    }

    // Update fields if they exist in the request body
    interest.services = req.body.services || interest.services;
    interest.hobbiesGallery = req.body.hobbiesGallery || interest.hobbiesGallery;
    interest.books = req.body.books || interest.books;

    const updatedInterest = await interest.save();
    res.json(updatedInterest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an interest
// @route   DELETE /api/interest/:id
// @access  Protected
export const deleteInterest = async (req, res) => {
  try {
    const interest = await Interest.findById(req.params.id);
    if (!interest) {
      return res.status(404).json({ message: "Interest not found" });
    }
    await interest.remove();
    res.json({ message: "Interest removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
