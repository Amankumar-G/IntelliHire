import { Router } from 'express';
import { generateEmbedding } from "../utils/embedding.js";
import { summarizeJD } from "../utils/summaryGenerator.js"; 
import Job from '../Schema/Job.js';
const router = Router();

// POST route to handle job description submissions
router.post('/', async (req, res) => {
  try {
    const { title, description ,jobOpenings} = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Job title and description are required.' });
    }

    // Summarize the job description
    const summary = await summarizeJD( title, description);

    // Generate embedding for the summary
    // const embedding = await generateEmbedding(summary);

    // Create and save the job posting
    const jobPosting = new Job({
      title,
      description,
      summary,
      // embedding,
      jobOpenings: jobOpenings || 0, 
    });

    await jobPosting.save();

    res.status(201).json({ message: 'Job posting created successfully.', id  : jobPosting._id, jobPosting });
  } catch (error) {
    console.error('Error processing job posting:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

export default router;
