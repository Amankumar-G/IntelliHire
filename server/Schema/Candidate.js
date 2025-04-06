import mongoose, { Schema } from "mongoose";

const evaluationSchema = new Schema({
  hrScore: {
    culturalAlignment: Number,
    communicationSkills: Number,
    leadershipPotential: Number,
    emotionalIntelligence: Number,
  },
  hrRationale: String,
  culturalRedFlags: [String],
  diversityAssets: [String],
  techScore: Number,
  techRationale: String,
  skillValidation: {
    verified: [String],
    unverified: [String],
  },
  techDebtRisk: String,
  businessScore: Number,
  businessRationale: String,
  timeToProductivity: String,
  growthForecast: {
    '6mo': { type: mongoose.Schema.Types.Mixed }, // or just: Object
    '3yr': { type: mongoose.Schema.Types.Mixed },
  },
  finalDecision: String,
  decisionRationale: String,
  scoreBreakdown: {
    hrScore: Number,
    techScore: Number,
    businessScore: Number,
    compositeScore: Number,
  },
  riskFactors: [String],
  recommendedNextSteps: [String],
}, { _id: false }); // _id disabled for nested schema

const candidateSchema = new Schema({
  name: {
    type: String,
    required: true, 
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    index: true,
  },
  originalFileName: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
  },
  embedding: {
    type: [Number],
  },
  Score: {
    type: Number,
  },
  Shortlisted: {
    type: Boolean,
    default: false,
  },
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  evaluation: evaluationSchema, // nested evaluation field
}, {
  timestamps: true,
});

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;
