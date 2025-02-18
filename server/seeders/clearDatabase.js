import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Import models
import User from "../models/User.js";
import Hero from "../models/Hero.js";
import About from "../models/About.js";
import Interest from "../models/Interest.js";
import Project from "../models/Project.js";
import Contact from "../models/Contact.js";

// Function to clear the database
const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    // Delete all documents from collections
    await Promise.all([
      User.deleteMany({}),
      Hero.deleteMany({}),
      About.deleteMany({}),
      Interest.deleteMany({}),
      Project.deleteMany({}),
      Contact.deleteMany({})
    ]);

    console.log("Database cleared successfully.");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error clearing database:", err);
    mongoose.connection.close();
  }
};

// Run the script
clearDatabase();
