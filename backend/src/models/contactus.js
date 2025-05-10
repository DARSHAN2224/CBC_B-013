import mongoose from "mongoose";
// Create a Schema for Contact Us messages
const contactUsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);
const ContactUs = mongoose.model('ContactUs', contactUsSchema);
// Create a model for the ContactUs schema
export default ContactUs


