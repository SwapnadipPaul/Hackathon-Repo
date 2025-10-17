import { createContext, useContext, useState, useEffect } from "react";

const PointsContext = createContext();

// Points system configuration
export const POINTS_CONFIG = {
  levels: [
    { name: "Bronze", min: 0, max: 99, color: "#CD7F32", icon: "🥉" },
    { name: "Silver", min: 100, max: 349, color: "#C0C0C0", icon: "🥈" },
    { name: "Gold", min: 350, max: 649, color: "#FFD700", icon: "🥇" },
    { name: "Platinum", min: 650, max: 799, color: "#E5E4E2", icon: "💎" },
    { name: "Diamond", min: 800, max: 925, color: "#B9F2FF", icon: "💠" },
  ],
  activities: {
    lessons: {
      pointsPerLesson: 14.28,
      totalLessons: 7,
      maxPoints: 100,
    },
    challenges: {
      pointsPerChallenge: 50,
      totalChallenges: 5,
      maxPoints: 250,
    },
    quizzes: {
      mcqPoints: 2,
      trueFalsePoints: 1,
      totalQuestions: 50, // 25 MCQ + 25 True/False
      maxPoints: 75,
    },
    projects: {
      pointsPerProject: 100,
      totalProjects: 5,
      maxPoints: 500,
    },
  },
};

export const usePoints = () => {
  const context = useContext(PointsContext);
  if (!context) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
};

export const PointsProvider = ({ children }) => {
  const [totalPoints, setTotalPoints] = useState(() => {
    const saved = localStorage.getItem("totalPoints");
    const parsed = saved ? parseFloat(saved) : 0;
    return Math.round(isNaN(parsed) ? 0 : parsed);
  });

  const [completedActivities, setCompletedActivities] = useState(() => {
    const saved = localStorage.getItem("completedActivities");
    return saved
      ? JSON.parse(saved)
      : {
          lessons: [],
          challenges: [],
          quizzes: [],
          projects: [],
        };
  });

  // Calculate current level
  const getCurrentLevel = (points = totalPoints) => {
    return (
      POINTS_CONFIG.levels.find(
        (level) => points >= level.min && points <= level.max
      ) || POINTS_CONFIG.levels[0]
    );
  };

  // Calculate progress to next level
  const getNextLevelProgress = (points = totalPoints) => {
    const currentLevel = getCurrentLevel(points);
    const nextLevel = POINTS_CONFIG.levels.find(
      (level) => level.min > currentLevel.max
    );

    if (!nextLevel) {
      return { progress: 100, pointsNeeded: 0, nextLevel: null };
    }

    const progress =
      ((points - currentLevel.max) / (nextLevel.min - currentLevel.max)) * 100;
    const pointsNeeded = nextLevel.min - points;

    return {
      progress: Math.max(0, Math.min(100, progress)),
      pointsNeeded,
      nextLevel,
    };
  };

  // Add points for completed activity
  const addPoints = (points) => {
    const roundedPoints = Math.round(points);
    setTotalPoints((prev) => {
      const newTotal = Math.round(prev + roundedPoints);
      localStorage.setItem("totalPoints", newTotal.toString());
      return newTotal;
    });

    // Show points animation
    showPointsAnimation(roundedPoints);
  };

  // Show points animation
  const showPointsAnimation = (points) => {
    // Create floating points animation
    const animation = document.createElement("div");
    animation.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 20px 40px;
      border-radius: 50px;
      font-size: 24px;
      font-weight: bold;
      z-index: 10000;
      animation: pointsFloat 2s ease-out forwards;
      pointer-events: none;
      box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
    `;

    animation.innerHTML = `+${points} Points!`;
    document.body.appendChild(animation);

    // Add animation keyframes
    if (!document.querySelector("#points-animation-styles")) {
      const style = document.createElement("style");
      style.id = "points-animation-styles";
      style.textContent = `
        @keyframes pointsFloat {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -70%) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -100%) scale(1);
          }
        }
      `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      document.body.removeChild(animation);
    }, 2000);
  };

  // Get points breakdown by activity
  const getPointsBreakdown = () => {
    const breakdown = {};

    Object.keys(completedActivities).forEach((activityType) => {
      breakdown[activityType] = completedActivities[activityType].reduce(
        (sum, activity) => sum + activity.points,
        0
      );
    });

    return breakdown;
  };

  // Get activity progress
  const getActivityProgress = (activityType) => {
    const config = POINTS_CONFIG.activities[activityType];
    const completed = completedActivities[activityType].length;
    const total =
      activityType === "lessons"
        ? config.totalLessons
        : activityType === "challenges"
        ? config.totalChallenges
        : activityType === "quizzes"
        ? 1 // We'll handle quiz progress differently
        : config.totalProjects;

    return { completed, total, percentage: (completed / total) * 100 };
  };

  const value = {
    totalPoints,
    completedActivities,
    getCurrentLevel,
    getNextLevelProgress,
    addPoints,
    getPointsBreakdown,
    getActivityProgress,
    showPointsAnimation,
  };

  return (
    <PointsContext.Provider value={value}>{children}</PointsContext.Provider>
  );
};
