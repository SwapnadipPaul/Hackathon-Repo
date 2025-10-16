import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, Button } from 'flowbite-react'

function BrandLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg brand-gradient shadow-glow animate-float" />
      <span className="text-white font-semibold tracking-wide">SkillForge</span>
    </div>
  )
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar fluid rounded className="glass sticky top-0 z-40">
        <NavbarBrand as={NavLink} to="/login">
          <BrandLogo />
        </NavbarBrand>
        <div className="flex md:order-2 gap-2">
          <Button as={NavLink} to="/login" color="blue" className="brand-gradient border-0">
            Login
          </Button>
          <NavbarToggle />
        </div>
        <NavbarCollapse>
          <NavLink to="/student" className={({ isActive }) => isActive ? 'text-brand-400' : 'text-white/80'}>
            Student
          </NavLink>
          <NavLink to="/teacher" className={({ isActive }) => isActive ? 'text-brand-400' : 'text-white/80'}>
            Teacher
          </NavLink>
          <NavLink to="/quiz" className={({ isActive }) => isActive ? 'text-brand-400' : 'text-white/80'}>
            Quiz
          </NavLink>
          <NavLink to="/challenges" className={({ isActive }) => isActive ? 'text-brand-400' : 'text-white/80'}>
            Challenges
          </NavLink>
        </NavbarCollapse>
      </Navbar>

      <main className="flex-1">
        <Outlet key={location.pathname} />
      </main>

      <footer className="glass mt-12">
        <div className="mx-auto max-w-6xl px-4 py-6 text-white/60 text-sm flex items-center justify-between">
          <span>© {new Date().getFullYear()} SkillForge</span>
          <span className="hidden sm:block">Built with Tailwind + Flowbite</span>
        </div>
      </footer>
    </div>
  )
}



