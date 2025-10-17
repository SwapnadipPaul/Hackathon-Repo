import { useState } from "react";
import { usePoints } from "../contexts/PointsContext";
import CapsuleButton from "../components/CapsuleButton";
import PointsDisplay from "../components/PointsDisplay";

export default function RealworldProjects() {
  const { addPoints, getCurrentLevel } = usePoints();
  const [joinedProjects, setJoinedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const projects = [
    {
      id: 1,
      title: "The Urban Reforestation & Habitat Restoration Project",
      shortDescription:
        "Transform urban spaces into green habitats for wildlife and communities.",
      detailedDescription:
        "This comprehensive project focuses on creating green corridors in urban areas to restore natural habitats while improving air quality and providing recreational spaces for communities. Participants will work with local authorities, environmental organizations, and community groups to identify suitable locations for tree planting, native species restoration, and habitat creation.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdhNXM2Zjbcbn6XyCdgw8pcSuPRMxcGbQfYg&s",
      points: 100,
      duration: "6 months",
      difficulty: "Advanced",
      category: "Reforestation",
      icon: "🌳",
      color: "green",
      objectives: [
        "Plant 1000+ native trees across urban areas",
        "Create 5 wildlife habitat corridors",
        "Restore 2 degraded urban ecosystems",
        "Engage 500+ community volunteers",
        "Establish long-term maintenance programs",
      ],
      activities: [
        "Site assessment and planning",
        "Native species selection and procurement",
        "Community outreach and education",
        "Tree planting and establishment",
        "Wildlife habitat creation",
        "Monitoring and maintenance",
        "Data collection and reporting",
      ],
      requirements: [
        "Commitment to 6-month project duration",
        "Ability to work outdoors in various weather conditions",
        "Basic knowledge of native plant species (training provided)",
        "Access to transportation to project sites",
        "Willingness to work with diverse community groups",
      ],
      benefits: [
        "Direct contribution to urban reforestation",
        "Hands-on experience in habitat restoration",
        "Networking with environmental professionals",
        "Leadership and project management skills",
        "Environmental impact measurement experience",
      ],
      timeline: [
        "Month 1-2: Site assessment and planning",
        "Month 3-4: Community engagement and preparation",
        "Month 5-6: Implementation and monitoring",
      ],
      impact:
        "This project will restore approximately 10 acres of urban green space, plant over 1000 native trees, and create vital wildlife corridors that will benefit local ecosystems for decades to come.",
    },
    {
      id: 2,
      title: "The Sustainable Upcycled Product & Awareness Project",
      shortDescription:
        "Create innovative products from waste materials while raising environmental awareness.",
      detailedDescription:
        "This innovative project combines creativity with environmental action by transforming waste materials into useful, beautiful products. Participants will learn upcycling techniques, design sustainable products, and create awareness campaigns about waste reduction. The project includes workshops, product development, and community education initiatives.",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Ezh8zldjLItWXMhPwW-zYSDLf8wdPQOWhg&s",
      points: 100,
      duration: "4 months",
      difficulty: "Medium",
      category: "Waste Reduction",
      icon: "♻️",
      color: "blue",
      objectives: [
        "Create 50+ unique upcycled products",
        "Divert 500+ kg of waste from landfills",
        "Conduct 10 community workshops",
        "Develop 5 product lines from different waste materials",
        "Create awareness materials reaching 1000+ people",
      ],
      activities: [
        "Waste material collection and sorting",
        "Upcycling technique workshops",
        "Product design and development",
        "Community education sessions",
        "Awareness campaign creation",
        "Product exhibition and sales",
        "Impact measurement and reporting",
      ],
      requirements: [
        "Creativity and willingness to work with various materials",
        "Basic crafting skills (training provided)",
        "Commitment to attend regular workshops",
        "Ability to work in team settings",
        "Interest in waste reduction and sustainability",
      ],
      benefits: [
        "Learn valuable upcycling and crafting skills",
        "Contribute to waste reduction efforts",
        "Develop entrepreneurial skills",
        "Network with like-minded environmentalists",
        "Create portfolio of sustainable products",
      ],
      timeline: [
        "Month 1: Workshop training and material collection",
        "Month 2-3: Product development and creation",
        "Month 4: Awareness campaigns and exhibitions",
      ],
      impact:
        "This project will divert over 500 kg of waste from landfills, create awareness about sustainable living among 1000+ community members, and establish a model for waste-to-product initiatives.",
    },
    {
      id: 3,
      title: "The Community Water-Saving Infrastructure Project",
      shortDescription:
        "Design and implement water conservation systems for community buildings.",
      detailedDescription:
        "This technical project focuses on implementing water-saving infrastructure in community buildings such as schools, community centers, and public facilities. Participants will work with engineers and community leaders to assess water usage, design conservation systems, and implement solutions that reduce water consumption while maintaining functionality.",
      imageUrl:
        "https://gdiengdesign.com/wp-content/uploads/2023/10/Sustainable-Water-Conservation.jpg",
      points: 100,
      duration: "5 months",
      difficulty: "Advanced",
      category: "Water Conservation",
      icon: "💧",
      color: "cyan",
      objectives: [
        "Reduce water consumption by 30% in 5 community buildings",
        "Install rainwater harvesting systems in 3 locations",
        "Implement greywater recycling in 2 facilities",
        "Educate 200+ community members on water conservation",
        "Create a replicable water-saving model",
      ],
      activities: [
        "Water usage assessment and analysis",
        "Infrastructure design and planning",
        "System installation and testing",
        "Community education and training",
        "Monitoring and data collection",
        "Performance evaluation and optimization",
        "Documentation and knowledge sharing",
      ],
      requirements: [
        "Interest in engineering and technical solutions",
        "Ability to work with tools and equipment (training provided)",
        "Commitment to long-term project involvement",
        "Good communication skills for community engagement",
        "Willingness to work in various weather conditions",
      ],
      benefits: [
        "Learn water conservation engineering principles",
        "Gain hands-on experience with green infrastructure",
        "Develop technical problem-solving skills",
        "Make measurable environmental impact",
        "Build relationships with community leaders",
      ],
      timeline: [
        "Month 1: Assessment and design phase",
        "Month 2-3: Installation and implementation",
        "Month 4-5: Monitoring and optimization",
      ],
      impact:
        "This project will save approximately 2 million liters of water annually across community buildings, establish sustainable water management practices, and serve as a model for other communities.",
    },
    {
      id: 4,
      title: "The Community Composting & Waste Diversion Project",
      shortDescription:
        "Establish community composting systems to reduce organic waste and create valuable soil amendments.",
      detailedDescription:
        "This community-focused project establishes composting systems to divert organic waste from landfills while creating valuable soil amendments for local gardens and farms. Participants will work with households, restaurants, and community gardens to set up and maintain composting operations, educate the community about waste diversion, and create a sustainable organic waste management system.",
      imageUrl:
        "https://eu-images.contentstack.com/v3/assets/blt4a147f9e36f0754a/blt5fedd00eece8c0fe/6720cc2a2ab52ddc80ad71ef/composting2feat.png?width=1280&auto=webp&quality=80&format=jpg&disable=upscale",
      points: 100,
      duration: "4 months",
      difficulty: "Medium",
      category: "Waste Management",
      icon: "🌱",
      color: "green",
      objectives: [
        "Divert 1000+ kg of organic waste from landfills",
        "Establish 10 community composting sites",
        "Engage 100+ households in composting programs",
        "Produce 500+ kg of high-quality compost",
        "Create educational materials for waste reduction",
      ],
      activities: [
        "Site selection and composting system design",
        "Community outreach and recruitment",
        "Composting system installation and setup",
        "Training workshops for participants",
        "Regular monitoring and maintenance",
        "Compost quality testing and improvement",
        "Distribution and application of finished compost",
      ],
      requirements: [
        "Interest in gardening and soil health",
        "Ability to work outdoors in various conditions",
        "Good organizational and communication skills",
        "Willingness to work with organic materials",
        "Commitment to regular maintenance activities",
      ],
      benefits: [
        "Learn advanced composting techniques",
        "Contribute to waste reduction and soil health",
        "Develop community organizing skills",
        "Gain experience in sustainable agriculture",
        "Create lasting environmental infrastructure",
      ],
      timeline: [
        "Month 1: Planning and site preparation",
        "Month 2: System installation and training",
        "Month 3-4: Operation and monitoring",
      ],
      impact:
        "This project will divert over 1000 kg of organic waste from landfills, produce valuable compost for local gardens, and establish a sustainable model for community-based waste management.",
    },
    {
      id: 5,
      title: "The School Eco-Audit & Sustainable Upgrade Project",
      shortDescription:
        "Conduct comprehensive environmental audits of schools and implement sustainable improvements.",
      detailedDescription:
        "This educational project involves conducting comprehensive environmental audits of local schools and implementing sustainable upgrades based on the findings. Participants will work with school administrators, students, and teachers to assess energy usage, waste management, water consumption, and other environmental factors, then design and implement improvements that make schools more sustainable while serving as educational tools.",
      imageUrl:
        "https://varthana.com/school/wp-content/uploads/2024/10/building-sustainable-schools-eco-friendly-practices-for-a-greener-future.jpg",
      points: 100,
      duration: "5 months",
      difficulty: "Advanced",
      category: "Sustainability",
      icon: "🏫",
      color: "purple",
      objectives: [
        "Audit 5 schools for environmental performance",
        "Implement 20+ sustainable improvements",
        "Reduce school energy consumption by 25%",
        "Engage 500+ students in environmental education",
        "Create replicable school sustainability model",
      ],
      activities: [
        "Comprehensive environmental audits",
        "Data analysis and improvement planning",
        "Sustainable technology installation",
        "Student and teacher education programs",
        "Behavior change campaigns",
        "Performance monitoring and evaluation",
        "Documentation and knowledge sharing",
      ],
      requirements: [
        "Interest in education and environmental science",
        "Good analytical and problem-solving skills",
        "Ability to work with diverse age groups",
        "Commitment to long-term project involvement",
        "Willingness to work in school environments",
      ],
      benefits: [
        "Learn environmental auditing techniques",
        "Gain experience in educational program development",
        "Develop project management and leadership skills",
        "Make measurable impact on school sustainability",
        "Build relationships with educational professionals",
      ],
      timeline: [
        "Month 1-2: Audit and analysis phase",
        "Month 3-4: Implementation and education",
        "Month 5: Monitoring and documentation",
      ],
      impact:
        "This project will improve the environmental performance of 5 schools, engage 500+ students in sustainability education, and create a model for school environmental improvement that can be replicated nationwide.",
    },
  ];

  const handleJoinProject = (projectId) => {
    if (!joinedProjects.includes(projectId)) {
      setJoinedProjects([...joinedProjects, projectId]);
      const project = projects.find((p) => p.id === projectId);
      addPoints(Math.round(project.points));
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500/20 text-green-400 border-green-400/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-400/30";
      case "Advanced":
        return "bg-red-500/20 text-red-400 border-red-400/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-400/30";
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      green: "from-green-400 to-green-600",
      blue: "from-blue-400 to-blue-600",
      cyan: "from-cyan-400 to-cyan-600",
      purple: "from-purple-400 to-purple-600",
    };
    return colors[color] || "from-blue-400 to-blue-600";
  };

  const totalPoints = projects.reduce(
    (sum, project) =>
      sum + (joinedProjects.includes(project.id) ? project.points : 0),
    0
  );

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
                  Real World Projects
                </h1>
                <p className="text-sm text-white/60">
                  Make a real environmental impact
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-body font-medium">
                  {getCurrentLevel().icon} {getCurrentLevel().name}
                </p>
                <p className="text-green-400 text-sm">
                  {totalPoints} project points
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
            🌱 Real World Projects
          </h1>
          <p className="text-xl text-white/80 font-body max-w-3xl mx-auto">
            Join hands-on environmental projects that make a real difference in
            your community. These projects combine learning with action to
            create lasting environmental impact.
          </p>
        </div>

        {/* Points Display */}
        <div className="max-w-4xl mx-auto mb-8">
          <PointsDisplay />
        </div>

        {/* Progress Overview */}
        <div
          className="max-w-4xl mx-auto mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="glass p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-heading font-bold text-white">
                Project Progress
              </h2>
              <span className="text-green-400 font-bold">
                {joinedProjects.length}/{projects.length} Joined
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${(joinedProjects.length / projects.length) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-white/70 font-body text-sm mt-2">
              Join these impactful projects to make a real difference in your
              community and earn valuable experience!
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`glass p-6 rounded-2xl hover:shadow-glow transition-all duration-300 animate-fade-in-up ${
                joinedProjects.includes(project.id)
                  ? "ring-2 ring-green-400 bg-green-400/5"
                  : ""
              }`}
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x225/10b981/ffffff?text=Project+Image";
                  }}
                />
              </div>

              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{project.icon}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                        project.difficulty
                      )}`}
                    >
                      {project.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/70 font-body text-sm mb-3">
                    {project.shortDescription}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-yellow-400">
                      ⭐ {project.points} pts
                    </span>
                    <span className="text-white/60">⏱️ {project.duration}</span>
                    <span className="text-blue-400">🏷️ {project.category}</span>
                  </div>
                </div>
                {joinedProjects.includes(project.id) && (
                  <div className="text-green-400 text-2xl ml-4">✅</div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2">
                <CapsuleButton
                  variant={
                    joinedProjects.includes(project.id) ? "outline" : "primary"
                  }
                  onClick={() => handleJoinProject(project.id)}
                  promptMessage={
                    joinedProjects.includes(project.id)
                      ? "Already Submitted! ✅"
                      : `Submitted ${project.title}! 🌱`
                  }
                  className="w-full"
                >
                  {joinedProjects.includes(project.id)
                    ? "Submitted ✅"
                    : "Submit Project"}
                </CapsuleButton>
                <CapsuleButton
                  variant="outline"
                  onClick={() => {
                    setSelectedProject(project);
                    setShowDetails(true);
                  }}
                  promptMessage="Viewing Project Details! 📋"
                  className="w-full"
                  size="sm"
                >
                  View Details
                </CapsuleButton>
              </div>
            </div>
          ))}
        </div>

        {/* Completion Celebration */}
        {joinedProjects.length === projects.length && (
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <div className="glass p-8 rounded-2xl text-center border-2 border-green-400/50">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                Environmental Champion!
              </h2>
              <p className="text-xl text-white/80 font-body mb-6">
                Congratulations! You've joined all real-world projects and are
                making a significant environmental impact!
              </p>
              <div className="bg-green-400/10 p-4 rounded-xl border border-green-400/20 mb-6">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  🏆 500 Points Earned!
                </div>
                <p className="text-white/70 font-body text-sm">
                  You're now an official Environmental Champion!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CapsuleButton
                  variant="primary"
                  onClick={() => (window.location.href = "/leaderboard")}
                  promptMessage="Viewing Leaderboard! 📊"
                >
                  View Leaderboard
                </CapsuleButton>
                <CapsuleButton
                  variant="outline"
                  onClick={() => (window.location.href = "/lessons")}
                  promptMessage="Learning More! 📚"
                >
                  Continue Learning
                </CapsuleButton>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      {showDetails && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="glass p-8 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedProject.icon}</span>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-white">
                    {selectedProject.title}
                  </h2>
                  <p className="text-white/60 font-body">
                    {selectedProject.points} points • {selectedProject.duration}{" "}
                    • {selectedProject.category}
                  </p>
                </div>
              </div>
              <CapsuleButton
                variant="outline"
                onClick={() => setShowDetails(false)}
                promptMessage="Closing Details! ❌"
                size="sm"
              >
                ✕
              </CapsuleButton>
            </div>

            {/* Project Image */}
            <div className="aspect-video rounded-xl overflow-hidden mb-6">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/600x300/10b981/ffffff?text=Project+Image";
                }}
              />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-3">
                    Project Description
                  </h3>
                  <p className="text-white/80 font-body leading-relaxed">
                    {selectedProject.detailedDescription}
                  </p>
                </div>

                {/* Objectives */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-3">
                    Objectives
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.objectives.map((objective, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-white/80 font-body"
                      >
                        <span className="bg-green-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-3">
                    Timeline
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.timeline.map((phase, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-white/80 font-body"
                      >
                        <span className="bg-blue-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold mt-0.5">
                          {index + 1}
                        </span>
                        <span>{phase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Activities */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-3">
                    Key Activities
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.activities.map((activity, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-white/80 font-body"
                      >
                        <span className="text-purple-400 mt-1">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.requirements.map((requirement, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-white/80 font-body"
                      >
                        <span className="text-yellow-400 mt-1">✓</span>
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-3">
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {selectedProject.benefits.map((benefit, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-white/80 font-body"
                      >
                        <span className="text-green-400 mt-1">★</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Impact */}
                <div>
                  <h3 className="text-lg font-heading font-bold text-white mb-3">
                    Expected Impact
                  </h3>
                  <p className="text-white/80 font-body leading-relaxed">
                    {selectedProject.impact}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
              <CapsuleButton
                variant={
                  joinedProjects.includes(selectedProject.id)
                    ? "outline"
                    : "primary"
                }
                onClick={() => {
                  handleJoinProject(selectedProject.id);
                  setShowDetails(false);
                }}
                promptMessage={
                  joinedProjects.includes(selectedProject.id)
                    ? "Already Joined! ✅"
                    : `Joined ${selectedProject.title}! 🌱`
                }
                className="flex-1"
              >
                {joinedProjects.includes(selectedProject.id)
                  ? "Joined ✅"
                  : "Join Project"}
              </CapsuleButton>
              <CapsuleButton
                variant="outline"
                onClick={() => setShowDetails(false)}
                promptMessage="Closing Details! ❌"
                className="flex-1"
              >
                Close
              </CapsuleButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
