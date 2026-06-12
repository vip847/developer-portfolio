import mongoose, { Schema, models } from 'mongoose';

const TechSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // Will eventually be a Cloudinary URL
  category: { type: String, default: "Frontend" } // e.g., "Frontend", "Backend", "Tools"
});

const Tech = models.Tech || mongoose.model('Tech', TechSchema);
export default Tech;