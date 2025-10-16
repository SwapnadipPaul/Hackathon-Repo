import mongoose from 'mongoose';

// School -> Class -> Section enforced via fields
const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },

    // organization
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },
    className: { type: String, required: true }, // e.g., "10"
    sectionName: { type: String, required: true }, // e.g., "A"

    ecoPoints: { type: Number, default: 0, index: true },
    completedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }],
    badges: [String],
  },
  { timestamps: true }
);

studentSchema.index({ school: 1, className: 1, sectionName: 1 });

export const Student = mongoose.model('Student', studentSchema);


