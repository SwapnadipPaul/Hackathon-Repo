import { Card, TextInput, Label, Button, Checkbox } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Login() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="glass">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-xl brand-gradient shadow-glow animate-float" />
            <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
            <p className="text-white/60 text-sm">Sign in to continue your learning journey</p>
          </div>

          <form className="space-y-4">
            <div>
              <Label htmlFor="email" value="Email" className="text-white" />
              <TextInput id="email" type="email" placeholder="you@example.com" required color="info" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" value="Password" className="text-white" />
              <TextInput id="password" type="password" placeholder="••••••••" required color="info" className="mt-1" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-white/80">Remember me</Label>
              </div>
              <Link to="#" className="text-brand-400 text-sm">Forgot password?</Link>
            </div>
            <Button as={Link} to="/student" className="w-full brand-gradient border-0">Sign in</Button>
          </form>

          <p className="text-center text-white/70 text-sm">No account? <Link to="/signup" className="text-brand-400">Create one</Link></p>
        </Card>
      </motion.div>
    </div>
  )
}


