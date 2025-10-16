import { Card, Button, Table, Badge } from 'flowbite-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const rows = [
  { name: 'Algebra Basics', attempts: 42, avg: '78%' },
  { name: 'Newton Laws', attempts: 31, avg: '84%' },
  { name: 'World War II', attempts: 27, avg: '73%' },
]

export default function TeacherDashboard() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Teacher Dashboard</h1>
          <p className="text-white/60">Manage quizzes and monitor class performance</p>
        </div>
        <div className="flex gap-2">
          <Button as={Link} to="/quiz" className="brand-gradient border-0">Create Quiz</Button>
          <Button as={Link} to="/challenges" color="light" className="bg-white/10 border-white/10 text-white">Create Challenge</Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Recent Quizzes</h3>
            <Badge color="info">Last 7 days</Badge>
          </div>
          <div className="overflow-x-auto">
            <Table className="min-w-[600px]">
              <Table.Head>
                <Table.HeadCell>Quiz</Table.HeadCell>
                <Table.HeadCell>Attempts</Table.HeadCell>
                <Table.HeadCell>Average</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y divide-white/10">
                {rows.map((r) => (
                  <Table.Row key={r.name} className="bg-transparent">
                    <Table.Cell className="text-white">{r.name}</Table.Cell>
                    <Table.Cell className="text-white/80">{r.attempts}</Table.Cell>
                    <Table.Cell className="text-white/80">{r.avg}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}


