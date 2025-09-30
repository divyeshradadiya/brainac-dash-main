import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  BookOpen, 
  Play, 
  Clock, 
  User, 
  TrendingUp, 
  ArrowLeft,
  Star,
  ChevronRight,
  PlayCircle,
  FileText,
  Award,
  Target,
  Globe,
  Lightbulb,
  Download,
  Heart,
  Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoContent {
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

interface SubjectContent {
  trendingVideos: VideoContent[];
  chapters: Chapter[];
  books: Book[];
}

const subjectData = {
  science: {
    name: "Science",
    icon: "🧪",
    color: "from-blue-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50",
    description: "Explore the wonders of science through comprehensive learning materials",
    stats: {
      totalChapters: 12,
      completedChapters: 8,
      totalVideos: 156,
      totalBooks: 24
    }
  },
  mathematics: {
    name: "Mathematics", 
    icon: "📐",
    color: "from-green-500 to-blue-600",
    bgColor: "bg-gradient-to-br from-green-50 via-blue-50 to-teal-50",
    description: "Master mathematical concepts with our structured learning approach",
    stats: {
      totalChapters: 15,
      completedChapters: 10,
      totalVideos: 203,
      totalBooks: 18
    }
  },
  physics: {
    name: "Physics",
    icon: "⚛️",
    color: "from-purple-500 to-pink-600", 
    bgColor: "bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50",
    description: "Understand the fundamental laws that govern our universe",
    stats: {
      totalChapters: 10,
      completedChapters: 6,
      totalVideos: 89,
      totalBooks: 16
    }
  },
  english: {
    name: "English Literature",
    icon: "📚",
    color: "from-purple-500 to-indigo-600",
    bgColor: "bg-gradient-to-br from-purple-50 via-indigo-50 to-violet-50",
    description: "Explore the rich world of literature and enhance your language skills",
    stats: {
      totalChapters: 14,
      completedChapters: 12,
      totalVideos: 178,
      totalBooks: 32
    }
  },
  history: {
    name: "History",
    icon: "🏛️",
    color: "from-orange-500 to-red-600",
    bgColor: "bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50",
    description: "Journey through time and discover the events that shaped our world",
    stats: {
      totalChapters: 8,
      completedChapters: 5,
      totalVideos: 124,
      totalBooks: 28
    }
  },
  computer: {
    name: "Computer Science",
    icon: "💻",
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50",
    description: "Learn programming, algorithms, and digital technology fundamentals",
    stats: {
      totalChapters: 12,
      completedChapters: 8,
      totalVideos: 195,
      totalBooks: 22
    }
  },
  geography: {
    name: "Geography",
    icon: "🌍",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50",
    description: "Explore our planet's landscapes, cultures, and natural phenomena",
    stats: {
      totalChapters: 10,
      completedChapters: 7,
      totalVideos: 145,
      totalBooks: 25
    }
  },
  art: {
    name: "Art & Design",
    icon: "🎨",
    color: "from-pink-500 to-rose-600",
    bgColor: "bg-gradient-to-br from-pink-50 via-rose-50 to-red-50",
    description: "Express your creativity through visual arts and design principles",
    stats: {
      totalChapters: 6,
      completedChapters: 6,
      totalVideos: 98,
      totalBooks: 20
    }
  },
  physical: {
    name: "Physical Education",
    icon: "⚽",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50",
    description: "Develop fitness, sports skills, and healthy lifestyle habits",
    stats: {
      totalChapters: 5,
      completedChapters: 4,
      totalVideos: 67,
      totalBooks: 15
    }
  }
};

// Utility function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to load subject content from JSON files
const loadSubjectContent = async (subjectKey: string): Promise<SubjectContent | null> => {
  try {
    const response = await fetch(`/data/subjects/${subjectKey}.json`);
    if (!response.ok) {
      console.error(`Failed to load content for subject: ${subjectKey}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading subject content for ${subjectKey}:`, error);
    return null;
  }
};

// Function to load and mix content from all subjects
const loadAllSubjectsContent = async (): Promise<SubjectContent | null> => {
  try {
    const subjectKeys = Object.keys(subjectData);
    const allContent = await Promise.all(
      subjectKeys.map(key => loadSubjectContent(key))
    );
    
    // Filter out null results and combine all content
    const validContent = allContent.filter(content => content !== null) as SubjectContent[];
    
    if (validContent.length === 0) {
      return null;
    }
    
    // Mix content from all subjects
    const mixedContent: SubjectContent = {
      trendingVideos: [],
      chapters: [],
      books: []
    };
    
    // Combine and shuffle content
    validContent.forEach(content => {
      mixedContent.trendingVideos.push(...content.trendingVideos);
      mixedContent.chapters.push(...content.chapters);
      mixedContent.books.push(...content.books);
    });
    
    // Shuffle arrays to mix content from different subjects
    mixedContent.trendingVideos = shuffleArray(mixedContent.trendingVideos).slice(0, 10);
    mixedContent.chapters = shuffleArray(mixedContent.chapters).slice(0, 12);
    mixedContent.books = shuffleArray(mixedContent.books).slice(0, 16);
    
    return mixedContent;
  } catch (error) {
    console.error('Error loading all subjects content:', error);
    return null;
  }
};

// Default/fallback content
const defaultContent: SubjectContent = {
  trendingVideos: [
    {
      id: "1",
      title: "Introduction to Subject",
      thumbnail: "/api/placeholder/400/225",
      duration: "15:00",
      category: "General",
      views: "1.0M",
      likes: "25K"
    }
  ],
  chapters: [
    {
      id: "1",
      title: "Getting Started",
      description: "Introduction to the subject fundamentals",
      progress: 0,
      duration: "2h 00m",
      lessons: 5
    }
  ],
  books: [
    {
      id: "1",
      title: "Subject Textbook",
      description: "Complete guide to the subject",
      cover: "/api/placeholder/300/400",
      type: "Textbook",
      publisher: "Educational Board",
      rating: 4.5
    }
  ]
};

export default function SubjectDetail() {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectContent, setSubjectContent] = useState<SubjectContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const currentSubject = subject === 'all' || !subject 
    ? { 
        name: "All Subjects", 
        icon: "📚", 
        color: "from-purple-500 to-blue-600",
        bgColor: "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50",
        description: "Explore comprehensive learning materials across all subjects",
        stats: {
          totalChapters: 85,
          completedChapters: 62,
          totalVideos: 1255,
          totalBooks: 200
        }
      }
    : subjectData[subject.toLowerCase() as keyof typeof subjectData] || subjectData.science;

  // Load subject content when component mounts or subject changes
  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      
      if (subject === 'all' || !subject) {
        // Load mixed content from all subjects
        const content = await loadAllSubjectsContent();
        setSubjectContent(content || defaultContent);
      } else {
        // Load specific subject content
        const content = await loadSubjectContent(subject.toLowerCase());
        setSubjectContent(content || defaultContent);
      }
      
      setLoading(false);
    };

    loadContent();
  }, [subject]);

  if (!currentSubject) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Subject not found</h1>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      {/* Mobile Backdrop */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      
      <div className={cn(
        "flex flex-col transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "ml-20" : "ml-64"
      )}>
        {/* Hero Section */}
        <header className={cn(
          "relative overflow-hidden border-b border-border",
          currentSubject.bgColor
        )}>
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
          
          <div className="relative z-10 px-6 py-8">
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(-1)}
                    className="hover:bg-white/20"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-3 rounded-2xl bg-gradient-to-r text-white shadow-lg",
                      currentSubject.color
                    )}>
                      <span className="text-2xl">{currentSubject.icon}</span>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-foreground">
                        {currentSubject.name}
                      </h1>
                      <p className="text-lg text-muted-foreground mt-1">
                        {currentSubject.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>{currentSubject.stats.totalChapters} Chapters</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <PlayCircle className="w-4 h-4 text-accent" />
                    <span>{currentSubject.stats.totalVideos} Videos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4 text-secondary" />
                    <span>{currentSubject.stats.totalBooks} Books</span>
                  </div>
                </div>
              </div>
              
              {/* Search */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search content..." 
                    className="pl-10 w-80 bg-white/70 backdrop-blur-sm border-white/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8 overflow-auto">
          {/* Subjects Navigation */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Subjects</h2>
            <div className="flex flex-wrap gap-3">
              <Button
                variant={subject === 'all' || !subject ? 'default' : 'outline'}
                className={cn(
                  "px-6 py-2",
                  subject === 'all' || !subject
                    ? "bg-gradient-to-r from-primary to-secondary text-white"
                    : "hover:bg-primary/10"
                )}
                onClick={() => navigate('/subject/all')}
              >
                ALL SUBJECTS
              </Button>
              {Object.entries(subjectData).map(([key, data]) => (
                <Button
                  key={key}
                  variant={subject?.toLowerCase() === key ? 'default' : 'outline'}
                  className={cn(
                    "px-4 py-2 text-sm",
                    subject?.toLowerCase() === key 
                      ? `bg-gradient-to-r ${data.color} text-white` 
                      : "hover:bg-primary/10"
                  )}
                  onClick={() => navigate(`/subject/${key}`)}
                >
                  {data.icon} {data.name.toUpperCase()}
                </Button>
              ))}
            </div>
          </section>

          {/* Trending Videos Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {subject === 'all' || !subject 
                  ? "Trending Videos Across All Subjects" 
                  : "Trending Videos for Your Exam"
                }
              </h2>
              <Button variant="outline" className="text-primary hover:bg-primary/10">
                View All <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-video bg-gray-200 animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                subjectContent.trendingVideos.map((video) => (
                <Card key={video.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden">
                  <div className="relative">
                    <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    <Badge className="absolute top-2 left-2 bg-black/70 text-white text-xs">
                      {video.category}
                    </Badge>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 text-white hover:bg-white/20"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span>{video.views} views</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                ))
              )}
            </div>
          </section>

          {/* Learning Chapters Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {subject === 'all' || !subject 
                  ? "Featured Chapters From All Subjects" 
                  : `Learn ${currentSubject.name} Chapters From Foundation`
                }
              </h2>
              <Button variant="outline" className="text-primary hover:bg-primary/10">
                View All <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-video bg-gray-200 animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-2 bg-gray-200 rounded animate-pulse" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                subjectContent.chapters.map((chapter) => (
                <Card key={chapter.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <Globe className="w-16 h-16 text-white/80" />
                    <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">
                      {currentSubject.name}
                    </Badge>
                    <div className="absolute bottom-2 left-2 text-white text-xs">
                      <PlayCircle className="w-4 h-4 inline mr-1" />
                      {chapter.lessons} lessons
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                      {chapter.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{chapter.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${chapter.progress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{chapter.duration}</span>
                        <span>{chapter.lessons} lessons</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                ))
              )}
            </div>
          </section>

          {/* Big Books Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {subject === 'all' || !subject 
                  ? "Brainac Big Books Collection" 
                  : `Brainac Big Books For ${currentSubject.name}`
                }
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer col-span-1 md:col-span-2">
                <div className="aspect-[3/4] bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center text-white p-6">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold mb-2">THE BRAINAC BIG BOOK</h3>
                    <p className="text-sm opacity-90">
                      FOR {subject === 'all' || !subject ? 'ALL SUBJECTS' : currentSubject.name.toUpperCase()}
                    </p>
                    <p className="text-xs opacity-75 mt-2">FOUNDATION CLASS 6</p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Books with Videos & Solutions */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {subject === 'all' || !subject 
                  ? "Books With Videos & Solutions - All Subjects" 
                  : `Books With Videos & Solutions - ${currentSubject.name}`
                }
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                subjectContent.books.map((book) => (
                <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                    <BookOpen className="w-16 h-16 text-gray-400" />
                    <Badge className="absolute top-2 left-2 bg-primary text-white text-xs">
                      {book.type}
                    </Badge>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/90 px-2 py-1 rounded text-xs">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{book.rating}</span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                      {book.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{book.publisher}</span>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        <Share2 className="w-3 h-3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                ))
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
