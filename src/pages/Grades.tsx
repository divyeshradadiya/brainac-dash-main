import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Search, BarChart3, TrendingUp, TrendingDown, Target, Award, Filter, Calendar, BookOpen, GraduationCap, Sparkles, Zap, FileText, User, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Grade {
  id: string;
  title: string;
  subject: string;
  type: "Quiz" | "Assignment" | "Exam" | "Project" | "Participation";
  score: number;
  maxScore: number;
  percentage: number;
  letterGrade: string;
  date: string;
  instructor: string;
  weight: number;
  category: string;
  feedback?: string;
}

const grades: Grade[] = [
  {
    id: "1",
    title: "Algebra Quiz - Chapter 5",
    subject: "Mathematics",
    type: "Quiz",
    score: 18,
    maxScore: 20,
    percentage: 90,
    letterGrade: "A-",
    date: "2024-01-15",
    instructor: "Mrs. Sarah Smith",
    weight: 15,
    category: "Assessment"
  },
  {
    id: "2",
    title: "Physics Lab Report",
    subject: "Science",
    type: "Assignment",
    score: 27,
    maxScore: 30,
    percentage: 90,
    letterGrade: "A-",
    date: "2024-01-18",
    instructor: "Mr. David Johnson",
    weight: 20,
    category: "Assignment"
  },
  {
    id: "3",
    title: "Shakespeare Essay",
    subject: "English Literature",
    type: "Assignment",
    score: 36,
    maxScore: 40,
    percentage: 90,
    letterGrade: "A-",
    date: "2024-01-12",
    instructor: "Ms. Emily Davis",
    weight: 25,
    category: "Assignment"
  },
  {
    id: "4",
    title: "World War II Timeline",
    subject: "History",
    type: "Project",
    score: 18,
    maxScore: 20,
    percentage: 90,
    letterGrade: "A-",
    date: "2024-01-20",
    instructor: "Mr. Robert Wilson",
    weight: 15,
    category: "Project"
  },
  {
    id: "5",
    title: "Programming Exercise",
    subject: "Computer Science",
    type: "Assignment",
    score: 13,
    maxScore: 15,
    percentage: 87,
    letterGrade: "B+",
    date: "2024-01-16",
    instructor: "Ms. Lisa Chen",
    weight: 10,
    category: "Assignment"
  },
  {
    id: "6",
    title: "Geography Map Project",
    subject: "Geography",
    type: "Project",
    score: 22,
    maxScore: 25,
    percentage: 88,
    letterGrade: "B+",
    date: "2024-01-22",
    instructor: "Mr. Michael Brown",
    weight: 15,
    category: "Project"
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case "Quiz": return "bg-primary/20 text-primary border-primary/30";
    case "Assignment": return "bg-secondary/20 text-secondary border-secondary/30";
    case "Exam": return "bg-destructive/20 text-destructive border-destructive/30";
    case "Project": return "bg-tertiary/20 text-tertiary border-tertiary/30";
    case "Participation": return "bg-accent/20 text-accent border-accent/30";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

const getGradeColor = (percentage: number) => {
  if (percentage >= 90) return "bg-success/20 text-success border-success/30";
  if (percentage >= 80) return "bg-primary/20 text-primary border-primary/30";
  if (percentage >= 70) return "bg-warning/20 text-warning border-warning/30";
  if (percentage >= 60) return "bg-accent/20 text-accent border-accent/30";
  return "bg-destructive/20 text-destructive border-destructive/30";
};

const getSubjectColor = (subject: string) => {
  const colors = {
    "Mathematics": "from-primary to-primary/80",
    "Science": "from-secondary to-secondary/80",
    "English Literature": "from-tertiary to-tertiary/80",
    "History": "from-accent to-accent/80",
    "Computer Science": "from-primary to-secondary",
    "Geography": "from-secondary to-accent"
  };
  return colors[subject as keyof typeof colors] || "from-muted to-muted/80";
};

export default function Grades() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredGrades = grades.filter(grade => {
    const matchesSearch = grade.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         grade.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || grade.subject === selectedSubject;
    const matchesType = selectedType === "all" || grade.type === selectedType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const subjects = ["all", ...Array.from(new Set(grades.map(g => g.subject)))];
  const types = ["all", "Quiz", "Assignment", "Exam", "Project", "Participation"];

  // Calculate statistics
  const stats = {
    total: grades.length,
    average: Math.round(grades.reduce((sum, grade) => sum + grade.percentage, 0) / grades.length),
    highest: Math.max(...grades.map(g => g.percentage)),
    lowest: Math.min(...grades.map(g => g.percentage))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
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
          title="Grade Center 📊"
          subtitle={`${stats.total} Grades • ${stats.average}% Average`}
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
                    <p className="text-sm font-medium text-muted-foreground">Total Grades</p>
                    <p className="text-3xl font-bold text-foreground">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-sm">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-full bg-primary rounded-full" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Average Grade</p>
                    <p className="text-3xl font-bold text-foreground">{stats.average}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-success/80 rounded-xl flex items-center justify-center shadow-sm">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full transition-all duration-1000" style={{ width: `${stats.average}%` }} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Highest Score</p>
                    <p className="text-3xl font-bold text-foreground">{stats.highest}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-tertiary to-tertiary/80 rounded-xl flex items-center justify-center shadow-sm">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full transition-all duration-1000" style={{ width: `${stats.highest}%` }} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Lowest Score</p>
                    <p className="text-3xl font-bold text-foreground">{stats.lowest}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-warning to-warning/80 rounded-xl flex items-center justify-center shadow-sm">
                    <TrendingDown className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-warning rounded-full transition-all duration-1000" style={{ width: `${stats.lowest}%` }} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clean Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search grades..." 
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
                className="h-12 px-4 bg-card/80 backdrop-blur-sm border border-border rounded-xl text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer min-w-[140px]"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === "all" ? "All Types" : type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clean Grade Table */}
          <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 font-semibold text-foreground">Assignment</th>
                      <th className="text-left p-4 font-semibold text-foreground">Subject</th>
                      <th className="text-left p-4 font-semibold text-foreground">Type</th>
                      <th className="text-left p-4 font-semibold text-foreground">Score</th>
                      <th className="text-left p-4 font-semibold text-foreground">Grade</th>
                      <th className="text-left p-4 font-semibold text-foreground">Weight</th>
                      <th className="text-left p-4 font-semibold text-foreground">Date</th>
                      <th className="text-left p-4 font-semibold text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGrades.map((grade) => (
                      <tr key={grade.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br", getSubjectColor(grade.subject))}>
                              <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-medium text-foreground">{grade.title}</h3>
                              <p className="text-sm text-muted-foreground">{grade.instructor}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-foreground">{grade.subject}</span>
                        </td>
                        <td className="p-4">
                          <Badge className={cn("text-xs", getTypeColor(grade.type))}>
                            {grade.type}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">{grade.score}/{grade.maxScore}</span>
                            <span className="text-xs text-muted-foreground">{grade.percentage}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={cn("text-xs font-bold", getGradeColor(grade.percentage))}>
                            {grade.letterGrade}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-foreground">{grade.weight}%</span>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-foreground">{new Date(grade.date).toLocaleDateString()}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground border-0">
                              <BarChart3 className="w-4 h-4 mr-1" />
                              Details
                            </Button>
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

          {filteredGrades.length === 0 && (
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No grades found</h3>
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
                  <BarChart3 className="w-6 h-6" />
                  <span>View Analytics</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2 bg-card/50 hover:bg-card/80 transition-all duration-300">
                  <TrendingUp className="w-6 h-6" />
                  <span>Progress Report</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2 bg-card/50 hover:bg-card/80 transition-all duration-300">
                  <Award className="w-6 h-6" />
                  <span>Export Grades</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
