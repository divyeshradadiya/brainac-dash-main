import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Target, 
  Zap,
  Star,
  Award,
  Lightbulb
} from "lucide-react";

export function ThemeShowcase() {
  return (
    <div className="p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Learn Luxe Dashboard Theme</h1>
        <p className="text-muted-foreground">A comprehensive design system based on Index.tsx color usage</p>
      </div>

      {/* Primary Colors */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Primary Colors - Blue (Trust & Learning)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">Primary</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Main actions & icons</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-light rounded-lg flex items-center justify-center">
                <span className="text-primary font-semibold">Light</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Light backgrounds</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary-dark rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-semibold">Dark</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Hover states</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                <span className="text-primary font-semibold">10% Opacity</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Subtle backgrounds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Secondary Colors */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-secondary" />
            Secondary Colors - Green (Growth & Success)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-secondary rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-semibold">Secondary</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Success states</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-light rounded-lg flex items-center justify-center">
                <span className="text-secondary font-semibold">Light</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Light backgrounds</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary-dark rounded-lg flex items-center justify-center">
                <span className="text-secondary-foreground font-semibold">Dark</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Hover states</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-secondary/10 rounded-lg flex items-center justify-center border border-secondary/20">
                <span className="text-secondary font-semibold">10% Opacity</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Subtle backgrounds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Accent Colors */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-accent" />
            Accent Colors - Orange (Energy & Motivation)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-semibold">Accent</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Time & energy</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-accent-light rounded-lg flex items-center justify-center">
                <span className="text-accent font-semibold">Light</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Light backgrounds</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-accent-dark rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-semibold">Dark</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Hover states</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-accent/10 rounded-lg flex items-center justify-center border border-accent/20">
                <span className="text-accent font-semibold">10% Opacity</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Subtle backgrounds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tertiary Colors */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-tertiary" />
            Tertiary Colors - Purple (Creativity & Innovation)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-tertiary rounded-lg flex items-center justify-center">
                <span className="text-tertiary-foreground font-semibold">Tertiary</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Creative elements</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-tertiary-light rounded-lg flex items-center justify-center">
                <span className="text-tertiary font-semibold">Light</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Light backgrounds</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-tertiary-dark rounded-lg flex items-center justify-center">
                <span className="text-tertiary-foreground font-semibold">Dark</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Hover states</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-tertiary/10 rounded-lg flex items-center justify-center border border-tertiary/20">
                <span className="text-tertiary font-semibold">10% Opacity</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Subtle backgrounds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Semantic Colors */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-warning" />
            Semantic Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-16 bg-success rounded-lg flex items-center justify-center">
                <span className="text-success-foreground font-semibold">Success</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Achievements</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-warning rounded-lg flex items-center justify-center">
                <span className="text-warning-foreground font-semibold">Warning</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Badges</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-destructive rounded-lg flex items-center justify-center">
                <span className="text-destructive-foreground font-semibold">Destructive</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Errors</p>
            </div>
            <div className="space-y-2">
              <div className="h-16 bg-muted rounded-lg flex items-center justify-center border border-border">
                <span className="text-muted-foreground font-semibold">Muted</span>
              </div>
              <p className="text-xs text-muted-foreground text-center">Backgrounds</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Component Examples */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Component Examples
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Badges */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Badges</h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20">Primary</Badge>
              <Badge className="bg-secondary/10 text-secondary border-secondary/20">Secondary</Badge>
              <Badge className="bg-accent/10 text-accent border-accent/20">Accent</Badge>
              <Badge className="bg-tertiary/10 text-tertiary border-tertiary/20">Tertiary</Badge>
              <Badge className="bg-success/10 text-success border-success/20">Success</Badge>
              <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>
              <Badge className="bg-destructive/10 text-destructive border-destructive/20">Destructive</Badge>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <Button className="bg-primary text-primary-foreground hover:bg-primary-dark">Primary</Button>
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary-dark">Secondary</Button>
              <Button className="bg-accent text-accent-foreground hover:bg-accent-dark">Accent</Button>
              <Button className="bg-tertiary text-tertiary-foreground hover:bg-tertiary-dark">Tertiary</Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">Outline</Button>
              <Button variant="ghost" className="text-primary hover:bg-primary/10">Ghost</Button>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Progress Bars</h3>
            <div className="space-y-2">
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Primary Progress</span>
                  <span className="text-primary font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Success Progress</span>
                  <span className="text-success font-medium">92%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-full bg-success rounded-full transition-all duration-1000" style={{ width: '92%' }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Accent Progress</span>
                  <span className="text-accent font-medium">67%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="h-full bg-accent rounded-full transition-all duration-1000" style={{ width: '67%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Icons</h3>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-secondary" />
                <span className="text-sm text-muted-foreground">Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm text-muted-foreground">Accent</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-tertiary" />
                <span className="text-sm text-muted-foreground">Tertiary</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-warning" />
                <span className="text-sm text-muted-foreground">Warning</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-success" />
                <span className="text-sm text-muted-foreground">Success</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gradients */}
      <Card className="card-modern">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Gradients
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-20 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">Primary Gradient</span>
            </div>
            <div className="h-20 bg-gradient-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">Secondary Gradient</span>
            </div>
            <div className="h-20 bg-gradient-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">Accent Gradient</span>
            </div>
            <div className="h-20 bg-gradient-tertiary rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold">Tertiary Gradient</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
