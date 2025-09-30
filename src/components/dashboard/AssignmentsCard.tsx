import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Upload } from "lucide-react";

interface AssignmentItem {
  id: string;
  title: string;
  subject: string;
  due: string; // human readable
}

interface AssignmentsCardProps {
  items: AssignmentItem[];
  onUpload: () => void;
}

export function AssignmentsCard({ items, onUpload }: AssignmentsCardProps) {
  return (
    <Card className="bg-gradient-to-br from-white/95 via-blue-50/30 to-indigo-50/20 border-border/50 shadow-card backdrop-blur-sm hover:shadow-lg hover:border-blue-200/50 transition-all duration-300 group">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Assignments
        </CardTitle>
        <Button variant="outline" size="sm" onClick={onUpload} className="hover-scale">
          <Upload className="w-4 h-4 mr-2" /> Upload
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 border border-border/60 hover:from-primary/10 hover:to-primary/15 hover:border-primary/30 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group/item">
            <div>
              <p className="font-medium text-foreground">{a.title}</p>
              <p className="text-sm text-muted-foreground">{a.subject}</p>
            </div>
            <Badge className="bg-warning/20 text-warning border-warning/30 flex items-center gap-1 group-hover/item:bg-warning/30 group-hover/item:scale-105 transition-all duration-300">
              <Calendar className="w-3 h-3" /> {a.due}
            </Badge>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">No upcoming assignments. Enjoy your day!</p>
        )}
      </CardContent>
    </Card>
  );
}
