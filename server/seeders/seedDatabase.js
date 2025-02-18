import dotenv from "dotenv";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";


import User from "../models/User.js";
import Hero from "../models/Hero.js";
import About from "../models/About.js";
import Interest from "../models/Interest.js";
import Project from "../models/Project.js";
import Contact from "../models/Contact.js";
import mongoose, { Mongoose } from "mongoose";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    // Hash Password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Users
    await User.create({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword,
    });

    // Hero Section
    await Hero.create({
      heroImage: "https://via.placeholder.com/600",
      description: "Welcome to my portfolio! I'm a developer & designer.",
      socialLinks: ["https://github.com/yassjustice", "https://linkedin.com/in/example"],
      ctaLinks: ["https://example.com/my-work"],
    });

    // About Section
    await About.create({
      photo: "https://via.placeholder.com/400",
      title: "About Me",
      description: "I'm a passionate developer who loves to build things.",
      links: ["#projects", "#contact"],
    });

    // Interests
    await Interest.create({
      services: ["Web Development", "Mobile Development", "Game Design", "Branding"],
      hobbiesGallery: ["https://example.com/hobby1.jpg", "https://example.com/hobby2.jpg"],
      books: [{ title: "Clean Code", status: "read" }, { title: "The Pragmatic Programmer", status: "planned" }],
    });

    // Projects
    await Project.create({
      title: "Portfolio Website",
      description: "A fully responsive portfolio built with MERN stack.",
      image: "https://via.placeholder.com/500",
      tags: ["React", "Express", "MongoDB"],
      githubLink: "https://github.com/yassjustice/portfolio",
      demoLink: "https://example.com/demo",
    });

    // Contact Requests
    await Contact.create({
      email: "testuser@example.com",
      message: "Hello! I love your work and would like to collaborate!",
    });

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding failed:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
