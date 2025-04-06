import express from 'express';
import Candidate from '../Schema/Candidate.js';
import Job from '../Schema/Job.js';
import { runCVReview } from '../Agents/agent.js';

const router = express.Router();

router.get('/:id',async (req, res) => {
    const {id} = req.params

    const candidate = await Candidate.findById(id);
    if (!candidate) {
        return res.status(404).json({ message: "Candidate not found" });
    }

    const job = await Job.findOne({title : candidate.jobTitle});

    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }

    const response =await runCVReview(job.summary, candidate.summary,candidate.jobTitle);
    console.log(response);
    res.send('Agent Analysis Endpoint');
});

export default router;