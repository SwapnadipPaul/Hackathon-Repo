import { Card, Progress, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

const statCards = [
  { label: 'Completed Quizzes', value: 8 },
  { label: 'Streak', value: '5 days' },
  { label: 'XP', value: 1240 },
]

export default function StudentDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Student Dashboard</h1>
          <p className="text-white/60">Track progress and jump back into learning</p>
        </div>
        <Button as={Link} to="/quiz" className="brand-gradient border-0">Start Quiz</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {statCards.map((s) => (
          <div key={s.label}>
            <Card className="glass">
              <p className="text-white/70 text-sm">{s.label}</p>
              <p className="text-2xl font-semibold text-white">{s.value}</p>
            </Card>
          </div>
        ))}
      </div>

      <Card className="glass">
        <h2 className="text-white font-medium mb-4">Weekly Goal</h2>
        <Progress progress={66} color="blue" size="lg" className="mb-2" />
        <p className="text-white/70 text-sm">You are 2 quizzes away from your weekly goal.</p>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="glass">
          <h3 className="text-white font-medium mb-3">Recommended Quizzes</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {[1,2,3,4].map((n) => (
              <div key={n} className="p-4 rounded-lg border border-white/10 hover:border-brand-500/50 transition-colors">
                <p className="text-white">Topic {n}</p>
                <Button as={Link} to="/quiz" size="xs" className="mt-2 brand-gradient border-0">Take</Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="glass">
          <h3 className="text-white font-medium mb-3">Latest Activity</h3>
          <ul className="text-white/70 text-sm space-y-2">
            <li>Completed Algebra Basics</li>
            <li>New badge: Consistency I</li>
            <li>Scored 92% in Science Quiz</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}


