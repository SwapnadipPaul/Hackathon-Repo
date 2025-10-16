import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    points: { type: Number, default: 20 },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    className: { type: String },
    sectionName: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Challenge = mongoose.model('Challenge', challengeSchema);


