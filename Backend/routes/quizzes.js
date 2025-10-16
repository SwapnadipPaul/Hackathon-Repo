import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { createQuiz, listQuizzes, getQuiz, updateQuiz, deleteQuiz } from '../controllers/quizController.js';

const router = Router();

router.get('/', auth(), listQuizzes);
router.get('/:id', auth(), getQuiz);
router.post('/', auth('teacher'), createQuiz);
router.put('/:id', auth('teacher'), updateQuiz);
router.delete('/:id', auth('teacher'), deleteQuiz);

export default router;


