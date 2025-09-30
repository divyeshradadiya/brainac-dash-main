import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, BookOpen, Award } from "lucide-react";

interface Activity {
  id: string;
  type: "completion" | "assignment" | "achievement" | "study";
  title: string;
  description: string;
  time: string;
  points?: number;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "completion",
    title: "Completed Math Quiz! 🎯",
    description: "Chapter 7: Quadratic Equations",
    time: "2 hours ago",
    points: 85
  },
  {
    id: "2",
    type: "assignment",
    title: "Science Project Due",
    description: "Solar System Model Presentation",
    time: "Tomorrow",
  },
  {
    id: "3",
    type: "achievement",
    title: "Super Star! ⭐",
    description: "Scored 95%+ in 3 subjects",
    time: "1 day ago",
    points: 200
  },
  {
    id: "4",
    type: "study",
    title: "Study Session",
    description: "English Grammar & Vocabulary",
    time: "2 days ago",
  }
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "completion": return <CheckCircle className="w-5 h-5 text-success" />;
    case "assignment": return <Clock className="w-5 h-5 text-warning" />;
    case "achievement": return <Award className="w-5 h-5 text-primary" />;
    case "study": return <BookOpen className="w-5 h-5 text-accent" />;
    default: return <Clock className="w-5 h-5 text-muted-foreground" />;
  }
};

export function ActivityFeed() {
  return (
    <Card className="bg-gradient-to-br from-white/95 via-purple-50/30 to-pink-50/20 border-border/50 shadow-card backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          📈 Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-border/30 hover:from-primary/10 hover:to-primary/20 transition-all duration-300 hover:scale-[1.02] hover:border-primary/20 hover:shadow-soft group cursor-pointer"
          >
            <div className="mt-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground text-sm">
                  {activity.title}
                </h4>
                {activity.points && (
                  <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                    +{activity.points} pts
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}