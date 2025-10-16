import { Card, Button, Badge, Avatar, Progress } from 'flowbite-react'

const challenges = [
  { title: '30-min Math Sprint', difficulty: 'Easy' },
  { title: 'Physics Problem Set', difficulty: 'Medium' },
  { title: 'History Timeline Challenge', difficulty: 'Hard' },
]

export default function Challenges() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      {/* Header: Profile + Stats */}
      <Card className="glass">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Left: Avatar + Basic Info (values reserved for backend) */}
          <div className="flex items-start gap-4">
            <Avatar rounded size="lg" img={undefined} className="shrink-0" />
            <div className="grid grid-cols-2 gap-x-12 gap-y-2">
              {/* Left column: Student fields */}
              <ul className="space-y-2">
                <li className="text-white/80 text-sm">STUDENT NAME</li>
                <li className="text-white/80 text-sm">EMAIL ID</li>
                <li className="text-white/80 text-sm">PHONE NUMBER</li>
              </ul>
              {/* Right column: Teacher-related fields */}
              <ul className="space-y-2">
                <li className="text-white/80 text-sm">STUDENT TEACHER</li>
                <li className="text-white/80 text-sm">STUDENT CLASS</li>
                <li className="text-white/80 text-sm">STUDENT SECTION</li>
              </ul>
            </div>
          </div>

          {/* Middle: Points Bar */}
          <div className="w-full md:w-64">
            <p className="text-white/80 text-sm mb-2">Points Bar</p>
            <Progress progress={60} color="blue" size="lg" className="mb-1" />
            <div className="flex items-center justify-between text-white/70 text-xs">
              <span>0</span>
              <span>120 / 200 pts</span>
              <span>200</span>
            </div>
          </div>

          {/* Right: School Position table */}
          <div className="md:w-80 w-full">
            <p className="text-white/80 text-sm mb-2">School Position</p>
            <div className="rounded-lg border border-white/10 overflow-hidden">
              <table className="min-w-full bg-transparent">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-3 py-2 text-left text-white/80 text-sm font-medium">Rank</th>
                    <th className="px-3 py-2 text-left text-white/80 text-sm font-medium">Name</th>
                    <th className="px-3 py-2 text-left text-white/80 text-sm font-medium">Pts</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[1,2,3].map((r) => (
                    <tr key={r} className="bg-transparent">
                      <td className="px-3 py-2 text-white/80 text-sm">{r}</td>
                      <td className="px-3 py-2 text-white/80 text-sm">—</td>
                      <td className="px-3 py-2 text-white/80 text-sm">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-white text-sm mt-2">Your position: <span id="school-position-value">—</span></p>
          </div>

          {/* Leaderboard Position */}
          <div className="text-right md:text-left md:self-start">
            <p className="text-white/70 text-xs">LEADERBOARD</p>
            <p className="text-white/70 text-xs -mt-0.5">POSITION</p>
            <p className="text-white text-2xl font-semibold mt-1">—</p>
          </div>
        </div>
        <hr className="mt-6 border-white/10" />
      </Card>

      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Challenges!</h1>
        <Button className="brand-gradient border-0">Create Challenge</Button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {challenges.map((c) => (
          <div key={c.title}>
            <Card className="glass h-full rounded-3xl">
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


