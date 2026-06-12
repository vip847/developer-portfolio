import mongoose, { Schema, models } from 'mongoose';

const TagSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, default: "blue-text-gradient" }
}, { _id: false }); // Prevents MongoDB from creating a unique ID for every single tag

const ProjectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tags: [TagSchema],
  image: { type: String, required: true }, // Will eventually be a Cloudinary URL
  source_code_link: { type: String, required: true },
  live_demo_link: { type: String, default: "" }, // Added this in case you host your projects
  order: { type: Number, default: 0 }
}, { timestamps: true });

const Project = models.Project || mongoose.model('Project', ProjectSchema);
export default Project;