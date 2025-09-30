import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Star, Share2, ArrowLeft } from "lucide-react";

// Subject configurations
const subjectConfig = {
  mathematics: {
    name: "Mathematics",
    icon: "📐",
    color: "from-green-500 to-blue-600",
    bgColor: "bg-gradient-to-br from-green-50 via-blue-50 to-teal-50",
    animatedNumbers: ["2", "0", "8", "6", "4", "9", "∑", "π", "∞"],
    units: [
      { id: 1, name: "Arithmetic", progress: 85, bgColor: "bg-blue-50", borderColor: "border-blue-200" },
      { id: 2, name: "Geometry", progress: 60, bgColor: "bg-green-50", borderColor: "border-green-200" },
      { id: 3, name: "Statistics", progress: 40, bgColor: "bg-purple-50", borderColor: "border-purple-200" },
      { id: 4, name: "Algebra", progress: 20, bgColor: "bg-orange-50", borderColor: "border-orange-200" }
    ],
    chapters: [
      { id: "1.1", name: "Knowing Our Numbers" },
      { id: "1.2", name: "Whole Numbers" },
      { id: "1.3", name: "Playing with Numbers" },
      { id: "1.4", name: "Integers" },
      { id: "1.5", name: "Fractions" },
      { id: "1.6", name: "Decimals" },
      { id: "1.7", name: "Ratio and Proportions" },
      { id: "1.8", name: "Percentage" }
    ],
    topics: [
      { id: "1.1.1", name: "Comparing Large Numbers" },
      { id: "1.1.2", name: "International System of Numeration" },
      { id: "1.1.3", name: "Large Numbers in Practice" },
      { id: "1.1.4", name: "Estimation of Large Numbers" },
      { id: "1.1.5", name: "Simplification by Using Brackets" },
      { id: "1.1.6", name: "Roman Numerals" }
    ]
  },
  science: {
    name: "Science",
    icon: "🧪",
    color: "from-blue-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50",
    animatedNumbers: ["H", "O", "C", "N", "6", "2", "O₂", "CO₂", "H₂O"],
    units: [
      { id: 1, name: "Physics", progress: 70, bgColor: "bg-blue-50", borderColor: "border-blue-200" },
      { id: 2, name: "Chemistry", progress: 55, bgColor: "bg-green-50", borderColor: "border-green-200" },
      { id: 3, name: "Biology", progress: 80, bgColor: "bg-purple-50", borderColor: "border-purple-200" },
      { id: 4, name: "Earth Science", progress: 45, bgColor: "bg-orange-50", borderColor: "border-orange-200" }
    ],
    chapters: [
      { id: "1.1", name: "Light and Shadow" },
      { id: "1.2", name: "Electricity and Circuits" },
      { id: "1.3", name: "Fun with Magnets" },
      { id: "1.4", name: "Water" },
      { id: "1.5", name: "Air Around Us" },
      { id: "1.6", name: "Garbage In, Garbage Out" },
      { id: "1.7", name: "Getting to Know Plants" },
      { id: "1.8", name: "Body Movements" }
    ],
    topics: [
      { id: "1.1.1", name: "Sources of Light" },
      { id: "1.1.2", name: "Transparent, Opaque and Translucent" },
      { id: "1.1.3", name: "Shadows" },
      { id: "1.1.4", name: "Pinhole Camera" },
      { id: "1.1.5", name: "Mirrors and Reflections" },
      { id: "1.1.6", name: "Sunlight - White or Coloured?" }
    ]
  },
  physics: {
    name: "Physics",
    icon: "⚛️",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50",
    animatedNumbers: ["F", "m", "a", "E", "=", "mc²", "v", "λ", "ν"],
    units: [
      { id: 1, name: "Mechanics", progress: 75, bgColor: "bg-blue-50", borderColor: "border-blue-200" },
      { id: 2, name: "Heat & Thermodynamics", progress: 50, bgColor: "bg-red-50", borderColor: "border-red-200" },
      { id: 3, name: "Waves & Optics", progress: 65, bgColor: "bg-purple-50", borderColor: "border-purple-200" },
      { id: 4, name: "Electricity & Magnetism", progress: 40, bgColor: "bg-yellow-50", borderColor: "border-yellow-200" }
    ],
    chapters: [
      { id: "1.1", name: "Motion in a Straight Line" },
      { id: "1.2", name: "Motion in a Plane" },
      { id: "1.3", name: "Laws of Motion" },
      { id: "1.4", name: "Work, Energy and Power" },
      { id: "1.5", name: "System of Particles" },
      { id: "1.6", name: "Rotational Motion" },
      { id: "1.7", name: "Gravitation" },
      { id: "1.8", name: "Mechanical Properties" }
    ],
    topics: [
      { id: "1.1.1", name: "Position and Displacement" },
      { id: "1.1.2", name: "Velocity and Speed" },
      { id: "1.1.3", name: "Acceleration" },
      { id: "1.1.4", name: "Kinematic Equations" },
      { id: "1.1.5", name: "Relative Velocity" },
      { id: "1.1.6", name: "Graphical Analysis" }
    ]
  },
  english: {
    name: "English Literature",
    icon: "📚",
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50",
    animatedNumbers: ["A", "B", "C", "&", "?", "!", ".", ",", "'"],
    units: [
      { id: 1, name: "Prose", progress: 90, bgColor: "bg-blue-50", borderColor: "border-blue-200" },
      { id: 2, name: "Poetry", progress: 75, bgColor: "bg-green-50", borderColor: "border-green-200" },
      { id: 3, name: "Drama", progress: 60, bgColor: "bg-purple-50", borderColor: "border-purple-200" },
      { id: 4, name: "Grammar", progress: 85, bgColor: "bg-orange-50", borderColor: "border-orange-200" }
    ],
    chapters: [
      { id: "1.1", name: "A Tale of Two Birds" },
      { id: "1.2", name: "The Friendly Mongoose" },
      { id: "1.3", name: "The Shepherd's Treasure" },
      { id: "1.4", name: "The Old-Clock Shop" },
      { id: "1.5", name: "Tansen" },
      { id: "1.6", name: "The Monkey and the Crocodile" },
      { id: "1.7", name: "The Wonder Called Sleep" },
      { id: "1.8", name: "A Pact with the Sun" }
    ],
    topics: [
      { id: "1.1.1", name: "Character Analysis" },
      { id: "1.1.2", name: "Plot Development" },
      { id: "1.1.3", name: "Moral Lessons" },
      { id: "1.1.4", name: "Vocabulary Building" },
      { id: "1.1.5", name: "Reading Comprehension" },
      { id: "1.1.6", name: "Creative Writing" }
    ]
  },
  history: {
    name: "History",
    icon: "🏛️",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50",
    animatedNumbers: ["1", "9", "4", "7", "B", "C", "A", "D", "🏺"],
    units: [
      { id: 1, name: "Ancient India", progress: 80, bgColor: "bg-amber-50", borderColor: "border-amber-200" },
      { id: 2, name: "Medieval India", progress: 65, bgColor: "bg-orange-50", borderColor: "border-orange-200" },
      { id: 3, name: "Modern India", progress: 70, bgColor: "bg-red-50", borderColor: "border-red-200" },
      { id: 4, name: "World History", progress: 55, bgColor: "bg-yellow-50", borderColor: "border-yellow-200" }
    ],
    chapters: [
      { id: "1.1", name: "What, Where, How and When?" },
      { id: "1.2", name: "From Hunting-Gathering to Growing Food" },
      { id: "1.3", name: "In the Earliest Cities" },
      { id: "1.4", name: "What Books and Burials Tell Us" },
      { id: "1.5", name: "Kingdoms, Kings and an Early Republic" },
      { id: "1.6", name: "New Questions and Ideas" },
      { id: "1.7", name: "Ashoka, the Emperor Who Gave Up War" },
      { id: "1.8", name: "Vital Villages, Thriving Towns" }
    ],
    topics: [
      { id: "1.1.1", name: "Sources of History" },
      { id: "1.1.2", name: "Timelines and Chronology" },
      { id: "1.1.3", name: "Archaeological Evidence" },
      { id: "1.1.4", name: "Written Records" },
      { id: "1.1.5", name: "Maps and Geography" },
      { id: "1.1.6", name: "Cultural Heritage" }
    ]
  },
  geography: {
    name: "Geography",
    icon: "🌍",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50",
    animatedNumbers: ["°", "N", "S", "E", "W", "🌊", "⛰️", "🏔️", "🗺️"],
    units: [
      { id: 1, name: "Physical Geography", progress: 70, bgColor: "bg-green-50", borderColor: "border-green-200" },
      { id: 2, name: "Human Geography", progress: 60, bgColor: "bg-blue-50", borderColor: "border-blue-200" },
      { id: 3, name: "Environmental Geography", progress: 75, bgColor: "bg-emerald-50", borderColor: "border-emerald-200" },
      { id: 4, name: "Regional Geography", progress: 50, bgColor: "bg-teal-50", borderColor: "border-teal-200" }
    ],
    chapters: [
      { id: "1.1", name: "The Earth in the Solar System" },
      { id: "1.2", name: "Globe: Latitudes and Longitudes" },
      { id: "1.3", name: "Motions of the Earth" },
      { id: "1.4", name: "Maps" },
      { id: "1.5", name: "Major Domains of the Earth" },
      { id: "1.6", name: "Major Landforms of the Earth" },
      { id: "1.7", name: "Our Country - India" },
      { id: "1.8", name: "India: Climate, Vegetation and Wildlife" }
    ],
    topics: [
      { id: "1.1.1", name: "Solar System Components" },
      { id: "1.1.2", name: "Earth's Position" },
      { id: "1.1.3", name: "Celestial Bodies" },
      { id: "1.1.4", name: "Day and Night" },
      { id: "1.1.5", name: "Seasons" },
      { id: "1.1.6", name: "Moon Phases" }
    ]
  }
};

const explainersData = {
  mathematics: [
    {
      id: 1,
      title: "Decimal Place Value",
      description: "Place value tells the positioning of each number. In this video, we use a decimal point and learn how to find the place value. Watch this video to learn more.",
      duration: "3 min 29 secs",
      thumbnail: "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
    },
    {
      id: 2,
      title: "Introducing the Number: 1000",
      description: "Do you know what the smallest four-digit number is? Here, we introduce the numbers beyond 999. Watch this video carefully and to learn something new and interesting.",
      duration: "2 min 47 secs",
      thumbnail: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500"
    },
    {
      id: 3,
      title: "Place Value of Numbers",
      description: "The abacus is a time-tested calculating tool. Widely used to place numbers and make calculations.",
      duration: "4 min 12 secs",
      thumbnail: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500"
    }
  ],
  science: [
    {
      id: 1,
      title: "Light and Shadows",
      description: "Explore how light travels and creates shadows. Learn about transparent, opaque, and translucent objects through engaging experiments.",
      duration: "4 min 15 secs",
      thumbnail: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500"
    },
    {
      id: 2,
      title: "Simple Circuits",
      description: "Build your first electric circuit and understand how electricity flows through different materials and components.",
      duration: "5 min 32 secs",
      thumbnail: "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Plant Parts and Functions",
      description: "Discover the different parts of plants and how each part helps the plant survive and grow in its environment.",
      duration: "3 min 48 secs",
      thumbnail: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500"
    }
  ],
  physics: [
    {
      id: 1,
      title: "Motion in One Dimension",
      description: "Understanding position, velocity, and acceleration through real-world examples and graphical representations.",
      duration: "6 min 22 secs",
      thumbnail: "bg-gradient-to-br from-purple-400 via-pink-500 to-red-500"
    },
    {
      id: 2,
      title: "Newton's Laws of Motion",
      description: "Explore the fundamental laws that govern motion and understand force, mass, and acceleration relationships.",
      duration: "7 min 15 secs",
      thumbnail: "bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500"
    },
    {
      id: 3,
      title: "Energy Conservation",
      description: "Learn about kinetic and potential energy and how energy transforms from one form to another.",
      duration: "5 min 44 secs",
      thumbnail: "bg-gradient-to-br from-orange-400 via-yellow-500 to-lime-500"
    }
  ],
  english: [
    {
      id: 1,
      title: "Character Development",
      description: "Learn how authors create memorable characters and analyze their motivations, conflicts, and growth throughout stories.",
      duration: "4 min 33 secs",
      thumbnail: "bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-500"
    },
    {
      id: 2,
      title: "Poetry Analysis",
      description: "Understand rhyme, rhythm, and literary devices that make poetry beautiful and meaningful.",
      duration: "3 min 51 secs",
      thumbnail: "bg-gradient-to-br from-pink-400 via-rose-500 to-red-500"
    },
    {
      id: 3,
      title: "Grammar Essentials",
      description: "Master the building blocks of language including parts of speech, sentence structure, and punctuation.",
      duration: "5 min 18 secs",
      thumbnail: "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500"
    }
  ],
  history: [
    {
      id: 1,
      title: "Archaeological Evidence",
      description: "Discover how archaeologists uncover the past through artifacts, tools, and ancient structures.",
      duration: "4 min 41 secs",
      thumbnail: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-500"
    },
    {
      id: 2,
      title: "Ancient Civilizations",
      description: "Explore the rise and fall of great civilizations and their contributions to human progress.",
      duration: "6 min 28 secs",
      thumbnail: "bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500"
    },
    {
      id: 3,
      title: "Timeline of Events",
      description: "Learn to organize historical events chronologically and understand cause and effect relationships.",
      duration: "3 min 56 secs",
      thumbnail: "bg-gradient-to-br from-red-400 via-pink-500 to-purple-500"
    }
  ],
  geography: [
    {
      id: 1,
      title: "Solar System Basics",
      description: "Journey through space to understand Earth's place in the solar system and what makes our planet unique.",
      duration: "5 min 12 secs",
      thumbnail: "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-500"
    },
    {
      id: 2,
      title: "Latitude and Longitude",
      description: "Master the coordinate system that helps us locate any place on Earth with precision.",
      duration: "4 min 35 secs",
      thumbnail: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500"
    },
    {
      id: 3,
      title: "Climate and Weather",
      description: "Understand the difference between climate and weather and the factors that influence both.",
      duration: "6 min 02 secs",
      thumbnail: "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500"
    }
  ]
};

const Subjects = () => {
  const { bookId, subject } = useParams<{ bookId: string; subject: string }>();
  const navigate = useNavigate();
  const [activeItems, setActiveItems] = useState<{ [key: string]: string }>({
    units: "1",
    chapters: "1.1",
    topics: "1.1.1",
    explainers: "1"
  });

  // Get subject configuration
  const currentSubject = subject && subject !== 'all' && subjectConfig[subject as keyof typeof subjectConfig]
    ? subjectConfig[subject as keyof typeof subjectConfig]
    : subjectConfig.mathematics;

  const [bookData, setBookData] = useState<any>(null);

  useEffect(() => {
    // Dynamic book data based on subject
    const mockBookData = {
      id: bookId,
      subject: currentSubject.name,
      title: `Brainac Big Book for ${currentSubject.name} for Foundation Class 6`,
      description: `Brainac Big Book is an AI-powered comprehensive curriculum for ${currentSubject.name} for Foundation Class 6. It consists of the best questions from dozens of most popular books in the country.`,
      duration: "48 hrs 16 mins",
      studyTime: "215 hrs 51 mins",
      earnPercentage: "49.20%"
    };
    setBookData(mockBookData);
  }, [bookId, subject, currentSubject]);

  const handleItemClick = (section: string, itemId: string) => {
    setActiveItems(prev => ({
      ...prev,
      [section]: itemId
    }));
  };

  const renderUnits = () => (
    <div className="space-y-4">
      {currentSubject.units.map((unit) => (
        <div
          key={unit.id}
          className={`${unit.bgColor} ${unit.borderColor} p-4 rounded-lg border-2 transition-all cursor-pointer group hover:shadow-md ${
            activeItems.units === unit.id.toString()
              ? "border-brainac-purple ring-2 ring-brainac-purple/20 bg-purple-50" 
              : "hover:border-brainac-purple/60"
          }`}
          onClick={() => handleItemClick('units', unit.id.toString())}
        >
          <div className="flex items-center justify-between mb-3">
            <span className={`font-semibold ${activeItems.units === unit.id.toString() ? "text-gray-900" : "text-gray-800"}`}>
              {unit.id}. {unit.name}
            </span>
          </div>
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeItems.units === unit.id.toString() ? "bg-brainac-purple" : "bg-gray-400 group-hover:bg-brainac-orange"
                }`}
                style={{ width: `${unit.progress}%` }}
              ></div>
            </div>
            <span className="text-xs text-gray-600 font-medium">{unit.progress}% complete</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChapters = () => (
    <div className="space-y-3">
      {currentSubject.chapters.map((chapter) => (
        <div
          key={chapter.id}
          className={`bg-white p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
            activeItems.chapters === chapter.id
              ? "border-brainac-purple ring-2 ring-brainac-purple/20 bg-purple-50" 
              : "border-gray-200 hover:border-brainac-purple/60"
          }`}
          onClick={() => handleItemClick('chapters', chapter.id)}
        >
          <div className={`font-semibold text-sm ${activeItems.chapters === chapter.id ? "text-gray-900" : "text-gray-800"}`}>
            {chapter.id} {chapter.name}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTopics = () => (
    <div className="space-y-3">
      {currentSubject.topics.map((topic) => (
        <div
          key={topic.id}
          className={`bg-white p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
            activeItems.topics === topic.id
              ? "border-brainac-purple ring-2 ring-brainac-purple/20 bg-purple-50" 
              : "border-gray-200 hover:border-brainac-purple/60"
          }`}
          onClick={() => handleItemClick('topics', topic.id)}
        >
          <div className={`font-semibold text-sm ${activeItems.topics === topic.id ? "text-gray-900" : "text-gray-800"}`}>
            {topic.id} {topic.name}
          </div>
        </div>
      ))}
    </div>
  );

  const renderExplainers = () => {
    const explainers = explainersData[subject as keyof typeof explainersData] || explainersData.mathematics;
    
    return (
      <div className="space-y-4">
        {explainers.map((explainer, index) => (
          <div
            key={explainer.id}
            className={`bg-white rounded-lg border-2 overflow-hidden transition-all hover:shadow-lg group cursor-pointer ${
              activeItems.explainers === explainer.id.toString()
                ? "border-brainac-purple ring-2 ring-brainac-purple/20"
                : "border-gray-200 hover:border-brainac-purple/60"
            }`}
            onClick={() => handleItemClick('explainers', explainer.id.toString())}
          >
            <div className={`h-24 ${explainer.thumbnail} relative`}>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button size="icon" variant="secondary" className="rounded-full bg-white/90 hover:bg-white group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 text-gray-900" />
                </Button>
              </div>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-gradient-to-r from-purple-600/80 to-pink-600/80 rounded px-2 py-1">
                    <div className="text-white text-xs font-bold text-center">
                      Chapter
                      <br />
                      {currentSubject.chapters[0]?.name.toUpperCase() || "FIRST CHAPTER"}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm text-gray-900">{index + 1}. {explainer.title}</h3>
                <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">All in One</Badge>
              </div>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                {explainer.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-medium">{explainer.duration}</span>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-brainac-orange rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-white text-xs">⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!bookData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with animated subject-specific background */}
      <div className={`relative ${currentSubject.bgColor} overflow-hidden border-b border-gray-200`}>
        {/* Animated Subject-specific Background */}
        <div className="absolute inset-0 opacity-10">
          {currentSubject.animatedNumbers.map((num, index) => (
            <div
              key={index}
              className={`absolute text-6xl font-bold animate-pulse`}
              style={{
                top: `${20 + (index * 15) % 60}%`,
                left: `${10 + (index * 25) % 80}%`,
                animationDelay: `${index * 0.5}s`,
                color: index % 2 === 0 ? '#8B5CF6' : '#F97316'
              }}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="relative container mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800 border border-blue-200">
                {bookData.subject}
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{bookData.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Star className="w-4 h-4" />
                <span>{bookData.studyTime}</span>
              </div>
              <Badge className="bg-brainac-orange text-white shadow-sm">Earn {bookData.earnPercentage} ⭐</Badge>
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {bookData.title}
            </h1>
            
            <p className="text-gray-600 max-w-4xl leading-relaxed">
              {bookData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Units Section */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{currentSubject.units.length} Units</h2>
            </div>
            {renderUnits()}
          </div>

          {/* Chapters Section */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{currentSubject.chapters.length} Chapters</h2>
            </div>
            {renderChapters()}
          </div>

          {/* Topics Section */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">{currentSubject.topics.length} Topics</h2>
            </div>
            {renderTopics()}
          </div>

          {/* Explainers Section */}
          <div className="lg:col-span-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">BRAINAC EXPLAINERS</h2>
              <Badge className="bg-brainac-orange text-white shadow-sm">Earn 21 ⭐</Badge>
            </div>
            {renderExplainers()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
