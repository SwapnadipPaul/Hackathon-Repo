import { useState } from "react";
import { usePoints } from "../contexts/PointsContext";
import CapsuleButton from "../components/CapsuleButton";

export default function Challenges() {
  const { addPoints, getCurrentLevel } = usePoints();
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const challenges = [
    {
      id: 1,
      title: "Tree Challenge",
      description: "Plant 3 trees in your neighborhood and upload a photo.",
      detailedDescription:
        "This challenge encourages you to make a direct impact on your local environment by planting trees. Trees are essential for clean air, soil conservation, and providing habitat for wildlife. You'll need to plant 3 trees in your neighborhood, school, or community area and document your efforts with photos.",
      instructions: [
        "Choose appropriate tree species for your local climate",
        "Find suitable planting locations (your yard, school grounds, or community areas)",
        "Prepare the planting site by digging proper holes",
        "Plant the trees following best practices",
        "Water and care for the newly planted trees",
        "Take photos of your planting process and the final result",
        "Upload photos as proof of completion",
      ],
      points: 50,
      duration: "1-2 weeks",
      difficulty: "Medium",
      icon: "🌳",
      color: "green",
      benefits: [
        "Improves air quality in your neighborhood",
        "Provides habitat for local wildlife",
        "Helps combat climate change",
        "Creates shade and beauty",
        "Teaches valuable gardening skills",
      ],
      requirements: [
        "3 tree saplings or seeds",
        "Basic gardening tools (shovel, watering can)",
        "Access to planting locations",
        "Camera or phone for documentation",
      ],
    },
    {
      id: 2,
      title: "Clean-Up Challenge",
      description: "Collect 5 kg of plastic waste and recycle it.",
      detailedDescription:
        "This challenge focuses on reducing plastic pollution in your community. You'll need to collect 5 kg of plastic waste from various sources and ensure it's properly recycled. This helps prevent plastic from entering waterways and harming wildlife.",
      instructions: [
        "Identify areas with plastic waste (parks, beaches, streets)",
        "Gather friends, family, or classmates to help",
        "Use proper safety equipment (gloves, bags)",
        "Sort collected plastic by type",
        "Weigh the collected plastic to reach 5 kg",
        "Take the plastic to a proper recycling facility",
        "Document your collection and recycling process",
      ],
      points: 50,
      duration: "1 week",
      difficulty: "Easy",
      icon: "♻️",
      color: "blue",
      benefits: [
        "Removes harmful plastic from the environment",
        "Prevents plastic from reaching oceans",
        "Raises awareness about plastic pollution",
        "Promotes recycling habits",
        "Creates a cleaner community",
      ],
      requirements: [
        "Collection bags and gloves",
        "Scale for weighing plastic",
        "Access to recycling facilities",
        "Safety equipment",
      ],
    },
    {
      id: 3,
      title: "Water Saver Challenge",
      description: "Reduce your water usage for 7 days and track it.",
      detailedDescription:
        "This challenge helps you become more conscious of water consumption and learn practical ways to conserve this precious resource. You'll track your daily water usage and implement various water-saving techniques for a week.",
      instructions: [
        "Record your current daily water usage for 2 days",
        "Identify areas where you can reduce water consumption",
        "Implement water-saving techniques (shorter showers, fixing leaks, etc.)",
        "Track your water usage daily for 7 days",
        "Calculate the total water saved",
        "Document your water-saving methods",
        "Share your results and tips with others",
      ],
      points: 50,
      duration: "7 days",
      difficulty: "Easy",
      icon: "💧",
      color: "cyan",
      benefits: [
        "Reduces water bills",
        "Conserves precious water resources",
        "Teaches sustainable living habits",
        "Helps during drought conditions",
        "Sets a good example for others",
      ],
      requirements: [
        "Water meter or tracking app",
        "Timer for showers",
        "Water-saving devices (optional)",
        "Notebook for tracking usage",
      ],
    },
    {
      id: 4,
      title: "Energy Challenge",
      description: "Switch off lights for 1 hour daily this week.",
      detailedDescription:
        "This challenge focuses on reducing energy consumption and raising awareness about the importance of energy conservation. You'll turn off all non-essential lights and electronics for one hour each day, using natural light or candles instead.",
      instructions: [
        "Choose a consistent time each day (e.g., 7-8 PM)",
        "Turn off all non-essential lights and electronics",
        "Use natural light, candles, or minimal lighting",
        "Engage in activities that don't require electricity",
        "Track your energy savings",
        "Reflect on how much energy you normally use",
        "Document your experience and observations",
      ],
      points: 50,
      duration: "7 days",
      difficulty: "Easy",
      icon: "💡",
      color: "yellow",
      benefits: [
        "Reduces electricity bills",
        "Lowers carbon footprint",
        "Promotes mindfulness about energy use",
        "Encourages alternative activities",
        "Helps reduce air pollution",
      ],
      requirements: [
        "Timer or clock",
        "Candles or battery-powered lights (optional)",
        "Alternative activities planned",
        "Energy meter (optional)",
      ],
    },
    {
      id: 5,
      title: "Quiz Challenge",
      description:
        "Answer 10 questions on waste segregation correctly to earn a green badge.",
      detailedDescription:
        "This challenge tests your knowledge about proper waste segregation and recycling. You'll need to answer 10 questions correctly about how to properly separate different types of waste for recycling and disposal.",
      instructions: [
        "Study waste segregation guidelines",
        "Learn about different waste categories",
        "Take the waste segregation quiz",
        "Answer all 10 questions correctly",
        "Review any incorrect answers to learn",
        "Retake the quiz if needed",
        "Earn your green waste management badge",
      ],
      points: 50,
      duration: "30 minutes",
      difficulty: "Easy",
      icon: "🧠",
      color: "purple",
      benefits: [
        "Improves waste management knowledge",
        "Promotes proper recycling practices",
        "Reduces contamination in recycling",
        "Helps others learn correct practices",
        "Earns a certification badge",
      ],
      requirements: [
        "Access to the quiz",
        "Knowledge of waste types",
        "Understanding of local recycling rules",
        "Computer or mobile device",
      ],
    },
  ];

  const handleChallengeComplete = (challengeId) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
      const challenge = challenges.find((c) => c.id === challengeId);
      addPoints(Math.round(challenge.points));
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-400/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
      case "Hard":
        return "bg-red-500/20 text-red-400 border-red-400/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-400/30";
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      green: "from-green-400 to-green-600",
      blue: "from-blue-400 to-blue-600",
      cyan: "from-cyan-400 to-cyan-600",
      yellow: "from-yellow-400 to-yellow-600",
      purple: "from-purple-400 to-purple-600",
    };
    return colors[color] || "from-blue-400 to-blue-600";
  };

  const totalPoints = challenges.reduce(
    (sum, challenge) =>
      sum + (completedChallenges.includes(challenge.id) ? challenge.points : 0),
    0
  );

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
                  Eco Challenges
                </h1>
                <p className="text-sm text-white/60">
                  Take action for the environment
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-body font-medium">
                  {getCurrentLevel().icon} {getCurrentLevel().name}
                </p>
                <p className="text-green-400 text-sm">
                  {totalPoints} challenge points
                </p>
              </div>
              <CapsuleButton
                variant="outline"
                onClick={() => (window.location.href = "/student")}
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
            🎯 Eco Challenges
          </h1>
          <p className="text-xl text-white/80 font-body max-w-3xl mx-auto">
            Take action for the environment! Complete these hands-on challenges
            to make a real difference in your community and earn points.
          </p>
        </div>

        {/* Progress Overview */}
        <div
          className="max-w-4xl mx-auto mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-white">
                Challenge Progress
              </h2>
              <span className="text-green-400 font-bold">
                {completedChallenges.length}/{challenges.length} Completed
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    (completedChallenges.length / challenges.length) * 100
                  }%`,
                }}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-white/70 font-body text-sm">
                Complete all challenges to become an Eco Champion!
              </p>
              <span className="text-yellow-400 font-bold">
                {totalPoints}/250 Points
              </span>
            </div>
          </div>
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {challenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className={`glass p-6 rounded-2xl hover:shadow-glow transition-all duration-300 animate-fade-in-up ${
                completedChallenges.includes(challenge.id)
                  ? "ring-2 ring-green-400 bg-green-400/5"
                  : ""
              }`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Challenge Header */}
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${getColorClasses(
                    challenge.color
                  )} flex items-center justify-center text-2xl`}
                >
                  {challenge.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-heading font-bold text-lg">
                    {challenge.title}
                  </h3>
                  <p className="text-white/60 text-sm font-body">
                    {challenge.points} points • {challenge.duration}
                  </p>
                </div>
                {completedChallenges.includes(challenge.id) && (
                  <div className="text-green-400 text-2xl">✅</div>
                )}
              </div>

              {/* Challenge Description */}
              <p className="text-white/80 font-body mb-4 leading-relaxed">
                {challenge.description}
              </p>

              {/* Challenge Details */}
              <div className="flex items-center space-x-2 mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                    challenge.difficulty
                  )}`}
                >
                  {challenge.difficulty}
                </span>
                <span className="text-yellow-400 text-sm">
                  ⭐ {challenge.points} pts
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                <CapsuleButton
                  variant={
                    completedChallenges.includes(challenge.id)
                      ? "outline"
                      : "primary"
                  }
                  onClick={() => handleChallengeComplete(challenge.id)}
                  promptMessage={
                    completedChallenges.includes(challenge.id)
                      ? "Already Completed! ✅"
                      : `Earned ${challenge.points} points! ⭐`
                  }
                  className="w-full"
                >
                  {completedChallenges.includes(challenge.id)
                    ? "Completed ✅"
                    : "Start Challenge"}
                </CapsuleButton>
                <CapsuleButton
                  variant="outline"
                  onClick={() => {
                    setSelectedChallenge(challenge);
                    setShowDetails(true);
                  }}
                  promptMessage="Viewing Challenge Details! 📋"
                  className="w-full"
                  size="sm"
                >
                  View Details
                </CapsuleButton>
              </div>
            </div>
          ))}
        </div>

        {/* Completion Celebration */}
        {completedChallenges.length === challenges.length && (
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="glass p-8 rounded-2xl text-center border-2 border-green-400/50">
              <div className="text-6xl mb-4 animate-bounce">🏆</div>
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                Eco Champion!
              </h2>
              <p className="text-xl text-white/80 font-body mb-6">
                Congratulations! You've completed all challenges and made a real
                difference for the environment!
              </p>
              <div className="bg-green-400/10 p-4 rounded-xl border border-green-400/20 mb-6">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  🎉 250 Points Earned!
                </div>
                <p className="text-white/70 font-body text-sm">
                  You're now an official Eco Champion!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CapsuleButton
                  variant="primary"
                  onClick={() => (window.location.href = "/leaderboard")}
                  promptMessage="Viewing Leaderboard! 📊"
                >
                  View Leaderboard
                </CapsuleButton>
                <CapsuleButton
                  variant="outline"
                  onClick={() => (window.location.href = "/projects")}
                  promptMessage="Exploring Projects! 🌱"
                >
                  Try Projects
                </CapsuleButton>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Challenge Details Modal */}
      {showDetails && selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="glass p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${getColorClasses(
                    selectedChallenge.color
                  )} flex items-center justify-center text-2xl`}
                >
                  {selectedChallenge.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-white">
                    {selectedChallenge.title}
                  </h2>
                  <p className="text-white/60 font-body">
                    {selectedChallenge.points} points •{" "}
                    {selectedChallenge.duration}
                  </p>
                </div>
              </div>
              <CapsuleButton
                variant="outline"
                onClick={() => setShowDetails(false)}
                promptMessage="Closing Details! ❌"
                size="sm"
              >
                ✕
              </CapsuleButton>
            </div>

            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  Description
                </h3>
                <p className="text-white/80 font-body leading-relaxed">
                  {selectedChallenge.detailedDescription}
                </p>
              </div>

              {/* Instructions */}
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-3">
                  Instructions
                </h3>
                <ol className="space-y-2">
                  {selectedChallenge.instructions.map((instruction, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-white/80 font-body"
                    >
                      <span className="bg-green-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold mt-0.5">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-3">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {selectedChallenge.requirements.map((requirement, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-white/80 font-body"
                    >
                      <span className="text-green-400 mt-1">•</span>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-3">
                  Benefits
                </h3>
                <ul className="space-y-2">
                  {selectedChallenge.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-white/80 font-body"
                    >
                      <span className="text-blue-400 mt-1">✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <CapsuleButton
                  variant={
                    completedChallenges.includes(selectedChallenge.id)
                      ? "outline"
                      : "primary"
                  }
                  onClick={() => {
                    handleChallengeComplete(selectedChallenge.id);
                    setShowDetails(false);
                  }}
                  promptMessage={
                    completedChallenges.includes(selectedChallenge.id)
                      ? "Already Completed! ✅"
                      : `Earned ${selectedChallenge.points} points! ⭐`
                  }
                  className="flex-1"
                >
                  {completedChallenges.includes(selectedChallenge.id)
                    ? "Completed ✅"
                    : "Start Challenge"}
                </CapsuleButton>
                <CapsuleButton
                  variant="outline"
                  onClick={() => setShowDetails(false)}
                  promptMessage="Closing Details! ❌"
                  className="flex-1"
                >
                  Close
                </CapsuleButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
