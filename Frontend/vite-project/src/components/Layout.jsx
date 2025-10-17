import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
} from "flowbite-react";
import { useAuth } from "../contexts/AuthContext";
import CapsuleButton from "./CapsuleButton";

function BrandLogo() {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
      onClick={() => navigate("/")}
    >
      <img
        src="/src/pages/Assets/based-on-eco-learn-make-logo.jpg"
        alt="Eco Learn Logo"
        className="h-8 w-8 rounded-lg object-cover shadow-glow animate-float"
        onError={(e) => {
          e.target.src =
            "https://via.placeholder.com/32x32/10b981/ffffff?text=EL";
        }}
      />
      <span className="text-white font-semibold tracking-wide hover:text-green-400 transition-colors duration-300">
        Eco Learn
      </span>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar fluid rounded className="glass sticky top-0 z-40">
        <NavbarBrand>
          <BrandLogo />
        </NavbarBrand>
        <div className="flex md:order-2 gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-white text-sm">Welcome, {user?.name}!</span>
              <CapsuleButton
                onClick={logout}
                variant="outline"
                size="sm"
                promptMessage="Logging Out! 👋"
              >
                Logout
              </CapsuleButton>
            </div>
          ) : (
            <CapsuleButton
              as={NavLink}
              to="/login"
              variant="primary"
              size="sm"
              promptMessage="Going to Login! 🔐"
            >
              Login
            </CapsuleButton>
          )}
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          {isAuthenticated ? (
            <>
              <NavLink
                to={user?.role === "teacher" ? "/teacher" : "/student"}
                className={({ isActive }) =>
                  isActive ? "text-brand-400" : "text-white/80"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  isActive ? "text-brand-400" : "text-white/80"
                }
              >
                Leaderboard
              </NavLink>
              <NavLink
                to="/quiz"
                className={({ isActive }) =>
                  isActive ? "text-brand-400" : "text-white/80"
                }
              >
                Quiz
              </NavLink>
              <NavLink
                to="/lessons"
                className={({ isActive }) =>
                  isActive ? "text-brand-400" : "text-white/80"
                }
              >
                Lessons
              </NavLink>
              <NavLink
                to="/challenges"
                className={({ isActive }) =>
                  isActive ? "text-brand-400" : "text-white/80"
                }
              >
                Challenges
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  isActive ? "text-brand-400" : "text-white/80"
                }
              >
                Projects
              </NavLink>
              <NavLink
                to="/game"
                className={({ isActive }) =>
                  isActive ? "text-brand-400" : "text-white/80"
                }
              >
                🎮 Game
              </NavLink>
            </>
          ) : (
            <div className="text-white/60 text-sm">
              Please login to access all features
            </div>
          )}
        </NavbarCollapse>
      </Navbar>

      <main className="flex-1">
        <Outlet key={location.pathname} />
      </main>

      <footer className="glass mt-12">
        <div className="mx-auto max-w-6xl px-4 py-6 text-white/60 text-sm flex items-center justify-between">
          <span>© {new Date().getFullYear()} Eco Learn</span>
          <span className="hidden sm:block">
            Empowering Environmental Education
          </span>
        </div>
      </footer>
    </div>
  );
}
