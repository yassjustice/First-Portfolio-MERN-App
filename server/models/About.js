import mongoose from "mongoose";

// models/About.js
const AboutSchema = new mongoose.Schema({
    photo: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    links: [{ type: String }],
  }, { timestamps: true });
  
  export default mongoose.model("About", AboutSchema);