import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { createChallenge, listChallenges, updateChallenge, deleteChallenge, submitChallenge } from '../controllers/challengeController.js';

const router = Router();

router.get('/', auth(), listChallenges);
router.post('/', auth('teacher'), createChallenge);
router.put('/:id', auth('teacher'), updateChallenge);
router.delete('/:id', auth('teacher'), deleteChallenge);

// student submission
router.post('/:challengeId/submit', auth('student'), submitChallenge);

export default router;


