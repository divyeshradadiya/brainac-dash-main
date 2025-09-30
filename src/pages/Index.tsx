import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  Trophy,
  TrendingUp,
  Target,
  Calendar,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
  BarChart3,
  Award,
  Users,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Heart,
  Gift,
  Clock as ClockIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [hoveredBanner, setHoveredBanner] = useState<number | null>(null);
  const navigate = useNavigate();

  // Auto-swipe carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % 6); // 6 banners total
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Banner click handlers
  const handleBannerClick = (bannerIndex: number) => {
    switch (bannerIndex) {
      case 0: // Scholarship
        navigate('/achievements'); // Redirect to achievements since scholarships page doesn't exist
        break;
      case 1: // Study Streak
        navigate('/achievements');
        break;
      case 2: // Weekly Challenge
        navigate('/quiz'); // Redirect to quiz since challenges page doesn't exist
        break;
      case 3: // Points Bonus
        navigate('/achievements'); // Redirect to achievements since rewards page doesn't exist
        break;
      case 4: // Study Groups
        navigate('/study-groups');
        break;
      case 5: // Exam Prep
        navigate('/homework'); // Redirect to homework since workshops page doesn't exist
        break;
    }
  };

  // Mock data for the dashboard
  const dashboardData = {
    overallProgress: 78,
    studyStreak: 12,
    totalPoints: 2840,
    weeklyGoal: 85,
    subjects: [
      { name: "Mathematics", progress: 85, color: "from-primary to-primary/80", icon: "📐" },
      { name: "Physics", progress: 72, color: "from-tertiary to-tertiary/80", icon: "⚡" },
      { name: "English", progress: 91, color: "from-secondary to-secondary/80", icon: "📚" },
      { name: "Chemistry", progress: 68, color: "from-accent to-accent/80", icon: "🧪" }
    ],
    upcomingTasks: [
      { title: "Math Quiz - Chapter 5", subject: "Mathematics", due: "Today", priority: "high" },
      { title: "Physics Lab Report", subject: "Physics", due: "Tomorrow", priority: "medium" },
      { title: "English Essay", subject: "English", due: "Friday", priority: "low" }
    ],
    recentAchievements: [
      { title: "Perfect Score!", description: "Math Quiz Chapter 4", points: 100, icon: "🎯" },
      { title: "Study Streak", description: "7 days in a row", points: 50, icon: "🔥" },
      { title: "Quick Learner", description: "Completed 5 lessons", points: 75, icon: "⚡" }
    ],
    studyStats: {
      hoursThisWeek: 24.5,
      hoursLastWeek: 18.2,
      improvement: "+34%",
      goalCompletion: 82
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/20 text-destructive border-destructive/30";
      case "medium": return "bg-warning/20 text-warning border-warning/30";
      case "low": return "bg-success/20 text-success border-success/30";
      default: return "bg-muted text-muted-foreground border-border";
    }
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
          title="Welcome back, Alex! 🎓"
          subtitle="Here's your learning progress this week"
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Enhanced Interactive Banners Carousel */}
        <div className="px-6 py-4">
          <div className="relative">
            {/* Carousel Container */}
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${currentBanner * 100}%)` }}
              >
                {/* Scholarship Banner */}
                <div
                  className="w-full flex-shrink-0 relative overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHoveredBanner(0)}
                  onMouseLeave={() => setHoveredBanner(null)}
                  onClick={() => handleBannerClick(0)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-primary font-bold text-lg">🎓</span>
                    </div>
                  </div>
                  <div className="relative bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/40 h-[380px] flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                      <Badge className="bg-primary/20 text-primary border-primary/30 backdrop-blur-sm">
                        <Gift className="w-3 h-3 mr-1" />
                        Limited Time
                      </Badge>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        <span className="text-xs text-red-600 font-medium">23 days left</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-primary font-bold text-2xl mb-3 group-hover:text-primary/80 transition-colors duration-300">
                        🎓 100% Scholarship Available!
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        Merit-based scholarships for top performers. Don't miss this opportunity!
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Applications received</span>
                          <span className="font-semibold text-primary">1,247</span>
                        </div>
                        <Progress value={75} className="h-2 bg-primary/20 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-primary/80" />
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>No essay required</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Full tuition coverage</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        Apply Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                      <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-sm text-muted-foreground">Deadline: Dec 31</p>
                        <p className="text-xs text-muted-foreground">Success rate: 15%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Study Streak Banner */}
                <div
                  className="w-full flex-shrink-0 relative overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHoveredBanner(1)}
                  onMouseLeave={() => setHoveredBanner(null)}
                  onClick={() => handleBannerClick(1)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/10 to-pink-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4">
                    <Heart className="w-6 h-6 text-orange-500 animate-pulse" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-orange-600 font-bold text-lg">🔥</span>
                    </div>
                  </div>
                  <div className="relative bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-500/30 p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-orange-500/50 h-[380px] flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                      <Badge className="bg-orange-500/20 text-orange-600 border-orange-500/30 backdrop-blur-sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-600 font-medium">Personal Best!</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-orange-700 font-bold text-2xl mb-3 group-hover:text-orange-600 transition-colors duration-300">
                        🔥 {dashboardData.studyStreak} Day Study Streak!
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        Keep the momentum going! You're on fire!
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress to next milestone</span>
                          <span className="font-semibold text-orange-600">{dashboardData.studyStreak}/15 days</span>
                        </div>
                        <Progress value={(dashboardData.studyStreak / 15) * 100} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-orange-500 [&>div]:to-red-500" />
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="bg-card/50 rounded-lg p-2">
                            <div className="text-lg font-bold text-orange-600">{dashboardData.studyStreak}</div>
                            <div className="text-xs text-muted-foreground">Current</div>
                          </div>
                          <div className="bg-card/50 rounded-lg p-2">
                            <div className="text-lg font-bold text-orange-600">15</div>
                            <div className="text-xs text-muted-foreground">Next Goal</div>
                          </div>
                          <div className="bg-card/50 rounded-lg p-2">
                            <div className="text-lg font-bold text-orange-600">+3</div>
                            <div className="text-xs text-muted-foreground">Days Left</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        Continue Learning
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                      <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-sm text-muted-foreground">Next milestone: 15 days</p>
                        <p className="text-xs text-muted-foreground">Reward: +500 points</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekly Challenge Banner */}
                <div
                  className="w-full flex-shrink-0 relative overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHoveredBanner(2)}
                  onMouseLeave={() => setHoveredBanner(null)}
                  onClick={() => handleBannerClick(2)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-indigo-500/10 to-blue-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4">
                    <Trophy className="w-6 h-6 text-purple-500 animate-pulse" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-purple-600 font-bold text-lg">🏆</span>
                    </div>
                  </div>
                  <div className="relative bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-blue-500/10 border border-purple-500/30 p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-purple-500/50 h-[380px] flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                      <Badge className="bg-purple-500/20 text-purple-600 border-purple-500/30 backdrop-blur-sm">
                        <Star className="w-3 h-3 mr-1" />
                        New
                      </Badge>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                        <span className="text-xs text-purple-600 font-medium">3 days left</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-purple-700 font-bold text-2xl mb-3 group-hover:text-purple-600 transition-colors duration-300">
                        🏆 Weekly Challenge
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        Complete 5 lessons this week and earn bonus points!
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Your progress</span>
                          <span className="font-semibold text-purple-600">3/5 lessons</span>
                        </div>
                        <Progress value={60} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-indigo-500" />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span>Math Quiz</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span>Physics Lab</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              <span>English Essay</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-600">+250</div>
                            <div className="text-xs text-muted-foreground">Points reward</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <Button className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        Join Challenge
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                      <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-sm text-muted-foreground">3 days remaining</p>
                        <p className="text-xs text-muted-foreground">2,847 participants</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Points Bonus Banner */}
                <div
                  className="w-full flex-shrink-0 relative overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHoveredBanner(3)}
                  onMouseLeave={() => setHoveredBanner(null)}
                  onClick={() => handleBannerClick(3)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/10 to-teal-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4">
                    <Star className="w-6 h-6 text-green-500 animate-pulse" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-green-600 font-bold text-lg">⭐</span>
                    </div>
                  </div>
                  <div className="relative bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 border border-green-500/30 p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-green-500/50 h-[380px] flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                      <Badge className="bg-green-500/20 text-green-600 border-green-500/30 backdrop-blur-sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Bonus
                      </Badge>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                        <span className="text-xs text-green-600 font-medium">Live Now!</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-green-700 font-bold text-2xl mb-3 group-hover:text-green-600 transition-colors duration-300">
                        ⭐ Double Points Weekend!
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        Earn 2x points on all activities this weekend!
                      </p>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-card/50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-green-600">2x</div>
                            <div className="text-xs text-muted-foreground">Points Multiplier</div>
                          </div>
                          <div className="bg-card/50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-green-600">48h</div>
                            <div className="text-xs text-muted-foreground">Time Remaining</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Your points earned today</span>
                          <span className="font-semibold text-green-600">+1,240</span>
                        </div>
                        <Progress value={65} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-green-500 [&>div]:to-emerald-500" />
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>All subjects included</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>No limits</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <Button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        Start Earning
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                      <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-sm text-muted-foreground">Ends Sunday</p>
                        <p className="text-xs text-muted-foreground">12,847 active users</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Study Group Banner */}
                <div
                  className="w-full flex-shrink-0 relative overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHoveredBanner(4)}
                  onMouseLeave={() => setHoveredBanner(null)}
                  onClick={() => handleBannerClick(4)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/10 to-indigo-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4">
                    <Users className="w-6 h-6 text-cyan-500 animate-pulse" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-cyan-600 font-bold text-lg">👥</span>
                    </div>
                  </div>
                  <div className="relative bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 border border-cyan-500/30 p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-cyan-500/50 h-[380px] flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" />
                      <Badge className="bg-cyan-500/20 text-cyan-600 border-cyan-500/30 backdrop-blur-sm">
                        <Users className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                        <span className="text-xs text-cyan-600 font-medium">15 groups</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-cyan-700 font-bold text-2xl mb-3 group-hover:text-cyan-600 transition-colors duration-300">
                        👥 Join Study Groups
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        Connect with fellow learners and study together!
                      </p>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-card/50 rounded-lg p-2 text-center">
                            <div className="text-lg font-bold text-cyan-600">15</div>
                            <div className="text-xs text-muted-foreground">Active Groups</div>
                          </div>
                          <div className="bg-card/50 rounded-lg p-2 text-center">
                            <div className="text-lg font-bold text-cyan-600">247</div>
                            <div className="text-xs text-muted-foreground">Members</div>
                          </div>
                          <div className="bg-card/50 rounded-lg p-2 text-center">
                            <div className="text-lg font-bold text-cyan-600">8</div>
                            <div className="text-xs text-muted-foreground">Online Now</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Real-time chat</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Video calls</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Your group activity</span>
                          <span className="font-semibold text-cyan-600">3 sessions this week</span>
                        </div>
                        <Progress value={75} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-cyan-500 [&>div]:to-blue-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <Button className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        Find Groups
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                      <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-sm text-muted-foreground">15 active groups</p>
                        <p className="text-xs text-muted-foreground">Next session: 2pm</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exam Prep Banner */}
                <div
                  className="w-full flex-shrink-0 relative overflow-hidden group cursor-pointer"
                  onMouseEnter={() => setHoveredBanner(5)}
                  onMouseLeave={() => setHoveredBanner(null)}
                  onClick={() => handleBannerClick(5)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-pink-500/10 to-red-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4">
                    <ClockIcon className="w-6 h-6 text-rose-500 animate-pulse" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-rose-500/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <span className="text-rose-600 font-bold text-lg">📚</span>
                    </div>
                  </div>
                  <div className="relative bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-red-500/10 border border-rose-500/30 p-8 hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-rose-500/50 h-[380px] flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
                      <Badge className="bg-rose-500/20 text-rose-600 border-rose-500/30 backdrop-blur-sm">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Urgent
                      </Badge>
                      <div className="ml-auto flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        <span className="text-xs text-red-600 font-medium">5 seats left</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-rose-700 font-bold text-2xl mb-3 group-hover:text-rose-600 transition-colors duration-300">
                        📚 Exam Prep Workshop
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                        Free workshop this Saturday - Limited seats available!
                      </p>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-card/50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-rose-600">5</div>
                            <div className="text-xs text-muted-foreground">Seats Left</div>
                          </div>
                          <div className="bg-card/50 rounded-lg p-3 text-center">
                            <div className="text-2xl font-bold text-rose-600">2d</div>
                            <div className="text-xs text-muted-foreground">Until Event</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Registration progress</span>
                          <span className="font-semibold text-rose-600">95/100 filled</span>
                        </div>
                        <Progress value={95} className="h-2 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-rose-500 [&>div]:to-pink-500" />
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Free admission</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>Expert instructors</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <Button className="bg-rose-500 hover:bg-rose-600 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                        Register Now
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                      <div className="text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-sm text-muted-foreground">5 seats left</p>
                        <p className="text-xs text-muted-foreground">95% full</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Dots Indicator with Navigation */}
            <div className="flex items-center justify-center gap-6 mt-3">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentBanner((prev) => (prev - 1 + 6) % 6)}
                className="w-12 h-12 bg-card/90 hover:bg-card rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl backdrop-blur-sm"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>

              {/* Dots */}
              <div className="flex gap-3 relative z-10">
                {Array.from({ length: 6 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentBanner(index)}
                    className={cn(
                      "w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 border-2",
                      currentBanner === index
                        ? "bg-primary scale-125 shadow-lg border-primary"
                        : "bg-background hover:bg-muted border-muted-foreground/30 hover:border-muted-foreground/50 hover:shadow-md"
                    )}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentBanner((prev) => (prev + 1) % 6)}
                className="w-12 h-12 bg-card/90 hover:bg-card rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl backdrop-blur-sm"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8 overflow-auto">

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-card/95 via-primary/5 to-secondary/5 border-0 shadow-xl backdrop-blur-sm overflow-hidden">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                Quick Actions
              </CardTitle>
              <p className="text-muted-foreground mt-2">Jump into your learning journey with these quick shortcuts</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-4 lg:grid-cols-4 gap-3">
                <div className="group relative">
                  <Button
                    onClick={() => navigate('/subjects-list')}
                    className="w-full h-16 flex-col gap-2 bg-gradient-to-br from-primary via-primary to-secondary hover:from-primary/90 hover:via-primary hover:to-secondary/90 text-primary-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg"
                  >
                    <div className="p-1 bg-card/20 rounded-md backdrop-blur-sm">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold">Start Learning</span>
                  </Button>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-300 -z-10"></div>
                </div>

                <div className="group relative">
                  <Button className="w-full h-16 flex-col gap-2 bg-gradient-to-br from-success via-success to-secondary hover:from-success/90 hover:via-success hover:to-secondary/90 text-success-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg">
                    <div className="p-1 bg-card/20 rounded-md backdrop-blur-sm">
                      <Target className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold">Set Goals</span>
                  </Button>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-300 to-green-400 rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-300 -z-10"></div>
                </div>

                <div className="group relative">
                  <Button className="w-full h-16 flex-col gap-2 bg-gradient-to-br from-accent via-accent to-tertiary hover:from-accent/90 hover:via-accent hover:to-tertiary/90 text-accent-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg">
                    <div className="p-1 bg-card/20 rounded-md backdrop-blur-sm">
                      <Users className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold">Study Groups</span>
                  </Button>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 to-rose-400 rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-300 -z-10"></div>
                </div>

                <div className="group relative">
                  <Button className="w-full h-16 flex-col gap-2 bg-gradient-to-br from-warning via-warning to-accent hover:from-warning/90 hover:via-warning hover:to-accent/90 text-warning-foreground border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg">
                    <div className="p-1 bg-card/20 rounded-md backdrop-blur-sm">
                      <Trophy className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-semibold">Achievements</span>
                  </Button>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-300 -z-10"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Subject Progress */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-to-br from-card/95 via-muted/5 to-muted/10 border-0 shadow-xl backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    Subject Progress
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">Track your learning journey across all subjects</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.subjects.map((subject, index) => (
                    <div key={index} className="group relative p-4 rounded-xl bg-gradient-to-r from-card/80 via-card/60 to-card/40 border border-border/60 hover:border-border/80 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg shadow-sm">
                              <span className="text-xl">{subject.icon}</span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground text-sm">{subject.name}</h4>
                              <p className="text-xs text-muted-foreground font-medium">{subject.progress}% complete</p>
                            </div>
                          </div>
                          <Badge className={cn("bg-gradient-to-r px-3 py-1 text-white border-0 shadow-md font-semibold text-xs", subject.color)}>
                            {subject.progress}%
                          </Badge>
                        </div>
                        <div className="relative">
                          <Progress
                            value={subject.progress}
                            className="h-2 bg-muted rounded-full overflow-hidden [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:via-primary [&>div]:to-secondary [&>div]:shadow-sm"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-8">

              {/* Upcoming Tasks */}
              <Card className="bg-gradient-to-br from-card/95 via-destructive/5 to-warning/5 border-0 shadow-xl backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-destructive to-warning bg-clip-text text-transparent flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-destructive to-warning rounded-xl shadow-lg">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    Upcoming Tasks
                  </CardTitle>
                  <p className="text-muted-foreground mt-1 text-sm">Stay on top of your deadlines</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.upcomingTasks.map((task, index) => (
                    <div key={index} className="group relative p-4 rounded-xl bg-gradient-to-r from-card/70 to-card/50 border border-border/60 hover:border-destructive/60 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-warning/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-foreground text-sm">{task.title}</h4>
                          <Badge className={cn("text-xs font-medium shadow-sm", getPriorityColor(task.priority))}>
                            {task.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground font-medium">{task.subject}</p>
                          <p className="text-xs font-bold text-foreground">{task.due}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card className="bg-gradient-to-br from-card/95 via-warning/5 to-accent/5 border-0 shadow-xl backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-warning to-accent bg-clip-text text-transparent flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-warning to-accent rounded-xl shadow-lg">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    Recent Achievements
                  </CardTitle>
                  <p className="text-muted-foreground mt-1 text-sm">Celebrate your milestones</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dashboardData.recentAchievements.map((achievement, index) => (
                    <div key={index} className="group relative p-4 rounded-xl bg-gradient-to-r from-card/70 to-card/50 border border-border/60 hover:border-warning/60 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-warning/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-gradient-to-br from-warning/20 to-accent/20 rounded-lg shadow-sm">
                            <span className="text-2xl">{achievement.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground text-sm">{achievement.title}</h4>
                            <p className="text-xs text-muted-foreground font-medium">{achievement.description}</p>
                          </div>
                          <Badge className="bg-gradient-to-r from-warning to-accent text-warning-foreground border-0 text-xs font-bold shadow-sm">
                            +{achievement.points}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Study Stats */}
              <Card className="bg-gradient-to-br from-card/95 via-tertiary/5 to-primary/5 border-0 shadow-xl backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    Study Stats
                  </CardTitle>
                  <p className="text-muted-foreground mt-1 text-sm">Your learning analytics</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-tertiary/10 to-primary/10 border border-tertiary/30">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      {dashboardData.studyStats.hoursThisWeek}h
                    </div>
                    <p className="text-sm text-muted-foreground font-medium">This week</p>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-card/70 to-card/50 border border-border/60">
                    <div>
                      <p className="text-sm font-semibold text-foreground">Improvement</p>
                      <p className="text-xs text-muted-foreground font-medium">vs last week</p>
                    </div>
                    <Badge className="bg-gradient-to-r from-success to-secondary text-success-foreground border-0 font-semibold shadow-sm">
                      {dashboardData.studyStats.improvement}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground font-medium">Goal completion</span>
                      <span className="font-bold text-foreground">{dashboardData.studyStats.goalCompletion}%</span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={dashboardData.studyStats.goalCompletion}
                        className="h-3 bg-muted rounded-full overflow-hidden [&>div]:bg-gradient-to-r [&>div]:from-tertiary [&>div]:via-primary [&>div]:to-secondary [&>div]:shadow-sm"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-card/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
