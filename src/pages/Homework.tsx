import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, BookOpen, CheckCircle, AlertCircle, Plus, Search, Filter, Upload, GraduationCap, Target, Sparkles, Zap, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  dueTime: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "completed" | "overdue";
  progress: number;
  attachments: number;
  instructor: string;
  points: number;
}

const assignments: Assignment[] = [
  {
    id: "1",
    title: "Algebra Worksheet - Chapter 5",
    subject: "Mathematics",
    description: "Complete problems 1-25 from the textbook. Show all work and solutions.",
    dueDate: "2024-01-15",
    dueTime: "11:59 PM",
    priority: "high",
    status: "in-progress",
    progress: 65,
    attachments: 2,
    instructor: "Mrs. Sarah Smith",
    points: 25
  },
  {
    id: "2",
    title: "Physics Lab Report",
    subject: "Science",
    description: "Write a comprehensive report on the pendulum experiment conducted in class.",
    dueDate: "2024-01-18",
    dueTime: "3:00 PM",
    priority: "medium",
    status: "pending",
    progress: 0,
    attachments: 1,
    instructor: "Mr. David Johnson",
    points: 30
  },
  {
    id: "3",
    title: "Essay on Shakespeare",
    subject: "English Literature",
    description: "Analyze the theme of love in Romeo and Juliet. Minimum 1000 words.",
    dueDate: "2024-01-12",
    dueTime: "11:59 PM",
    priority: "high",
    status: "overdue",
    progress: 0,
    attachments: 0,
    instructor: "Ms. Emily Davis",
    points: 40
  },
  {
    id: "4",
    title: "World War II Timeline",
    subject: "History",
    description: "Create a detailed timeline of major events from 1939-1945.",
    dueDate: "2024-01-20",
    dueTime: "11:59 PM",
    priority: "low",
    status: "pending",
    progress: 0,
    attachments: 0,
    instructor: "Mr. Robert Wilson",
    points: 20
  },
  {
    id: "5",
    title: "Programming Exercise",
    subject: "Computer Science",
    description: "Write a Python program to calculate Fibonacci numbers using recursion.",
    dueDate: "2024-01-16",
    dueTime: "11:59 PM",
    priority: "medium",
    status: "completed",
    progress: 100,
    attachments: 1,
    instructor: "Ms. Lisa Chen",
    points: 15
  },
  {
    id: "6",
    title: "Geography Map Project",
    subject: "Geography",
    description: "Create a detailed map of South America with major cities and landmarks.",
    dueDate: "2024-01-22",
    dueTime: "11:59 PM",
    priority: "low",
    status: "pending",
    progress: 0,
    attachments: 0,
    instructor: "Mr. Michael Brown",
    points: 25
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high": return "bg-destructive/20 text-destructive border-destructive/30";
    case "medium": return "bg-warning/20 text-warning border-warning/30";
    case "low": return "bg-success/20 text-success border-success/30";
    default: return "bg-muted text-muted-foreground border-border";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-success/20 text-success border-success/30";
    case "in-progress": return "bg-primary/20 text-primary border-primary/30";
    case "overdue": return "bg-destructive/20 text-destructive border-destructive/30";
    case "pending": return "bg-muted text-muted-foreground border-border";
    default: return "bg-muted text-muted-foreground border-border";
  }
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

export default function Homework() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPriority, setSelectedPriority] = useState<string>("all");

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || assignment.subject === selectedSubject;
    const matchesStatus = selectedStatus === "all" || assignment.status === selectedStatus;
    const matchesPriority = selectedPriority === "all" || assignment.priority === selectedPriority;
    return matchesSearch && matchesSubject && matchesStatus && matchesPriority;
  });

  const subjects = ["all", ...Array.from(new Set(assignments.map(a => a.subject)))];
  const statuses = ["all", "pending", "in-progress", "completed", "overdue"];
  const priorities = ["all", "high", "medium", "low"];

  // Calculate statistics
  const stats = {
    total: assignments.length,
    completed: assignments.filter(a => a.status === "completed").length,
    inProgress: assignments.filter(a => a.status === "in-progress").length,
    overdue: assignments.filter(a => a.status === "overdue").length
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
          title="Homework Hub 📚"
          subtitle={`${stats.total} Assignments • ${stats.completed} Completed`}
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
                    <p className="text-sm font-medium text-muted-foreground">Total Assignments</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-3xl font-bold text-foreground">{stats.completed}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-success/80 rounded-xl flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-success rounded-full transition-all duration-1000" style={{ width: `${(stats.completed / stats.total) * 100}%` }} />
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
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-sm">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${(stats.inProgress / stats.total) * 100}%` }} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                    <p className="text-3xl font-bold text-foreground">{stats.overdue}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-destructive to-destructive/80 rounded-xl flex items-center justify-center shadow-sm">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-destructive rounded-full transition-all duration-1000" style={{ width: `${(stats.overdue / stats.total) * 100}%` }} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Clean Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search assignments..." 
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              
              <select 
                className="h-12 px-4 bg-card/80 backdrop-blur-sm border border-border rounded-xl text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer min-w-[120px]"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority === "all" ? "All Priority" : priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Simple Assignment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="bg-card/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br", getSubjectColor(assignment.subject))}>
                      <FileText className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex gap-1">
                      <Badge className={cn("text-xs", getPriorityColor(assignment.priority))}>
                        {assignment.priority}
                      </Badge>
                      <Badge className={cn("text-xs", getStatusColor(assignment.status))}>
                        {assignment.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Title and Subject */}
                  <h3 className="font-medium text-foreground mb-1 line-clamp-1">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{assignment.subject}</p>
                  
                  {/* Key Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Due:</span>
                      <span className="font-medium text-foreground">{assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Points:</span>
                      <span className="font-medium text-foreground">{assignment.points}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium text-foreground">{assignment.progress}%</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-1.5 mb-4">
                    <div 
                      className="h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                      style={{ width: `${assignment.progress}%` }}
                    />
                  </div>
                  
                  {/* Action Button */}
                  <Button size="sm" className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground border-0">
                    {assignment.status === "completed" ? "View" : "Submit"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <Card className="bg-card/80 backdrop-blur-sm border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">No assignments found</h3>
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
                  <span>Create Assignment</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2 bg-card/50 hover:bg-card/80 transition-all duration-300">
                  <Calendar className="w-6 h-6" />
                  <span>View Calendar</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-2 bg-card/50 hover:bg-card/80 transition-all duration-300">
                  <Upload className="w-6 h-6" />
                  <span>Bulk Upload</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
