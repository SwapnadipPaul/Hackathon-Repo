import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CapsuleButton from "../components/CapsuleButton";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(formData.email, formData.password, formData.role);
      if (formData.role === "teacher") {
        navigate("/teacher");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/src/pages/Assets/based-on-eco-learn-make-logo.jpg"
              alt="Eco Learn Logo"
              className="w-16 h-16 rounded-full object-cover shadow-glow animate-float"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/64x64/10b981/ffffff?text=EL";
              }}
            />
          </div>
          <h1 className="text-4xl font-heading font-bold text-white mb-2">
            Welcome to Eco Learn
          </h1>
          <p className="text-white/70 font-body">
            {isSignUp
              ? "Join our environmental learning community"
              : "Sign in to continue your eco journey"}
          </p>
        </div>

        {/* Form Container */}
        <div
          className="glass p-8 rounded-2xl animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          {/* Mode Toggle */}
          <div className="flex mb-6 bg-white/5 rounded-xl p-1">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-body font-medium transition-all duration-300 ${
                !isSignUp
                  ? "bg-green-400 text-white shadow-glow"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-body font-medium transition-all duration-300 ${
                isSignUp
                  ? "bg-green-400 text-white shadow-glow"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 animate-fade-in-up">
              <div className="flex items-center space-x-2">
                <span>⚠️</span>
                <span className="font-body">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <label className="block text-white font-body font-medium mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "student" })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.role === "student"
                      ? "border-green-400 bg-green-400/10 text-green-400"
                      : "border-white/20 bg-white/5 text-white/70 hover:border-green-400/60"
                  }`}
                >
                  <div className="text-2xl mb-2">🎓</div>
                  <div className="font-body font-medium">Student</div>
                  <div className="text-xs opacity-75">Learn & Earn Points</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: "teacher" })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.role === "teacher"
                      ? "border-green-400 bg-green-400/10 text-green-400"
                      : "border-white/20 bg-white/5 text-white/70 hover:border-green-400/60"
                  }`}
                >
                  <div className="text-2xl mb-2">👨‍🏫</div>
                  <div className="font-body font-medium">Teacher</div>
                  <div className="text-xs opacity-75">Manage & Monitor</div>
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <label className="block text-white font-body font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body"
              />
            </div>

            {/* Password Field */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <label className="block text-white font-body font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body"
              />
            </div>

            {/* Additional Fields for Sign Up */}
            {isSignUp && (
              <>
                <div
                  className="animate-fade-in-up"
                  style={{ animationDelay: "0.5s" }}
                >
                  <label className="block text-white font-body font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body"
                  />
                </div>

                {formData.role === "student" && (
                  <div
                    className="grid grid-cols-2 gap-4 animate-fade-in-up"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <div>
                      <label className="block text-white font-body font-medium mb-2">
                        Class
                      </label>
                      <input
                        type="text"
                        name="class"
                        placeholder="e.g., 8, 9, 10"
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-body font-medium mb-2">
                        Section
                      </label>
                      <input
                        type="text"
                        name="section"
                        placeholder="e.g., A, B, C"
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/20 text-white placeholder-white/50 focus:border-green-400 focus:bg-white/10 transition-all duration-300 font-body"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Remember Me & Forgot Password */}
            {!isSignUp && (
              <div
                className="flex items-center justify-between animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                <label className="flex items-center space-x-2 text-white/70 font-body">
                  <input
                    type="checkbox"
                    className="rounded border-white/20 bg-white/5 text-green-400 focus:ring-green-400"
                  />
                  <span>Remember me</span>
                </label>
                <Link
                  to="#"
                  className="text-green-400 hover:text-green-300 font-body transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <CapsuleButton
                type="submit"
                disabled={loading}
                loading={loading}
                variant="primary"
                className="w-full h-14 text-lg font-body font-semibold"
                promptMessage={
                  isSignUp ? "Creating Account! 🚀" : "Signing In! 🔐"
                }
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>
                      {isSignUp ? "Creating Account..." : "Signing In..."}
                    </span>
                  </div>
                ) : isSignUp ? (
                  "Create Account"
                ) : (
                  "Sign In"
                )}
              </CapsuleButton>
            </div>
          </form>

          {/* Demo Credentials */}
          {!isSignUp && (
            <div
              className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              <h3 className="text-white font-body font-medium mb-2">
                Demo Credentials:
              </h3>
              <div className="text-sm text-white/70 font-body space-y-1">
                <div>
                  <strong>Student:</strong> anaya.r@example.com / password123
                </div>
                <div>
                  <strong>Teacher:</strong> ravi.sharma@example.com /
                  password123
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="text-center mt-8 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <p className="text-white/60 font-body">
            By continuing, you agree to our{" "}
            <Link
              to="#"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="#"
              className="text-green-400 hover:text-green-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
