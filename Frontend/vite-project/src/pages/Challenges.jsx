import { Card, Button, Badge } from 'flowbite-react'

const challenges = [
  { title: '30-min Math Sprint', difficulty: 'Easy' },
  { title: 'Physics Problem Set', difficulty: 'Medium' },
  { title: 'History Timeline Challenge', difficulty: 'Hard' },
]

export default function Challenges() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Challenges</h1>
        <Button className="brand-gradient border-0">Create Challenge</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {challenges.map((c) => (
          <div key={c.title}>
            <Card className="glass h-full">
              <div className="flex items-start justify-between">
                <h3 className="text-white font-medium">{c.title}</h3>
                <Badge color="info">{c.difficulty}</Badge>
              </div>
              <p className="text-white/70 text-sm">Compete with yourself and peers to climb the leaderboard.</p>
              <div className="flex gap-2">
                <Button className="brand-gradient border-0">Join</Button>
                <Button color="light" className="bg-white/10 border-white/10 text-white">Details</Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}


