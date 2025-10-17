import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CapsuleButton from "../components/CapsuleButton";

export default function Homepage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/student-dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="/src/pages/Assets/based-on-eco-learn-make-logo.jpg"
                alt="Eco Learn Logo"
                className="w-12 h-12 rounded-full object-cover hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/48x48/10b981/ffffff?text=EL";
                }}
              />
              <h1 className="text-2xl font-heading font-bold text-white hover:text-green-400 transition-colors duration-300">
                Eco Learn
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-white/80 hover:text-green-400 transition-colors font-body"
              >
                Home
              </Link>
              <Link
                to="/lessons"
                className="text-white/80 hover:text-green-400 transition-colors font-body"
              >
                Lessons
              </Link>
              <Link
                to="/quiz"
                className="text-white/80 hover:text-green-400 transition-colors font-body"
              >
                Quiz
              </Link>
              <Link
                to="/challenges"
                className="text-white/80 hover:text-green-400 transition-colors font-body"
              >
                Challenges
              </Link>
              <Link
                to="/projects"
                className="text-white/80 hover:text-green-400 transition-colors font-body"
              >
                Projects
              </Link>
              <Link
                to="/leaderboard"
                className="text-white/80 hover:text-green-400 transition-colors font-body"
              >
                Leaderboard
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <img
                    src="/src/pages/Assets/boy.png"
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/32x32/10b981/ffffff?text=U";
                    }}
                  />
                  <span className="text-white font-body">{user?.name}</span>
                  <CapsuleButton
                    variant="outline"
                    onClick={() => {
                      if (user?.role === "teacher") {
                        navigate("/teacher");
                      } else {
                        navigate("/student");
                      }
                    }}
                    promptMessage="Go to Dashboard"
                  >
                    Dashboard
                  </CapsuleButton>
                </div>
              ) : (
                <CapsuleButton
                  variant="primary"
                  onClick={() => navigate("/login")}
                  promptMessage="Start Learning Journey!"
                >
                  Get Started
                </CapsuleButton>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-6xl md:text-7xl font-heading font-bold text-white mb-6 animate-fade-in-up">
              Welcome to <span className="text-green-400">Eco Learn</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto font-body animate-fade-in-up">
              Empowering the next generation of environmental stewards through
              interactive learning, gamified experiences, and real-world impact
              projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <CapsuleButton
                variant="primary"
                size="lg"
                onClick={handleGetStarted}
                promptMessage="Start Your Eco Journey!"
                className="animate-pulse-glow"
              >
                {isAuthenticated ? "Go to Dashboard" : "Start Learning"}
              </CapsuleButton>
              <CapsuleButton
                variant="outline"
                size="lg"
                onClick={() =>
                  navigate(isAuthenticated ? "/lessons" : "/login")
                }
                promptMessage="Explore Interactive Lessons"
              >
                Explore Lessons
              </CapsuleButton>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center text-white mb-12 animate-fade-in-up">
            Why Choose Eco Learn?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-2xl text-center hover:shadow-glow transition-all duration-300 animate-fade-in-left">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Interactive Learning
              </h3>
              <p className="text-white/80 font-body">
                Engaging video lessons, quizzes, and hands-on activities that
                make environmental science fun and memorable.
              </p>
            </div>
            <div className="glass p-8 rounded-2xl text-center hover:shadow-glow transition-all duration-300 animate-fade-in-up">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Gamified Experience
              </h3>
              <p className="text-white/80 font-body">
                Earn points, unlock achievements, and climb the leaderboard as
                you master environmental concepts.
              </p>
            </div>
            <div className="glass p-8 rounded-2xl text-center hover:shadow-glow transition-all duration-300 animate-fade-in-right">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Real Impact
              </h3>
              <p className="text-white/80 font-body">
                Apply your knowledge through real-world projects that make a
                difference in your community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center text-white mb-12 animate-fade-in-up">
            Our Environmental Mission
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-300 animate-float">
              <img
                src="/src/pages/Assets/earthandtree.jpg"
                alt="Earth and Tree"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  Protecting Our Planet
                </h3>
                <p className="text-white/80 font-body">
                  Learn how to protect and preserve our beautiful Earth for
                  future generations.
                </p>
              </div>
            </div>
            <div
              className="glass rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-300 animate-float"
              style={{ animationDelay: "0.5s" }}
            >
              <img
                src="/src/pages/Assets/PlantWithBottleSoil.jpg"
                alt="Plant with Bottle Soil"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  Sustainable Living
                </h3>
                <p className="text-white/80 font-body">
                  Discover creative ways to reduce waste and live more
                  sustainably every day.
                </p>
              </div>
            </div>
            <div
              className="glass rounded-2xl overflow-hidden hover:shadow-glow transition-all duration-300 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <img
                src="/src/pages/Assets/PlantWithBottleHanging.jpg"
                alt="Hanging Plant with Bottle"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  Innovation & Creativity
                </h3>
                <p className="text-white/80 font-body">
                  Explore innovative solutions to environmental challenges
                  through creative thinking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNESCO Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="container mx-auto">
          <div className="glass p-8 rounded-2xl">
            <div className="flex items-center mb-8">
              <div className="text-6xl mr-4">🌐</div>
              <div>
                <h2 className="text-4xl font-heading font-bold text-white mb-2">
                  UNESCO Partnership
                </h2>
                <p className="text-xl text-green-400 font-body">
                  United Nations Educational, Scientific and Cultural
                  Organization
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  About UNESCO
                </h3>
                <ul className="space-y-2 text-white/80 font-body">
                  <li>
                    • UNESCO is a specialized agency of the United Nations (UN)
                  </li>
                  <li>• It was founded on 16 November 1945</li>
                  <li>• Its headquarters are in Paris, France</li>
                  <li>
                    • It works with 193 member countries (including India)
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  Main Purpose
                </h3>
                <blockquote className="text-xl text-green-400 font-body italic mb-4">
                  "Build peace through international cooperation in education,
                  science, culture, and communication."
                </blockquote>
                <h4 className="text-xl font-display font-bold text-white mb-3">
                  Main Functions:
                </h4>
                <ul className="space-y-2 text-white/80 font-body">
                  <li>
                    • Promotes quality education and lifelong learning for all
                  </li>
                  <li>
                    • Encourages scientific research and environmental
                    sustainability
                  </li>
                  <li>
                    • Protects cultural heritage and promotes global cultural
                    exchange
                  </li>
                  <li>
                    • Supports digital learning, communication, and media
                    literacy
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEP 2020 Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="glass p-8 rounded-2xl">
            <div className="flex items-center mb-8">
              <div className="text-6xl mr-4">📚</div>
              <div>
                <h2 className="text-4xl font-heading font-bold text-white mb-2">
                  NEP 2020 Alignment
                </h2>
                <p className="text-xl text-green-400 font-body">
                  National Education Policy 2020
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  Policy Overview
                </h3>
                <ul className="space-y-2 text-white/80 font-body">
                  <li>• Launched by: Government of India in July 2020</li>
                  <li>
                    • Replaces: The old National Policy on Education (1986)
                  </li>
                  <li>
                    • Objective: To reform and modernize India's education
                    system
                  </li>
                </ul>
                <h4 className="text-xl font-display font-bold text-white mt-6 mb-3">
                  Vision:
                </h4>
                <p className="text-white/80 font-body">
                  To create a system that ensures quality education for all and
                  builds global citizens with strong values
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">
                  Main Features
                </h3>
                <ul className="space-y-2 text-white/80 font-body">
                  <li>
                    • Focus on experiential learning rather than rote
                    memorization
                  </li>
                  <li>
                    • Emphasizes critical thinking, creativity, and
                    problem-solving skills
                  </li>
                  <li>
                    • Promotes use of technology, digital learning, and gamified
                    educational methods
                  </li>
                  <li>
                    • Gives importance to vocational education, local languages,
                    and flexible curriculum design
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-green-400/10 rounded-lg border border-green-400/20">
                  <p className="text-green-400 font-body font-medium">
                    Eco Learn embodies NEP 2020's vision through interactive,
                    technology-driven environmental education that promotes
                    critical thinking and real-world application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-16 px-4 bg-surface">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold text-center text-white mb-12 animate-fade-in-up">
            Your Learning Journey
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/lessons"
                  className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    📖
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Interactive Lessons
                  </h3>
                  <p className="text-white/80 font-body text-sm">
                    7 comprehensive environmental science lessons
                  </p>
                </Link>
                <Link
                  to="/quiz"
                  className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    🧠
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Knowledge Quizzes
                  </h3>
                  <p className="text-white/80 font-body text-sm">
                    Test your understanding with interactive quizzes
                  </p>
                </Link>
                <Link
                  to="/challenges"
                  className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    🎯
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Daily Challenges
                  </h3>
                  <p className="text-white/80 font-body text-sm">
                    Complete environmental challenges for points
                  </p>
                </Link>
                <Link
                  to="/projects"
                  className="glass p-6 rounded-2xl hover:shadow-glow transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    🌱
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Real Projects
                  </h3>
                  <p className="text-white/80 font-body text-sm">
                    Make real impact through community projects
                  </p>
                </Link>
              </>
            ) : (
              <>
                <div className="glass p-6 rounded-2xl opacity-60">
                  <div className="text-4xl mb-4">📖</div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Interactive Lessons
                  </h3>
                  <p className="text-white/80 font-body text-sm">
                    Login to access 7 comprehensive lessons
                  </p>
                </div>
                <div className="glass p-6 rounded-2xl opacity-60">
                  <div className="text-4xl mb-4">🧠</div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Knowledge Quizzes
                  </h3>
                  <p className="text-white/80 font-body text-sm">
                    Login to take interactive quizzes
                  </p>
                </div>
                <div className="glass p-6 rounded-2xl opacity-60">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Daily Challenges
                  </h3>
                  <p className="text-white/80 font-body text-sm">
                    Login to complete challenges
                  </p>
                </div>
                <div className="glass p-6 rounded-2xl opacity-60">
                  <div className="text-4xl mb-4">🌱</div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Real Projects
                  </h3>
                  <p className="text-white/80 font-body text-sm">
                    Login to join community projects
                  </p>
                </div>
              </>
            )}
          </div>
          {!isAuthenticated && (
            <div className="text-center mt-8">
              <CapsuleButton
                variant="primary"
                size="lg"
                onClick={() => navigate("/login")}
                promptMessage="Unlock All Features!"
                className="animate-pulse-glow"
              >
                Login to Access All Features
              </CapsuleButton>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img
              src="/src/pages/Assets/based-on-eco-learn-make-logo.jpg"
              alt="Eco Learn Logo"
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/32x32/10b981/ffffff?text=EL";
              }}
            />
            <h3 className="text-xl font-heading font-bold text-white">
              Eco Learn
            </h3>
          </div>
          <p className="text-white/60 font-body mb-4">
            Empowering Environmental Education for a Sustainable Future
          </p>
          <p className="text-white/40 font-body text-sm">
            © {new Date().getFullYear()} Eco Learn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
