import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, BookOpen, CheckCircle, AlertCircle, Plus, Search, Filter, Award, Target, Sparkles, Zap, FileText, User, Timer, Play, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Quiz {
  id: string;
  title: string;
  subject: string;
  description: string;
  duration: number;
  questions: number;
  difficulty: "easy" | "medium" | "hard";
  status: "available" | "in-progress" | "completed";
  score?: number;
  instructor: string;
  dueDate?: string;
  topics: string[];
}

const quizzes: Quiz[] = [
  {
    id: "1",
    title: "Algebra Fundamentals Quiz",
    subject: "Mathematics",
    description: "Test your knowledge of basic algebraic concepts including equations, inequalities, and functions.",
    duration: 45,
    questions: 25,
    difficulty: "medium",
    status: "completed",
    score: 88,
    instructor: "Mrs. Sarah Smith",
    topics: ["Linear Equations", "Quadratic Functions", "Inequalities"]
  },
  {
    id: "2",
    title: "Physics Mechanics Test",
    subject: "Science",
    description: "Comprehensive test covering Newton's laws, motion, and energy conservation principles.",
    duration: 60,
    questions: 30,
    difficulty: "hard",
    status: "in-progress",
    instructor: "Mr. David Johnson",
    topics: ["Newton's Laws", "Motion", "Energy"]
  },
  {
    id: "3",
    title: "Shakespeare Literature Quiz",
    subject: "English Literature",
    description: "Explore the works of William Shakespeare with questions on themes, characters, and literary devices.",
    duration: 30,
    questions: 20,
    difficulty: "medium",
    status: "available",
    instructor: "Ms. Emily Davis",
    topics: ["Romeo and Juliet", "Macbeth", "Sonnet Analysis"]
  },
  {
    id: "4",
    title: "World War II History Quiz",
    subject: "History",
    description: "Test your knowledge of major events, leaders, and outcomes of World War II.",
    duration: 40,
    questions: 25,
    difficulty: "easy",
    status: "available",
    instructor: "Mr. Robert Wilson",
    topics: ["Major Battles", "Political Leaders", "War Outcomes"]
  },
  {
    id: "5",
    title: "Python Programming Basics",
    subject: "Computer Science",
    description: "Basic Python programming concepts including variables, loops, and functions.",
    duration: 50,
    questions: 30,
    difficulty: "medium",
    status: "completed",
    score: 92,
    instructor: "Ms. Lisa Chen",
    topics: ["Variables", "Loops", "Functions"]
  },
  {
    id: "6",
    title: "Geography of Europe",
    subject: "Geography",
    description: "Test your knowledge of European countries, capitals, and geographical features.",
    duration: 35,
    questions: 20,
    difficulty: "easy",
    status: "available",
    instructor: "Mr. Michael Brown",
    topics: ["Countries", "Capitals", "Landmarks"]
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "easy": return "bg-green-100 text-green-700 border-green-200";
    case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "hard": return "bg-red-100 text-red-700 border-red-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "in-progress": return "bg-blue-100 text-blue-700 border-blue-200";
    case "available": return "bg-gray-100 text-gray-700 border-gray-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getSubjectColor = (subject: string) => {
  const colors = {
    "Mathematics": "from-blue-400 to-blue-500",
    "Science": "from-emerald-400 to-emerald-500",
    "English Literature": "from-purple-400 to-purple-500",
    "History": "from-orange-400 to-orange-500",
    "Computer Science": "from-indigo-400 to-indigo-500",
    "Geography": "from-teal-400 to-teal-500"
  };
  return colors[subject as keyof typeof colors] || "from-gray-400 to-gray-500";
};

export default function Quiz() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || quiz.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === "all" || quiz.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === "all" || quiz.status === selectedStatus;
    return matchesSearch && matchesSubject && matchesDifficulty && matchesStatus;
  });

  const subjects = ["all", ...Array.from(new Set(quizzes.map(q => q.subject)))];
  const difficulties = ["all", "easy", "medium", "hard"];
  const statuses = ["all", "available", "in-progress", "completed"];

  // Calculate statistics
  const stats = {
    total: quizzes.length,
    completed: quizzes.filter(q => q.status === "completed").length,
    available: quizzes.filter(q => q.status === "available").length,
    inProgress: quizzes.filter(q => q.status === "in-progress").length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-muted/20">
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
        <Header
          title="Quiz Center 🏆"
          subtitle={`${stats.total} Available Quizzes • ${stats.completed} Completed`}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Clean Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Total Quizzes</p>
                    <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-full bg-blue-400 rounded-full" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${(stats.completed / stats.total) * 100}%` }} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Available</p>
                    <p className="text-3xl font-bold text-foreground">{stats.available}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full transition-all duration-1000" style={{ width: `${(stats.available / stats.total) * 100}%` }} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                    <p className="text-3xl font-bold text-foreground">{stats.inProgress}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-orange-400 rounded-full transition-all duration-1000" style={{ width: `${(stats.inProgress / stats.total) * 100}%` }} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clean Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search quizzes..." 
                className="h-12 pl-12 pr-4 bg-card/80 backdrop-blur-sm border-border rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select 
                className="h-12 px-4 bg-card/80 backdrop-blur-sm border border-border rounded-xl text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer min-w-[140px]"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject === "all" ? "All Subjects" : subject}
                  </option>
                ))}
              </select>
              
              <select 
                className="h-12 px-4 bg-card/80 backdrop-blur-sm border border-border rounded-xl text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer min-w-[120px]"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
              
              <select 
                className="h-12 px-4 bg-card/80 backdrop-blur-sm border border-border rounded-xl text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer min-w-[120px]"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clean Quiz Table */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold text-foreground">Quiz</th>
                      <th className="text-left p-4 font-semibold text-foreground">Subject</th>
                      <th className="text-left p-4 font-semibold text-foreground">Difficulty</th>
                      <th className="text-left p-4 font-semibold text-foreground">Duration</th>
                      <th className="text-left p-4 font-semibold text-foreground">Questions</th>
                      <th className="text-left p-4 font-semibold text-foreground">Status</th>
                      <th className="text-left p-4 font-semibold text-foreground">Score</th>
                      <th className="text-left p-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuizzes.map((quiz) => (
                      <tr key={quiz.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br", getSubjectColor(quiz.subject))}>
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{quiz.title}</h3>
                              <p className="text-sm text-muted-foreground">{quiz.instructor}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-foreground">{quiz.subject}</span>
                        </td>
                        <td className="p-4">
                          <Badge className={cn("text-xs", getDifficultyColor(quiz.difficulty))}>
                            {quiz.difficulty}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Timer className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">{quiz.duration} min</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-foreground">{quiz.questions}</span>
                        </td>
                        <td className="p-4">
                          <Badge className={cn("text-xs", getStatusColor(quiz.status))}>
                            {quiz.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {quiz.score ? (
                            <span className="text-sm font-medium text-foreground">{quiz.score}%</span>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {quiz.status === "available" ? (
                              <Button size="sm" className="bg-gradient-to-r from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white border-0">
                                <Play className="w-4 h-4 mr-1" />
                                Start
                              </Button>
                            ) : quiz.status === "in-progress" ? (
                              <Button size="sm" className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white border-0">
                                <Clock className="w-4 h-4 mr-1" />
                                Continue
                              </Button>
                            ) : (
                              <Button size="sm" className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white border-0">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Results
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {filteredQuizzes.length === 0 && (
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No quizzes found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-16 flex-col gap-2 bg-card/50 hover:bg-card/80 transition-all duration-300">
                  <Plus className="w-6 h-6" />
                  <span>Create Quiz</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2 bg-card/50 hover:bg-card/80 transition-all duration-300">
                  <Award className="w-6 h-6" />
                  <span>View Results</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2 bg-card/50 hover:bg-card/80 transition-all duration-300">
                  <Target className="w-6 h-6" />
                  <span>Practice Mode</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
