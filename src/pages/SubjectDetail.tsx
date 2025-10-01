import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Bell, 
  Play, 
  BookOpen, 
  Beaker, 
  FileText, 
  Menu,
  Sparkles,
  Target,
  Zap,
  Star,
  MessageCircle,
  ChevronRight,
  ArrowLeft,
  Clock,
  Users,
  Award,
  Settings,
  Trophy,
  Download,
  ChevronLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import subject data
import scienceData from "@/data/subjects/science.json";
import mathematicsData from "@/data/subjects/mathematics.json";
import physicsData from "@/data/subjects/physics.json";
import englishData from "@/data/subjects/english.json";
import historyData from "@/data/subjects/history.json";
import geographyData from "@/data/subjects/geography.json";

// Dummy thumbnail generator with subject-specific images
const getDummyThumbnail = (type: 'video' | 'chapter' | 'book', index: number, subject?: string) => {
  const baseUrl = "https://images.unsplash.com/photo-";
  
  // Subject-specific video thumbnails
  const subjectVideoThumbnails = {
    science: [
      "1530026405186-ed1f139313f7?w=400&h=250&fit=crop", // Science lab
      "1441974231531-c6227db76b6e?w=400&h=250&fit=crop", // Nature
      "1506905925346-21bda4d32df4?w=400&h=250&fit=crop", // Chemistry
      "1581094794329-c8112a89af12?w=400&h=250&fit=crop", // Biology
      "1518709268805-4e9042af2176?w=400&h=250&fit=crop"  // Physics
    ],
    mathematics: [
      "1635077986412-7c96c7e11356?w=400&h=250&fit=crop", // Math formulas
      "1509228468518-180dd4864903?w=400&h=250&fit=crop", // Geometry
      "1558618666-fcd25c85cd64?w=400&h=250&fit=crop",    // Calculator
      "1516321318423-f06f85e504b3?w=400&h=250&fit=crop", // Numbers
      "1554224155-6726b3ff858f?w=400&h=250&fit=crop"     // Algebra
    ],
    physics: [
      "1506905925346-21bda4d32df4?w=400&h=250&fit=crop", // Physics lab
      "1518709268805-4e9042af2176?w=400&h=250&fit=crop", // Energy
      "1581094794329-c8112a89af12?w=400&h=250&fit=crop", // Motion
      "1441974231531-c6227db76b6e?w=400&h=250&fit=crop", // Forces
      "1530026405186-ed1f139313f7?w=400&h=250&fit=crop"  // Experiments
    ],
    english: [
      "1481627834876-b7833e8f5570?w=400&h=250&fit=crop", // Books
      "1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop", // Literature
      "1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop",    // Reading
      "1513475382585-d06e58bcb0e0?w=400&h=250&fit=crop", // Writing
      "1495640388908-05fa85288e61?w=400&h=250&fit=crop"  // Grammar
    ],
    history: [
      "1558618666-fcd25c85cd64?w=400&h=250&fit=crop",    // Ancient
      "1509228468518-180dd4864903?w=400&h=250&fit=crop", // Historical
      "1635077986412-7c96c7e11356?w=400&h=250&fit=crop", // Timeline
      "1516321318423-f06f85e504b3?w=400&h=250&fit=crop", // Artifacts
      "1554224155-6726b3ff858f?w=400&h=250&fit=crop"     // Monuments
    ],
    geography: [
      "1441974231531-c6227db76b6e?w=400&h=250&fit=crop", // World map
      "1506905925346-21bda4d32df4?w=400&h=250&fit=crop", // Landscapes
      "1530026405186-ed1f139313f7?w=400&h=250&fit=crop", // Geography
      "1581094794329-c8112a89af12?w=400&h=250&fit=crop", // Earth
      "1518709268805-4e9042af2176?w=400&h=250&fit=crop"  // Climate
    ]
  };

  const defaultThumbnails = {
    video: [
      "1530026405186-ed1f139313f7?w=400&h=250&fit=crop",
      "1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
      "1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
      "1581094794329-c8112a89af12?w=400&h=250&fit=crop",
      "1518709268805-4e9042af2176?w=400&h=250&fit=crop"
    ],
    chapter: [
      "1553284965-83fd3e82fa5a?w=400&h=250&fit=crop",
      "1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
      "1466781783364-36c955e42a7f?w=400&h=250&fit=crop",
      "1518709268805-4e9042af2176?w=400&h=250&fit=crop",
      "1581094794329-c8112a89af12?w=400&h=250&fit=crop"
    ],
    book: [
      "1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop",
      "1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      "1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
      "1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop"
    ]
  };
  
  if (type === 'video' && subject && subjectVideoThumbnails[subject as keyof typeof subjectVideoThumbnails]) {
    const subjectThumbnails = subjectVideoThumbnails[subject as keyof typeof subjectVideoThumbnails];
    return baseUrl + subjectThumbnails[index % subjectThumbnails.length];
  }
  
  const typeThumbnails = defaultThumbnails[type];
  return baseUrl + typeThumbnails[index % typeThumbnails.length];
};

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  category: string;
  views: string;
  likes: string;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
  progress: number;
  duration: string;
  lessons: number;
}

interface Book {
  id: string;
  title: string;
  description: string;
  cover: string;
  type: string;
  publisher: string;
  rating: number;
}

interface SubjectData {
  trendingVideos: Video[];
  chapters: Chapter[];
  books: Book[];
}

// Subject data configuration with solid theme colors and dynamic data
const subjectData = {
  science: {
    name: "Science",
    icon: "🧪",
    color: "bg-primary",
    bgColor: "bg-primary/5",
    description: "Explore the wonders of science through experiments and discoveries",
    data: scienceData as SubjectData,
    stats: {
      totalChapters: scienceData.chapters.length,
      completedChapters: Math.floor(scienceData.chapters.length * 0.6),
      totalVideos: scienceData.trendingVideos.length * 9,
      totalBooks: scienceData.books.length
    }
  },
  mathematics: {
    name: "Mathematics",
    icon: "📐",
    color: "bg-secondary",
    bgColor: "bg-secondary/5",
    description: "Master mathematical concepts and problem-solving skills",
    data: mathematicsData as SubjectData,
    stats: {
      totalChapters: mathematicsData.chapters.length,
      completedChapters: Math.floor(mathematicsData.chapters.length * 0.5),
      totalVideos: mathematicsData.trendingVideos.length * 8,
      totalBooks: mathematicsData.books.length
    }
  },
  physics: {
    name: "Physics",
    icon: "⚛️",
    color: "bg-accent",
    bgColor: "bg-accent/5",
    description: "Understand the fundamental laws of the universe",
    data: physicsData as SubjectData,
    stats: {
      totalChapters: physicsData.chapters.length,
      completedChapters: Math.floor(physicsData.chapters.length * 0.4),
      totalVideos: physicsData.trendingVideos.length * 7,
      totalBooks: physicsData.books.length
    }
  },
  english: {
    name: "English",
    icon: "📚",
    color: "bg-tertiary",
    bgColor: "bg-tertiary/5",
    description: "Enhance your language skills and literary understanding",
    data: englishData as SubjectData,
    stats: {
      totalChapters: englishData.chapters.length,
      completedChapters: Math.floor(englishData.chapters.length * 0.6),
      totalVideos: englishData.trendingVideos.length * 6,
      totalBooks: englishData.books.length
    }
  },
  history: {
    name: "History",
    icon: "🏛️",
    color: "bg-warning",
    bgColor: "bg-warning/5",
    description: "Journey through time and explore historical events",
    data: historyData as SubjectData,
    stats: {
      totalChapters: historyData.chapters.length,
      completedChapters: Math.floor(historyData.chapters.length * 0.5),
      totalVideos: historyData.trendingVideos.length * 5,
      totalBooks: historyData.books.length
    }
  },
  geography: {
    name: "Geography",
    icon: "🌍",
    color: "bg-success",
    bgColor: "bg-success/5",
    description: "Discover the world's landscapes and cultures",
    data: geographyData as SubjectData,
    stats: {
      totalChapters: geographyData.chapters.length,
      completedChapters: Math.floor(geographyData.chapters.length * 0.6),
      totalVideos: geographyData.trendingVideos.length * 5,
      totalBooks: geographyData.books.length
    }
  }
};

// Generate mixed content for all subjects
const generateAllSubjectsContent = () => {
  const allVideos: Video[] = [];
  const allChapters: Chapter[] = [];
  const allBooks: Book[] = [];

  Object.values(subjectData).forEach((subject) => {
    allVideos.push(...subject.data.trendingVideos);
    allChapters.push(...subject.data.chapters);
    allBooks.push(...subject.data.books);
  });

  // Shuffle and limit content
  function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  return {
    trendingVideos: shuffleArray(allVideos).slice(0, 5),
    chapters: shuffleArray(allChapters).slice(0, 5),
    books: shuffleArray(allBooks).slice(0, 4)
  };
};

export default function SubjectDetail() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("all");

  // Memoized subject selection and content generation
  const { currentSubject, content, currentSubjectParam } = useMemo(() => {
    const subjectParam = subject || 'all';
    
    const selectedSubject = subjectParam === 'all'
      ? { 
          name: "All Subjects", 
          icon: "📚", 
          color: "bg-primary",
          bgColor: "bg-primary/5",
          description: "Explore comprehensive learning materials across all subjects",
          stats: {
            totalChapters: 85,
            completedChapters: 62,
            totalVideos: 1255,
            totalBooks: 200
          }
        }
      : subjectData[subjectParam.toLowerCase() as keyof typeof subjectData] || subjectData.science;

    const emptyContent: SubjectData = { trendingVideos: [], chapters: [], books: [] };
    const subjectContent: SubjectData = subjectParam === 'all'
      ? generateAllSubjectsContent() as SubjectData
      : subjectData[subjectParam.toLowerCase() as keyof typeof subjectData]?.data ?? emptyContent;

    // Debug log to verify content source
    console.log(`Subject: ${subjectParam}`, {
      isAll: subjectParam === 'all',
      contentSource: subjectParam === 'all' ? 'mixed' : subjectParam,
      videoCount: subjectContent.trendingVideos.length,
      chapterCount: subjectContent.chapters.length,
      bookCount: subjectContent.books.length
    });

    return {
      currentSubject: selectedSubject,
      content: subjectContent,
      currentSubjectParam: subjectParam
    };
  }, [subject]);

  // Memoized header gradient classes
  const headerGradientClasses = useMemo(() => {
    switch (currentSubjectParam) {
      case "all": return "from-primary/10 via-secondary/10 to-accent/10";
      case "science": return "from-primary/10 via-primary/5 to-primary/3";
      case "mathematics": return "from-secondary/10 via-secondary/5 to-secondary/3";
      case "physics": return "from-accent/10 via-accent/5 to-accent/3";
      case "english": return "from-tertiary/10 via-tertiary/5 to-tertiary/3";
      case "history": return "from-warning/10 via-warning/5 to-warning/3";
      case "geography": return "from-success/10 via-success/5 to-success/3";
      default: return "from-primary/10 via-primary/5 to-primary/3";
    }
  }, [currentSubjectParam]);

  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubject(subjectId);
    navigate(`/subject/${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Mobile Backdrop */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      
      <div className={cn(
        "flex flex-col transition-all duration-500 ease-out",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        {/* Enhanced Header Section */}
        <header className={cn(
          "relative bg-gradient-to-br border-b border-border/50 min-h-[280px]",
          headerGradientClasses
        )}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
          
          <div className="relative z-10 px-6 py-12">
            {/* Top Row - Navigation and Actions */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden btn-ghost"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  <Menu className="w-5 h-5" />
                </Button>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Subject Detail</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-foreground font-medium">{currentSubject.name}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search chapters, videos, or topics..." 
                    className="pl-10 w-80 input-modern"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="btn-ghost relative"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-destructive text-[10px] text-destructive-foreground font-semibold shadow-lg">3</span>
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="btn-ghost"
                  >
                    <Settings className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content Row */}
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-6">
                {/* Subject Info */}
                <div className="flex items-start gap-6">
                  <div className={cn("p-4 rounded-2xl shadow-lg flex-shrink-0", currentSubject.bgColor)}>
                    <span className="text-3xl">{currentSubject.icon}</span>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h1 className="text-4xl font-bold text-foreground">
                        {currentSubject.name} <span className="text-primary">Foundation</span>
                      </h1>
                      <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
                        {currentSubject.description}
                      </p>
                    </div>
                    
                    {/* Progress and Status */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-green-600 font-medium">Active Course</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Last accessed: 2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Stats Cards */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/20 rounded-lg mx-auto mb-2">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{currentSubject.stats.totalChapters}</div>
                    <div className="text-sm text-muted-foreground">Chapters</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center justify-center w-10 h-10 bg-accent/20 rounded-lg mx-auto mb-2">
                      <Zap className="w-5 h-5 text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{currentSubject.stats.totalVideos}+</div>
                    <div className="text-sm text-muted-foreground">Videos</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-lg mx-auto mb-2">
                      <Star className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{currentSubject.stats.totalBooks}</div>
                    <div className="text-sm text-muted-foreground">Books</div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-lg mx-auto mb-2">
                      <Trophy className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">85%</div>
                    <div className="text-sm text-muted-foreground">Completion</div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="hidden lg:flex flex-col gap-3 ml-8 flex-shrink-0">
                <Button variant="outline" className="border-white/20 text-foreground hover:bg-white/10 font-medium px-6 py-3 rounded-xl">
                  <BookOpen className="w-4 h-4 mr-2" />
                  View Syllabus
                </Button>
                <Button variant="outline" className="border-white/20 text-foreground hover:bg-white/10 font-medium px-6 py-3 rounded-xl">
                  <Download className="w-4 h-4 mr-2" />
                  Download Materials
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Trial Period Banner */}
        <div className="bg-warning/10 border-b border-warning/20 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-warning rounded-full animate-pulse" />
              <span className="text-warning font-medium">Your trial period has expired</span>
            </div>
            <Button className="bg-warning hover:bg-warning/90 text-warning-foreground font-medium">
              Subscribe now
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-12">
          {/* Subject Selection */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Choose Your Subject</h2>
                <p className="text-muted-foreground mt-2">Select a subject to explore its learning materials</p>
              </div>
            </div>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => handleSubjectClick("all")}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 card-modern",
                  currentSubjectParam === "all"
                    ? "bg-primary text-primary-foreground shadow-lg border-primary/20"
                    : "hover:shadow-md hover:border-primary/20"
                )}
              >
                <Zap className="w-5 h-5" />
                <span className="font-medium text-[12px]">ALL SUBJECTS</span>
              </button>
              
              {Object.entries(subjectData).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => handleSubjectClick(key)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 card-modern",
                    currentSubjectParam === key
                      ? `${data.color} text-white shadow-lg border-current/20`
                      : "hover:shadow-md hover:border-primary/20"
                  )}
                >
                  <span className="text-xl">{data.icon}</span>
                  <span className="font-medium text-[12px]">{data.name.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Continue Learning */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {currentSubjectParam === 'all' ? 'Continue Learning' : `Continue Learning - ${currentSubject.name}`}
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">Pick up where you left off</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="btn-ghost text-xs">
                  View All
                </Button>
              </div>
            </div>
            <div className="relative group">
              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide scroll-smooth" id="continue-learning-scroll">
                {content.trendingVideos.slice(0, 3).map((video, index) => (
                  <Card key={`continue-${video.id}`} className="card-interactive group overflow-hidden w-[250px] h-[150px] flex-shrink-0">
                    <div className="relative w-full h-full">
                      <img 
                        src={getDummyThumbnail('video', index + 10, currentSubjectParam)} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-1 left-1 bg-success/90 text-success-foreground border-0 text-xs px-1.5 py-0.5">
                        Continue
                      </Badge>
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute bottom-1 left-1 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                        <Play className="w-3 h-3 text-primary fill-primary" />
                      </div>
                      <div className="absolute top-1 right-1 w-3 h-3 bg-success rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                onClick={() => {
                  const container = document.getElementById('continue-learning-scroll');
                  if (container) container.scrollLeft -= 260;
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                onClick={() => {
                  const container = document.getElementById('continue-learning-scroll');
                  if (container) container.scrollLeft += 260;
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </section>

          {/* Trending Videos */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {currentSubjectParam === 'all' ? 'Trending Videos for Your Exam' : `Trending ${currentSubject.name} Videos`}
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">Discover the most popular video lessons</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="btn-ghost text-xs">
                  View All
                </Button>
              </div>
            </div>
            <div className="relative group">
              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide scroll-smooth" id="trending-videos-scroll">
                {content.trendingVideos.map((video, index) => (
                  <Card key={video.id} className="card-interactive group overflow-hidden w-[250px] h-[150px] flex-shrink-0">
                    <div className="relative w-full h-full">
                      <img 
                        src={getDummyThumbnail('video', index, currentSubjectParam)} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-1 left-1 bg-primary/90 text-primary-foreground border-0 text-xs px-1.5 py-0.5">
                        {video.category}
                      </Badge>
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute bottom-1 left-1 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                        <Play className="w-3 h-3 text-primary fill-primary" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                onClick={() => {
                  const container = document.getElementById('trending-videos-scroll');
                  if (container) container.scrollLeft -= 220;
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                onClick={() => {
                  const container = document.getElementById('trending-videos-scroll');
                  if (container) container.scrollLeft += 220;
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </section>

          {/* Learn Chapters */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {currentSubjectParam === 'all' ? 'Learn Chapters From 6th Foundation' : `Learn ${currentSubject.name} Chapters From 6th Foundation`}
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">Master concepts through structured chapter learning</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="btn-ghost text-xs">
                  View All
                </Button>
              </div>
            </div>
            <div className="relative group">
              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide scroll-smooth" id="chapters-scroll">
                {content.chapters.map((chapter, index) => (
                  <Card key={chapter.id} className="card-interactive group overflow-hidden w-[220px] h-[220px] flex-shrink-0">
                    <div className="relative w-full h-full">
                      <img 
                        src={getDummyThumbnail('chapter', index, currentSubjectParam)} 
                        alt={chapter.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-1 left-1 bg-secondary/90 text-secondary-foreground border-0 text-xs px-1.5 py-0.5">
                        Ch.{chapter.id}
                      </Badge>
                      <div className="absolute bottom-1 left-1 right-1">
                        <h3 className="text-xs font-medium text-white line-clamp-2 leading-tight mb-1">
                          {chapter.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-white/80 mb-1">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{chapter.duration}</span>
                          <span>•</span>
                          <span>{chapter.lessons} lessons</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-1">
                          <div 
                            className="bg-white h-1 rounded-full transition-all duration-300" 
                            style={{ width: `${chapter.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-white/80 mt-0.5">{chapter.progress}%</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                onClick={() => {
                  const container = document.getElementById('chapters-scroll');
                  if (container) container.scrollLeft -= 220;
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                onClick={() => {
                  const container = document.getElementById('chapters-scroll');
                  if (container) container.scrollLeft += 220;
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </section>
          
          {/* Books with Videos & Solutions */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  {currentSubjectParam === 'all' ? 'Books With Videos & Solutions' : `Books With Videos & Solutions - ${currentSubject.name}`}
                </h2>
                <p className="text-muted-foreground mt-1 text-xs">Comprehensive study materials with interactive solutions</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="btn-ghost text-xs">
                  View All
                </Button>
              </div>
            </div>
            <div className="relative group">
              <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide scroll-smooth" id="books-scroll">
                {content.books.map((book, index) => (
                  <Card 
                    key={book.id} 
                    className="card-interactive group overflow-hidden cursor-pointer w-[180px] h-[250px] flex-shrink-0"
                    onClick={() => navigate(`/books/${book.id}`)}
                  >
                    <div className="relative w-full h-full">
                      <img 
                        src={getDummyThumbnail('book', index)} 
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge className="absolute top-1 left-1 bg-accent/90 text-accent-foreground border-0 text-xs px-1.5 py-0.5">
                        {book.type}
                      </Badge>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2">
                      <p className="text-xs text-white/80 mb-1">{book.publisher}</p>
                      <h3 className="text-xs font-medium text-white line-clamp-2 leading-tight">
                        {book.title}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs text-white/80">{book.rating}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                onClick={() => {
                  const container = document.getElementById('books-scroll');
                  if (container) container.scrollLeft -= 220;
                }}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm border-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                onClick={() => {
                  const container = document.getElementById('books-scroll');
                  if (container) container.scrollLeft += 220;
                }}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </section>
        </main>


      </div>
    </div>
  );
}