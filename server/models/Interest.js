import mongoose from "mongoose";

// models/Interest.js
const InterestSchema = new mongoose.Schema({
    services: [{ type: String, required: true }],
    hobbiesGallery: [{ type: String }],
    books: [{ title: String, status: { type: String, enum: ["read", "planned"] } }],
  }, { timestamps: true });
  
  export default mongoose.model("Interest", InterestSchema);