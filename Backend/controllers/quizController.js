import { Quiz } from '../models/Quiz.js';

export async function createQuiz(req, res) {
  try {
    const quiz = await Quiz.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(quiz);
  } catch (e) {
    res.status(400).json({ error: 'Invalid quiz data' });
  }
}

export async function listQuizzes(req, res) {
  const { school, className, sectionName } = req.query;
  const filter = {};
  if (school) filter.school = school;
  if (className) filter.className = className;
  if (sectionName) filter.sectionName = sectionName;
  const quizzes = await Quiz.find(filter).sort({ createdAt: -1 });
  res.json(quizzes);
}

export async function getQuiz(req, res) {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) return res.status(404).json({ error: 'Not found' });
  res.json(quiz);
}

export async function updateQuiz(req, res) {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!quiz) return res.status(404).json({ error: 'Not found' });
  res.json(quiz);
}

export async function deleteQuiz(req, res) {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);
  if (!quiz) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
}


