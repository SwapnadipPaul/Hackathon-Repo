import { useEffect, useState } from 'react';
import { leaderboardAPI, isAuthenticated } from '../services/api';

export default function TeacherDashboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const [studentsData, schoolsData] = await Promise.all([
          leaderboardAPI.getTopStudents(20),
          leaderboardAPI.getTopSchools(10)
        ]);
        
        setLeaderboard(studentsData);
        setSchools(schoolsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Teacher Dashboard</h1>
          <p className="text-white/70">Monitor student progress and school performance</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        {/* School Leaderboard */}
        <div className="mb-8">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              🏫 Top Performing Schools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schools.length === 0 ? (
                <div className="col-span-full text-center py-8">
                  <p className="text-white/60">No school data available</p>
                </div>
              ) : (
                schools.map((entry, index) => (
                  <div key={entry._id} className="p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-yellow-900' :
                        index === 1 ? 'bg-gray-400 text-gray-900' :
                        index === 2 ? 'bg-amber-600 text-amber-100' :
                        'bg-white/10 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="text-brand-400 font-semibold">{entry.totalEcoPoints} pts</div>
                    </div>
                    <div className="text-white font-medium">{entry.school?.name}</div>
                    <div className="text-white/60 text-sm">
                      {entry.school?.district}, {entry.school?.state}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Student Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              🏆 Top 10 Students
            </h2>
            <div className="space-y-3">
              {leaderboard.length === 0 ? (
                <p className="text-white/60 text-center py-4">No student data available</p>
              ) : (
                leaderboard.slice(0, 10).map((entry, index) => (
                  <div key={entry._id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        index === 0 ? 'bg-yellow-500 text-yellow-900' :
                        index === 1 ? 'bg-gray-400 text-gray-900' :
                        index === 2 ? 'bg-amber-600 text-amber-100' :
                        'bg-white/10 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-white font-medium">{entry.student?.name}</div>
                        <div className="text-white/60 text-sm">
                          {entry.student?.className} - {entry.student?.sectionName}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-brand-400 font-semibold">{entry.ecoPoints} pts</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Teacher Tools */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              🛠️ Teacher Tools
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-white font-medium mb-2">Create Quiz</h3>
                <p className="text-white/60 text-sm mb-3">Design quizzes to test student knowledge</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Create New Quiz
                </button>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-white font-medium mb-2">Manage Challenges</h3>
                <p className="text-white/60 text-sm mb-3">Set up eco-challenges for students</p>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Manage Challenges
                </button>
              </div>
              
              <div className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-white font-medium mb-2">View Reports</h3>
                <p className="text-white/60 text-sm mb-3">Generate detailed performance reports</p>
                <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-brand-400 mb-2">{leaderboard.length}</div>
            <div className="text-white/70">Total Students</div>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-brand-400 mb-2">{schools.length}</div>
            <div className="text-white/70">Active Schools</div>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-brand-400 mb-2">
              {leaderboard.reduce((sum, entry) => sum + entry.ecoPoints, 0)}
            </div>
            <div className="text-white/70">Total Eco Points</div>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-brand-400 mb-2">
              {schools.reduce((sum, entry) => sum + entry.totalEcoPoints, 0)}
            </div>
            <div className="text-white/70">School Points</div>
          </div>
        </div>
      </div>
    </div>
  );
}
