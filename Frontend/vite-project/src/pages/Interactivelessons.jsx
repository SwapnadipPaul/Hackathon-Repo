import { useState } from "react";
import { usePoints } from "../contexts/PointsContext";
import CapsuleButton from "../components/CapsuleButton";

export default function InteractiveLessons() {
  const { addPoints, getCurrentLevel } = usePoints();
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [watchedLessons, setWatchedLessons] = useState([]);

  const lessons = [
    {
      id: 1,
      title: "Climate Change",
      description:
        "Understanding the causes, effects, and solutions to climate change",
      content: `**DEFINITION:** Climate change means a big and long-term change in the Earth's weather and temperature. It doesn't just mean one hot day — it means the planet's average temperature is slowly increasing over many years. This is called global warming.

**REASON:** The main reason is the increase of greenhouse gases in the atmosphere.
• Main sources of gas: Burning coal, petrol, and diesel for electricity and transport
• Cutting down trees (deforestation)
• Factories and industries
• Examples: Carbon dioxide (CO₂), Methane (CH₄), Nitrous oxide (N₂O)

**EFFECTS OF CLIMATE CHANGE:**
• Ice in the Arctic and Antarctica is melting
• Sea levels are rising, which can flood coastal areas
• There are more heatwaves, droughts, and floods

**HOW CAN WE STOP CLIMATE CHANGE:**
• Use less electricity — turn off lights when not needed
• Plant trees — they absorb carbon dioxide
• Use public transport or cycle/walk
• Reduce plastic and waste
• Use renewable energy like solar and wind`,
      youtube: "https://www.youtube.com/embed/EtW2rrLHs08",
      duration: "15 minutes",
      difficulty: "Beginner",
      points: 14.28,
      icon: "🌍",
    },
    {
      id: 2,
      title: "Waste Management",
      description:
        "Learn about proper waste disposal, recycling, and reducing waste",
      content: `**WASTE MANAGEMENT** means all the steps we take to collect, transport, treat, recycle, and dispose of waste in a safe way. The main goal is to protect human health and the environment.

**TYPES OF WASTE:**
1. Biodegradable waste - can be broken down by nature (food scraps, paper)
2. Non-biodegradable waste - cannot be broken down naturally (plastic, glass)
3. Hazardous Waste - dangerous to health and environment (batteries, chemicals)
4. E-Waste (Electronic Waste) - old phones, computers, TVs

**IMPORTANCE OF WASTE MANAGEMENT:**
• Keeps our surroundings clean and healthy – Proper waste disposal prevents littering and bad smell
• Reduces pollution – Stops harmful gases, chemicals, and plastics from polluting air, water, and soil
• Protects the environment – Helps maintain a healthy ecosystem for plants, animals, and humans
• Encourages recycling and reuse – Saves raw materials and reduces the need for new resources

**HOW WASTE IS CAUSED:**
• Waste is caused when people use things and throw them away instead of reusing or recycling them
• Everyday activities like cooking, shopping, and working create garbage such as food waste, plastic, paper, and bottles
• Factories also produce waste while making products
• In cities, more people means more garbage from homes, shops`,
      youtube: "https://www.youtube.com/embed/TNMxC4yEibM",
      duration: "12 minutes",
      difficulty: "Beginner",
      points: 14.28,
      icon: "♻️",
    },
    {
      id: 3,
      title: "Biodiversity",
      description: "Explore the variety of life on Earth and why it matters",
      content: `**BIODIVERSITY** refers to the variety and variability of life on Earth. It is not just about the number of species, but also about how these species interact with each other and their environment, and how their genetic differences and ecosystems contribute to the balance of nature.

**IMPORTANCE OF BIODIVERSITY:**
1. **Provides Food and Resources**
   • Plants, animals, and fish give us food, clothes, and materials for daily life
   • Example: Rice, wheat, fruits, cotton, and timber

2. **Maintains Ecosystem Balance**
   • Different species support each other and keep nature healthy
   • Example: Bees pollinate flowers, trees provide oxygen, and predators control prey populations

3. **Helps in Medicine and Research**
   • Many plants and animals are sources of medicines and scientific discoveries
   • Example: Aloe vera, neem, and penicillin from fungi

**HOW TO DEAL WITH BIODIVERSITY LOSS:**
1. **Protect Natural Habitats**
   • Conserve forests, rivers, wetlands, and oceans so animals and plants can survive
   • Example: Create wildlife sanctuaries and national parks

2. **Reduce Pollution**
   • Stop dumping waste in water, air, and soil. Use eco-friendly products

3. **Sustainable Use of Resources**
   • Use natural resources like wood, water, and fish responsibly
   • Avoid overhunting and overfishing`,
      youtube: "https://www.youtube.com/embed/GK_vRtHJZu4",
      duration: "18 minutes",
      difficulty: "Intermediate",
      points: 14.28,
      icon: "🦋",
    },
    {
      id: 4,
      title: "Sustainable Living",
      description:
        "Discover how to live sustainably and reduce your environmental impact",
      content: `**SUSTAINABLE LIVING** means living in a way that meets our needs today without damaging the environment or using up resources needed by future generations. It is about making choices in our daily life that reduce our impact on nature and help the planet stay healthy.

**IMPORTANCE OF SUSTAINABLE LIVING:**
1. **Conserves Natural Resources**
   • Saves water, energy, and raw materials so they are available for future generations

2. **Protects the Environment**
   • Reduces pollution, greenhouse gases, and environmental damage

3. **Fights Climate Change**
   • Using renewable energy and eco-friendly practices lowers carbon emissions

**EXAMPLE: USING SOLAR ENERGY AT HOME**
Instead of using electricity from coal-based power plants, a family installs solar panels on their roof to generate energy from the sun.

**Benefits:**
1. Reduces electricity bills
2. Decreases carbon emissions and air pollution
3. Conserves natural resources like coal and oil
4. Supports a cleaner and healthier environment for the future`,
      youtube: "https://www.youtube.com/embed/PBkmOhOk8nk",
      duration: "20 minutes",
      difficulty: "Intermediate",
      points: 14.28,
      icon: "🌱",
    },
    {
      id: 5,
      title: "Tree Planting",
      description:
        "Learn the importance of trees and how to plant them effectively",
      content: `**TREE PLANTING** is the process of planting and growing trees to improve the environment, restore ecosystems, and benefit humans, animals, and the planet. It is one of the simplest and most effective ways to combat environmental problems like deforestation, climate change, and air pollution.

**IMPORTANCE OF TREE PLANTING:**
1. **Reduces Climate Change**
   • Trees absorb carbon dioxide (CO₂) and store carbon in their trunks, leaves, and roots
   • Trees release oxygen, improving air quality
   • Example: Planting mangroves along coastlines helps absorb CO₂ and protect against rising sea levels

2. **Prevents Soil Erosion**
   • Tree roots hold the soil together, preventing landslides and soil loss
   • Trees reduce surface runoff during heavy rains
   • Example: Afforestation on hillsides prevents landslides in hilly regions

3. **Supports Wildlife and Biodiversity**
   • Trees provide food, shelter, and nesting areas for birds, insects, and animals
   • Protects endangered species by maintaining their natural habitat
   • Example: Forests in India provide homes to tigers, elephants, and many bird species

**BENEFITS OF PLANTING TREES:**
1. **Environmental Benefits**
   • Reduces Climate Change: Trees absorb carbon dioxide (CO₂) and release oxygen
   • Prevents Soil Erosion: Roots hold the soil, preventing floods and landslides
   • Improves Air Quality: Trees filter dust, smoke, and pollutants
   • Conserves Water: Reduce runoff, help groundwater recharge, and maintain rivers and lakes
   • Supports Biodiversity: Provides habitat and food for animals, birds, and insects

2. **Economic Benefits**
   • Provides fruits, timber, fuel, and medicinal plants
   • Supports livelihoods for farmers, gardeners, and forest workers
   • Reduces energy costs by providing shade and cooling urban areas

3. **Social and Health Benefits**
   • Improves mental health and reduces stress by creating green spaces
   • Provides recreational areas in parks, schools, and cities
   • Reduces urban heat and pollution, making cities healthier`,
      youtube: "https://www.youtube.com/embed/-k6j8lqQgTk",
      duration: "16 minutes",
      difficulty: "Beginner",
      points: 14.28,
      icon: "🌳",
    },
    {
      id: 6,
      title: "Plastic Collection Drive",
      description:
        "Organize and participate in community plastic cleanup activities",
      content: `**PLASTIC COLLECTION DRIVE** is a planned activity where a group of people come together to collect, segregate, and manage plastic waste from various areas like streets, parks, schools, beaches, and neighborhoods.

• The main goal is to reduce plastic pollution, protect the environment, and promote awareness about sustainable plastic use
• It is usually organized by schools, colleges, NGOs, community groups, or local authorities

**WHY CONDUCT A PLASTIC COLLECTION DRIVE?**

1. **Reduce Plastic Pollution**
   • Plastic is non-biodegradable and takes hundreds of years to decompose
   • It clogs drains, rivers, and oceans, causing floods and water pollution
   • Collecting plastic prevents it from damaging the environment
   • Example: Removing plastic from a river prevents fish and turtles from getting trapped

2. **Protect Wildlife**
   • Animals and birds often eat plastic or get entangled in it, which can be fatal
   • Collection drives remove plastics from natural habitats, saving lives
   • Example: Sea turtles can survive better if beaches are free from plastic bags

3. **Promote Recycling and Resource Use**
   • Collected plastics can be recycled into new products like bottles, furniture, or bags
   • Reduces the need to produce new plastics, saving energy and resources
   • Example: Plastic bottles collected from a drive can be recycled into reusable containers

**EFFECTS OF A PLASTIC COLLECTION DRIVE:**
1. **Cleaner Environment**
   • Streets, parks, rivers, and public areas become free from plastic litter
   • Improves the overall appearance and hygiene of the community
   • Example: A cleaned school campus or park encourages children to spend time outdoors safely

2. **Reduced Pollution**
   • Prevents plastic from entering soil, water bodies, and oceans
   • Reduces air, water, and land pollution, which improves human and animal health
   • Example: Removing plastic waste from a river prevents contamination and fish deaths`,
      youtube: "https://www.youtube.com/embed/17HC3MMBwxY",
      duration: "14 minutes",
      difficulty: "Intermediate",
      points: 14.28,
      icon: "🗑️",
    },
    {
      id: 7,
      title: "Water Conservation Activity",
      description: "Learn practical ways to conserve water in daily life",
      content: `**WATER CONSERVATION ACTIVITY** is an organized effort to save, manage, and use water efficiently in order to prevent wastage and ensure its availability for future generations.

**OBJECTIVES OF WATER CONSERVATION ACTIVITIES:**
1. **Reduce Wastage of Water** – Ensures every drop is used wisely
2. **Increase Water Availability** – Helps maintain groundwater levels and water in rivers/lakes
3. **Prevent Droughts** – Conserved water can be used in dry seasons

**BENEFITS OF WATER CONSERVATION ACTIVITIES:**
1. **Ensures Availability of Water** – Saves water for drinking, agriculture, and industries
2. **Prevents Droughts and Water Scarcity** – Helps during dry seasons
3. **Protects the Environment** – Maintains rivers, lakes, and groundwater levels

**EXAMPLES OF WATER CONSERVATION ACTIVITIES:**
1. **Rainwater Harvesting**
   • Collecting and storing rainwater for later use
   • Example: Installing a rainwater tank at home or in schools

2. **Fixing Leaks and Wastage**
   • Repairing dripping taps and pipelines
   • Example: Schools checking and fixing leaking taps in bathrooms`,
      youtube: "https://www.youtube.com/embed/nTcFXJT0Fsc",
      duration: "13 minutes",
      difficulty: "Beginner",
      points: 14.28,
      icon: "💧",
    },
  ];

  const handleLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      const lesson = lessons.find((l) => l.id === lessonId);
      addPoints(Math.round(lesson.points));
    }
  };

  const handleVideoWatch = (lessonId) => {
    if (!watchedLessons.includes(lessonId)) {
      setWatchedLessons([...watchedLessons, lessonId]);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-400/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-400/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-400/30";
    }
  };

  const renderContent = (content) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h4
            key={index}
            className="text-lg font-display font-bold text-green-400 mt-4"
          >
            {line.replace(/\*\*/g, "")}
          </h4>
        );
      } else if (line.startsWith("•")) {
        return (
          <p key={index} className="ml-4 text-white/90">
            {line}
          </p>
        );
      } else if (line.trim() === "") {
        return <br key={index} />;
      } else {
        return (
          <p key={index} className="text-white/80">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-green-900">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              <img
                src="/src/pages/Assets/based-on-eco-learn-make-logo.jpg"
                alt="Eco Learn Logo"
                className="w-10 h-10 rounded-full object-cover hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/40x40/10b981/ffffff?text=EL";
                }}
              />
              <div>
                <h1 className="text-xl font-heading font-bold text-white">
                  Interactive Lessons
                </h1>
                <p className="text-sm text-white/60">
                  Learn environmental science with videos
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-body font-medium">
                  {getCurrentLevel().icon} {getCurrentLevel().name}
                </p>
                <p className="text-green-400 text-sm">
                  {completedLessons.length}/{lessons.length} completed
                </p>
              </div>
              <CapsuleButton
                variant="outline"
                onClick={() => (window.location.href = "/student")}
                promptMessage="Back to Dashboard! 📊"
              >
                Dashboard
              </CapsuleButton>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-5xl font-heading font-bold text-white mb-4">
            📚 Interactive Lessons
          </h1>
          <p className="text-xl text-white/80 font-body max-w-3xl mx-auto">
            Dive deep into environmental science with our comprehensive video
            lessons. Each lesson includes detailed content, embedded videos, and
            the opportunity to earn points!
          </p>
        </div>

        {/* Progress Overview */}
        <div
          className="max-w-4xl mx-auto mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-white">
                Progress Overview
              </h2>
              <span className="text-green-400 font-bold">
                {Math.round((completedLessons.length / lessons.length) * 100)}%
                Complete
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${(completedLessons.length / lessons.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-white/70 font-body text-sm mt-2">
              Complete all lessons to unlock special achievements and maximize
              your eco points!
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-heading font-bold text-white mb-6 animate-fade-in-up">
              Lesson Library
            </h2>
            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`glass p-4 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-glow animate-fade-in-up ${
                    selectedLesson?.id === lesson.id
                      ? "ring-2 ring-green-400 bg-green-400/10"
                      : ""
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{lesson.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-heading font-bold">
                        Lesson {lesson.id}: {lesson.title}
                      </h3>
                      <p className="text-white/60 text-sm font-body">
                        {lesson.duration} • {lesson.difficulty}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        {completedLessons.includes(lesson.id) && (
                          <span className="text-green-400 text-sm">
                            ✅ Completed
                          </span>
                        )}
                        {watchedLessons.includes(lesson.id) && (
                          <span className="text-blue-400 text-sm">
                            👁️ Watched
                          </span>
                        )}
                        <span className="text-yellow-400 text-sm">
                          ⭐ {lesson.points} pts
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="animate-fade-in-up">
                {/* Video Player - Always Visible */}
                <div className="glass p-6 rounded-2xl mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="text-3xl">{selectedLesson.icon}</div>
                    <div>
                      <h2 className="text-2xl font-heading font-bold text-white">
                        {selectedLesson.title}
                      </h2>
                      <p className="text-white/70 font-body">
                        {selectedLesson.description}
                      </p>
                    </div>
                  </div>

                  <div className="aspect-video rounded-xl overflow-hidden bg-black">
                    <iframe
                      src={selectedLesson.youtube}
                      title={selectedLesson.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      onLoad={() => handleVideoWatch(selectedLesson.id)}
                    ></iframe>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(
                          selectedLesson.difficulty
                        )}`}
                      >
                        {selectedLesson.difficulty}
                      </span>
                      <span className="text-white/70 text-sm">
                        ⏱️ {selectedLesson.duration}
                      </span>
                      <span className="text-yellow-400 text-sm">
                        ⭐ {selectedLesson.points} points
                      </span>
                    </div>
                    <CapsuleButton
                      variant={
                        completedLessons.includes(selectedLesson.id)
                          ? "outline"
                          : "primary"
                      }
                      onClick={() => handleLessonComplete(selectedLesson.id)}
                      promptMessage={
                        completedLessons.includes(selectedLesson.id)
                          ? "Already Completed! ✅"
                          : `Earned ${selectedLesson.points} points! ⭐`
                      }
                    >
                      {completedLessons.includes(selectedLesson.id)
                        ? "Completed ✅"
                        : "Mark Complete"}
                    </CapsuleButton>
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-xl font-heading font-bold text-white mb-4 flex items-center">
                    <span className="mr-2">📖</span>
                    Lesson Content
                  </h3>
                  <div className="prose prose-invert max-w-none">
                    {renderContent(selectedLesson.content)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass p-12 rounded-2xl text-center animate-fade-in-up">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-heading font-bold text-white mb-4">
                  Select a Lesson to Begin
                </h2>
                <p className="text-white/70 font-body">
                  Choose any lesson from the library to start learning about
                  environmental science and sustainability!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Completion Celebration */}
        {completedLessons.length === lessons.length && (
          <div className="max-w-2xl mx-auto mt-12 animate-fade-in-up">
            <div className="glass p-8 rounded-2xl text-center border-2 border-green-400/50">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                Congratulations!
              </h2>
              <p className="text-xl text-white/80 font-body mb-6">
                You've completed all interactive lessons! You're now an Eco
                Expert!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CapsuleButton
                  variant="primary"
                  onClick={() => (window.location.href = "/quiz")}
                  promptMessage="Taking Quiz! 🧠"
                >
                  Take Quiz
                </CapsuleButton>
                <CapsuleButton
                  variant="outline"
                  onClick={() => (window.location.href = "/challenges")}
                  promptMessage="Exploring Challenges! 🎯"
                >
                  Try Challenges
                </CapsuleButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
