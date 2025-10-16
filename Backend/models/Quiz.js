import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    prompt: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctIndex: { type: Number, required: true },
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    topic: { type: String, enum: ['climate', 'waste', 'biodiversity', 'sustainability', 'other'], default: 'other' },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    className: { type: String },
    sectionName: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    questions: [questionSchema],
    points: { type: Number, default: 10 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Quiz = mongoose.model('Quiz', quizSchema);


