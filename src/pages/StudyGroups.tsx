import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Users, Plus, Search, Filter, Calendar, BookOpen, Target, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  description: string;
  members: number;
  maxMembers: number;
  status: "active" | "full" | "invite-only" | "archived";
  lastActivity: string;
  nextMeeting?: string;
  topics: string[];
  instructor?: string;
  isMember: boolean;
  isAdmin: boolean;
  memberAvatars: string[];
}

const studyGroups: StudyGroup[] = [
  {
    id: "1",
    name: "Algebra Study Squad",
    subject: "Mathematics",
    description: "A collaborative group for mastering algebraic concepts and solving complex equations together.",
    members: 8,
    maxMembers: 10,
    status: "active",
    lastActivity: "2 hours ago",
    nextMeeting: "Tomorrow, 3:00 PM",
    topics: ["Linear Equations", "Quadratic Functions", "Polynomials"],
    instructor: "Mrs. Sarah Smith",
    isMember: true,
    isAdmin: false,
    memberAvatars: [
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png"
    ]
  },
  {
    id: "2",
    name: "Physics Lab Partners",
    subject: "Science",
    description: "Group for physics lab experiments, theory discussions, and homework help.",
    members: 6,
    maxMembers: 8,
    status: "active",
    lastActivity: "1 day ago",
    nextMeeting: "Friday, 2:00 PM",
    topics: ["Mechanics", "Thermodynamics", "Wave Physics"],
    instructor: "Mr. David Johnson",
    isMember: true,
    isAdmin: true,
    memberAvatars: [
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png"
    ]
  },
  {
    id: "3",
    name: "Literature Circle",
    subject: "English Literature",
    description: "Deep dive into classic literature with thoughtful discussions and analysis.",
    members: 12,
    maxMembers: 15,
    status: "active",
    lastActivity: "3 hours ago",
    nextMeeting: "Today, 4:30 PM",
    topics: ["Shakespeare", "Modern Poetry", "Novel Analysis"],
    instructor: "Ms. Emily Davis",
    isMember: false,
    isAdmin: false,
    memberAvatars: [
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png"
    ]
  },
  {
    id: "4",
    name: "History Buffs",
    subject: "History",
    description: "Exploring historical events, analyzing sources, and understanding the past.",
    members: 10,
    maxMembers: 10,
    status: "full",
    lastActivity: "5 hours ago",
    nextMeeting: "Monday, 1:00 PM",
    topics: ["World War II", "Ancient Civilizations", "Modern History"],
    instructor: "Mr. Robert Wilson",
    isMember: false,
    isAdmin: false,
    memberAvatars: [
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png"
    ]
  },
  {
    id: "5",
    name: "Code Crafters",
    subject: "Computer Science",
    description: "Programming practice, algorithm discussions, and project collaboration.",
    members: 7,
    maxMembers: 12,
    status: "active",
    lastActivity: "30 minutes ago",
    nextMeeting: "Wednesday, 5:00 PM",
    topics: ["Python", "Data Structures", "Web Development"],
    instructor: "Ms. Lisa Chen",
    isMember: true,
    isAdmin: false,
    memberAvatars: [
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png"
    ]
  },
  {
    id: "6",
    name: "Geography Explorers",
    subject: "Geography",
    description: "Mapping the world, understanding cultures, and exploring natural phenomena.",
    members: 9,
    maxMembers: 12,
    status: "active",
    lastActivity: "1 day ago",
    nextMeeting: "Thursday, 11:00 AM",
    topics: ["Physical Geography", "Human Geography", "Cartography"],
    instructor: "Mr. Michael Brown",
    isMember: false,
    isAdmin: false,
    memberAvatars: [
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png",
      "https://github.com/shadcn.png"
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-success";
    case "full": return "bg-warning";
    case "invite-only": return "bg-primary";
    case "archived": return "bg-muted";
    default: return "bg-muted";
  }
};

const getStatusTextColor = (status: string) => {
  switch (status) {
    case "active": return "text-success";
    case "full": return "text-warning";
    case "invite-only": return "text-primary";
    case "archived": return "text-muted-foreground";
    default: return "text-muted-foreground";
  }
};

export default function StudyGroups() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "all" || group.subject === selectedSubject;
    const matchesStatus = selectedStatus === "all" || group.status === selectedStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const subjects = ["all", ...Array.from(new Set(studyGroups.map(g => g.subject)))];
  const statuses = ["all", "active", "full", "invite-only", "archived"];

  // Calculate statistics
  const totalGroups = studyGroups.length;
  const myGroups = studyGroups.filter(g => g.isMember).length;
  const totalMembers = studyGroups.reduce((acc, g) => acc + g.members, 0);
  const availableSpots = studyGroups.reduce((acc, g) => acc + (g.maxMembers - g.members), 0);

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
        <Header
          title="Study Groups 👥"
          subtitle={`${totalGroups} Total Groups • ${myGroups} My Groups • ${totalMembers} Members`}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
         
          {/* Enhanced Search and Filters with Subjects Theme */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
              <Input 
                placeholder="Search study groups..." 
                className="h-12 pl-12 pr-4 border-2 border-border rounded-xl bg-card/70 backdrop-blur-sm focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-foreground placeholder-muted-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
            
            <div className="flex gap-2">
              <div className="relative group">
                <select 
                  className="appearance-none h-12 px-4 pr-10 border-2 border-border rounded-xl bg-card/70 backdrop-blur-sm text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer hover:border-primary/60 min-w-[140px]"
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  {subjects.map(subject => (
                    <option key={subject} value={subject} className="bg-card">
                      {subject === "all" ? "All Subjects" : subject}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="relative group">
                <select 
                  className="appearance-none h-12 px-4 pr-10 border-2 border-border rounded-xl bg-card/70 backdrop-blur-sm text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 cursor-pointer hover:border-primary/60 min-w-[140px]"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {statuses.map(status => (
                    <option key={status} value={status} className="bg-card">
                      {status === "all" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

                    {/* Simple Study Group Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGroups.map((group) => (
              <Card key={group.id} className="bg-card/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex gap-1">
                      <Badge className={cn("text-xs", getStatusTextColor(group.status))}>
                        {group.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {group.members}/{group.maxMembers}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Title and Subject */}
                  <h3 className="font-medium text-foreground mb-1 line-clamp-1">
                    {group.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{group.subject}</p>
                  
                  {/* Key Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Members:</span>
                      <span className="font-medium text-foreground">{group.members}/{group.maxMembers}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Activity:</span>
                      <span className="font-medium text-foreground">{group.lastActivity}</span>
                    </div>
                    {group.nextMeeting && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Next:</span>
                        <span className="font-medium text-foreground">{group.nextMeeting}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Member Avatars */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex -space-x-1">
                      {group.memberAvatars.slice(0, 3).map((avatar, index) => (
                        <Avatar key={index} className="w-6 h-6 border border-white">
                          <AvatarImage src={avatar} />
                          <AvatarFallback className="text-xs">U</AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members > 3 && (
                        <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium border border-background">
                          +{group.members - 3}
                        </div>
                      )}
                    </div>
                    {group.instructor && (
                      <span className="text-xs text-muted-foreground ml-2">by {group.instructor}</span>
                    )}
                  </div>
                  
                  {/* Action Button */}
                  <Button 
                    size="sm" 
                    className={cn(
                      "w-full",
                      group.isMember 
                        ? "bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success text-primary-foreground border-0"
                        : group.status === "full"
                        ? "bg-muted text-muted-foreground border-0"
                        : "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground border-0"
                    )}
                    disabled={group.status === "full"}
                  >
                    {group.isMember 
                      ? (group.isAdmin ? "Manage" : "View") 
                      : group.status === "full" 
                      ? "Group Full" 
                      : "Join Group"
                    }
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">No study groups found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Enhanced Quick Actions with Subjects Theme */}
          <Card className="bg-card/90 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 bg-card/50 backdrop-blur-xl border-border/20 hover:bg-card/80 transition-all duration-300"
                >
                  <Plus className="w-6 h-6" />
                  <span>Create New Group</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 bg-card/50 backdrop-blur-xl border-border/20 hover:bg-card/80 transition-all duration-300"
                >
                  <MessageSquare className="w-6 h-6" />
                  <span>View Messages</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex-col gap-2 bg-card/50 backdrop-blur-xl border-border/20 hover:bg-card/80 transition-all duration-300"
                >
                  <Calendar className="w-6 h-6" />
                  <span>Schedule Meeting</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
