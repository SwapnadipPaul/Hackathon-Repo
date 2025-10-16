import { Outlet, NavLink, useLocation } from "react-router-dom";

function BrandLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg brand-gradient shadow-glow animate-float" />
      <span className="text-white font-semibold tracking-wide text-xl">
        SkillForge
      </span>
    </div>
  );
}

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Beautiful navigation bar */}
      <nav className="glass sticky top-0 z-40 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <NavLink to="/login" className="flex items-center gap-2">
            <BrandLogo />
          </NavLink>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6">
              <NavLink
                to="/student"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "text-brand-400 bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Student
              </NavLink>
              <NavLink
                to="/teacher"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "text-brand-400 bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Teacher
              </NavLink>
              <NavLink
                to="/quiz"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "text-brand-400 bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Quiz
              </NavLink>
              <NavLink
                to="/challenges"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? "text-brand-400 bg-white/10"
                      : "text-white/80 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Challenges
              </NavLink>
            </div>

            <NavLink
              to="/login"
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Login
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Outlet key={location.pathname} />
      </main>

      <footer className="glass mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-white/60 text-sm flex items-center justify-between">
          <span>© {new Date().getFullYear()} SkillForge</span>
          <span className="hidden sm:block">
            Built with React + Tailwind CSS
          </span>
        </div>
      </footer>
    </div>
  );
}
