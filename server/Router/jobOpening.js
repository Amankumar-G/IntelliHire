import express from 'express';
import { getJobOpening, updateJobOpening, deleteJobOpening,getAllJobOpenings } from '../Controller/jobOpening.js';

const router = express.Router();    

router.get('/', getAllJobOpenings); // Get all job openings
router.get('/:id', getJobOpening); // Get job opening by ID
router.put('/:id', updateJobOpening); // Update job opening by ID
router.delete('/:id', deleteJobOpening); // Delete job opening by ID

export default router;