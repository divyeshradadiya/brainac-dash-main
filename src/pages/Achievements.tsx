import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Award, TrendingUp, Calendar, BookOpen, Zap, Heart, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "academic" | "participation" | "leadership" | "creativity" | "sports" | "community";
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  points: number;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  maxProgress?: number;
  requirements: string[];
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Perfect Score Master",
    description: "Achieve 100% on any quiz or assignment",
    category: "academic",
    icon: "🎯",
    rarity: "rare",
    points: 50,
    unlocked: true,
    unlockedDate: "2024-01-15",
    requirements: ["Score 100% on any assessment"]
  },
  {
    id: "2",
    title: "Study Streak Champion",
    description: "Maintain a 7-day study streak",
    category: "participation",
    icon: "🔥",
    rarity: "epic",
    points: 100,
    unlocked: true,
    unlockedDate: "2024-01-20",
    requirements: ["Study for 7 consecutive days"]
  },
  {
    id: "3",
    title: "Subject Explorer",
    description: "Complete assignments in 5 different subjects",
    category: "academic",
    icon: "🌍",
    rarity: "common",
    points: 25,
    unlocked: true,
    unlockedDate: "2024-01-18",
    requirements: ["Complete work in 5+ subjects"]
  },
  {
    id: "4",
    title: "Early Bird",
    description: "Submit 3 assignments before the due date",
    category: "participation",
    icon: "🐦",
    rarity: "common",
    points: 30,
    unlocked: false,
    progress: 2,
    maxProgress: 3,
    requirements: ["Submit 3 assignments early"]
  },
  {
    id: "5",
    title: "Quiz Master",
    description: "Complete 10 quizzes with 90%+ scores",
    category: "academic",
    icon: "🧠",
    rarity: "epic",
    points: 150,
    unlocked: false,
    progress: 7,
    maxProgress: 10,
    requirements: ["Score 90%+ on 10 quizzes"]
  },
  {
    id: "6",
    title: "Creative Genius",
    description: "Submit 5 creative projects",
    category: "creativity",
    icon: "🎨",
    rarity: "rare",
    points: 75,
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    requirements: ["Complete 5 creative projects"]
  },
  {
    id: "7",
    title: "Team Player",
    description: "Participate in 3 group activities",
    category: "leadership",
    icon: "🤝",
    rarity: "common",
    points: 40,
    unlocked: true,
    unlockedDate: "2024-01-12",
    requirements: ["Join 3 group activities"]
  },
  {
    id: "8",
    title: "Perfect Attendance",
    description: "Attend all classes for a month",
    category: "participation",
    icon: "📅",
    rarity: "legendary",
    points: 200,
    unlocked: false,
    progress: 15,
    maxProgress: 22,
    requirements: ["Attend all classes for 30 days"]
  },
  {
    id: "9",
    title: "Speed Learner",
    description: "Complete 3 assignments in one day",
    category: "academic",
    icon: "⚡",
    rarity: "rare",
    points: 60,
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    requirements: ["Complete 3 assignments in 24 hours"]
  },
  {
    id: "10",
    title: "Mentor Helper",
    description: "Help 5 classmates with their studies",
    category: "leadership",
    icon: "💡",
    rarity: "epic",
    points: 120,
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    requirements: ["Assist 5 classmates"]
  }
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "common": return "bg-gray-500";
    case "rare": return "bg-blue-500";
    case "epic": return "bg-purple-500";
    case "legendary": return "bg-yellow-500";
    default: return "bg-gray-500";
  }
};

const getRarityTextColor = (rarity: string) => {
  switch (rarity) {
    case "common": return "text-gray-600";
    case "rare": return "text-blue-600";
    case "epic": return "text-purple-600";
    case "legendary": return "text-yellow-600";
    default: return "text-gray-600";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "academic": return <BookOpen className="w-4 h-4" />;
    case "participation": return <TrendingUp className="w-4 h-4" />;
    case "leadership": return <Crown className="w-4 h-4" />;
    case "creativity": return <Heart className="w-4 h-4" />;
    case "sports": return <Zap className="w-4 h-4" />;
    case "community": return <Target className="w-4 h-4" />;
    default: return <Star className="w-4 h-4" />;
  }
};

export default function Achievements() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === "all" || achievement.category === selectedCategory;
    const matchesRarity = selectedRarity === "all" || achievement.rarity === selectedRarity;
    return matchesCategory && matchesRarity;
  });

  const categories = ["all", "academic", "participation", "leadership", "creativity", "sports", "community"];
  const rarities = ["all", "common", "rare", "epic", "legendary"];

  // Calculate statistics
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((acc, a) => acc + a.points, 0);
  const completionRate = Math.round((unlockedAchievements / totalAchievements) * 100);

  const getCategoryStats = (category: string) => {
    const categoryAchievements = achievements.filter(a => a.category === category);
    const unlocked = categoryAchievements.filter(a => a.unlocked).length;
    const total = categoryAchievements.length;
    return { unlocked, total, percentage: total > 0 ? Math.round((unlocked / total) * 100) : 0 };
  };

  const categoryStats = categories.filter(c => c !== "all").map(category => ({
    category,
    ...getCategoryStats(category)
  }));

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
          title="Achievements 🏆"
          subtitle={`${totalAchievements} Total • ${unlockedAchievements} Unlocked • ${totalPoints} Points`}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6 overflow-auto">
          {/* Enhanced Stats Cards with Subjects Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative">
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500" /> */}
              <Card className="relative bg-white dark:bg-gray-900/90 backdrop-blur-xl border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Points</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent">{totalPoints}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-yellow-500 rounded-full animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500" /> */}
              <Card className="relative bg-white dark:bg-gray-900/90 backdrop-blur-xl border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unlocked</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">{unlockedAchievements}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(unlockedAchievements / totalAchievements) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500" /> */}
              <Card className="relative bg-white dark:bg-gray-900/90 backdrop-blur-xl border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completion</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">{completionRate}%</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${completionRate}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="group relative">
              {/* <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500" /> */}
              <Card className="relative bg-white dark:bg-gray-900/90 backdrop-blur-xl border-0 rounded-2xl overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Remaining</p>
                      <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">{totalAchievements - unlockedAchievements}</p>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${((totalAchievements - unlockedAchievements) / totalAchievements) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Category Progress with Subjects Theme */}
          <Card className="bg-white dark:bg-gray-900/90 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                Category Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryStats.map(({ category, unlocked, total, percentage }) => (
                  <div key={category} className="group relative p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        {getCategoryIcon(category)}
                      </div>
                      <div>
                        <h3 className="font-medium capitalize text-gray-900 dark:text-white">{category}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{unlocked}/{total}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">{percentage}% complete</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Filters with Subjects Theme */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <select
                className="appearance-none h-12 px-4 pr-10 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 cursor-pointer hover:border-blue-400"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-white dark:bg-gray-800">
                    {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative group">
              <select
                className="appearance-none h-12 px-4 pr-10 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 cursor-pointer hover:border-blue-400 min-w-[140px]"
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
              >
                {rarities.map(rarity => (
                  <option key={rarity} value={rarity} className="bg-white dark:bg-gray-800">
                    {rarity === "all" ? "All Rarities" : rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Achievements Grid with Subjects Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="group relative cursor-pointer"
              >
                <div className="absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-75 transition-all duration-500 rounded-2xl blur-lg"
                  style={{
                    background: achievement.unlocked
                      ? 'linear-gradient(to right, #10b981, #3b82f6)'
                      : 'linear-gradient(to right, #6b7280, #9ca3af)'
                  }}
                />
                <Card className="relative bg-white dark:bg-gray-900/90 backdrop-blur-xl border-0 shadow-xl group-hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl group-hover:scale-[1.02]">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <CardTitle className="text-lg text-gray-900 dark:text-white">{achievement.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                              {getCategoryIcon(achievement.category)}
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{achievement.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          className={cn(
                            "text-xs font-medium",
                            getRarityTextColor(achievement.rarity),
                            `bg-${achievement.rarity === 'common' ? 'gray' : achievement.rarity === 'rare' ? 'blue' : achievement.rarity === 'epic' ? 'purple' : 'yellow'}-100`
                          )}
                        >
                          {achievement.rarity}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{achievement.points}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">points</div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>

                    {/* Progress or Unlocked Status */}
                    {achievement.unlocked ? (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50">
                        <Star className="w-4 h-4" />
                        <span className="font-medium text-sm">Unlocked on {achievement.unlockedDate}</span>
                      </div>
                    ) : achievement.progress !== undefined ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="font-medium text-gray-900 dark:text-white">{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700/50">
                        <Target className="w-4 h-4" />
                        <span className="font-medium text-sm">Not started</span>
                      </div>
                    )}

                    {/* Requirements */}
                    <div>
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Requirements:</p>
                      <ul className="space-y-1">
                        {achievement.requirements.map((req, index) => (
                          <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button */}
                    <Button
                      variant={achievement.unlocked ? "outline" : "default"}
                      size="sm"
                      className={cn(
                        "w-full transition-all duration-300",
                        achievement.unlocked
                          ? "bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-white/20 hover:bg-white/80 dark:hover:bg-gray-900/80"
                          : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
                      )}
                      disabled={achievement.unlocked}
                    >
                      {achievement.unlocked ? (
                        <>
                          <Star className="w-4 h-4 mr-2" />
                          Unlocked
                        </>
                      ) : (
                        <>
                          <Target className="w-4 h-4 mr-2" />
                          Work Towards
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {filteredAchievements.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No achievements found</h3>
              <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
