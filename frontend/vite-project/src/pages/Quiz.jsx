import { Card, Button, Progress } from 'flowbite-react'
import { useMemo, useState } from 'react'

const mcqQuestions = [
  {
    title: "What is the process where the planet's average temperature slowly increases over many years called?",
    options: ['Global cooling', 'Global warming', 'Photosynthesis', 'Ocean tides'],
  },
  {
    title: 'What is the main goal of waste management?',
    options: ['To increase waste', 'To collect, transport, treat, recycle, and dispose of waste safely', 'To cause pollution', 'To produce more coal'],
  },
  { title: 'What gas do trees absorb from the atmosphere?', options: ['Oxygen (O2)', 'Nitrogen (N2)', 'Carbon dioxide (CO2)', 'Methane (CH4)'] },
  { title: 'What is the primary purpose of water conservation?', options: ['To increase water wastage', 'To save, manage, and use water efficiently', 'To pollute water sources', 'To increase drought'] },
  { title: 'What is a main cause of increased greenhouse gases?', options: ['Using public transport', 'Burning coal, petrol, and diesel', 'Planting more trees', 'Reducing plastic waste'] },
  { title: 'What is an example of a resource we get from biodiversity?', options: ['Plastic', 'Timber', 'Petrol', 'Harmful chemicals'] },
  { title: 'What is the practice of collecting and storing rainwater for later use?', options: ['Deforestation', 'Rainwater harvesting', 'Burning fossil fuels', 'Desertification'] },
  { title: 'What is one effect of climate change on the polar regions?', options: ['Ice is forming', 'Ice is melting', 'Temperatures are dropping', 'Sea levels are decreasing'] },
  { title: 'What is a benefit of conducting a plastic collection drive?', options: ['It clogs drains and rivers', 'It reduces plastic pollution', 'It encourages wildlife to eat plastic', 'It increases the need for new plastics'] },
  { title: 'What action is suggested to combat climate change?', options: ['Cut down trees (deforestation)', 'Use less electricity', 'Increase plastic waste', 'Rely more on non-renewable energy'] },
  { title: 'What process describes tree roots holding soil together, preventing landslides and soil loss?', options: ['Air pollution', 'Soil erosion prevention', 'Global warming', 'Ocean acidification'] },
  { title: 'Biodiversity refers to the variety and variability of what?', options: ['Buildings', 'Life on Earth', 'Machines', 'Money'] },
  { title: 'Which gas is a major greenhouse gas?', options: ['Oxygen (O2)', 'Carbon dioxide (CO2)', 'Hydrogen (H2)', 'Nitrogen (N2)'] },
  { title: 'What can be reduced by conserving water?', options: ['Global warming', 'Droughts and water scarcity', 'Forest growth', 'Plastic pollution'] },
  { title: 'What is one way proper waste disposal helps the surroundings?', options: ['Increases bad smell', 'Prevents littering', 'Pollutes the water', 'Uses up new resources'] },
  { title: 'Trees help to improve which type of health?', options: ['Only physical health', 'Mental health and stress', 'Economic health', 'Factory health'] },
  { title: 'What is an example of protecting natural habitats?', options: ['Cutting down forests', 'Dumping waste', 'Creating wildlife sanctuaries', 'Overhunting'] },
  { title: 'What is a common example of water wastage that should be fixed?', options: ['Using a water bottle', 'Repairing dripping taps and pipelines', 'Rainwater collection', 'Recycling'] },
  { title: 'Sustainable living means meeting our needs today without damaging resources needed by whom?', options: ['Business', 'Factories', 'Future generations', 'Current businesses'] },
  { title: 'Which type of waste takes hundreds of years to decompose?', options: ['Biodegradable waste', 'Food scraps', 'Non-biodegradable plastic', 'Paper'] },
  { title: 'Trees provide food, shelter, and nesting areas for what?', options: ['Non-biodegradable waste', 'Wildfire', 'Soil erosion', 'Birds, insects, and animals'] },
  { title: 'Using renewable energy like solar power helps fight climate change by lowering what?', options: ['Water usage', 'Carbon emissions', 'Electricity bills', 'The amount of sunlight'] },
  { title: 'When plastic enters water bodies, what can it clog?', options: ['Trees', 'Lights', 'Drains, rivers, and oceans', 'Air filters'] },
  { title: 'What do bees do that helps maintain ecosystem balance?', options: ['Control floods', 'Pollinate flowers', 'Produce medicine', 'Absorb carbon dioxide'] },
  { title: 'How can we help stop climate change?', options: ['Use more electricity', 'Use renewable energy like solar and wind', 'Cut down more trees', 'Use more plastic'] },
]

const tfQuestions = [
  'Climate change means a big and long-term change in the Earth’s weather and temperature.',
  'The main reason for climate change is a decrease in greenhouse gases in the atmosphere.',
  'Waste management only involves collecting and transporting waste.',
  'Trees release carbon dioxide (CO2), which helps fight climate change.',
  'Non-biodegradable plastic takes hundreds of years to decompose.',
  'Biodiversity refers only to the number of species on Earth.',
  'One effect of climate change is that sea levels are rising.',
  'Sustainable living is about using up all resources today without thinking of future generations.',
  'Factories are a source of greenhouse gases.',
  'Fixing leaking taps and pipelines is an example of water conservation.',
  'Tree roots help prevent soil erosion.',
  "Waste management's main goal is to increase air, water, and soil pollution.",
  'Biodegradable waste is a type of waste.',
  'Using public transport or cycling/walking can help stop climate change.',
  'Rainwater harvesting means collecting and storing rainwater for later use.',
  'Many plants and animals are sources of medicines and scientific discoveries.',
  'A benefit of tree planting is that it increases urban heat.',
  'Plastic collection drives aim to reduce plastic pollution.',
  'Sustainable living includes using renewable energy like solar power.',
  'A way to deal with biodiversity loss is to protect natural habitats.',
  'Burning coal for electricity is a source of greenhouse gases.',
  'The main goal of waste management is to protect human health and the environment.',
  'Trees absorb carbon dioxide (CO2).',
  'Conserving water helps during dry seasons by preventing droughts.',
  'Deforestation (cutting down trees) is a source of greenhouse gases.',
]

export default function Quiz() {
  const [mode, setMode] = useState('mcq') // 'mcq' | 'tf'
  const [index, setIndex] = useState(0)
  const total = useMemo(() => (mode === 'mcq' ? mcqQuestions.length : tfQuestions.length), [mode])

  const currentTitle = useMemo(() => {
    if (mode === 'mcq') return mcqQuestions[index].title
    return tfQuestions[index]
  }, [mode, index])

  const currentOptions = useMemo(() => {
    if (mode === 'mcq') return mcqQuestions[index].options
    return ['True', 'False']
  }, [mode, index])

  function next() {
    setIndex((i) => Math.min(i + 1, total - 1))
  }
  function prev() {
    setIndex((i) => Math.max(i - 1, 0))
  }

  function switchMode(newMode) {
    setMode(newMode)
    setIndex(0)
  }

  const progress = Math.round(((index + 1) / total) * 100)

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Quiz</h1>
        <Progress progress={progress} color="blue" size="lg" className="w-40" />
      </div>

      <div className="flex gap-2">
        <Button onClick={() => switchMode('mcq')} color={mode === 'mcq' ? 'blue' : 'light'} className={mode === 'mcq' ? 'brand-gradient border-0' : 'bg-white/10 border-white/10 text-white'}>
          MCQ
        </Button>
        <Button onClick={() => switchMode('tf')} color={mode === 'tf' ? 'blue' : 'light'} className={mode === 'tf' ? 'brand-gradient border-0' : 'bg-white/10 border-white/10 text-white'}>
          True/False
        </Button>
      </div>

      <div>
        <Card className="glass">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl font-medium text-white mb-2">
              {index + 1}. {currentTitle}
            </h2>
            <span className="text-white/60 text-sm">{index + 1} / {total}</span>
          </div>

          <div className="grid gap-3">
            {currentOptions.map((opt) => (
              <button key={opt} className="text-left p-3 rounded-lg border border-white/10 hover:border-brand-500/60 hover:shadow-glow transition-all">
                <span className="text-white">{opt}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-3">
            <Button onClick={prev} disabled={index === 0} color="light" className="bg-white/10 border-white/10 text-white">Previous</Button>
            <Button onClick={next} disabled={index === total - 1} className="brand-gradient border-0">Next</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}



