import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Import models
import { School } from './models/School.js';
import { Teacher } from './models/Teacher.js';
import { Student } from './models/Student.js';
import { StudentLeaderboard, SchoolLeaderboard } from './models/Leaderboard.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await School.deleteMany({});
    await Teacher.deleteMany({});
    await Student.deleteMany({});
    await StudentLeaderboard.deleteMany({});
    await SchoolLeaderboard.deleteMany({});
    console.log('🗑️ Cleared existing data');

    // Create schools
    const schools = [
      {
        name: 'Riverdale International School',
        district: 'Central',
        state: 'Delhi',
        pincode: '110001'
      },
      {
        name: 'Green Valley Public School',
        district: 'South',
        state: 'Delhi',
        pincode: '110017'
      },
      {
        name: 'Eco-Friendly Academy',
        district: 'East',
        state: 'Delhi',
        pincode: '110092'
      },
      {
        name: 'Sustainable Learning Center',
        district: 'West',
        state: 'Delhi',
        pincode: '110018'
      },
      {
        name: 'Environmental Studies School',
        district: 'North',
        state: 'Delhi',
        pincode: '110085'
      },
      {
        name: 'Green Future Institute',
        district: 'Central',
        state: 'Delhi',
        pincode: '110002'
      }
    ];

    const createdSchools = await School.insertMany(schools);
    console.log('🏫 Created schools');

    // Create teachers
    const teachers = [
      {
        name: 'Dr. Priya Sharma',
        email: 'priya.sharma@riverdale.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[0]._id
      },
      {
        name: 'Mr. Rajesh Kumar',
        email: 'rajesh.kumar@greenvalley.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[1]._id
      },
      {
        name: 'Ms. Ananya Singh',
        email: 'ananya.singh@ecoacademy.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[2]._id
      }
    ];

    const createdTeachers = await Teacher.insertMany(teachers);
    console.log('👨‍🏫 Created teachers');

    // Create students
    const students = [
      {
        name: 'Anaya R',
        email: 'anaya.r@student.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[0]._id,
        className: '10',
        sectionName: 'A'
      },
      {
        name: 'Rohan D',
        email: 'rohan.d@student.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[1]._id,
        className: '9',
        sectionName: 'B'
      },
      {
        name: 'Mia S',
        email: 'mia.s@student.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[2]._id,
        className: '11',
        sectionName: 'C'
      },
      {
        name: 'Ishaan K',
        email: 'ishaan.k@student.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[0]._id,
        className: '8',
        sectionName: 'A'
      },
      {
        name: 'Zara T',
        email: 'zara.t@student.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[3]._id,
        className: '10',
        sectionName: 'B'
      },
      {
        name: 'Ben P',
        email: 'ben.p@student.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[4]._id,
        className: '9',
        sectionName: 'C'
      },
      {
        name: 'Chirag L',
        email: 'chirag.l@student.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[5]._id,
        className: '12',
        sectionName: 'A'
      },
      {
        name: 'Disha K',
        email: 'disha.k@student.edu',
        password: await bcrypt.hash('password123', 10),
        school: createdSchools[0]._id,
        className: '7',
        sectionName: 'B'
      }
    ];

    const createdStudents = await Student.insertMany(students);
    console.log('👨‍🎓 Created students');

    // Create leaderboard entries
    const studentLeaderboardEntries = [
      {
        student: createdStudents[0]._id,
        ecoPoints: 900
      },
      {
        student: createdStudents[1]._id,
        ecoPoints: 750
      },
      {
        student: createdStudents[2]._id,
        ecoPoints: 600
      },
      {
        student: createdStudents[3]._id,
        ecoPoints: 550
      },
      {
        student: createdStudents[4]._id,
        ecoPoints: 400
      },
      {
        student: createdStudents[5]._id,
        ecoPoints: 300
      },
      {
        student: createdStudents[6]._id,
        ecoPoints: 150
      },
      {
        student: createdStudents[7]._id,
        ecoPoints: 80
      }
    ];

    // Create school leaderboard entries
    const schoolLeaderboardEntries = [
      {
        school: createdSchools[0]._id,
        totalEcoPoints: 1530 // Sum of students from this school
      },
      {
        school: createdSchools[1]._id,
        totalEcoPoints: 750
      },
      {
        school: createdSchools[2]._id,
        totalEcoPoints: 600
      },
      {
        school: createdSchools[3]._id,
        totalEcoPoints: 400
      },
      {
        school: createdSchools[4]._id,
        totalEcoPoints: 300
      },
      {
        school: createdSchools[5]._id,
        totalEcoPoints: 150
      }
    ];

    await StudentLeaderboard.insertMany(studentLeaderboardEntries);
    await SchoolLeaderboard.insertMany(schoolLeaderboardEntries);
    console.log('🏆 Created leaderboard entries');

    console.log('✅ Database seeded successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('Students:');
    console.log('  - anaya.r@student.edu / password123');
    console.log('  - rohan.d@student.edu / password123');
    console.log('  - mia.s@student.edu / password123');
    console.log('\nTeachers:');
    console.log('  - priya.sharma@riverdale.edu / password123');
    console.log('  - rajesh.kumar@greenvalley.edu / password123');
    console.log('  - ananya.singh@ecoacademy.edu / password123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

seedDatabase();
