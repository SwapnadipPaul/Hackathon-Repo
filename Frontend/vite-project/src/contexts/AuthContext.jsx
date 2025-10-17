import { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        try {
          // Validate token with backend or decode it
          setToken(savedToken);
          // For demo purposes, set user based on token or localStorage
          const savedUser = localStorage.getItem("user");
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
            // Fallback for demo
            setUser({
              email: "demo@example.com",
              role: "student",
              name: "Demo User",
            });
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password, role) => {
    try {
      // For demo purposes, allow login with demo credentials
      if (
        (email === "anaya.r@example.com" &&
          password === "pass123" &&
          role === "student") ||
        (email === "ravi.sharma@example.com" &&
          password === "pass123" &&
          role === "teacher")
      ) {
        const demoToken = `demo-token-${Date.now()}`;
        const userData = {
          email: email,
          role: role,
          name: email === "anaya.r@example.com" ? "Anaya R" : "Ravi Sharma",
        };

        setToken(demoToken);
        setUser(userData);
        localStorage.setItem("token", demoToken);
        localStorage.setItem("user", JSON.stringify(userData));
        return { token: demoToken, user: userData };
      }

      // Try API login for other credentials
      const result = await authAPI.login(email, password, role);
      setToken(result.token);
      const userData = {
        email: email,
        role: role,
        name: email.split("@")[0], // Use email prefix as name
      };
      setUser(userData);
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(userData));
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
