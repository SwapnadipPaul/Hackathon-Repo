import { Card, Avatar } from 'flowbite-react'

const rows = [
  { rank: 1, name: 'Aarav Sharma', points: 980 },
  { rank: 2, name: 'Zara Khan', points: 955 },
  { rank: 3, name: 'Ishaan Patel', points: 930 },
  { rank: 4, name: 'Maya Reddy', points: 905 },
  { rank: 5, name: 'Vivaan Gupta', points: 882 },
  { rank: 6, name: 'Sara Thomas', points: 860 },
  { rank: 7, name: 'Aditya Menon', points: 845 },
  { rank: 8, name: 'Diya Nair', points: 832 },
  { rank: 9, name: 'Kabir Singh', points: 820 },
  { rank: 10, name: 'Anaya Joshi', points: 805 },
]

export default function Leaderboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Leaderboard</h1>
      </div>

      <Card className="glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-white/80 text-sm font-medium">Rank</th>
                <th className="px-4 py-3 text-left text-white/80 text-sm font-medium">Student</th>
                <th className="px-4 py-3 text-left text-white/80 text-sm font-medium">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((r) => (
                <tr key={r.rank} className="hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white">{r.rank}</td>
                  <td className="px-4 py-3 text-white flex items-center gap-3">
                    <Avatar size="sm" rounded img={undefined} />
                    <span> {r.name} </span>
                  </td>
                  <td className="px-4 py-3 text-white">{r.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}


