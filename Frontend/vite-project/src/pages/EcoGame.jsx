import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import CapsuleButton from "../components/CapsuleButton";

export default function EcoGame() {
  const { user } = useAuth();
  const [gameType, setGameType] = useState(null);
  const [gameState, setGameState] = useState("menu");

  // Water Drop Game States
  const [waterDrops, setWaterDrops] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [lives, setLives] = useState(5);
  const [waterScore, setWaterScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(1);

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

        {/* Game Selection */}
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
            <div className="glass p-6 rounded-xl hover:shadow-glow transition-all duration-300 cursor-pointer group">
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                🧠
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-2">
                Eco Trivia Challenge
              </h3>
              <p className="text-white/80 font-body text-sm mb-4">
                Answer 10 environmental questions as fast as you can! Each
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

        {/* Water Drop Game */}
        {gameType === "waterdrop" && (
          <div className="glass p-8 rounded-2xl mt-8">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">
              💧 Water Drop Game 💧
            </h2>

            {/* Game Stats */}
            <div className="glass p-4 rounded-xl mb-4">
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
                  Click "Play Water Drop" to begin!
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-4 text-center text-white/80 text-sm">
              <p>Click anywhere in the blue area to drop water!</p>
              <p>Water the plants on the moving trucks to score points!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
