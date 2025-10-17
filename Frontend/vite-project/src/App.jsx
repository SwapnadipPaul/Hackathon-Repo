import { Suspense, lazy } from "react";
import "flowbite";
import { Routes, Route, Navigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import Layout from "./components/Layout.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PointsProvider } from "./contexts/PointsContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Lazy load pages
const Homepage = lazy(() => import("./pages/Homepage.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const SignUp = lazy(() => import("./pages/SignUp.jsx"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard.jsx"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard.jsx"));
const Quiz = lazy(() => import("./pages/Quiz.jsx"));
const Challenges = lazy(() => import("./pages/Challenges.jsx"));
const InteractiveLessons = lazy(() => import("./pages/Interactivelessons.jsx"));
const RealworldProjects = lazy(() => import("./pages/RealworldProjects.jsx"));
const Leaderboard = lazy(() => import("./pages/Leaderboard.jsx"));
const EcoGame = lazy(() => import("./pages/EcoGame.jsx"));

function App() {
  return (
    <AuthProvider>
      <PointsProvider>
        <Suspense
          fallback={
            <div className="min-h-screen grid place-items-center bg-surface">
              <Spinner aria-label="Loading" color="info" size="xl" />
            </div>
          }
        >
          <Routes>
            {/* Homepage route without layout */}
            <Route path="/" element={<Homepage />} />

            {/* Other routes with layout */}
            <Route element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Protected routes */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute>
                    <StudentDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/teacher"
                element={
                  <ProtectedRoute>
                    <TeacherDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz"
                element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lessons"
                element={
                  <ProtectedRoute>
                    <InteractiveLessons />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/challenges"
                element={
                  <ProtectedRoute>
                    <Challenges />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <RealworldProjects />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/game"
                element={
                  <ProtectedRoute>
                    <EcoGame />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </PointsProvider>
    </AuthProvider>
  );
}

export default App;
