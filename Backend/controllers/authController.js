import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Student } from '../models/Student.js';
import { Teacher } from '../models/Teacher.js';
import { School } from '../models/School.js';

function signToken(user, role) {
  return jwt.sign(
    { id: user._id.toString(), role },
    process.env.JWT_SECRET || 'dev_secret',
    { expiresIn: '7d' }
  );
}

export async function registerStudent(req, res) {
  try {
    const { name, email, password, schoolId, className, sectionName } = req.body;
    if (!name || !email || !password || !schoolId || !className || !sectionName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ error: 'School not found' });
    const exists = await Student.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already in use' });
    const hash = await bcrypt.hash(password, 10);
    const student = await Student.create({
      name,
      email,
      password: hash,
      school: school._id,
      className,
      sectionName,
    });
    const token = signToken(student, 'student');
    res.json({ token, user: { id: student._id, name: student.name, role: 'student' } });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function registerTeacher(req, res) {
  try {
    const { name, email, password, schoolId, classes = [] } = req.body;
    if (!name || !email || !password || !schoolId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const school = await School.findById(schoolId);
    if (!school) return res.status(404).json({ error: 'School not found' });
    const exists = await Teacher.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already in use' });
    const hash = await bcrypt.hash(password, 10);
    const teacher = await Teacher.create({ name, email, password: hash, school: school._id, classes });
    const token = signToken(teacher, 'teacher');
    res.json({ token, user: { id: teacher._id, name: teacher.name, role: 'teacher' } });
  } catch (e) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function login(req, res) {
  try {
    console.log('Login request body:', req.body);
    const { email, password, role } = req.body; // role: 'student' | 'teacher'
    if (!email || !password || !role) return res.status(400).json({ error: 'Missing fields' });
    const Model = role === 'teacher' ? Teacher : Student;
    console.log('Looking for user with email:', email, 'in model:', Model.modelName);
    const user = await Model.findOne({ email });
    console.log('User found:', user ? 'Yes' : 'No');
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    console.log('Password match:', ok);
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = signToken(user, role);
    res.json({ token, user: { id: user._id, name: user.name, role } });
  } catch (e) {
    console.error('Login error:', e);
    res.status(500).json({ error: 'Server error' });
  }
}


