import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Star, Share2, ArrowLeft } from "lucide-react";
import { apiService } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface SubjectData {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  animatedNumbers: string[];
  totalUnits: number;
  totalChapters: number;
  totalExplainers: number;
}

interface Unit {
  id: string;
  name: string;
  progress: number;
  bgColor: string;
  borderColor: string;
}

interface Chapter {
  id: string;
  name: string;
  unitId: number;
  totalExplainers: number;
}

interface Explainer {
  id: string;
  chapterId: string;
  title: string;
  duration: string;
  thumbnail: string;
  description: string;
  tags: string[];
  difficulty: string;
  views: number;
}

interface BookData {
  id: string;
  subject: string;
  title: string;
  description: string;
  duration: string;
  studyTime: string;
  earnPercentage: string;
}

interface BookData {
  id: string;
  subject: string;
  title: string;
  description: string;
  duration: string;
  studyTime: string;
  earnPercentage: string;
}

export function BookDetail() {
  const { bookId, subject } = useParams<{ bookId: string; subject: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string>(subject || '');
  const [subjectData, setSubjectData] = useState<SubjectData | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [explainers, setExplainers] = useState<Explainer[]>([]);
  const [availableSubjects, setAvailableSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeItems, setActiveItems] = useState<{ [key: string]: string }>({
    units: "1",
    chapters: "1.1", 
    explainers: "1"
  });

  const [bookData, setBookData] = useState<BookData | null>(null);

  // Load available subjects for the user's class
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setLoading(true);
        const subjectsResponse = await apiService.getSubjects();
        console.log(subjectsResponse)
        setAvailableSubjects(subjectsResponse.subjects || []);
        
        // If no subject is selected, select the first available subject
        if (!selectedSubject && subjectsResponse.subjects?.length > 0) {
          setSelectedSubject(subjectsResponse.subjects[0].id);
        }
      } catch (err) {
        console.error('Error loading subjects:', err);
        setError('Failed to load subjects');
      } finally {
        setLoading(false);
      }
    };

    loadSubjects();
  }, []);

  // Load subject details when subject changes
  useEffect(() => {
    const loadSubjectDetails = async () => {
      if (!selectedSubject) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const subjectDetails = await apiService.getSubjectDetails(selectedSubject);
        console.log("subject details", subjectDetails)
        setSubjectData(subjectDetails.subject);
        setUnits(subjectDetails.units || []);
        setChapters(subjectDetails.chapters || []);
        setExplainers(subjectDetails.explainers || []);
        
        // Set active items to first available options
        if (subjectDetails.units?.length > 0) {
          const firstUnit = subjectDetails.units[0];
          const firstChapter = subjectDetails.chapters?.find((ch: Chapter) => ch.unitId === parseInt(firstUnit.id));
          const firstExplainer = subjectDetails.explainers?.find((exp: Explainer) => exp.chapterId === firstChapter?.id);
          
          setActiveItems({
            units: firstUnit.id,
            chapters: firstChapter?.id || "1.1",
            explainers: firstExplainer?.id || "1"
          });
        }
        
      } catch (err) {
        console.error('Error loading subject details:', err);
        setError('Failed to load subject details');
      } finally {
        setLoading(false);
      }
    };

    loadSubjectDetails();
  }, [selectedSubject]);

  // Update book data when subject data changes
  useEffect(() => {
    if (subjectData && user) {
      const totalDuration = explainers.reduce((acc, exp) => {
        // Simple duration calculation - in real app you'd parse the duration string
        return acc + 8; // Average 8 minutes per explainer
      }, 0);
      
      const mockBookData = {
        id: bookId || selectedSubject,
        subject: subjectData.name,
        title: `Brainac Big Book for ${subjectData.name} for Foundation Class ${user.grade}`,
        description: `Brainac Big Book is an AI-powered comprehensive curriculum for ${subjectData.name} for Foundation Class ${user.grade}. It consists of the best questions from dozens of most popular books in the country.`,
        duration: `${Math.floor(totalDuration / 60)} hrs ${totalDuration % 60} mins`,
        studyTime: `${Math.floor(totalDuration * 4.5 / 60)} hrs ${Math.floor(totalDuration * 4.5) % 60} mins`,
        earnPercentage: "49.20%"
      };
      setBookData(mockBookData);
    }
  }, [subjectData, explainers, bookId, selectedSubject, user]);

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
        const firstChapterForUnit = chapters.find((ch: Chapter) => ch.unitId === parseInt(itemId));
        newState.chapters = firstChapterForUnit ? firstChapterForUnit.id : prev.chapters;
        newState.explainers = "1";
      } else if (section === 'chapters') {
        // Reset explainers when chapter changes
        newState.explainers = "1";
      }
      
      return newState;
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading subject details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  // No data state
  if (!subjectData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-accent/5 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No subject data available</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const renderUnits = () => (
    <div className="space-y-3">
      {units.map((unit) => (
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
    const filteredChapters = chapters.filter((chapter: Chapter) => 
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
    const selectedChapter = activeItems.chapters;
    
    // Filter explainers based on selected chapter
    const filteredExplainers = explainers.filter((explainer: Explainer) => 
      explainer.chapterId === selectedChapter
    );
    
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
      <div className={`relative ${subjectData?.bgColor || 'bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5'} overflow-hidden border-b border-border`}>
        {/* Animated Subject-specific Background */}
        <div className="absolute inset-0 opacity-10">
          {(subjectData?.animatedNumbers || []).map((num, index) => (
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
                    key={subj.id}
                    className={`group relative p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
                      selectedSubject === subj.id
                        ? "border-tertiary ring-2 ring-tertiary/20 bg-gradient-to-br from-tertiary/10 to-accent/10 shadow-md"
                        : "border-border hover:border-tertiary/60 bg-card hover:bg-gradient-to-br hover:from-muted/30 hover:to-tertiary/10"
                    }`}
                    onClick={() => handleSubjectChange(subj.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-2xl transition-transform duration-300 ${
                        selectedSubject === subj.id ? "scale-110" : "group-hover:scale-110"
                      }`}>
                        {subj.icon}
                      </div>
                      <div className={`font-semibold text-sm transition-colors duration-300 ${
                        selectedSubject === subj.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        {subj.name}
                      </div>
                    </div>
                    {selectedSubject === subj.id && (
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
                <h2 className="text-lg font-bold text-foreground">{units.length} Units</h2>
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
                <h2 className="text-lg font-bold text-foreground">{chapters.length} Chapters</h2>
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
