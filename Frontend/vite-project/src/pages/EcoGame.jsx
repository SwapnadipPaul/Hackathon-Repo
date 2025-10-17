import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import CapsuleButton from "../components/CapsuleButton";

export default function EcoGame() {
  const { user } = useAuth();
  const [gameType, setGameType] = useState(null);
  const [gameState, setGameState] = useState("menu");

  // Trivia Game States
  const [questions] = useState([
    {
      question: "What is the primary cause of global warming?",
      options: [
        "Solar radiation",
        "Greenhouse gases",
        "Ocean currents",
        "Volcanic activity",
      ],
      correct: 1,
      explanation:
        "Greenhouse gases like CO2 trap heat in the atmosphere, causing global warming.",
      emoji: "🌡️",
    },
    {
      question: "Which renewable energy source is most widely used?",
      options: ["Solar", "Wind", "Hydroelectric", "Geothermal"],
      correct: 2,
      explanation:
        "Hydroelectric power is the most widely used renewable energy source globally.",
      emoji: "⚡",
    },
    {
      question: "What percentage of Earth's water is freshwater?",
      options: ["3%", "10%", "25%", "50%"],
      correct: 0,
      explanation:
        "Only about 3% of Earth's water is freshwater, and most is frozen in glaciers.",
      emoji: "💧",
    },
    {
      question: "Which animal is most affected by deforestation?",
      options: ["Polar bears", "Orangutans", "Penguins", "Dolphins"],
      correct: 1,
      explanation:
        "Orangutans live in tropical rainforests and are severely affected by deforestation.",
      emoji: "🦧",
    },
    {
      question: "What is the main component of smog?",
      options: [
        "Water vapor",
        "Ground-level ozone",
        "Carbon dioxide",
        "Nitrogen",
      ],
      correct: 1,
      explanation:
        "Ground-level ozone is the main component of smog, formed by chemical reactions.",
      emoji: "😷",
    },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // Water Drop Game States
  const [waterDrops, setWaterDrops] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [lives, setLives] = useState(5);
  const [waterScore, setWaterScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1);

  // Trivia Game Functions
  const startTriviaGame = () => {
    console.log("Starting trivia game...");
    setGameType("trivia");
    setGameState("playing");
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(30);
  };

  const selectAnswer = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);

    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore((prev) => prev + 1);
      setStreak((prev) => {
        const newStreak = prev + 1;
        setMaxStreak((prevMax) => Math.max(prevMax, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
    } else {
      setGameState("results");
    }
  };

  // Trivia Timer
  useEffect(() => {
    let timer;
    if (
      gameType === "trivia" &&
      gameState === "playing" &&
      !showResult &&
      timeLeft > 0
    ) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      setShowResult(true);
      setStreak(0);
    }
    return () => clearTimeout(timer);
  }, [gameType, gameState, timeLeft, showResult]);

  // Water Drop Game Functions
  const startWaterDropGame = () => {
    console.log("Starting water drop game...");
    setGameType("waterdrop");
    setGameState("playing");
    setWaterDrops([]);
    setLives(5);
    setWaterScore(0);
    setGameSpeed(1);

    // Initialize first truck
    const initialTruck = {
      id: 0,
      x: Math.random() * 300 + 50,
      y: 350,
      direction: Math.random() > 0.5 ? 1 : -1,
      speed: 1 + Math.random() * 2,
      plants: [
        { x: 20, watered: false },
        { x: 60, watered: false },
        { x: 100, watered: false },
      ],
    };

    setTrucks([initialTruck]);
    setIsGameActive(true);
    console.log("Water drop game started with truck:", initialTruck);
  };

  const dropWater = () => {
    if (!isGameActive) return;

    const newDrop = {
      id: Date.now(),
      x: 200, // Player position (center of building)
      y: 100,
      speed: 3,
    };

    setWaterDrops((prev) => [...prev, newDrop]);
  };

  const updateWaterDrops = useCallback(() => {
    setWaterDrops((prev) => {
      return prev
        .map((drop) => ({
          ...drop,
          y: drop.y + drop.speed,
        }))
        .filter((drop) => drop.y < 400);
    });
  }, []);

  const updateTrucks = useCallback(() => {
    setTrucks((prev) => {
      return prev.map((truck) => {
        let newX = truck.x + truck.direction * truck.speed * gameSpeed;

        // Bounce off edges
        if (newX <= 0 || newX >= 350) {
          truck.direction *= -1;
          newX = Math.max(0, Math.min(350, newX));
        }

        return {
          ...truck,
          x: newX,
        };
      });
    });
  }, [gameSpeed]);

  const checkCollisions = useCallback(() => {
    setWaterDrops((prevDrops) => {
      setTrucks((prevTrucks) => {
        const newTrucks = [...prevTrucks];
        const remainingDrops = [];
        let scoreIncrease = 0;
        let lifeDecrease = 0;

        prevDrops.forEach((drop) => {
          let hit = false;

          newTrucks.forEach((truck) => {
            // Check if water drop hits truck area
            if (
              drop.x >= truck.x &&
              drop.x <= truck.x + 120 &&
              drop.y >= truck.y - 20 &&
              drop.y <= truck.y + 20
            ) {
              // Check if it hits a plant pot
              let plantHit = false;
              truck.plants.forEach((plant) => {
                const plantX = truck.x + plant.x;
                if (
                  drop.x >= plantX - 10 &&
                  drop.x <= plantX + 10 &&
                  !plant.watered
                ) {
                  plant.watered = true;
                  scoreIncrease++;
                  plantHit = true;
                }
              });

              if (!plantHit) {
                lifeDecrease++;
              }

              hit = true;
            }
          });

          // Check if water hits ground
          if (drop.y >= 380 && !hit) {
            lifeDecrease++;
            hit = true;
          }

          if (!hit) {
            remainingDrops.push(drop);
          }
        });

        // Update score and lives
        if (scoreIncrease > 0) {
          setWaterScore((prev) => prev + scoreIncrease);
        }
        if (lifeDecrease > 0) {
          setLives((prev) => {
            const newLives = prev - lifeDecrease;
            if (newLives <= 0) {
              setIsGameActive(false);
              setGameState("results");
            }
            return newLives;
          });
        }

        // Add new trucks occasionally
        if (Math.random() < 0.02) {
          newTrucks.push({
            id: Date.now(),
            x: Math.random() * 300 + 50,
            y: 350,
            direction: Math.random() > 0.5 ? 1 : -1,
            speed: 1 + Math.random() * 2,
            plants: [
              { x: 20, watered: false },
              { x: 60, watered: false },
              { x: 100, watered: false },
            ],
          });
        }

        // Increase game speed over time
        if (waterScore > 0 && waterScore % 5 === 0) {
          setGameSpeed((prev) => Math.min(prev + 0.1, 3));
        }

        return newTrucks;
      });

      return remainingDrops;
    });
  }, [waterScore]);

  // Water drop game animation loop
  useEffect(() => {
    let animationId;
    if (gameType === "waterdrop" && isGameActive) {
      console.log("Starting game loop...");
      const gameLoop = () => {
        updateWaterDrops();
        updateTrucks();
        checkCollisions();
        animationId = requestAnimationFrame(gameLoop);
      };
      gameLoop();
    }
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [gameType, isGameActive, updateWaterDrops, updateTrucks, checkCollisions]);

  const resetGame = () => {
    setGameType(null);
    setGameState("menu");
    setWaterDrops([]);
    setTrucks([]);
    setIsGameActive(false);
  };

  const getScoreMessage = () => {
    if (gameType === "trivia") {
      if (score >= 4) return "Eco Master! 🌟";
      if (score >= 3) return "Great Job! 🌱";
      if (score >= 2) return "Good Effort! 🌿";
      return "Keep Learning! 📚";
    } else {
      if (waterScore >= 15) return "Water Conservation Hero! 💧";
      if (waterScore >= 10) return "Great Watering! 🌱";
      if (waterScore >= 5) return "Good Job! 🌿";
      return "Keep Trying! 💦";
    }
  };

  const getScoreColor = () => {
    if (gameType === "trivia") {
      if (score >= 4) return "text-yellow-400";
      if (score >= 3) return "text-green-400";
      if (score >= 2) return "text-blue-400";
      return "text-orange-400";
    } else {
      if (waterScore >= 15) return "text-yellow-400";
      if (waterScore >= 10) return "text-green-400";
      if (waterScore >= 5) return "text-blue-400";
      return "text-orange-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-heading font-bold text-white mb-4 animate-fade-in-up">
            🌍 Eco Game Hub 🌍
          </h1>
          <p className="text-xl text-white/80 font-body animate-fade-in-up">
            Choose your environmental challenge!
          </p>
        </div>

        {/* Main Menu Screen */}
        {gameState === "menu" && (
          <div className="glass p-8 rounded-2xl text-center animate-fade-in-up">
            <div className="text-8xl mb-6 animate-bounce">🎮</div>
            <h2 className="text-3xl font-heading font-bold text-white mb-4">
              Choose Your Eco Game!
            </h2>
            <p className="text-white/80 font-body mb-8 text-lg">
              Select a game to test your environmental knowledge and skills! 🌱
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Trivia Game Card */}
              <div
                className="glass p-6 rounded-xl hover:shadow-glow transition-all duration-300 cursor-pointer group"
                onClick={startTriviaGame}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  🧠
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  Eco Trivia Challenge
                </h3>
                <p className="text-white/80 font-body text-sm mb-4">
                  Answer 5 environmental questions as fast as you can! Each
                  question has 30 seconds.
                </p>
                <CapsuleButton
                  variant="primary"
                  size="sm"
                  promptMessage="Starting Trivia! 🧠"
                >
                  Play Trivia
                </CapsuleButton>
              </div>

              {/* Water Drop Game Card */}
              <div
                className="glass p-6 rounded-xl hover:shadow-glow transition-all duration-300 cursor-pointer group"
                onClick={startWaterDropGame}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  💧
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  Water Drop Challenge
                </h3>
                <p className="text-white/80 font-body text-sm mb-4">
                  Drop water from a building to water plants on moving trucks!
                  Don't waste water!
                </p>
                <CapsuleButton
                  variant="primary"
                  size="sm"
                  promptMessage="Starting Water Drop! 💧"
                >
                  Play Water Drop
                </CapsuleButton>
              </div>
            </div>
            <CapsuleButton
              variant="outline"
              size="lg"
              onClick={() => window.history.back()}
              promptMessage="Going Back! 👈"
            >
              Back to Dashboard
            </CapsuleButton>
          </div>
        )}

        {/* Trivia Game Screen */}
        {gameState === "playing" && gameType === "trivia" && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="glass p-4 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-body">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-white font-body">
                  Score: {score} | Streak: {streak}
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Timer */}
            <div className="text-center">
              <div
                className={`text-4xl font-bold ${
                  timeLeft <= 10
                    ? "text-red-400 animate-pulse"
                    : "text-green-400"
                }`}
              >
                ⏰ {timeLeft}s
              </div>
            </div>

            {/* Question Card */}
            <div className="glass p-8 rounded-2xl animate-fade-in-up">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">
                  {questions[currentQuestion].emoji}
                </div>
                <h2 className="text-2xl font-heading font-bold text-white">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => selectAnswer(index)}
                    disabled={showResult}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 font-body text-lg ${
                      selectedAnswer === index
                        ? showResult
                          ? index === questions[currentQuestion].correct
                            ? "border-green-400 bg-green-400/20 text-green-400"
                            : "border-red-400 bg-red-400/20 text-red-400"
                          : "border-blue-400 bg-blue-400/20 text-blue-400"
                        : showResult &&
                          index === questions[currentQuestion].correct
                        ? "border-green-400 bg-green-400/20 text-green-400"
                        : "border-white/20 bg-white/5 text-white hover:border-green-400/60 hover:bg-white/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {!showResult && (
                <div className="text-center">
                  <CapsuleButton
                    variant="primary"
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    promptMessage="Submitting Answer! 📝"
                  >
                    Submit Answer
                  </CapsuleButton>
                </div>
              )}

              {showResult && (
                <div className="text-center animate-fade-in-up">
                  <div
                    className={`text-4xl mb-4 ${
                      selectedAnswer === questions[currentQuestion].correct
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {selectedAnswer === questions[currentQuestion].correct
                      ? "🎉 Correct!"
                      : "❌ Wrong!"}
                  </div>
                  <p className="text-white/80 font-body text-lg mb-4">
                    {questions[currentQuestion].explanation}
                  </p>
                  <div className="text-white/60 font-body">
                    {selectedAnswer === questions[currentQuestion].correct
                      ? `+1 point! Streak: ${streak + 1}`
                      : "Streak broken! Keep trying!"}
                  </div>
                  <div className="mt-4">
                    <CapsuleButton
                      variant="primary"
                      onClick={nextQuestion}
                      promptMessage="Next Question! ➡️"
                    >
                      {currentQuestion < questions.length - 1
                        ? "Next Question"
                        : "See Results"}
                    </CapsuleButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Water Drop Game Screen */}
        {gameState === "playing" && gameType === "waterdrop" && (
          <div className="space-y-6">
            {/* Game Stats */}
            <div className="glass p-4 rounded-xl">
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {waterScore}
                  </div>
                  <div className="text-white/60 text-sm">Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{lives}</div>
                  <div className="text-white/60 text-sm">Lives</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {gameSpeed.toFixed(1)}x
                  </div>
                  <div className="text-white/60 text-sm">Speed</div>
                </div>
              </div>
            </div>

            {/* Game Canvas */}
            <div
              className="relative mx-auto bg-gradient-to-b from-sky-300 to-sky-500 rounded-lg overflow-hidden border-4 border-white"
              style={{ width: "400px", height: "400px" }}
              onClick={dropWater}
            >
              {/* Building */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-gray-600 rounded-t-lg">
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                  👤
                </div>
              </div>

              {/* Ground */}
              <div className="absolute bottom-0 w-full h-8 bg-green-600"></div>

              {/* Water Drops */}
              {waterDrops.map((drop) => (
                <div
                  key={drop.id}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{ left: drop.x, top: drop.y }}
                ></div>
              ))}

              {/* Trucks */}
              {trucks.length > 0 ? (
                trucks.map((truck) => (
                  <div
                    key={truck.id}
                    className="absolute w-32 h-8 bg-orange-500 rounded-lg"
                    style={{ left: truck.x, top: truck.y }}
                  >
                    {/* Plant Pots */}
                    {truck.plants.map((plant, index) => (
                      <div
                        key={index}
                        className={`absolute w-6 h-6 rounded-full ${
                          plant.watered ? "bg-green-400" : "bg-yellow-600"
                        } flex items-center justify-center text-xs`}
                        style={{ left: plant.x, top: -4 }}
                      >
                        {plant.watered ? "🌱" : "🪴"}
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div className="text-white text-center mt-20">
                  Loading trucks...
                </div>
              )}

              {/* Game Over Overlay */}
              {!isGameActive && lives <= 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-white text-2xl font-bold text-center">
                    Game Over! 💔
                    <div className="text-lg mt-2">
                      Final Score: {waterScore}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="glass p-4 rounded-xl">
              <h3 className="text-white font-bold mb-2">How to Play:</h3>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• Click anywhere on the game area to drop water</li>
                <li>• Water the plants on the moving trucks to score points</li>
                <li>• Don't waste water - missing costs you a life!</li>
                <li>• Game gets faster as you score more points</li>
                <li>• You have 5 lives - use them wisely!</li>
              </ul>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {gameState === "results" && (
          <div className="glass p-8 rounded-2xl text-center animate-fade-in-up">
            <div className="text-8xl mb-6">🏆</div>
            <h2
              className={`text-4xl font-heading font-bold mb-4 ${getScoreColor()}`}
            >
              {getScoreMessage()}
            </h2>
            <div className="space-y-4 mb-8">
              {gameType === "trivia" ? (
                <>
                  <div className="text-2xl text-white">
                    Final Score:{" "}
                    <span className="font-bold text-green-400">
                      {score}/{questions.length}
                    </span>
                  </div>
                  <div className="text-xl text-white">
                    Accuracy:{" "}
                    <span className="font-bold text-blue-400">
                      {Math.round((score / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="text-xl text-white">
                    Best Streak:{" "}
                    <span className="font-bold text-purple-400">
                      {maxStreak}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-2xl text-white">
                    Plants Watered:{" "}
                    <span className="font-bold text-green-400">
                      {waterScore}
                    </span>
                  </div>
                  <div className="text-xl text-white">
                    Final Speed:{" "}
                    <span className="font-bold text-blue-400">
                      {gameSpeed.toFixed(1)}x
                    </span>
                  </div>
                  <div className="text-xl text-white">
                    Lives Remaining:{" "}
                    <span className="font-bold text-purple-400">{lives}</span>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CapsuleButton
                variant="primary"
                size="lg"
                onClick={
                  gameType === "trivia" ? startTriviaGame : startWaterDropGame
                }
                promptMessage="Playing Again! 🔄"
                className="animate-pulse-glow"
              >
                Play Again
              </CapsuleButton>
              <CapsuleButton
                variant="outline"
                size="lg"
                onClick={resetGame}
                promptMessage="Back to Menu! 🏠"
              >
                Main Menu
              </CapsuleButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
