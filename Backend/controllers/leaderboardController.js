import { StudentLeaderboard, SchoolLeaderboard } from '../models/Leaderboard.js';
import { Student } from '../models/Student.js';
import { School } from '../models/School.js';

export async function topStudents(req, res) {
  const { limit = 10 } = req.query;
  const entries = await StudentLeaderboard.find()
    .sort({ ecoPoints: -1 })
    .limit(Number(limit))
    .populate({ path: 'student', select: 'name className sectionName school' });
  res.json(entries);
}

export async function topSchools(req, res) {
  const { limit = 10 } = req.query;
  const entries = await SchoolLeaderboard.find()
    .sort({ totalEcoPoints: -1 })
    .limit(Number(limit))
    .populate({ path: 'school', select: 'name district state' });
  res.json(entries);
}


