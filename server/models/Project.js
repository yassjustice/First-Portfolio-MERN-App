import mongoose from "mongoose";

// models/Project.js
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String }],
    githubLink: { type: String },
    demoLink: { type: String },
  }, { timestamps: true });
  
  export default mongoose.model("Project", ProjectSchema);