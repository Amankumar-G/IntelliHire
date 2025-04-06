import express from 'express';
import { getCandidate, updateCandidate, deleteCandidate,getAllCandidates ,mailCandidate ,getCandidatesByJobId} from '../Controller/candidateController.js';


const router = express.Router();

router.get('/', getAllCandidates); // Get all candidates
router.get('/job/:jobId', getCandidatesByJobId); // Get all candidates
router.get('/:id', getCandidate); // Get candidate by ID
router.put('/:id', updateCandidate); // Update candidate by ID
router.delete('/:id', deleteCandidate); // Delete candidate by ID

router.get('/send-mail/:id', mailCandidate); // Send mail to candidate by ID


export default router;