import express from 'express';
import Candidate from '../Schema/Candidate.js';
import Job from '../Schema/Job.js';
import { runCVReview } from '../Agents/agent.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const candidate = await Candidate.findById(id);
      if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
      }
  
      const job = await Job.findOne({ title: candidate.jobTitle });
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
  
      const { evaluation } = await runCVReview(job.summary, candidate.summary, candidate.jobTitle);
  
      // Save evaluation in the candidate document
      candidate.evaluation = evaluation;
      candidate.Shortlisted = evaluation.finalDecision === "shortlist";
      await candidate.save();
  
      console.log("Evaluation saved successfully:", evaluation);
  
      res.status(200).json({
        message: "Candidate evaluation completed and saved.",
        candidate: {
          name: candidate.name,
          jobTitle: candidate.jobTitle,
          email: candidate.email,
          summary: candidate.summary,
          Shortlisted : candidate.Shortlisted
        },
        evaluation: evaluation
      });
    } catch (error) {
      console.error("Error during evaluation:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  

export default router;