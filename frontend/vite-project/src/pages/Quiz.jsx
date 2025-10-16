import { Card, Button, Progress } from 'flowbite-react'
import { motion } from 'framer-motion'

const sampleQuestion = {
  title: 'What is the capital of France?',
  options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
}

export default function Quiz() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Quiz</h1>
        <Progress progress={40} color="blue" size="lg" className="w-40" />
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass">
          <h2 className="text-xl font-medium text-white mb-2">{sampleQuestion.title}</h2>
          <div className="grid gap-3">
            {sampleQuestion.options.map((opt) => (
              <button key={opt} className="text-left p-3 rounded-lg border border-white/10 hover:border-brand-500/60 hover:shadow-glow transition-all">
                <span className="text-white">{opt}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-3">
            <Button color="light" className="bg-white/10 border-white/10 text-white">Previous</Button>
            <Button className="brand-gradient border-0">Next</Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}


