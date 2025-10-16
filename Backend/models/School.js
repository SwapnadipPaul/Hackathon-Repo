import mongoose from 'mongoose';

const sectionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "A"
  },
  { _id: false }
);

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "10"
    sections: [sectionSchema],
  },
  { _id: false }
);

const schoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    district: { type: String },
    state: { type: String },
    classes: [classSchema],
    totalEcoPoints: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
);

export const School = mongoose.model('School', schoolSchema);


