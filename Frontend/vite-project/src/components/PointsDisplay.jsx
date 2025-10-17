import { usePoints, POINTS_CONFIG } from "../contexts/PointsContext";

const PointsDisplay = ({ showBreakdown = false, className = "" }) => {
  const {
    totalPoints,
    getCurrentLevel,
    getNextLevelProgress,
    getPointsBreakdown,
  } = usePoints();

  const currentLevel = getCurrentLevel();
  const nextLevelProgress = getNextLevelProgress();
  const breakdown = getPointsBreakdown();

  return (
    <div className={`glass p-6 rounded-3xl ${className}`}>
      {/* Main Points Display */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div
            className="text-6xl animate-bounce"
            style={{ filter: `drop-shadow(0 0 10px ${currentLevel.color})` }}
          >
            {currentLevel.icon}
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">
              {currentLevel.name} Level
            </h3>
            <div className="text-4xl font-display font-bold text-green-400">
              {isNaN(totalPoints) ? 0 : totalPoints} Points
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {nextLevelProgress.nextLevel && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-white/70 mb-2">
              <span>Progress to {nextLevelProgress.nextLevel.name}</span>
              <span>{nextLevelProgress.pointsNeeded} points needed</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${nextLevelProgress.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Points Breakdown */}
      {showBreakdown && (
        <div className="space-y-4">
          <h4 className="text-lg font-display font-semibold text-white mb-4 text-center">
            Points Breakdown
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <div className="text-green-400 font-display font-bold text-xl">
                {breakdown.lessons || 0}
              </div>
              <div className="text-white/70 text-sm">Lessons</div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <div className="text-blue-400 font-display font-bold text-xl">
                {breakdown.challenges || 0}
              </div>
              <div className="text-white/70 text-sm">Challenges</div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <div className="text-purple-400 font-display font-bold text-xl">
                {breakdown.quizzes || 0}
              </div>
              <div className="text-white/70 text-sm">Quizzes</div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 text-center">
              <div className="text-orange-400 font-display font-bold text-xl">
                {breakdown.projects || 0}
              </div>
              <div className="text-white/70 text-sm">Projects</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PointsDisplay;
