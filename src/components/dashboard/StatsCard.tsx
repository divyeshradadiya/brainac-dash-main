import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function StatsCard({ title, value, change, icon, trend = "neutral", className }: StatsCardProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-success" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className={cn(
      "bg-gradient-to-br from-white/95 via-primary-50/20 to-secondary-50/10 border border-border/50 rounded-xl shadow-card backdrop-blur-sm group cursor-pointer overflow-hidden transition-all duration-300",
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-xl bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      <CardContent className="p-6 relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            {/* Title */}
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {title}
              </p>
            </div>
            
            {/* Value */}
            <div className="space-y-2">
              <p className="text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {value}
              </p>
              
              {/* Change Indicator */}
              {change && (
                <div className="flex items-center gap-2">
                  {getTrendIcon(trend)}
                  <p className={cn(
                    "text-sm font-medium transition-all duration-300",
                    getTrendColor(trend)
                  )}>
                    {change}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Icon Container */}
          <div className="relative">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg">
              <div className="text-primary group-hover:text-primary-dark transition-colors duration-300">
                {icon}
              </div>
            </div>
            
            {/* Floating Particles Effect */}
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce-gentle transition-all duration-500 delay-100" />
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce-gentle transition-all duration-500 delay-200" />
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 pt-4 border-t border-border/30">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>Progress</span>
            <span className="font-medium">85%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-1000 ease-out group-hover:bg-primary-dark" style={{ width: '85%' }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}