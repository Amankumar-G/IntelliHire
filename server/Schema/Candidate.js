import mongoose ,{ Schema }from "mongoose"; 

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
    index: true, // For faster email search
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
    required: true,
  },
  Score : {
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
    // required: true,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt fields
});

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;