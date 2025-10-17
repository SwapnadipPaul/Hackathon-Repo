import { useEffect, useState } from 'react';
import { leaderboardAPI, isAuthenticated } from '../services/api';

export default function StudentDashboard() {
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
          leaderboardAPI.getTopStudents(10),
          leaderboardAPI.getTopSchools(5)
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
          <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
          <p className="text-white/70">Track your progress and see the leaderboards</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Students Leaderboard */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              🏆 Top Students
            </h2>
            <div className="space-y-3">
              {leaderboard.length === 0 ? (
                <p className="text-white/60 text-center py-4">No data available</p>
              ) : (
                leaderboard.map((entry, index) => (
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

          {/* Top Schools Leaderboard */}
          <div className="glass p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              🏫 Top Schools
            </h2>
            <div className="space-y-3">
              {schools.length === 0 ? (
                <p className="text-white/60 text-center py-4">No data available</p>
              ) : (
                schools.map((entry, index) => (
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
                        <div className="text-white font-medium">{entry.school?.name}</div>
                        <div className="text-white/60 text-sm">
                          {entry.school?.district}, {entry.school?.state}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-brand-400 font-semibold">{entry.totalEcoPoints} pts</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Additional Dashboard Content */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-brand-400 mb-2">Your Progress</div>
            <div className="text-white/70">Track your eco-points and achievements</div>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-brand-400 mb-2">Challenges</div>
            <div className="text-white/70">Complete challenges to earn points</div>
          </div>
          <div className="glass p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-brand-400 mb-2">Quizzes</div>
            <div className="text-white/70">Test your knowledge and skills</div>
          </div>
        </div>
      </div>
    </div>
  );
}


