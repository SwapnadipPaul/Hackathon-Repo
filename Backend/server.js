import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from './routes/auth.js';
import quizRoutes from './routes/quizzes.js';
import challengeRoutes from './routes/challenges.js';
import leaderboardRoutes from './routes/leaderboard.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Server running...");
});

// Example AI route placeholder
app.post("/api/ai", async (req, res) => {
  try {
    const { prompt } = req.body;
    res.json({ reply: "Mock AI response for: " + prompt });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
