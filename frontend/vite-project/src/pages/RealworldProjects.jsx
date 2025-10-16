import { Card, Button } from 'flowbite-react'

const projects = [
  {
    title: 'The Urban Reforestation & Habitat Restoration Project',
    objective: 'Fight climate change, protect natural habitats, and support wildlife and biodiversity.',
    steps: [
      'Planting Drive Preparation: Select a degraded area and source native tree species that support local birds, insects, and animals.',
      'Habitat Protection: Create wildlife micro‑habitats (bird feeders, insect hotels) and plan long‑term care to protect threatened species.',
      'Tree Planting Activity: Organize a planting event to reduce climate change impacts and prevent soil erosion.',
    ],
  },
  {
    title: 'The Sustainable Upcycled Product & Awareness Project',
    objective: 'Reduce plastic pollution, promote recycling, and demonstrate sustainable living.',
    steps: [
      'Plastic Collection Drive: Collect non‑biodegradable plastic that clogs drains, rivers, and oceans.',
      'Upcycling Workshop: Turn collected plastic into usable items (eco‑bricks, bags, art) to save resources.',
      'Sustainable Living Awareness: Exhibit the products and explain how these actions support a cleaner future.',
    ],
  },
  {
    title: 'The Community Water‑Saving Infrastructure Project',
    objective: 'Reduce water wastage and increase local water availability, especially during dry seasons.',
    steps: [
      'Need Assessment: Survey usage, identify major wastage points like leaky taps.',
      'Rainwater Harvesting Installation: Design and install a basic system for gardening/cleaning use.',
      'Fixture Upgrades: Add low‑flow faucets or timers to improve efficiency.',
      'Public Awareness: Share why conservation secures water for drinking, agriculture, and industry.',
    ],
  },
  {
    title: 'The Community Composting & Waste Diversion Project',
    objective: 'Establish a local system for managing biodegradable waste and creating compost.',
    steps: [
      'Site Identification: Choose an accessible site (school yard, community garden, housing area).',
      'Compost System Build: Construct a simple bin and set safe collection practices.',
      'Collection Drive: Gather biodegradable waste (food scraps) on a regular schedule.',
      'Education: Teach why proper disposal prevents litter and smells, and how compost supports ecosystems.',
    ],
  },
  {
    title: 'The School Eco‑Audit & Sustainable Upgrade Project',
    objective: 'Implement sustainable living practices, conserve resources, and cut emissions on campus.',
    steps: [
      'Energy Consumption Audit: Identify waste; add motion sensors or reminder stickers to reduce bills.',
      'Water Fixture Efficiency: Check leaks in bathrooms and fountains and report for quick repair.',
      'Renewable Energy Research: Study solar viability and present the emissions benefits.',
    ],
  },
]

export default function RealworldProjects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Real World Projects</h1>
      </div>

      <div className="space-y-4">
        {projects.map((p, idx) => (
          <Card key={p.title} className="glass">
            <div className="flex items-baseline justify-between">
              <span className="text-white font-semibold text-lg">Project {idx + 1}</span>
            </div>
            <h2 className="text-2xl font-semibold text-white mt-1">{p.title}</h2>
            <p className="text-white/80">Objective: {p.objective}</p>
            <ul className="list-disc pl-5 space-y-1">
              {p.steps.map((s, i) => (
                <li key={i} className="text-white/80">{s}</li>
              ))}
            </ul>
            <div className="pt-2">
              <Button className="brand-gradient border-0">Submit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


