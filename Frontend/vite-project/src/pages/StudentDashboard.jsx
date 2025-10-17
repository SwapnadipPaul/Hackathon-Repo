import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { leaderboardAPI } from "../services/api";
import PointsDisplay from "../components/PointsDisplay";
import CapsuleButton from "../components/CapsuleButton";

export default function StudentDashboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      const [students, schools] = await Promise.all([
        leaderboardAPI.getTopStudents(10),
        leaderboardAPI.getTopSchools(5),
      ]);
      setLeaderboardData({ students, schools });
    } catch (err) {
      setError(err.message || "Failed to fetch data");
      // Use mock data if API fails
      setLeaderboardData({
        students: [
          { name: "Anaya R", class: "8A", section: "A", ecoPoints: 847 },
          { name: "Harsh V", class: "8B", section: "B", ecoPoints: 723 },
          { name: "Ishaan K", class: "9C", section: "C", ecoPoints: 689 },
          { name: "Mia S", class: "8A", section: "A", ecoPoints: 534 },
          { name: "Rohan D", class: "9B", section: "B", ecoPoints: 445 },
        ],
        schools: [
          { name: "Green Valley International School", totalEcoPoints: 12500 },
          { name: "Eco Warriors Academy", totalEcoPoints: 11800 },
          { name: "Nature's Pride School", totalEcoPoints: 10950 },
          { name: "Sustainable Future Institute", totalEcoPoints: 9870 },
          { name: "Environmental Leaders School", totalEcoPoints: 8920 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass p-8 rounded-2xl text-center">
          <div className="animate-spin w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-white font-body">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/src/pages/Assets/based-on-eco-learn-make-logo.jpg"
                alt="Eco Learn Logo"
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/40x40/10b981/ffffff?text=EL";
                }}
              />
              <div>
                <h1 className="text-xl font-heading font-bold text-white">
                  Student Dashboard
                </h1>
                <p className="text-sm text-white/60">
                  Welcome back, {user?.name || "Student"}! 🌱
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="/src/pages/Assets/boy.png"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/32x32/10b981/ffffff?text=U";
                }}
              />
              <CapsuleButton
                variant="outline"
                onClick={() => logout()}
                promptMessage="Logging Out! 👋"
              >
                Logout
              </CapsuleButton>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Points Display */}
        <div className="mb-8">
          <PointsDisplay />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <CapsuleButton
            variant="primary"
            onClick={() => (window.location.href = "/lessons")}
            promptMessage="Starting Interactive Lessons! 📚"
            className="h-20 flex-col space-y-2 animate-fade-in-up"
          >
            <span className="text-2xl">📖</span>
            <span className="text-sm">Lessons</span>
          </CapsuleButton>
          <CapsuleButton
            variant="primary"
            onClick={() => (window.location.href = "/quiz")}
            promptMessage="Taking Quiz Challenge! 🧠"
            className="h-20 flex-col space-y-2 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-2xl">🧠</span>
            <span className="text-sm">Quiz</span>
          </CapsuleButton>
          <CapsuleButton
            variant="primary"
            onClick={() => (window.location.href = "/challenges")}
            promptMessage="Exploring Challenges! 🎯"
            className="h-20 flex-col space-y-2 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-2xl">🎯</span>
            <span className="text-sm">Challenges</span>
          </CapsuleButton>
          <CapsuleButton
            variant="primary"
            onClick={() => (window.location.href = "/projects")}
            promptMessage="Joining Real Projects! 🌱"
            className="h-20 flex-col space-y-2 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="text-2xl">🌱</span>
            <span className="text-sm">Projects</span>
          </CapsuleButton>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Students Leaderboard */}
          <div className="glass p-6 rounded-2xl animate-fade-in-left">
            <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
              <span className="mr-3">🏆</span>
              Top Students
            </h2>
            <div className="space-y-4">
              {leaderboardData?.students?.slice(0, 5).map((student, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold">
                    {index + 1}
                  </div>
                  <img
                    src="/src/pages/Assets/boy.png"
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/40x40/10b981/ffffff?text=U";
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-white font-body font-semibold">
                      {student.name}
                    </p>
                    <p className="text-white/60 text-sm">
                      Class {student.class} • Section {student.section}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold">
                      {student.ecoPoints} pts
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <CapsuleButton
                variant="outline"
                onClick={() => (window.location.href = "/leaderboard")}
                promptMessage="View Full Leaderboard! 📊"
                className="w-full"
              >
                View Full Leaderboard
              </CapsuleButton>
            </div>
          </div>

          {/* Top Schools Leaderboard */}
          <div className="glass p-6 rounded-2xl animate-fade-in-right">
            <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
              <span className="mr-3">🏫</span>
              Top Schools
            </h2>
            <div className="space-y-4">
              {leaderboardData?.schools?.slice(0, 5).map((school, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-body font-semibold">
                      {school.name}
                    </p>
                    <p className="text-white/60 text-sm">Total Eco Points</p>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-bold">
                      {school.totalEcoPoints?.toLocaleString()} pts
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <CapsuleButton
                variant="outline"
                onClick={() => (window.location.href = "/leaderboard")}
                promptMessage="View School Rankings! 🏆"
                className="w-full"
              >
                View School Rankings
              </CapsuleButton>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 glass p-6 rounded-2xl animate-fade-in-up">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
            <span className="mr-3">⚡</span>
            Recent Activity
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">📖</div>
                <div>
                  <h3 className="text-white font-heading font-bold">Lessons</h3>
                  <p className="text-white/60 text-sm">Interactive Learning</p>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-3">
                Complete environmental science lessons with embedded videos and
                earn points!
              </p>
              <CapsuleButton
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = "/lessons")}
                promptMessage="Starting Lessons! 📚"
                className="w-full"
              >
                Start Learning
              </CapsuleButton>
            </div>

            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">🧠</div>
                <div>
                  <h3 className="text-white font-heading font-bold">Quizzes</h3>
                  <p className="text-white/60 text-sm">Test Your Knowledge</p>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-3">
                Take interactive quizzes with MCQ and True/False questions to
                test your understanding!
              </p>
              <CapsuleButton
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = "/quiz")}
                promptMessage="Taking Quiz! 🧠"
                className="w-full"
              >
                Take Quiz
              </CapsuleButton>
            </div>

            <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl">🌱</div>
                <div>
                  <h3 className="text-white font-heading font-bold">
                    Projects
                  </h3>
                  <p className="text-white/60 text-sm">Real Impact</p>
                </div>
              </div>
              <p className="text-white/80 text-sm mb-3">
                Join real-world environmental projects and make a difference in
                your community!
              </p>
              <CapsuleButton
                variant="primary"
                size="sm"
                onClick={() => (window.location.href = "/projects")}
                promptMessage="Joining Projects! 🌱"
                className="w-full"
              >
                Join Projects
              </CapsuleButton>
            </div>
          </div>
        </div>

        {/* Environmental Tips */}
        <div className="mt-8 glass p-6 rounded-2xl animate-fade-in-up">
          <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
            <span className="mr-3">💡</span>
            Daily Eco Tips
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "💧",
                tip: "Turn off taps while brushing teeth to save water",
                category: "Water Conservation",
              },
              {
                icon: "🌱",
                tip: "Plant a tree or start a small garden at home",
                category: "Tree Planting",
              },
              {
                icon: "♻️",
                tip: "Use reusable bags instead of plastic bags",
                category: "Waste Management",
              },
              {
                icon: "🚲",
                tip: "Walk or cycle for short distances instead of driving",
                category: "Sustainable Transport",
              },
              {
                icon: "💡",
                tip: "Switch to LED bulbs to save energy",
                category: "Energy Conservation",
              },
              {
                icon: "📱",
                tip: "Reduce screen time to save electricity",
                category: "Digital Detox",
              },
            ].map((tip, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl mb-2">{tip.icon}</div>
                <h3 className="text-white font-heading font-bold text-sm mb-1">
                  {tip.category}
                </h3>
                <p className="text-white/80 text-sm">{tip.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
