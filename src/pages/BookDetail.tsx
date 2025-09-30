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
    color: "from-primary to-secondary",
    bgColor: "bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5",
    animatedNumbers: ["2", "0", "8", "6", "4", "9", "∑", "π", "∞"],
    units: [
      { id: 1, name: "Arithmetic", progress: 85, bgColor: "bg-primary/10", borderColor: "border-primary/20" },
      { id: 2, name: "Geometry", progress: 60, bgColor: "bg-secondary/10", borderColor: "border-secondary/20" },
      { id: 3, name: "Statistics", progress: 40, bgColor: "bg-tertiary/10", borderColor: "border-tertiary/20" },
      { id: 4, name: "Algebra", progress: 20, bgColor: "bg-accent/10", borderColor: "border-accent/20" },
      { id: 5, name: "Trigonometry", progress: 30, bgColor: "bg-warning/10", borderColor: "border-warning/20" },
      { id: 6, name: "Calculus", progress: 15, bgColor: "bg-muted/10", borderColor: "border-muted/20" }
    ],
    chapters: [
      { id: "1.1", name: "Knowing Our Numbers", unitId: 1 },
      { id: "1.2", name: "Whole Numbers", unitId: 1 },
      { id: "1.3", name: "Playing with Numbers", unitId: 1 },
      { id: "1.4", name: "Integers", unitId: 1 },
      { id: "2.1", name: "Basic Geometrical Ideas", unitId: 2 },
      { id: "2.2", name: "Understanding Elementary Shapes", unitId: 2 },
      { id: "2.3", name: "Symmetry", unitId: 2 },
      { id: "2.4", name: "Practical Geometry", unitId: 2 },
      { id: "3.1", name: "Data Handling", unitId: 3 },
      { id: "3.2", name: "Probability", unitId: 3 },
      { id: "3.3", name: "Bar Graphs", unitId: 3 },
      { id: "4.1", name: "Algebraic Expressions", unitId: 4 },
      { id: "4.2", name: "Simple Equations", unitId: 4 },
      { id: "4.3", name: "Linear Equations", unitId: 4 },
      { id: "5.1", name: "Introduction to Trigonometry", unitId: 5 },
      { id: "5.2", name: "Trigonometric Identities", unitId: 5 },
      { id: "6.1", name: "Limits and Continuity", unitId: 6 },
      { id: "6.2", name: "Differentiation", unitId: 6 }
    ]
  },
  science: {
    name: "Science",
    icon: "🧪",
    color: "from-secondary to-tertiary",
    bgColor: "bg-gradient-to-br from-secondary/5 via-tertiary/5 to-accent/5",
    animatedNumbers: ["H", "O", "C", "N", "6", "2", "O₂", "CO₂", "H₂O"],
    units: [
      { id: 1, name: "Physics", progress: 70, bgColor: "bg-primary/10", borderColor: "border-primary/20" },
      { id: 2, name: "Chemistry", progress: 55, bgColor: "bg-secondary/10", borderColor: "border-secondary/20" },
      { id: 3, name: "Biology", progress: 80, bgColor: "bg-tertiary/10", borderColor: "border-tertiary/20" },
      { id: 4, name: "Earth Science", progress: 45, bgColor: "bg-accent/10", borderColor: "border-accent/20" },
      { id: 5, name: "Environmental Science", progress: 65, bgColor: "bg-success/10", borderColor: "border-success/20" }
    ],
    chapters: [
      { id: "1.1", name: "Light and Shadow", unitId: 1 },
      { id: "1.2", name: "Electricity and Circuits", unitId: 1 },
      { id: "1.3", name: "Fun with Magnets", unitId: 1 },
      { id: "1.4", name: "Motion and Forces", unitId: 1 },
      { id: "2.1", name: "Matter and Its States", unitId: 2 },
      { id: "2.2", name: "Acids, Bases and Salts", unitId: 2 },
      { id: "2.3", name: "Chemical Reactions", unitId: 2 },
      { id: "2.4", name: "Metals and Non-metals", unitId: 2 },
      { id: "3.1", name: "Getting to Know Plants", unitId: 3 },
      { id: "3.2", name: "Body Movements", unitId: 3 },
      { id: "3.3", name: "Food and Nutrition", unitId: 3 },
      { id: "3.4", name: "Reproduction in Animals", unitId: 3 },
      { id: "4.1", name: "Water Cycle", unitId: 4 },
      { id: "4.2", name: "Weather and Climate", unitId: 4 },
      { id: "4.3", name: "Rocks and Minerals", unitId: 4 },
      { id: "5.1", name: "Pollution and Conservation", unitId: 5 },
      { id: "5.2", name: "Natural Resources", unitId: 5 }
    ]
  },
  physics: {
    name: "Physics",
    icon: "⚛️",
    color: "from-tertiary to-accent",
    bgColor: "bg-gradient-to-br from-tertiary/5 via-accent/5 to-warning/5",
    animatedNumbers: ["F", "m", "a", "E", "=", "mc²", "v", "λ", "ν"],
    units: [
      { id: 1, name: "Mechanics", progress: 75, bgColor: "bg-primary/10", borderColor: "border-primary/20" },
      { id: 2, name: "Heat & Thermodynamics", progress: 50, bgColor: "bg-destructive/10", borderColor: "border-destructive/20" },
      { id: 3, name: "Waves & Optics", progress: 65, bgColor: "bg-tertiary/10", borderColor: "border-tertiary/20" },
      { id: 4, name: "Electricity & Magnetism", progress: 40, bgColor: "bg-warning/10", borderColor: "border-warning/20" },
      { id: 5, name: "Modern Physics", progress: 25, bgColor: "bg-muted/10", borderColor: "border-muted/20" }
    ],
    chapters: [
      { id: "1.1", name: "Motion in a Straight Line", unitId: 1 },
      { id: "1.2", name: "Motion in a Plane", unitId: 1 },
      { id: "1.3", name: "Laws of Motion", unitId: 1 },
      { id: "1.4", name: "Work, Energy and Power", unitId: 1 },
      { id: "1.5", name: "System of Particles", unitId: 1 },
      { id: "2.1", name: "Thermal Properties of Matter", unitId: 2 },
      { id: "2.2", name: "Thermodynamics", unitId: 2 },
      { id: "2.3", name: "Kinetic Theory", unitId: 2 },
      { id: "3.1", name: "Wave Motion", unitId: 3 },
      { id: "3.2", name: "Sound Waves", unitId: 3 },
      { id: "3.3", name: "Light Waves", unitId: 3 },
      { id: "3.4", name: "Optical Instruments", unitId: 3 },
      { id: "4.1", name: "Electric Charges and Fields", unitId: 4 },
      { id: "4.2", name: "Electric Potential", unitId: 4 },
      { id: "4.3", name: "Current Electricity", unitId: 4 },
      { id: "4.4", name: "Magnetic Effects of Current", unitId: 4 },
      { id: "5.1", name: "Atoms and Nuclei", unitId: 5 },
      { id: "5.2", name: "Dual Nature of Matter", unitId: 5 }
    ]
  },
  english: {
    name: "English Literature",
    icon: "📚",
    color: "from-accent to-warning",
    bgColor: "bg-gradient-to-br from-accent/5 via-warning/5 to-muted/5",
    animatedNumbers: ["A", "B", "C", "&", "?", "!", ".", ",", "'"],
    units: [
      { id: 1, name: "Prose", progress: 90, bgColor: "bg-primary/10", borderColor: "border-primary/20" },
      { id: 2, name: "Poetry", progress: 75, bgColor: "bg-secondary/10", borderColor: "border-secondary/20" },
      { id: 3, name: "Drama", progress: 60, bgColor: "bg-tertiary/10", borderColor: "border-tertiary/20" },
      { id: 4, name: "Grammar", progress: 85, bgColor: "bg-accent/10", borderColor: "border-accent/20" },
      { id: 5, name: "Writing Skills", progress: 70, bgColor: "bg-warning/10", borderColor: "border-warning/20" }
    ],
    chapters: [
      { id: "1.1", name: "A Tale of Two Birds", unitId: 1 },
      { id: "1.2", name: "The Friendly Mongoose", unitId: 1 },
      { id: "1.3", name: "The Shepherd's Treasure", unitId: 1 },
      { id: "1.4", name: "The Old-Clock Shop", unitId: 1 },
      { id: "2.1", name: "The Quarrel", unitId: 2 },
      { id: "2.2", name: "Beauty", unitId: 2 },
      { id: "2.3", name: "Where Do All the Teachers Go?", unitId: 2 },
      { id: "2.4", name: "The Wonderful Words", unitId: 2 },
      { id: "3.1", name: "A Game of Chance", unitId: 3 },
      { id: "3.2", name: "The Open Window", unitId: 3 },
      { id: "3.3", name: "Tansen", unitId: 3 },
      { id: "4.1", name: "Parts of Speech", unitId: 4 },
      { id: "4.2", name: "Tenses", unitId: 4 },
      { id: "4.3", name: "Active and Passive Voice", unitId: 4 },
      { id: "4.4", name: "Direct and Indirect Speech", unitId: 4 },
      { id: "5.1", name: "Essay Writing", unitId: 5 },
      { id: "5.2", name: "Letter Writing", unitId: 5 },
      { id: "5.3", name: "Creative Writing", unitId: 5 }
    ]
  },
  history: {
    name: "History",
    icon: "🏛️",
    color: "from-warning to-destructive",
    bgColor: "bg-gradient-to-br from-warning/5 via-destructive/5 to-muted/5",
    animatedNumbers: ["1", "9", "4", "7", "B", "C", "A", "D", "🏺"],
    units: [
      { id: 1, name: "Ancient India", progress: 80, bgColor: "bg-warning/10", borderColor: "border-warning/20" },
      { id: 2, name: "Medieval India", progress: 65, bgColor: "bg-accent/10", borderColor: "border-accent/20" },
      { id: 3, name: "Modern India", progress: 70, bgColor: "bg-destructive/10", borderColor: "border-destructive/20" },
      { id: 4, name: "World History", progress: 55, bgColor: "bg-muted/10", borderColor: "border-muted/20" },
      { id: 5, name: "Indian Freedom Struggle", progress: 90, bgColor: "bg-primary/10", borderColor: "border-primary/20" }
    ],
    chapters: [
      { id: "1.1", name: "What, Where, How and When?", unitId: 1 },
      { id: "1.2", name: "From Hunting-Gathering to Growing Food", unitId: 1 },
      { id: "1.3", name: "In the Earliest Cities", unitId: 1 },
      { id: "1.4", name: "What Books and Burials Tell Us", unitId: 1 },
      { id: "2.1", name: "Kingdoms, Kings and an Early Republic", unitId: 2 },
      { id: "2.2", name: "New Questions and Ideas", unitId: 2 },
      { id: "2.3", name: "Ashoka, the Emperor Who Gave Up War", unitId: 2 },
      { id: "2.4", name: "Vital Villages, Thriving Towns", unitId: 2 },
      { id: "3.1", name: "The Mughal Empire", unitId: 3 },
      { id: "3.2", name: "Rulers and Buildings", unitId: 3 },
      { id: "3.3", name: "Towns, Traders and Craftspersons", unitId: 3 },
      { id: "4.1", name: "The Making of a Global World", unitId: 4 },
      { id: "4.2", name: "The Age of Industrialization", unitId: 4 },
      { id: "4.3", name: "World Wars", unitId: 4 },
      { id: "5.1", name: "The Rise of Nationalism", unitId: 5 },
      { id: "5.2", name: "India and the Contemporary World", unitId: 5 },
      { id: "5.3", name: "Nationalism in India", unitId: 5 }
    ]
  },
  geography: {
    name: "Geography",
    icon: "🌍",
    color: "from-success to-accent",
    bgColor: "bg-gradient-to-br from-success/5 via-accent/5 to-secondary/5",
    animatedNumbers: ["°", "N", "S", "E", "W", "🌊", "⛰️", "🏔️", "🗺️"],
    units: [
      { id: 1, name: "Physical Geography", progress: 70, bgColor: "bg-success/10", borderColor: "border-success/20" },
      { id: 2, name: "Human Geography", progress: 60, bgColor: "bg-primary/10", borderColor: "border-primary/20" },
      { id: 3, name: "Environmental Geography", progress: 75, bgColor: "bg-secondary/10", borderColor: "border-secondary/20" },
      { id: 4, name: "Regional Geography", progress: 50, bgColor: "bg-accent/10", borderColor: "border-accent/20" },
      { id: 5, name: "Cartography", progress: 45, bgColor: "bg-muted/10", borderColor: "border-muted/20" }
    ],
    chapters: [
      { id: "1.1", name: "The Earth in the Solar System", unitId: 1 },
      { id: "1.2", name: "Globe: Latitudes and Longitudes", unitId: 1 },
      { id: "1.3", name: "Motions of the Earth", unitId: 1 },
      { id: "1.4", name: "Major Domains of the Earth", unitId: 1 },
      { id: "1.5", name: "Major Landforms of the Earth", unitId: 1 },
      { id: "2.1", name: "Human Settlements", unitId: 2 },
      { id: "2.2", name: "Rural and Urban Settlements", unitId: 2 },
      { id: "2.3", name: "Transport and Communication", unitId: 2 },
      { id: "3.1", name: "Natural Vegetation and Wildlife", unitId: 3 },
      { id: "3.2", name: "Water Resources", unitId: 3 },
      { id: "3.3", name: "Climate and Weather", unitId: 3 },
      { id: "4.1", name: "Our Country - India", unitId: 4 },
      { id: "4.2", name: "India: Climate, Vegetation and Wildlife", unitId: 4 },
      { id: "5.1", name: "Maps and Map Reading", unitId: 5 },
      { id: "5.2", name: "Scale and Directions", unitId: 5 }
    ]
  },
  computer: {
    name: "Computer Science",
    icon: "💻",
    color: "from-primary to-tertiary",
    bgColor: "bg-gradient-to-br from-primary/5 via-tertiary/5 to-muted/5",
    animatedNumbers: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    units: [
      { id: 1, name: "Programming Fundamentals", progress: 80, bgColor: "bg-primary/10", borderColor: "border-primary/20" },
      { id: 2, name: "Data Structures", progress: 65, bgColor: "bg-secondary/10", borderColor: "border-secondary/20" },
      { id: 3, name: "Algorithms", progress: 70, bgColor: "bg-tertiary/10", borderColor: "border-tertiary/20" },
      { id: 4, name: "Web Development", progress: 55, bgColor: "bg-accent/10", borderColor: "border-accent/20" },
      { id: 5, name: "Database Management", progress: 40, bgColor: "bg-warning/10", borderColor: "border-warning/20" }
    ],
    chapters: [
      { id: "1.1", name: "Introduction to Programming", unitId: 1 },
      { id: "1.2", name: "Variables and Data Types", unitId: 1 },
      { id: "1.3", name: "Control Structures", unitId: 1 },
      { id: "1.4", name: "Functions and Methods", unitId: 1 },
      { id: "2.1", name: "Arrays and Lists", unitId: 2 },
      { id: "2.2", name: "Stacks and Queues", unitId: 2 },
      { id: "2.3", name: "Trees and Graphs", unitId: 2 },
      { id: "3.1", name: "Searching Algorithms", unitId: 3 },
      { id: "3.2", name: "Sorting Algorithms", unitId: 3 },
      { id: "3.3", name: "Algorithm Complexity", unitId: 3 },
      { id: "4.1", name: "HTML and CSS", unitId: 4 },
      { id: "4.2", name: "JavaScript Basics", unitId: 4 },
      { id: "4.3", name: "Responsive Design", unitId: 4 },
      { id: "5.1", name: "Introduction to Databases", unitId: 5 },
      { id: "5.2", name: "SQL Fundamentals", unitId: 5 }
    ]
  }
};

const explainersData = {
  mathematics: [
    {
      id: 1,
      title: "Decimal Place Value",
      duration: "3 min 29 secs",
      thumbnail: "https://picsum.photos/300/200?random=1"
    },
    {
      id: 2,
      title: "Introducing the Number: 1000",
      duration: "2 min 47 secs",
      thumbnail: "https://picsum.photos/300/200?random=2"
    },
    {
      id: 3,
      title: "Place Value of Numbers",
      duration: "4 min 12 secs",
      thumbnail: "https://picsum.photos/300/200?random=3"
    }
  ],
  science: [
    {
      id: 1,
      title: "Light and Shadows",
      duration: "4 min 15 secs",
      thumbnail: "https://picsum.photos/300/200?random=4"
    },
    {
      id: 2,
      title: "Simple Circuits",
      duration: "5 min 32 secs",
      thumbnail: "https://picsum.photos/300/200?random=5"
    },
    {
      id: 3,
      title: "Plant Parts and Functions",
      duration: "3 min 48 secs",
      thumbnail: "https://picsum.photos/300/200?random=6"
    }
  ],
  physics: [
    {
      id: 1,
      title: "Motion in One Dimension",
      duration: "6 min 22 secs",
      thumbnail: "https://picsum.photos/300/200?random=7"
    },
    {
      id: 2,
      title: "Newton's Laws of Motion",
      duration: "7 min 15 secs",
      thumbnail: "https://picsum.photos/300/200?random=8"
    },
    {
      id: 3,
      title: "Energy Conservation",
      duration: "5 min 44 secs",
      thumbnail: "https://picsum.photos/300/200?random=9"
    },
    {
      id: 4,
      title: "Wave Properties",
      duration: "6 min 10 secs",
      thumbnail: "https://picsum.photos/300/200?random=10"
    },
    {
      id: 5,
      title: "Electric Circuits",
      duration: "8 min 33 secs",
      thumbnail: "https://picsum.photos/300/200?random=11"
    }
  ],
  english: [
    {
      id: 1,
      title: "Character Development",
      duration: "4 min 33 secs",
      thumbnail: "https://picsum.photos/300/200?random=12"
    },
    {
      id: 2,
      title: "Poetry Analysis",
      duration: "3 min 51 secs",
      thumbnail: "https://picsum.photos/300/200?random=13"
    },
    {
      id: 3,
      title: "Grammar Essentials",
      duration: "5 min 18 secs",
      thumbnail: "https://picsum.photos/300/200?random=14"
    },
    {
      id: 4,
      title: "Essay Writing Techniques",
      duration: "6 min 25 secs",
      thumbnail: "https://picsum.photos/300/200?random=15"
    },
    {
      id: 5,
      title: "Creative Writing",
      duration: "7 min 12 secs",
      thumbnail: "https://picsum.photos/300/200?random=16"
    }
  ],
  history: [
    {
      id: 1,
      title: "Archaeological Evidence",
      duration: "4 min 41 secs",
      thumbnail: "https://picsum.photos/300/200?random=17"
    },
    {
      id: 2,
      title: "Ancient Civilizations",
      duration: "6 min 28 secs",
      thumbnail: "https://picsum.photos/300/200?random=18"
    },
    {
      id: 3,
      title: "Timeline of Events",
      duration: "3 min 56 secs",
      thumbnail: "https://picsum.photos/300/200?random=19"
    },
    {
      id: 4,
      title: "Medieval India",
      duration: "7 min 18 secs",
      thumbnail: "https://picsum.photos/300/200?random=20"
    },
    {
      id: 5,
      title: "Freedom Struggle",
      duration: "8 min 45 secs",
      thumbnail: "https://picsum.photos/300/200?random=21"
    }
  ],
  geography: [
    {
      id: 1,
      title: "Solar System Basics",
      duration: "5 min 12 secs",
      thumbnail: "https://picsum.photos/300/200?random=22"
    },
    {
      id: 2,
      title: "Latitude and Longitude",
      duration: "4 min 35 secs",
      thumbnail: "https://picsum.photos/300/200?random=23"
    },
    {
      id: 3,
      title: "Climate and Weather",
      duration: "6 min 02 secs",
      thumbnail: "https://picsum.photos/300/200?random=24"
    },
    {
      id: 4,
      title: "Landforms and Relief",
      duration: "5 min 48 secs",
      thumbnail: "https://picsum.photos/300/200?random=25"
    },
    {
      id: 5,
      title: "Natural Resources",
      duration: "6 min 33 secs",
      thumbnail: "https://picsum.photos/300/200?random=26"
    }
  ],
  computer: [
    {
      id: 1,
      title: "Programming Fundamentals",
      duration: "7 min 15 secs",
      thumbnail: "https://picsum.photos/300/200?random=27"
    },
    {
      id: 2,
      title: "Data Structures",
      duration: "8 min 30 secs",
      thumbnail: "https://picsum.photos/300/200?random=28"
    },
    {
      id: 3,
      title: "Web Development Basics",
      duration: "6 min 45 secs",
      thumbnail: "https://picsum.photos/300/200?random=29"
    },
    {
      id: 4,
      title: "Algorithm Design",
      duration: "9 min 22 secs",
      thumbnail: "https://picsum.photos/300/200?random=30"
    },
    {
      id: 5,
      title: "Database Concepts",
      duration: "7 min 55 secs",
      thumbnail: "https://picsum.photos/300/200?random=31"
    }
  ]
};

const BookDetail = () => {
  const { bookId, subject } = useParams<{ bookId: string; subject: string }>();
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>(subject || 'mathematics');
  const [activeItems, setActiveItems] = useState<{ [key: string]: string }>({
    units: "1",
    chapters: "1.1",
    explainers: "1"
  });

  // Get subject configuration
  const currentSubject = selectedSubject && selectedSubject !== 'all' && subjectConfig[selectedSubject as keyof typeof subjectConfig]
    ? subjectConfig[selectedSubject as keyof typeof subjectConfig]
    : subjectConfig.mathematics;

  const [bookData, setBookData] = useState<any>(null);

  // Available subjects for selection
  const availableSubjects = [
    { key: 'mathematics', name: 'Mathematics', icon: '📐' },
    { key: 'science', name: 'Science', icon: '🧪' },
    { key: 'physics', name: 'Physics', icon: '⚛️' },
    { key: 'english', name: 'English', icon: '📚' },
    { key: 'history', name: 'History', icon: '🏛️' },
    { key: 'geography', name: 'Geography', icon: '🌍' },
    { key: 'computer', name: 'Computer Science', icon: '💻' }
  ];

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
  }, [bookId, selectedSubject, currentSubject]);

  const handleSubjectChange = (newSubject: string) => {
    setSelectedSubject(newSubject);
    // Reset active items when subject changes
    setActiveItems({
      units: "1",
      chapters: "1.1",
      explainers: "1"
    });
  };

  const handleItemClick = (section: string, itemId: string) => {
    setActiveItems(prev => {
      const newState = { ...prev, [section]: itemId };
      
      // Reset dependent selections when parent changes
      if (section === 'units') {
        // Reset chapters and explainers when unit changes
        const firstChapterForUnit = currentSubject.chapters.find(ch => ch.unitId === parseInt(itemId));
        newState.chapters = firstChapterForUnit ? firstChapterForUnit.id : prev.chapters;
        newState.explainers = "1";
      } else if (section === 'chapters') {
        // Reset explainers when chapter changes
        newState.explainers = "1";
      }
      
      return newState;
    });
  };



  const renderUnits = () => (
    <div className="space-y-3">
      {currentSubject.units.map((unit) => (
        <div
          key={unit.id}
          className={`group relative p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
            activeItems.units === unit.id.toString()
              ? "border-primary ring-2 ring-primary/20 bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md" 
              : "border-border hover:border-primary/60 bg-card hover:bg-gradient-to-br hover:from-muted/30 hover:to-primary/10"
          }`}
          onClick={() => handleItemClick('units', unit.id.toString())}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs transition-all duration-300 ${
                activeItems.units === unit.id.toString() 
                  ? "bg-gradient-to-br from-primary to-secondary scale-110" 
                  : "bg-gradient-to-br from-muted to-muted/80 group-hover:from-primary/80 group-hover:to-secondary/80"
              }`}>
                {unit.id}
              </div>
              <span className={`font-semibold text-sm transition-colors duration-300 ${
                activeItems.units === unit.id.toString() ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              }`}>
                {unit.name}
              </span>
            </div>
            {activeItems.units === unit.id.toString() && (
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderChapters = () => {
    const selectedUnit = parseInt(activeItems.units);
    const filteredChapters = currentSubject.chapters.filter(chapter => 
      chapter.unitId === selectedUnit
    );
    
    return (
      <div className="space-y-3">
        {filteredChapters.length > 0 ? (
          filteredChapters.map((chapter) => (
            <div
              key={chapter.id}
              className={`group relative p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
                activeItems.chapters === chapter.id
                  ? "border-secondary ring-2 ring-secondary/20 bg-gradient-to-br from-secondary/10 to-success/10 shadow-md" 
                  : "border-border hover:border-secondary/60 bg-card hover:bg-gradient-to-br hover:from-muted/30 hover:to-secondary/10"
              }`}
              onClick={() => handleItemClick('chapters', chapter.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs transition-all duration-300 ${
                    activeItems.chapters === chapter.id 
                      ? "bg-gradient-to-br from-secondary to-success scale-110" 
                      : "bg-gradient-to-br from-muted to-muted/80 group-hover:from-secondary/80 group-hover:to-success/80"
                  }`}>
                    {chapter.id}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm transition-colors duration-300 ${
                      activeItems.chapters === chapter.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {chapter.name}
                    </div>
                  </div>
                </div>
                {activeItems.chapters === chapter.id && (
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">📖</span>
            </div>
            <p className="text-muted-foreground font-medium text-sm">Select a unit to see chapters</p>
            <p className="text-muted-foreground/70 text-xs mt-1">Chapters will appear here</p>
          </div>
        )}
      </div>
    );
  };



  const renderExplainers = () => {
    const explainers = explainersData[selectedSubject as keyof typeof explainersData] || explainersData.mathematics;
    const selectedChapter = activeItems.chapters;
    
    // Filter explainers based on selected chapter
    // In a real implementation, you would filter based on the selected chapter
    const filteredExplainers = explainers;
    
    return (
      <div className="grid grid-cols-1 gap-3">
        {filteredExplainers.length > 0 ? (
          filteredExplainers.map((explainer, index) => (
            <div
              key={explainer.id}
              className={`group relative bg-card rounded-xl border-2 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer ${
                activeItems.explainers === explainer.id.toString()
                  ? "border-accent ring-2 ring-accent/20 shadow-md"
                  : "border-border hover:border-accent/60"
              }`}
              onClick={() => handleItemClick('explainers', explainer.id.toString())}
            >
              <div className="h-32 relative overflow-hidden">
                <img 
                  src={explainer.thumbnail} 
                  alt={explainer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    activeItems.explainers === explainer.id.toString()
                      ? "bg-card shadow-md"
                      : "bg-card/90 backdrop-blur-sm"
                  }`}>
                    <Play className={`w-5 h-5 transition-colors duration-300 ${
                      activeItems.explainers === explainer.id.toString() ? "text-accent" : "text-muted-foreground"
                    }`} />
                  </div>
                </div>
                
                {activeItems.explainers === explainer.id.toString() && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🎥</span>
            </div>
            <p className="text-muted-foreground font-medium text-sm">Select a chapter to see explainers</p>
            <p className="text-muted-foreground/70 text-xs mt-1">Video explainers will appear here</p>
          </div>
        )}
      </div>
    );
  };

  if (!bookData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading book content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with animated subject-specific background */}
      <div className={`relative ${currentSubject.bgColor} overflow-hidden border-b border-border`}>
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
              <Badge variant="secondary" className="text-sm bg-primary/20 text-primary border border-primary/30">
                {bookData.subject}
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{bookData.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4" />
                <span>{bookData.studyTime}</span>
              </div>
              <Badge variant="default" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-sm">Earn {bookData.earnPercentage} ⭐</Badge>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
            
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {bookData.title}
            </h1>
            
            <p className="text-muted-foreground max-w-4xl leading-relaxed">
              {bookData.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-6 py-8">
        
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Subject Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-tertiary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">📚</span>
                </div>
                <h2 className="text-lg font-bold text-foreground">Subjects</h2>
              </div>
              <div className="space-y-3">
                {availableSubjects.map((subj) => (
                  <div
                    key={subj.key}
                    className={`group relative p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
                      selectedSubject === subj.key
                        ? "border-tertiary ring-2 ring-tertiary/20 bg-gradient-to-br from-tertiary/10 to-accent/10 shadow-md"
                        : "border-border hover:border-tertiary/60 bg-card hover:bg-gradient-to-br hover:from-muted/30 hover:to-tertiary/10"
                    }`}
                    onClick={() => handleSubjectChange(subj.key)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl transition-transform duration-300 ${
                        selectedSubject === subj.key ? "scale-110" : "group-hover:scale-110"
                      }`}>
                        {subj.icon}
                      </div>
                      <div className={`font-semibold text-sm transition-colors duration-300 ${
                        selectedSubject === subj.key ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        {subj.name}
                      </div>
                    </div>
                    {selectedSubject === subj.key && (
                      <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-tertiary rounded-full animate-pulse"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Units Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">📊</span>
                </div>
                <h2 className="text-lg font-bold text-foreground">{currentSubject.units.length} Units</h2>
              </div>
              {renderUnits()}
            </div>
          </div>

          {/* Chapters Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-secondary to-success rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">📖</span>
                </div>
                <h2 className="text-lg font-bold text-foreground">{currentSubject.chapters.length} Chapters</h2>
              </div>
              {renderChapters()}
            </div>
          </div>

          {/* Explainers Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🎥</span>
                  </div>
                  <h2 className="text-lg font-bold text-foreground">BRAINAC EXPLAINERS</h2>
                </div>
                <Badge className="bg-gradient-to-r from-accent to-warning text-primary-foreground border-0 shadow-md px-2 py-1 text-xs">
                  Earn 21 ⭐
                </Badge>
              </div>
              {renderExplainers()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
