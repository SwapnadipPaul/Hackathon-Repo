import { Card, TextInput, Label, Button, Checkbox, Select } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function SignUp() {
  return (
    <div className="min-h-[80vh] grid place-items-center px-4">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="glass">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 rounded-xl brand-gradient shadow-glow animate-float" />
            <h1 className="text-2xl font-semibold text-white">Create your account</h1>
            <p className="text-white/60 text-sm">Join and start mastering quizzes and challenges</p>
          </div>

          <form className="space-y-4">
            <div>
              <Label htmlFor="name" value="Full name" className="text-white" />
              <TextInput id="name" type="text" placeholder="Jane Doe" required color="info" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="email" value="Email" className="text-white" />
              <TextInput id="email" type="email" placeholder="you@example.com" required color="info" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" value="Password" className="text-white" />
              <TextInput id="password" type="password" placeholder="Create a strong password" required color="info" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="role" value="Role" className="text-white" />
              <Select id="role" required>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-white/80">I agree to the terms</Label>
            </div>
            <Button as={Link} to="/login" className="w-full brand-gradient border-0">Create account</Button>
          </form>

          <p className="text-center text-white/70 text-sm">Already have an account? <Link to="/login" className="text-brand-400">Sign in</Link></p>
        </Card>
      </motion.div>
    </div>
  )
}


