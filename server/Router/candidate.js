import express from 'express';
import { getCandidate, updateCandidate, deleteCandidate,getAllCandidates } from '../Controller/candidateController.js';


const router = express.Router();

router.get('/', getAllCandidates); // Get all candidates
router.get('/:id', getCandidate); // Get candidate by ID
router.put('/:id', updateCandidate); // Update candidate by ID
router.delete('/:id', deleteCandidate); // Delete candidate by ID

export default router;