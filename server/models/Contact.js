import mongoose from "mongoose";

// models/Contact.js
const ContactSchema = new mongoose.Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "responded"], default: "pending" },
  }, { timestamps: true });
  
  export default mongoose.model("Contact", ContactSchema);