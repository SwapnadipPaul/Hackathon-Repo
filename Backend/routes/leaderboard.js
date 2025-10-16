import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { topStudents, topSchools } from '../controllers/leaderboardController.js';

const router = Router();

router.get('/students', auth(), topStudents);
router.get('/schools', auth(), topSchools);

export default router;


