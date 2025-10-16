import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
