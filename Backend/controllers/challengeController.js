import { Challenge } from '../models/Challenge.js';
import { Student } from '../models/Student.js';
import { School } from '../models/School.js';
import { StudentLeaderboard, SchoolLeaderboard } from '../models/Leaderboard.js';

export async function createChallenge(req, res) {
  try {
    const challenge = await Challenge.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(challenge);
  } catch (e) {
    res.status(400).json({ error: 'Invalid challenge data' });
  }
}

export async function listChallenges(req, res) {
  const { school, className, sectionName } = req.query;
  const filter = {};
  if (school) filter.school = school;
  if (className) filter.className = className;
  if (sectionName) filter.sectionName = sectionName;
  const challenges = await Challenge.find(filter).sort({ createdAt: -1 });
  res.json(challenges);
}

export async function updateChallenge(req, res) {
  const challenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!challenge) return res.status(404).json({ error: 'Not found' });
  res.json(challenge);
}

export async function deleteChallenge(req, res) {
  const challenge = await Challenge.findByIdAndDelete(req.params.id);
  if (!challenge) return res.status(404).json({ error: 'Not found' });
  res.json({ success: true });
}

// Submit completed challenge -> update student points and leaderboards
export async function submitChallenge(req, res) {
  const { challengeId } = req.params;
  const studentId = req.user.id;
  const challenge = await Challenge.findById(challengeId);
  if (!challenge) return res.status(404).json({ error: 'Challenge not found' });

  const student = await Student.findById(studentId);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  // prevent duplicate submissions
  if (student.completedChallenges?.some((id) => id.toString() === challengeId)) {
    return res.status(409).json({ error: 'Already submitted' });
  }

  student.completedChallenges.push(challenge._id);
  student.ecoPoints += challenge.points;
  await student.save();

  // Update school total points
  await School.findByIdAndUpdate(student.school, { $inc: { totalEcoPoints: challenge.points } });

  // Update leaderboards
  await StudentLeaderboard.findOneAndUpdate(
    { student: student._id },
    { $set: { student: student._id }, $inc: { ecoPoints: challenge.points } },
    { upsert: true, new: true }
  );
  await SchoolLeaderboard.findOneAndUpdate(
    { school: student.school },
    { $set: { school: student.school }, $inc: { totalEcoPoints: challenge.points } },
    { upsert: true, new: true }
  );

  res.json({ success: true, newEcoPoints: student.ecoPoints });
}


