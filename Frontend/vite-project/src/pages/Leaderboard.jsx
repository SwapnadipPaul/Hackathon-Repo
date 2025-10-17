import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usePoints } from "../contexts/PointsContext";
import CapsuleButton from "../components/CapsuleButton";

export default function Leaderboard() {
  const { user } = useAuth();
  const { totalPoints, getCurrentLevel } = usePoints();
  const [selectedTab, setSelectedTab] = useState("students");
  const [timeFilter, setTimeFilter] = useState("all");

  // Mock data for demonstration
  const [topStudents] = useState([
    {
      id: 1,
      name: "Anaya R",
      class: "8A",
      points: 847,
      level: "Diamond",
      avatar: "/src/pages/Assets/boy.png",
      badge: "Climate Champion",
    },
    {
      id: 2,
      name: "Harsh V",
      class: "8B",
      points: 723,
      level: "Platinum",
      avatar: "/src/pages/Assets/boy.png",
      badge: "Eco Warrior",
    },
    {
      id: 3,
      name: "Ishaan K",
      class: "9C",
      points: 689,
      level: "Platinum",
      avatar: "/src/pages/Assets/boy.png",
      badge: "Tree Hugger",
    },
    {
      id: 4,
      name: "Mia S",
      class: "8A",
      points: 534,
      level: "Gold",
      avatar: "/src/pages/Assets/boy.png",
      badge: "Water Saver",
    },
    {
      id: 5,
      name: "Rohan D",
      class: "9B",
      points: 445,
      level: "Gold",
      avatar: "/src/pages/Assets/boy.png",
      badge: "Plastic Fighter",
    },
    {
      id: 6,
      name: "Zara T",
      class: "8B",
      points: 398,
      level: "Gold",
      avatar: "/src/pages/Assets/boy.png",
      badge: "Recycling Hero",
    },
    {
      id: 7,
      name: "Evan Q",
      class: "9C",
      points: 287,
      level: "Silver",
      avatar: "/src/pages/Assets/boy.png",
      badge: "Green Thumb",
    },
    {
      id: 8,
      name: "Disha K",
      class: "9A",
      points: 234,
      level: "Silver",
      avatar: "/src/pages/Assets/boy.png",
      badge: "Nature Lover",
    },
    {
      id: 9,
      name: "Sam R",
      class: "8C",
      points: 156,
      level: "Silver",
      avatar: "/src/pages/Assets/boy.png",
      badge: "Eco Explorer",
    },
    {
      id: 10,
      name: "Luna M",
      class: "9B",
      points: 98,
      level: "Bronze",
      avatar: "/src/pages/Assets/boy.png",
      badge: "Future Leader",
    },
  ]);

  const [topSchools] = useState([
    {
      id: 1,
      name: "Green Valley International School",
      points: 12500,
      students: 450,
      badge: "Eco Champion School",
    },
    {
      id: 2,
      name: "Eco Warriors Academy",
      points: 11800,
      students: 380,
      badge: "Sustainability Leader",
    },
    {
      id: 3,
      name: "Nature's Pride School",
      points: 10950,
      students: 420,
      badge: "Environmental Pioneer",
    },
    {
      id: 4,
      name: "Sustainable Future Institute",
      points: 9870,
      students: 350,
      badge: "Green Innovator",
    },
    {
      id: 5,
      name: "Environmental Leaders School",
      points: 8920,
      students: 320,
      badge: "Climate Action Hero",
    },
  ]);

  const getLevelColor = (level) => {
    const colors = {
      Bronze: "text-yellow-600",
      Silver: "text-gray-400",
      Gold: "text-yellow-400",
      Platinum: "text-blue-400",
      Diamond: "text-cyan-400",
    };
    return colors[level] || "text-gray-400";
  };

  const getLevelIcon = (level) => {
    const icons = {
      Bronze: "🥉",
      Silver: "🥈",
      Gold: "🥇",
      Platinum: "💎",
      Diamond: "💠",
    };
    return icons[level] || "🏆";
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "👑";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <img
                src="/src/pages/Assets/based-on-eco-learn-make-logo.jpg"
                alt="Eco Learn Logo"
                className="w-10 h-10 rounded-full object-cover hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/40x40/10b981/ffffff?text=EL";
                }}
              />
              <div>
                <h1 className="text-xl font-heading font-bold text-white">
                  Leaderboard
                </h1>
                <p className="text-sm text-white/60">
                  Top performers in environmental learning
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="text-right">
                  <p className="text-white font-body font-medium">
                    {user.name}
                  </p>
                  <p className="text-green-400 text-sm">
                    {getCurrentLevel().icon} {getCurrentLevel().name} •{" "}
                    {totalPoints} pts
                  </p>
                </div>
              )}
              <CapsuleButton
                variant="outline"
                onClick={() => (window.location.href = "/student-dashboard")}
                promptMessage="Back to Dashboard! 📊"
              >
                Dashboard
              </CapsuleButton>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-5xl font-heading font-bold text-white mb-4">
            🏆 Eco Leaderboard
          </h1>
          <p className="text-xl text-white/80 font-body max-w-2xl mx-auto">
            Celebrate the environmental champions who are making a difference
            through learning and action!
          </p>
        </div>

        {/* Top 3 Podium */}
        <div
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <h2 className="text-3xl font-heading font-bold text-center text-white mb-8">
            🥇 Top 3 Champions
          </h2>
          <div className="flex justify-center items-end space-x-4 max-w-4xl mx-auto">
            {/* 2nd Place */}
            <div
              className="glass p-6 rounded-2xl text-center hover:shadow-glow transition-all duration-300 animate-fade-in-left"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-4xl mb-2">🥈</div>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-300 to-gray-500 flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <img
                src={topStudents[1]?.avatar}
                alt={topStudents[1]?.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-gray-400"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/64x64/10b981/ffffff?text=U";
                }}
              />
              <h3 className="text-white font-heading font-bold text-lg">
                {topStudents[1]?.name}
              </h3>
              <p className="text-white/60 text-sm mb-2">
                {topStudents[1]?.class}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span
                  className={`text-lg ${getLevelColor(topStudents[1]?.level)}`}
                >
                  {getLevelIcon(topStudents[1]?.level)}
                </span>
                <span className="text-white font-bold">
                  {topStudents[1]?.points} pts
                </span>
              </div>
              <p className="text-gray-400 text-xs bg-white/5 px-2 py-1 rounded-full">
                {topStudents[1]?.badge}
              </p>
            </div>

            {/* 1st Place */}
            <div
              className="glass p-8 rounded-2xl text-center hover:shadow-gold-glow transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-5xl mb-2 animate-float">👑</div>
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center text-3xl font-bold">
                1
              </div>
              <img
                src={topStudents[0]?.avatar}
                alt={topStudents[0]?.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-yellow-400"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/80x80/10b981/ffffff?text=U";
                }}
              />
              <h3 className="text-white font-heading font-bold text-xl">
                {topStudents[0]?.name}
              </h3>
              <p className="text-white/60 text-sm mb-2">
                {topStudents[0]?.class}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span
                  className={`text-xl ${getLevelColor(topStudents[0]?.level)}`}
                >
                  {getLevelIcon(topStudents[0]?.level)}
                </span>
                <span className="text-white font-bold text-lg">
                  {topStudents[0]?.points} pts
                </span>
              </div>
              <p className="text-yellow-400 text-sm bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                {topStudents[0]?.badge}
              </p>
            </div>

            {/* 3rd Place */}
            <div
              className="glass p-6 rounded-2xl text-center hover:shadow-glow transition-all duration-300 animate-fade-in-right"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="text-4xl mb-2">🥉</div>
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-yellow-600 to-orange-500 flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <img
                src={topStudents[2]?.avatar}
                alt={topStudents[2]?.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-yellow-600"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/64x64/10b981/ffffff?text=U";
                }}
              />
              <h3 className="text-white font-heading font-bold text-lg">
                {topStudents[2]?.name}
              </h3>
              <p className="text-white/60 text-sm mb-2">
                {topStudents[2]?.class}
              </p>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span
                  className={`text-lg ${getLevelColor(topStudents[2]?.level)}`}
                >
                  {getLevelIcon(topStudents[2]?.level)}
                </span>
                <span className="text-white font-bold">
                  {topStudents[2]?.points} pts
                </span>
              </div>
              <p className="text-yellow-600 text-xs bg-white/5 px-2 py-1 rounded-full">
                {topStudents[2]?.badge}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center space-x-2 mb-8">
          {[
            { id: "students", label: "Students", icon: "👥" },
            { id: "schools", label: "Schools", icon: "🏫" },
          ].map((tab) => (
            <CapsuleButton
              key={tab.id}
              variant={selectedTab === tab.id ? "primary" : "outline"}
              onClick={() => setSelectedTab(tab.id)}
              promptMessage={`Viewing ${tab.label} Leaderboard! ${tab.icon}`}
              className="animate-fade-in-up"
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </CapsuleButton>
          ))}
        </div>

        {/* Time Filter */}
        <div className="flex justify-center space-x-2 mb-8">
          {[
            { id: "all", label: "All Time" },
            { id: "month", label: "This Month" },
            { id: "week", label: "This Week" },
          ].map((filter) => (
            <CapsuleButton
              key={filter.id}
              variant={timeFilter === filter.id ? "primary" : "outline"}
              onClick={() => setTimeFilter(filter.id)}
              promptMessage={`Filtering by ${filter.label}! 📅`}
              size="sm"
              className="animate-fade-in-up"
            >
              {filter.label}
            </CapsuleButton>
          ))}
        </div>

        {/* Content based on selected tab */}
        {selectedTab === "students" && (
          <div className="glass p-6 rounded-2xl animate-fade-in-up">
            <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
              <span className="mr-3">📊</span>
              Student Rankings
            </h2>
            <div className="space-y-4">
              {topStudents.map((student, index) => (
                <div
                  key={student.id}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg">
                    {getRankIcon(index + 1)}
                  </div>
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/48x48/10b981/ffffff?text=U";
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-heading font-bold text-lg">
                      {student.name}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {student.class} • {student.badge}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <span
                        className={`text-lg ${getLevelColor(student.level)}`}
                      >
                        {getLevelIcon(student.level)}
                      </span>
                      <span className="text-white font-bold text-xl">
                        {student.points}
                      </span>
                    </div>
                    <p className={`text-sm ${getLevelColor(student.level)}`}>
                      {student.level}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "schools" && (
          <div className="glass p-6 rounded-2xl animate-fade-in-up">
            <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
              <span className="mr-3">🏫</span>
              School Rankings
            </h2>
            <div className="space-y-4">
              {topSchools.map((school, index) => (
                <div
                  key={school.id}
                  className="flex items-center space-x-4 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold text-lg">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-heading font-bold text-lg mb-1">
                      {school.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-2">
                      {school.students} students • {school.badge}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">📊</span>
                        <span className="text-white font-bold">
                          {school.points.toLocaleString()} pts
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-400">👥</span>
                        <span className="text-white">
                          {school.students} students
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <CapsuleButton
                      variant="outline"
                      size="sm"
                      onClick={() => console.log(`View school: ${school.name}`)}
                      promptMessage={`Viewing ${school.name}! 🏫`}
                    >
                      View Details
                    </CapsuleButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in-up">
          <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Want to climb the leaderboard? 🌱
            </h3>
            <p className="text-white/80 font-body mb-6">
              Complete lessons, take quizzes, join challenges, and participate
              in projects to earn points and rise through the ranks!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CapsuleButton
                variant="primary"
                onClick={() => (window.location.href = "/lessons")}
                promptMessage="Starting Lessons! 📚"
              >
                Start Learning
              </CapsuleButton>
              <CapsuleButton
                variant="outline"
                onClick={() => (window.location.href = "/challenges")}
                promptMessage="Taking Challenges! 🎯"
              >
                Join Challenges
              </CapsuleButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
