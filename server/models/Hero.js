// models/Hero.js

import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
    heroImage: { type: String, required: true },
    description: { type: String, required: true },
    socialLinks: [{ type: String }],
    ctaLinks: [{ type: String }],
  }, { timestamps: true });
  
  export default mongoose.model("Hero", HeroSchema);