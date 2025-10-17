import { useState } from "react";
import { usePoints } from "../contexts/PointsContext";
import CapsuleButton from "../components/CapsuleButton";

export default function Quiz() {
  const { addPoints } = usePoints();
  const [quizMode, setQuizMode] = useState(""); // "mcq" or "tf"
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // MCQ Questions with correct answers
  const mcqQuestions = [
    {
      id: 1,
      question: "What is the primary cause of climate change?",
      options: [
        "Volcanic eruptions",
        "Human activities",
        "Solar radiation",
        "Ocean currents",
      ],
      correct: 1,
      points: 2,
      explanation:
        "Human activities, especially burning fossil fuels, are the primary cause of climate change.",
    },
    {
      id: 2,
      question: "Which gas is most responsible for the greenhouse effect?",
      options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
      correct: 2,
      points: 2,
      explanation:
        "Carbon dioxide is the most significant greenhouse gas contributing to global warming.",
    },
    {
      id: 3,
      question: "What percentage of Earth's surface is covered by water?",
      options: ["50%", "71%", "85%", "95%"],
      correct: 1,
      points: 2,
      explanation:
        "Approximately 71% of Earth's surface is covered by water, mostly in oceans.",
    },
    {
      id: 4,
      question: "Which renewable energy source is most widely used?",
      options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
      correct: 2,
      points: 2,
      explanation:
        "Hydroelectric power is the most widely used renewable energy source globally.",
    },
    {
      id: 5,
      question: "How long does it take for plastic to decompose naturally?",
      options: ["5 years", "50 years", "500 years", "Never completely"],
      correct: 3,
      points: 2,
      explanation:
        "Most plastics never decompose completely; they just break down into smaller pieces.",
    },
    {
      id: 6,
      question: "What is the main purpose of photosynthesis?",
      options: [
        "To produce oxygen",
        "To convert sunlight into energy",
        "To absorb carbon dioxide",
        "All of the above",
      ],
      correct: 3,
      points: 2,
      explanation:
        "Photosynthesis does all of these - produces oxygen, converts sunlight to energy, and absorbs CO2.",
    },
    {
      id: 7,
      question: "Which animal is most affected by climate change?",
      options: ["Polar bears", "Penguins", "Seals", "All Arctic animals"],
      correct: 3,
      points: 2,
      explanation:
        "All Arctic animals are severely affected by melting ice and changing temperatures.",
    },
    {
      id: 8,
      question: "What is the '3 R's' principle in environmental conservation?",
      options: [
        "Read, Write, Remember",
        "Reduce, Reuse, Recycle",
        "Run, Rest, Relax",
        "Rain, River, Reservoir",
      ],
      correct: 1,
      points: 2,
      explanation:
        "The 3 R's stand for Reduce, Reuse, and Recycle - the foundation of waste management.",
    },
    {
      id: 9,
      question: "Which type of energy is considered the cleanest?",
      options: ["Coal", "Natural gas", "Solar", "Nuclear"],
      correct: 2,
      points: 2,
      explanation:
        "Solar energy is considered the cleanest as it produces no emissions during operation.",
    },
    {
      id: 10,
      question: "What is the primary source of ocean pollution?",
      options: [
        "Oil spills",
        "Plastic waste",
        "Industrial waste",
        "Agricultural runoff",
      ],
      correct: 1,
      points: 2,
      explanation:
        "Plastic waste is the primary source of ocean pollution, with millions of tons entering oceans yearly.",
    },
  ];

  // True/False Questions with correct answers
  const tfQuestions = [
    {
      id: 1,
      question:
        "Trees absorb carbon dioxide and release oxygen during the day.",
      correct: true,
      points: 1,
      explanation:
        "True! Trees use photosynthesis to absorb CO2 and release oxygen during daylight hours.",
    },
    {
      id: 2,
      question: "Climate change only affects polar regions.",
      correct: false,
      points: 1,
      explanation:
        "False! Climate change affects the entire planet, including weather patterns, sea levels, and ecosystems everywhere.",
    },
    {
      id: 3,
      question:
        "Recycling one aluminum can saves enough energy to power a TV for 3 hours.",
      correct: true,
      points: 1,
      explanation:
        "True! Aluminum recycling is highly efficient and saves significant energy.",
    },
    {
      id: 4,
      question: "Electric cars produce zero emissions while driving.",
      correct: true,
      points: 1,
      explanation:
        "True! Electric cars produce zero direct emissions while driving, though their environmental impact depends on how the electricity is generated.",
    },
    {
      id: 5,
      question: "Plastic bags are biodegradable.",
      correct: false,
      points: 1,
      explanation:
        "False! Traditional plastic bags are not biodegradable and can take hundreds of years to break down.",
    },
    {
      id: 6,
      question: "Wind energy is a reliable source of power 24/7.",
      correct: false,
      points: 1,
      explanation:
        "False! Wind energy depends on wind conditions and is intermittent, requiring backup power sources.",
    },
    {
      id: 7,
      question: "Composting helps reduce methane emissions from landfills.",
      correct: true,
      points: 1,
      explanation:
        "True! Composting organic waste reduces methane production in landfills and creates valuable soil amendment.",
    },
    {
      id: 8,
      question: "Solar panels work only in direct sunlight.",
      correct: false,
      points: 1,
      explanation:
        "False! Solar panels can generate electricity even on cloudy days, though at reduced efficiency.",
    },
    {
      id: 9,
      question: "Biodiversity loss is a major environmental concern.",
      correct: true,
      points: 1,
      explanation:
        "True! Biodiversity loss threatens ecosystem stability and human well-being worldwide.",
    },
    {
      id: 10,
      question: "All types of plastic can be recycled equally.",
      correct: false,
      points: 1,
      explanation:
        "False! Different types of plastic have different recycling capabilities and requirements.",
    },
  ];

  const handleAnswerSelect = (answer) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const questions = quizMode === "mcq" ? mcqQuestions : tfQuestions;
    const currentQuestion = questions[currentQuestionIndex];

    let correct = false;
    if (quizMode === "mcq") {
      correct = answer === currentQuestion.correct;
    } else {
      correct = answer === currentQuestion.correct;
    }

    setIsCorrect(correct);

    if (correct) {
      addPoints(Math.round(currentQuestion.points));
      setQuizScore(quizScore + 1);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }

    setAnswers([
      ...answers,
      { question: currentQuestionIndex, answer, correct },
    ]);
  };

  const nextQuestion = () => {
    const questions = quizMode === "mcq" ? mcqQuestions : tfQuestions;

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizMode("");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setAnswers([]);
    setQuizScore(0);
  };

  const getScoreMessage = () => {
    const totalQuestions =
      quizMode === "mcq" ? mcqQuestions.length : tfQuestions.length;
    const percentage = (quizScore / totalQuestions) * 100;

    if (percentage >= 90) return "🏆 Outstanding! You're an Eco Expert!";
    if (percentage >= 80) return "🌟 Excellent! You're an Eco Champion!";
    if (percentage >= 70) return "👏 Great job! You're an Eco Warrior!";
    if (percentage >= 60) return "👍 Good work! You're an Eco Explorer!";
    return "📚 Keep learning! You're on the right track!";
  };

  if (!quizMode) {
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
                    Eco Quiz Challenge
                  </h1>
                  <p className="text-sm text-white/60">
                    Test your environmental knowledge
                  </p>
                </div>
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
        </header>

        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="text-8xl mb-6 animate-bounce">🧠</div>
            <h1 className="text-5xl font-heading font-bold text-white mb-4">
              Eco Quiz Challenge
            </h1>
            <p className="text-xl text-white/80 font-body max-w-2xl mx-auto">
              Test your environmental knowledge and earn points! Choose your
              quiz type and show us what you know about our planet.
            </p>
          </div>

          {/* Quiz Mode Selection */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* MCQ Quiz */}
              <div className="glass p-8 rounded-2xl text-center hover:shadow-glow transition-all duration-300 animate-fade-in-left">
                <div className="text-6xl mb-4">📝</div>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  Multiple Choice Quiz
                </h2>
                <p className="text-white/70 font-body mb-6">
                  Answer 10 multiple choice questions about environmental
                  science and sustainability.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <span>⭐</span>
                    <span>2 points per correct answer</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-blue-400">
                    <span>🎯</span>
                    <span>10 questions total</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-purple-400">
                    <span>🧠</span>
                    <span>Detailed explanations</span>
                  </div>
                </div>
                <CapsuleButton
                  variant="primary"
                  onClick={() => setQuizMode("mcq")}
                  promptMessage="Starting MCQ Quiz! 📝"
                  className="w-full h-14 text-lg"
                >
                  Start MCQ Quiz
                </CapsuleButton>
              </div>

              {/* True/False Quiz */}
              <div className="glass p-8 rounded-2xl text-center hover:shadow-glow transition-all duration-300 animate-fade-in-right">
                <div className="text-6xl mb-4">✅❌</div>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  True or False Quiz
                </h2>
                <p className="text-white/70 font-body mb-6">
                  Test your knowledge with 10 true or false questions about
                  environmental facts.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-green-400">
                    <span>⭐</span>
                    <span>1 point per correct answer</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-blue-400">
                    <span>🎯</span>
                    <span>10 questions total</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-purple-400">
                    <span>⚡</span>
                    <span>Quick and engaging</span>
                  </div>
                </div>
                <CapsuleButton
                  variant="primary"
                  onClick={() => setQuizMode("tf")}
                  promptMessage="Starting True/False Quiz! ✅❌"
                  className="w-full h-14 text-lg"
                >
                  Start True/False Quiz
                </CapsuleButton>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="mt-12 glass p-6 rounded-2xl animate-fade-in-up">
              <h3 className="text-xl font-heading font-bold text-white mb-4 text-center">
                🌟 Quiz Tips & Fun Facts
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-white/80 font-body text-sm">
                    Read each question carefully before answering
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl mb-2">💡</div>
                  <p className="text-white/80 font-body text-sm">
                    Learn from explanations to improve your knowledge
                  </p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl mb-2">🏆</div>
                  <p className="text-white/80 font-body text-sm">
                    Earn points to climb the leaderboard!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const questions = quizMode === "mcq" ? mcqQuestions : tfQuestions;
    const totalQuestions = questions.length;
    const percentage = (quizScore / totalQuestions) * 100;
    const totalPoints = answers.reduce((sum, answer) => {
      const question = questions[answer.question];
      return sum + (answer.correct ? question.points : 0);
    }, 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900">
        <div className="container mx-auto px-4 py-12">
          {/* Completion Celebration */}
          <div className="max-w-2xl mx-auto text-center animate-fade-in-up">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h1 className="text-4xl font-heading font-bold text-white mb-4">
              Quiz Complete!
            </h1>
            <p className="text-xl text-white/80 font-body mb-8">
              {getScoreMessage()}
            </p>

            {/* Score Display */}
            <div className="glass p-8 rounded-2xl mb-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {quizScore}/{totalQuestions}
                  </div>
                  <p className="text-white/70 font-body">Correct Answers</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {percentage.toFixed(0)}%
                  </div>
                  <p className="text-white/70 font-body">Success Rate</p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-green-400/10 rounded-xl border border-green-400/20">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  +{totalPoints} Points Earned!
                </div>
                <p className="text-white/70 font-body text-sm">
                  Great job! Your points have been added to your total.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CapsuleButton
                variant="primary"
                onClick={resetQuiz}
                promptMessage="Taking Another Quiz! 🧠"
                className="text-lg"
              >
                Try Again
              </CapsuleButton>
              <CapsuleButton
                variant="outline"
                onClick={() => (window.location.href = "/student")}
                promptMessage="Back to Dashboard! 📊"
                className="text-lg"
              >
                Dashboard
              </CapsuleButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  const questions = quizMode === "mcq" ? mcqQuestions : tfQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="text-6xl animate-bounce text-green-400">🎉</div>
        </div>
      )}

      {/* Header */}
      <header className="glass sticky top-0 z-40 border-b border-white/10">
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
                  {quizMode === "mcq" ? "MCQ Quiz" : "True/False Quiz"}
                </h1>
                <p className="text-sm text-white/60">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-white font-bold">
                  {quizScore}/{questions.length}
                </div>
                <div className="text-white/60 text-sm">Correct</div>
              </div>
              <CapsuleButton
                variant="outline"
                onClick={resetQuiz}
                promptMessage="Starting Over! 🔄"
                size="sm"
              >
                Reset
              </CapsuleButton>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/70 font-body">Progress</span>
            <span className="text-white font-bold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 rounded-2xl animate-fade-in-up">
            <div className="flex items-center space-x-4 mb-6">
              <div className="text-4xl">
                {quizMode === "mcq" ? "📝" : "✅❌"}
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  Question {currentQuestionIndex + 1}
                </h2>
                <p className="text-white/60 font-body">
                  {currentQuestion.points} point
                  {currentQuestion.points > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <p className="text-xl text-white font-body mb-8 leading-relaxed">
              {currentQuestion.question}
            </p>

            {/* Answer Options */}
            <div className="space-y-4 mb-8">
              {quizMode === "mcq" ? (
                currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                      showResult
                        ? index === currentQuestion.correct
                          ? "bg-green-500/20 border-2 border-green-400 text-green-400"
                          : selectedAnswer === index
                          ? "bg-red-500/20 border-2 border-red-400 text-red-400"
                          : "bg-white/5 border border-white/20 text-white/70"
                        : selectedAnswer === index
                        ? "bg-blue-500/20 border-2 border-blue-400 text-blue-400"
                        : "bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-green-400/50"
                    } ${
                      showResult && index === currentQuestion.correct
                        ? "animate-pulse"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-body">{option}</span>
                      {showResult && index === currentQuestion.correct && (
                        <span className="ml-auto text-2xl">✅</span>
                      )}
                      {showResult &&
                        selectedAnswer === index &&
                        index !== currentQuestion.correct && (
                          <span className="ml-auto text-2xl">❌</span>
                        )}
                    </div>
                  </button>
                ))
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswerSelect(true)}
                    disabled={showResult}
                    className={`p-6 rounded-xl text-center transition-all duration-300 ${
                      showResult
                        ? currentQuestion.correct
                          ? "bg-green-500/20 border-2 border-green-400 text-green-400"
                          : selectedAnswer === true
                          ? "bg-red-500/20 border-2 border-red-400 text-red-400"
                          : "bg-white/5 border border-white/20 text-white/70"
                        : selectedAnswer === true
                        ? "bg-blue-500/20 border-2 border-blue-400 text-blue-400"
                        : "bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-green-400/50"
                    } ${
                      showResult && currentQuestion.correct
                        ? "animate-pulse"
                        : ""
                    }`}
                  >
                    <div className="text-4xl mb-2">✅</div>
                    <div className="font-heading font-bold text-lg">TRUE</div>
                  </button>
                  <button
                    onClick={() => handleAnswerSelect(false)}
                    disabled={showResult}
                    className={`p-6 rounded-xl text-center transition-all duration-300 ${
                      showResult
                        ? !currentQuestion.correct
                          ? "bg-green-500/20 border-2 border-green-400 text-green-400"
                          : selectedAnswer === false
                          ? "bg-red-500/20 border-2 border-red-400 text-red-400"
                          : "bg-white/5 border border-white/20 text-white/70"
                        : selectedAnswer === false
                        ? "bg-blue-500/20 border-2 border-blue-400 text-blue-400"
                        : "bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-green-400/50"
                    } ${
                      showResult && !currentQuestion.correct
                        ? "animate-pulse"
                        : ""
                    }`}
                  >
                    <div className="text-4xl mb-2">❌</div>
                    <div className="font-heading font-bold text-lg">FALSE</div>
                  </button>
                </div>
              )}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className="p-6 bg-white/5 rounded-xl border border-white/10 animate-fade-in-up">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">💡</span>
                  <h3 className="text-white font-heading font-bold">
                    Explanation
                  </h3>
                </div>
                <p className="text-white/80 font-body leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {showResult && (
              <div className="mt-6 text-center">
                <CapsuleButton
                  variant="primary"
                  onClick={nextQuestion}
                  promptMessage={
                    currentQuestionIndex < questions.length - 1
                      ? "Next Question! ➡️"
                      : "Finish Quiz! 🏁"
                  }
                  className="text-lg px-8"
                >
                  {currentQuestionIndex < questions.length - 1
                    ? "Next Question"
                    : "Finish Quiz"}
                </CapsuleButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
