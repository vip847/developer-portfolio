import mongoose, { Schema, models } from 'mongoose';

const ExperienceSchema = new Schema({
  title: { type: String, required: true },
  company_name: { type: String, required: true },
  icon: { type: String, required: true }, // Will eventually be a Cloudinary URL
  iconBg: { type: String, default: "#383E56" },
  date: { type: String, required: true },
  points: [{ type: String }], // Array of strings for your bullet points
  order: { type: Number, default: 0 } // Useful for sorting on the frontend
}, { timestamps: true });

const Experience = models.Experience || mongoose.model('Experience', ExperienceSchema);
export default Experience;