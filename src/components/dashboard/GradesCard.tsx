import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GradeItem {
  id: string;
  title: string;
  subject: string;
  score: string; // e.g., "18/20" or "92%"
  type: "Quiz" | "Assignment";
}

interface GradesCardProps {
  grades: GradeItem[];
}

export function GradesCard({ grades }: GradesCardProps) {
  return (
    <Card className="bg-gradient-to-br from-white/95 via-emerald-50/30 to-green-50/20 border-border/50 shadow-card backdrop-blur-sm hover:shadow-lg hover:border-emerald-200/50 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Recent Grades
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {grades.map((g) => (
          <div key={g.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-secondary/10 to-secondary/20 border border-border/40 hover:from-secondary/15 hover:to-secondary/25 hover:border-secondary/30 hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group/item">
            <div>
              <p className="font-medium text-foreground">{g.title}</p>
              <p className="text-sm text-muted-foreground">{g.subject} • {g.type}</p>
            </div>
            <Badge className="bg-success/20 text-success border-success/30 group-hover/item:bg-success/30 group-hover/item:scale-105 transition-all duration-300">{g.score}</Badge>
          </div>
        ))}
        {grades.length === 0 && (
          <p className="text-sm text-muted-foreground">No grades yet. Complete a quiz to see results here.</p>
        )}
      </CardContent>
    </Card>
  );
}
