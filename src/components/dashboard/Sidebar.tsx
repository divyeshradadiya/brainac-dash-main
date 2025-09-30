import {
  Home,
  BookOpen,
  GraduationCap,
  Calendar,
  BarChart3,
  Settings,
  User,
  Trophy,
  MessageSquare,
  Bell,
  ChevronLeft,
  ChevronRight,
  Award,
  Sparkles,
  Target,
  Zap,
  Star,
  Lightbulb,
  Users,
  BookMarked,
  TrendingUp,
  LogOut
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import brainacLogo from "@/assets/brainac-high-resolution-logo-transparent.png";

const navItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/",
    active: true,
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "My Subjects",
    icon: BookOpen,
    href: "/subject/all",
    badge: "8",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    title: "Homework",
    icon: GraduationCap,
    href: "/homework",
    badge: "3",
    gradient: "from-emerald-500 to-emerald-600"
  },
  {
    title: "Quiz",
    icon: Award,
    href: "/quiz",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    title: "Grades",
    icon: BarChart3,
    href: "/grades",
    gradient: "from-cyan-500 to-cyan-600"
  },
  {
    title: "Achievements",
    icon: Trophy,
    href: "/achievements",
    badge: "2",
    gradient: "from-pink-500 to-pink-600"
  },
  {
    title: "Study Groups",
    icon: MessageSquare,
    href: "/groups",
    badge: "3",
    gradient: "from-indigo-500 to-indigo-600"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    gradient: "from-gray-500 to-gray-600"
  },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { logout } = useAuth();
  return (
    <div className={cn(
      "fixed left-0 top-0 h-screen bg-card/95 backdrop-blur-xl border-r border-border shadow-2xl flex flex-col transition-all duration-500 ease-out z-50",
      isCollapsed ? "w-20" : "w-[260px]"
    )}>
      {/* Enhanced Logo Section with Subjects Theme */}
      <div className={cn(
        "relative overflow-hidden border-b border-border transition-all duration-500",
        isCollapsed ? "p-4" : "p-6"
      )}>
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40" />

        <div className="relative z-10">
          {!isCollapsed ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={brainacLogo} 
                    alt="Brainac Logo" 
                    className="h-4 w-auto"
                  />
                  
                </div>
              </div>
                             <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted p-3 rounded-xl backdrop-blur-sm border border-border">
                 <Target className="w-4 h-4 text-primary" />
                 <span className="font-medium">Grade 10 • Advanced Program</span>
               </div>
            </div>
          ) : (
                         <div className="flex flex-col items-center space-y-3">
               <div className="w-12 h-12 bg-gradient-to-br from-primary to-tertiary rounded-2xl flex items-center justify-center shadow-lg">
                 <Sparkles className="w-6 h-6 text-white" />
               </div>
               <div className="text-center">
                 <p className="text-xs font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">10</p>
                 <p className="text-xs text-muted-foreground">Advanced</p>
               </div>
             </div>
          )}
        </div>
      </div>

      {/* Enhanced Navigation with Subjects Theme */}
      <nav className="flex-1 space-y-2 bg-muted/30">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group relative transition-all duration-300 ease-out",
                isActive
                  ? "text-blue-600"
                  : "text-foreground hover:bg-muted/50"
              )
            }
            title={isCollapsed ? item.title : undefined}
          >
            <div className={cn(
              "flex items-center gap-3 px-4 py-3 transition-all duration-300 backdrop-blur-sm",
              isCollapsed ? "justify-center" : "justify-start"
            )}>
              <div className={cn(
                "p-2 rounded-xl transition-all duration-300",
                "bg-card text-muted-foreground shadow-sm"
              )}>
                <item.icon className="w-4 h-4" />
              </div>

              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    {item.badge && (
                      <Badge className="ml-2 bg-primary text-primary-foreground border-0 text-xs font-semibold">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </NavLink>
        ))}
                 <div className="border-t border-border">
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            "w-full transition-all duration-300 ease-out group",
            isCollapsed ? "h-12 justify-center" : "h-12 justify-start px-4"
          )}
        >
                      <div className={cn(
              "p-2 rounded-xl transition-all duration-300",
              "bg-destructive/10 text-destructive group-hover:bg-destructive/20"
            )}>
            <LogOut className="w-4 h-4" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 font-medium text-sm text-destructive group-hover:text-destructive/80">
              Logout
            </span>
          )}
        </Button>
      </div>
      </nav>

      {/* Enhanced Toggle Button with Subjects Theme */}
      <div className="flex justify-center border-t border-border bg-gradient-to-r from-muted/50 to-muted/30">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-10 w-10 hover:bg-primary/20 text-primary hover:text-primary-dark transition-all duration-300 rounded-xl"
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Enhanced Footer with Subjects Theme */}
      {!isCollapsed && (
        <div className="border-t border-border/50 bg-gradient-to-t from-muted/50 to-muted/30">
          <div className="text-center space-y-2">
            <div className="bg-card/80 p-3 backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-tertiary flex items-center justify-center">
                <Lightbulb className="w-3 h-3 text-white" />
              </div>
              <span className="font-medium">Learning Tip</span>
            </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                "Consistency beats perfection. Study a little every day for better retention."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Logout Button */}
      
    </div>
  );
}