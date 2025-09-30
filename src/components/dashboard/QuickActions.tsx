import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Calendar, MessageSquare, BookOpen, Video } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      icon: <Plus className="w-5 h-5" />,
      label: "Join Study Group",
      variant: "default" as const
    },
    {
      icon: <Upload className="w-5 h-5" />,
      label: "Submit Homework",
      variant: "secondary" as const
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Plan Study Time",
      variant: "outline" as const
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Ask Doubt",
      variant: "outline" as const
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Browse Notes",
      variant: "outline" as const
    },
    {
      icon: <Video className="w-5 h-5" />,
      label: "Join Class",
      variant: "destructive" as const
    }
  ];

  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          ⚡ Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
            >
              {action.icon}
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}