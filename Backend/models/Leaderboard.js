import mongoose from 'mongoose';

const studentLeaderboardSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true, unique: true },
    ecoPoints: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

const schoolLeaderboardSchema = new mongoose.Schema(
  {
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, unique: true },
    totalEcoPoints: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const StudentLeaderboard = mongoose.model('StudentLeaderboard', studentLeaderboardSchema);
export const SchoolLeaderboard = mongoose.model('SchoolLeaderboard', schoolLeaderboardSchema);


