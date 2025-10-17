import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import CapsuleButton from "../components/CapsuleButton";

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showChallengeForm, setShowChallengeForm] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 156,
    activeProjects: 23,
    completedQuizzes: 89,
    averageScore: 87.5,
  });

  const [recentActivity] = useState([
    {
      id: 1,
      student: "Anaya R",
      action: "completed",
      activity: "Climate Change Quiz",
      points: 18,
      time: "2 minutes ago",
      avatar: "/src/pages/Assets/boy.png",
    },
    {
      id: 2,
      student: "Harsh V",
      action: "submitted",
      activity: "Tree Planting Project",
      points: 100,
      time: "15 minutes ago",
      avatar: "/src/pages/Assets/boy.png",
    },
    {
      id: 3,
      student: "Ishaan K",
      action: "achieved",
      activity: "Silver Level",
      points: 150,
      time: "1 hour ago",
      avatar: "/src/pages/Assets/boy.png",
    },
    {
      id: 4,
      student: "Mia S",
      action: "completed",
      activity: "Waste Management Lesson",
      points: 14.28,
      time: "2 hours ago",
      avatar: "/src/pages/Assets/boy.png",
    },
    {
      id: 5,
      student: "Rohan D",
      action: "joined",
      activity: "Plastic Collection Drive",
      points: 100,
      time: "3 hours ago",
      avatar: "/src/pages/Assets/boy.png",
    },
  ]);

  const [topStudents] = useState([
    {
      id: 1,
      name: "Anaya R",
      class: "8A",
      points: 847,
      level: "Diamond",
      avatar: "/src/pages/Assets/boy.png",
      recentActivity: "Climate Change Expert",
    },
    {
      id: 2,
      name: "Harsh V",
      class: "8B",
      points: 723,
      level: "Platinum",
      avatar: "/src/pages/Assets/boy.png",
      recentActivity: "Eco Warrior",
    },
    {
      id: 3,
      name: "Ishaan K",
      class: "9C",
      points: 689,
      level: "Platinum",
      avatar: "/src/pages/Assets/boy.png",
      recentActivity: "Tree Hugger",
    },
    {
      id: 4,
      name: "Mia S",
      class: "8A",
      points: 534,
      level: "Gold",
      avatar: "/src/pages/Assets/boy.png",
      recentActivity: "Water Saver",
    },
    {
      id: 5,
      name: "Rohan D",
      class: "9B",
      points: 445,
      level: "Gold",
      avatar: "/src/pages/Assets/boy.png",
      recentActivity: "Plastic Fighter",
    },
  ]);

  const [pendingSubmissions] = useState([
    {
      id: 1,
      student: "Zara T",
      class: "8B",
      title: "Climate Action Plan",
      type: "Project",
      submittedAt: "2 hours ago",
      status: "pending",
      avatar: "/src/pages/Assets/boy.png",
    },
    {
      id: 2,
      student: "Evan Q",
      class: "9C",
      title: "Biodiversity Research",
      type: "Assignment",
      submittedAt: "4 hours ago",
      status: "pending",
      avatar: "/src/pages/Assets/boy.png",
    },
    {
      id: 3,
      student: "Disha K",
      class: "9A",
      title: "Water Conservation Report",
      type: "Report",
      submittedAt: "6 hours ago",
      status: "pending",
      avatar: "/src/pages/Assets/boy.png",
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
                  Teacher Dashboard
                </h1>
                <p className="text-sm text-white/60">
                  Welcome back, {user?.name || "Teacher"}! 👋
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CapsuleButton
                variant="primary"
                onClick={() => setShowQuizForm(true)}
                promptMessage="Creating New Quiz! 📝"
              >
                Create Quiz
              </CapsuleButton>
              <CapsuleButton
                variant="outline"
                onClick={() => setShowChallengeForm(true)}
                promptMessage="Creating New Challenge! 🎯"
              >
                Create Challenge
              </CapsuleButton>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-300 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-body">
                  Total Students
                </p>
                <p className="text-3xl font-heading font-bold text-white">
                  {stats.totalStudents}
                </p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
          </div>

          <div
            className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-body">
                  Active Projects
                </p>
                <p className="text-3xl font-heading font-bold text-white">
                  {stats.activeProjects}
                </p>
              </div>
              <div className="text-4xl">🌱</div>
            </div>
          </div>

          <div
            className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-body">
                  Completed Quizzes
                </p>
                <p className="text-3xl font-heading font-bold text-white">
                  {stats.completedQuizzes}
                </p>
              </div>
              <div className="text-4xl">🧠</div>
            </div>
          </div>

          <div
            className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-300 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm font-body">Average Score</p>
                <p className="text-3xl font-heading font-bold text-white">
                  {stats.averageScore}%
                </p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "students", label: "Students", icon: "👥" },
            { id: "submissions", label: "Submissions", icon: "📝" },
            { id: "analytics", label: "Analytics", icon: "📈" },
          ].map((tab) => (
            <CapsuleButton
              key={tab.id}
              variant={selectedTab === tab.id ? "primary" : "outline"}
              onClick={() => setSelectedTab(tab.id)}
              promptMessage={`Viewing ${tab.label}! ${tab.icon}`}
              className="animate-fade-in-up"
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </CapsuleButton>
          ))}
        </div>

        {/* Content based on selected tab */}
        {selectedTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="glass p-6 rounded-2xl animate-fade-in-left">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <span className="mr-3">⚡</span>
                Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <img
                      src={activity.avatar}
                      alt={activity.student}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/40x40/10b981/ffffff?text=U";
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-white font-body">
                        <span className="font-semibold">
                          {activity.student}
                        </span>{" "}
                        {activity.action}{" "}
                        <span className="text-green-400">
                          {activity.activity}
                        </span>
                      </p>
                      <p className="text-white/60 text-sm">
                        {activity.time} • +{activity.points} points
                      </p>
                    </div>
                    <div className="text-green-400 font-bold">
                      +{activity.points}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Students */}
            <div className="glass p-6 rounded-2xl animate-fade-in-right">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <span className="mr-3">🏆</span>
                Top Performers
              </h2>
              <div className="space-y-4">
                {topStudents.slice(0, 5).map((student, index) => (
                  <div
                    key={student.id}
                    className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold">
                      {index + 1}
                    </div>
                    <img
                      src={student.avatar}
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
                        {student.class} • {student.recentActivity}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`text-sm ${getLevelColor(student.level)}`}
                        >
                          {getLevelIcon(student.level)}
                        </span>
                        <span className="text-white font-bold">
                          {student.points}
                        </span>
                      </div>
                      <p className={`text-xs ${getLevelColor(student.level)}`}>
                        {student.level}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === "students" && (
          <div className="glass p-6 rounded-2xl animate-fade-in-up">
            <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
              <span className="mr-3">👥</span>
              All Students
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topStudents.map((student) => (
                <div
                  key={student.id}
                  className="p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/64x64/10b981/ffffff?text=U";
                      }}
                    />
                    <div>
                      <h3 className="text-white font-heading font-bold">
                        {student.name}
                      </h3>
                      <p className="text-white/60 text-sm">{student.class}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Points:</span>
                      <span className="text-white font-bold">
                        {student.points}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Level:</span>
                      <span
                        className={`text-sm ${getLevelColor(
                          student.level
                        )} flex items-center`}
                      >
                        {getLevelIcon(student.level)} {student.level}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Status:</span>
                      <span className="text-green-400 text-sm">
                        {student.recentActivity}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <CapsuleButton
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        console.log(`View profile of ${student.name}`)
                      }
                      promptMessage={`Viewing ${student.name}'s Profile! 👤`}
                    >
                      Profile
                    </CapsuleButton>
                    <CapsuleButton
                      variant="primary"
                      size="sm"
                      onClick={() => console.log(`Message ${student.name}`)}
                      promptMessage={`Messaging ${student.name}! 💬`}
                    >
                      Message
                    </CapsuleButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "submissions" && (
          <div className="glass p-6 rounded-2xl animate-fade-in-up">
            <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
              <span className="mr-3">📝</span>
              Pending Submissions
            </h2>
            <div className="space-y-4">
              {pendingSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={submission.avatar}
                      alt={submission.student}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/48x48/10b981/ffffff?text=U";
                      }}
                    />
                    <div>
                      <h3 className="text-white font-heading font-bold">
                        {submission.title}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {submission.student} • {submission.class} •{" "}
                        {submission.type}
                      </p>
                      <p className="text-white/40 text-xs">
                        Submitted {submission.submittedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <CapsuleButton
                      variant="outline"
                      onClick={() =>
                        console.log(`View submission: ${submission.title}`)
                      }
                      promptMessage={`Viewing ${submission.title}! 👀`}
                    >
                      View
                    </CapsuleButton>
                    <CapsuleButton
                      variant="primary"
                      onClick={() =>
                        console.log(`Grade submission: ${submission.title}`)
                      }
                      promptMessage={`Grading ${submission.title}! ✅`}
                    >
                      Grade
                    </CapsuleButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "analytics" && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="glass p-6 rounded-2xl animate-fade-in-left">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <span className="mr-3">📈</span>
                Performance Analytics
              </h2>
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-white/5">
                  <h3 className="text-white font-heading font-bold mb-2">
                    Quiz Completion Rate
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-white/10 rounded-full h-4">
                      <div
                        className="bg-green-400 h-4 rounded-full"
                        style={{ width: "87%" }}
                      ></div>
                    </div>
                    <span className="text-white font-bold">87%</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <h3 className="text-white font-heading font-bold mb-2">
                    Project Participation
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-white/10 rounded-full h-4">
                      <div
                        className="bg-blue-400 h-4 rounded-full"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                    <span className="text-white font-bold">92%</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <h3 className="text-white font-heading font-bold mb-2">
                    Lesson Engagement
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 bg-white/10 rounded-full h-4">
                      <div
                        className="bg-purple-400 h-4 rounded-full"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                    <span className="text-white font-bold">78%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass p-6 rounded-2xl animate-fade-in-right">
              <h2 className="text-2xl font-heading font-bold text-white mb-6 flex items-center">
                <span className="mr-3">🏅</span>
                Achievement Distribution
              </h2>
              <div className="space-y-4">
                {[
                  {
                    level: "Diamond",
                    count: 12,
                    percentage: 8,
                    color: "bg-cyan-400",
                  },
                  {
                    level: "Platinum",
                    count: 28,
                    percentage: 18,
                    color: "bg-blue-400",
                  },
                  {
                    level: "Gold",
                    count: 45,
                    percentage: 29,
                    color: "bg-yellow-400",
                  },
                  {
                    level: "Silver",
                    count: 52,
                    percentage: 33,
                    color: "bg-gray-400",
                  },
                  {
                    level: "Bronze",
                    count: 19,
                    percentage: 12,
                    color: "bg-yellow-600",
                  },
                ].map((achievement) => (
                  <div
                    key={achievement.level}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-16 text-center">
                      <span className="text-white font-bold text-sm">
                        {achievement.level}
                      </span>
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-6">
                      <div
                        className={`${achievement.color} h-6 rounded-full flex items-center justify-end pr-2`}
                        style={{ width: `${achievement.percentage}%` }}
                      >
                        <span className="text-white text-xs font-bold">
                          {achievement.count}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Demo Quiz Creation Form */}
      {showQuizForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="glass p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-white">
                Create New Quiz
              </h2>
              <CapsuleButton
                variant="outline"
                onClick={() => setShowQuizForm(false)}
                promptMessage="Closing Quiz Form! ❌"
                size="sm"
              >
                ✕
              </CapsuleButton>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-body font-medium mb-2">
                  Quiz Title
                </label>
                <input
                  type="text"
                  placeholder="Enter quiz title"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body"
                />
              </div>

              <div>
                <label className="block text-white font-body font-medium mb-2">
                  Quiz Description
                </label>
                <textarea
                  placeholder="Enter quiz description"
                  rows="3"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-body font-medium mb-2">
                    Question Type
                  </label>
                  <select className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body">
                    <option>Multiple Choice</option>
                    <option>True/False</option>
                    <option>Mixed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-body font-medium mb-2">
                    Number of Questions
                  </label>
                  <input
                    type="number"
                    placeholder="10"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <CapsuleButton
                  variant="primary"
                  onClick={() => {
                    setShowQuizForm(false);
                    alert("Quiz created successfully! (Demo)");
                  }}
                  promptMessage="Quiz Created! ✅"
                  className="flex-1"
                >
                  Create Quiz
                </CapsuleButton>
                <CapsuleButton
                  variant="outline"
                  onClick={() => setShowQuizForm(false)}
                  promptMessage="Cancelling! ❌"
                  className="flex-1"
                >
                  Cancel
                </CapsuleButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Challenge Creation Form */}
      {showChallengeForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="glass p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold text-white">
                Create New Challenge
              </h2>
              <CapsuleButton
                variant="outline"
                onClick={() => setShowChallengeForm(false)}
                promptMessage="Closing Challenge Form! ❌"
                size="sm"
              >
                ✕
              </CapsuleButton>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-body font-medium mb-2">
                  Challenge Title
                </label>
                <input
                  type="text"
                  placeholder="Enter challenge title"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body"
                />
              </div>

              <div>
                <label className="block text-white font-body font-medium mb-2">
                  Challenge Description
                </label>
                <textarea
                  placeholder="Enter challenge description"
                  rows="3"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-body font-medium mb-2">
                    Difficulty
                  </label>
                  <select className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-body font-medium mb-2">
                    Points
                  </label>
                  <input
                    type="number"
                    placeholder="50"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <CapsuleButton
                  variant="primary"
                  onClick={() => {
                    setShowChallengeForm(false);
                    alert("Challenge created successfully! (Demo)");
                  }}
                  promptMessage="Challenge Created! ✅"
                  className="flex-1"
                >
                  Create Challenge
                </CapsuleButton>
                <CapsuleButton
                  variant="outline"
                  onClick={() => setShowChallengeForm(false)}
                  promptMessage="Cancelling! ❌"
                  className="flex-1"
                >
                  Cancel
                </CapsuleButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
