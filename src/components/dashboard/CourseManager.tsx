import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, FileText, Video, Target, Zap, Star, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseManagerProps {
  currentBatch: string;
  progress: number;
  notesCount: number;
  videosCount: number;
  testsCount: number;
}

export function CourseManager({ currentBatch, progress, notesCount, videosCount, testsCount }: CourseManagerProps) {
  return (
    <Card className="bg-gradient-to-br from-white/95 via-secondary-50/30 to-primary-50/20 border-0 shadow-lg backdrop-blur-sm group relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-xl bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl font-bold text-foreground group-hover:text-secondary transition-colors duration-300 flex items-center gap-2">
              <Target className="w-5 h-5 text-secondary" />
              Course Management
            </CardTitle>
            <p className="text-sm text-muted-foreground">Track your learning journey</p>
          </div>
          
          <Badge className="bg-secondary text-secondary-foreground border-secondary/30 text-xs font-semibold shadow-lg transition-all duration-300 group-hover:scale-105">
            {currentBatch}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        {/* Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
            </div>
            <span className="text-lg font-bold text-secondary group-hover:text-secondary-dark transition-colors duration-300">
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

        {/* Content Types Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="group/item relative">
            <div className="p-3 rounded-xl border-2 border-primary/30 hover:border-primary/50 bg-primary/5 hover:bg-primary/10 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-primary/20">
                  <FileText className="w-3 h-3 text-primary" />
                </div>
                <span className="text-xs font-medium text-primary">Notes</span>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{notesCount}</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
          </div>
          
          <div className="group/item relative">
            <div className="p-3 rounded-xl border-2 border-accent/30 hover:border-accent/50 bg-accent/5 hover:bg-accent/10 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-accent/20">
                  <Video className="w-3 h-3 text-accent" />
                </div>
                <span className="text-xs font-medium text-accent">Videos</span>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{videosCount}</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
          </div>
          
          <div className="group/item relative">
            <div className="p-3 rounded-xl border-2 border-tertiary/30 hover:border-tertiary/50 bg-tertiary/5 hover:bg-tertiary/10 transition-all duration-300 hover:shadow-md hover:scale-105 cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-tertiary/20">
                  <BookOpen className="w-3 h-3 text-tertiary" />
                </div>
                <span className="text-xs font-medium text-tertiary">Tests</span>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{testsCount}</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="pt-2 space-y-2">
          <button className="w-full py-2.5 px-4 bg-secondary/10 hover:bg-secondary/20 border border-secondary/20 hover:border-secondary/40 rounded-lg text-secondary font-medium transition-all duration-300 group-hover:shadow-md group-hover:scale-[1.02] flex items-center justify-center gap-2">
            <Zap className="w-4 h-4" />
            Start Learning Session
          </button>
          
          <div className="flex gap-2">
            <button className="flex-1 py-2 px-3 bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 rounded-lg text-primary text-sm font-medium transition-all duration-300 group-hover:shadow-sm group-hover:scale-[1.02] flex items-center justify-center gap-1">
              <Star className="w-3 h-3" />
              Set Goals
            </button>
            <button className="flex-1 py-2 px-3 bg-accent/10 hover:bg-accent/20 border border-accent/20 hover:border-accent/40 rounded-lg text-accent text-sm font-medium transition-all duration-300 group-hover:shadow-sm group-hover:scale-[1.02] flex items-center justify-center gap-1">
              <Target className="w-3 h-3" />
              Track Progress
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
