import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, User, BookOpen, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressCardProps {
  title: string;
  progress: number;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image?: string;
  onClick?: () => void;
}

export function ProgressCard({ title, progress, instructor, duration, level, onClick }: ProgressCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": 
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "Intermediate": 
        return "bg-accent/10 text-accent border-accent/20";
      case "Advanced": 
        return "bg-primary/10 text-primary border-primary/20";
      default: 
        return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Beginner": return <BookOpen className="w-3 h-3" />;
      case "Intermediate": return <Target className="w-3 h-3" />;
      case "Advanced": return <Zap className="w-3 h-3" />;
      default: return <BookOpen className="w-3 h-3" />;
    }
  };

  return (
    <Card 
      className="bg-gradient-to-br from-white/95 via-accent-50/20 to-tertiary-50/10 border border-border/50 rounded-xl shadow-card backdrop-blur-sm group relative overflow-hidden cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
              {title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4" />
              <span className="font-medium">{instructor}</span>
            </div>
          </div>
          
          <Badge className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-semibold shadow-lg transition-all duration-300 group-hover:scale-105",
            getLevelColor(level)
          )}>
            {getLevelIcon(level)}
            {level}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-5 relative z-10">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Learning Progress</span>
            </div>
            <span className="text-lg font-bold text-primary group-hover:text-primary-dark transition-colors duration-300">
              {progress}%
            </span>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="relative">
            <Progress 
              value={progress} 
              className="h-3 progress-modern" 
            />
            
            {/* Progress Indicator */}
            <div className="absolute -top-1 left-0 w-4 h-4 bg-accent rounded-full border-2 border-background shadow-lg transform -translate-x-2 transition-all duration-1000 ease-out group-hover:scale-125 group-hover:shadow-xl" />
          </div>
        </div>
        
        {/* Course Details */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/30 group-hover:bg-muted/70 group-hover:border-border/50 transition-all duration-300">
            <Clock className="w-4 h-4 text-accent" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Duration</p>
              <p className="text-sm font-semibold text-foreground truncate">{duration}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border/30 group-hover:bg-muted/70 group-hover:border-border/50 transition-all duration-300">
            <BookOpen className="w-4 h-4 text-secondary" />
            <div className="min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Level</p>
              <p className="text-sm font-semibold text-foreground">{level}</p>
            </div>
          </div>
        </div>
        
        {/* Action Button */}
        <div className="pt-2">
          <button 
            className="w-full py-2.5 px-4 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 rounded-lg text-primary font-medium transition-all duration-300 group-hover:shadow-md group-hover:scale-[1.02] flex items-center justify-center gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            <BookOpen className="w-4 h-4" />
            Continue Learning
          </button>
        </div>
      </CardContent>
    </Card>
  );
}