import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  summary: { type: String, required: true },
  embedding: {
    type: [Number],
    // required: true,
  },
  jobOpenings: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
