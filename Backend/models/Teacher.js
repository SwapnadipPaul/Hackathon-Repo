import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true, index: true },

    // A teacher from the same school can see multiple students across classes/sections
    classes: [
      {
        className: { type: String, required: true },
        sectionName: { type: String, required: true },
      },
    ],

    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    reports: [
      {
        date: { type: Date },
        totalEcoPoints: { type: Number },
        activeStudents: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export const Teacher = mongoose.model('Teacher', teacherSchema);


