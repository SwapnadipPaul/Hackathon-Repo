import { useMemo, useState } from 'react'
import {
  Card,
  Button,
  Badge,
  ListGroup,
  ListGroupItem,
  Select,
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  TextInput,
} from 'flowbite-react'

const notificationsSeed = [
  { id: 1, student: 'Anaya R', change: 'climbed', by: 3, grade: '8', section: 'A', when: '2h ago' },
  { id: 2, student: 'Harsh V', change: 'fell', by: 1, grade: '8', section: 'B', when: '5h ago' },
  { id: 3, student: 'Ishaan K', change: 'climbed', by: 2, grade: '9', section: 'C', when: '1d ago' },
]

const submissionsSeed = [
  { id: 101, student: 'Mia S', title: 'Photosynthesis Lab Report', grade: '8', section: 'A', submittedAt: 'Today 10:12' },
  { id: 102, student: 'Rohan D', title: 'Newton’s Laws Project', grade: '9', section: 'C', submittedAt: 'Yesterday 17:43' },
  { id: 103, student: 'Zara T', title: 'World War II Essay', grade: '8', section: 'B', submittedAt: 'Yesterday 09:15' },
]

const studentsSeed = [
  { id: 's-1', name: 'Anaya R', grade: '8', section: 'A' },
  { id: 's-2', name: 'Ben P', grade: '8', section: 'A' },
  { id: 's-3', name: 'Chirag L', grade: '8', section: 'B' },
  { id: 's-4', name: 'Disha K', grade: '9', section: 'C' },
  { id: 's-5', name: 'Evan Q', grade: '9', section: 'C' },
]

export default function TeacherDashboard() {
  const [grade, setGrade] = useState('all')
  const [section, setSection] = useState('all')
  const [search, setSearch] = useState('')

  const filteredStudents = useMemo(() => {
    return studentsSeed
      .filter(s => grade === 'all' ? true : s.grade === grade)
      .filter(s => section === 'all' ? true : s.section === section)
      .filter(s => s.name.toLowerCase().includes(search.toLowerCase()))
  }, [grade, section, search])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Teacher Dashboard</h1>
          <p className="text-white/60">Overview, notifications and class management</p>
        </div>
        <div className="flex gap-2">
          <Button className="brand-gradient border-0">Create Quiz</Button>
          <Button color="light" className="bg-white/10 border-white/10 text-white">Create Challenge</Button>
        </div>
      </div>

      {/* Top: Notifications + Submitted Projects */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="glass">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Notifications</h3>
            <Badge color="info">Leaderboard</Badge>
          </div>
          <ListGroup className="divide-white/10">
            {notificationsSeed.map(n => (
              <ListGroupItem key={n.id} className="bg-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white text-sm">
                      <span className="font-medium">{n.student}</span> {n.change} <span className="font-medium">{n.by}</span> place{n.by > 1 ? 's' : ''}
                    </p>
                    <p className="text-white/60 text-xs">Grade {n.grade}{n.section ? ` • Section ${n.section}` : ''}</p>
                  </div>
                  <span className="text-white/50 text-xs">{n.when}</span>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Card>

        <Card className="glass">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Submitted Projects</h3>
            <Badge color="info">To Grade</Badge>
          </div>
          <div className="space-y-3">
            {submissionsSeed.map(p => (
              <div key={p.id} className="p-3 rounded-lg border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-white text-sm font-medium">{p.title}</p>
                  <p className="text-white/70 text-xs">{p.student} • Grade {p.grade} • Section {p.section}</p>
                  <p className="text-white/50 text-xs">{p.submittedAt}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="xs" color="light" className="bg-white/10 border-white/10 text-white">View</Button>
                  <Button size="xs" className="brand-gradient border-0">Grade</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* My Students */}
      <Card className="glass">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-3">
          <div>
            <h3 className="text-white font-medium">My Students</h3>
            <p className="text-white/60 text-sm">Filter by grade and section, or search by name</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
            <div>
              <label htmlFor="grade" className="text-white/70 text-xs">Select Grade</label>
              <Select id="grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
                <option value="all">All</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </Select>
            </div>
            <div>
              <label htmlFor="section" className="text-white/70 text-xs">Select Section</label>
              <Select id="section" value={section} onChange={(e) => setSection(e.target.value)}>
                <option value="all">All</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </Select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="search" className="text-white/70 text-xs">Search</label>
              <TextInput id="search" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} color="info" />
            </div>
            <div className="col-span-2 sm:col-span-1 flex items-end">
              <Button color="light" className="bg-white/10 border-white/10 text-white w-full" onClick={() => { setGrade('all'); setSection('all'); setSearch('') }}>Clear</Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHead>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Grade</TableHeadCell>
              <TableHeadCell>Section</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">Actions</span>
              </TableHeadCell>
            </TableHead>
            <TableBody className="divide-y divide-white/10">
              {filteredStudents.map(s => (
                <TableRow key={s.id} className="bg-transparent">
                  <TableCell className="text-white">{s.name}</TableCell>
                  <TableCell className="text-white/80">{s.grade}</TableCell>
                  <TableCell className="text-white/80">{s.section}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="xs" color="light" className="bg-white/10 border-white/10 text-white">Profile</Button>
                      <Button size="xs" className="brand-gradient border-0">Message</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredStudents.length === 0 && (
                <TableRow className="bg-transparent">
                  <TableCell colSpan={4} className="text-center text-white/60 text-sm">No students match your filters.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
