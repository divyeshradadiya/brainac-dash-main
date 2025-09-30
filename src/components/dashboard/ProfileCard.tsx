import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2 } from "lucide-react";

interface ProfileCardProps {
  name: string;
  batch: string;
  email: string;
  phone: string;
  onEdit: () => void;
}

export function ProfileCard({ name, batch, email, phone, onEdit }: ProfileCardProps) {
  return (
    <Card className="bg-gradient-card border-border/50 shadow-card">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Your Profile
        </CardTitle>
        <Button size="sm" variant="secondary" onClick={onEdit} className="hover-scale">
          <Edit2 className="w-4 h-4 mr-2" /> Edit
        </Button>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="h-12 w-12 border-2 border-primary/20">
          <AvatarImage src="https://github.com/shadcn.png" alt="Student avatar" />
          <AvatarFallback className="bg-primary/10 text-primary">
            {name?.slice(0, 2).toUpperCase() || "ST"}
          </AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-foreground font-semibold">{name}</h3>
            <Badge className="bg-primary/15 text-primary border-primary/30">{batch}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{email}</p>
          <p className="text-sm text-muted-foreground">{phone}</p>
        </div>
      </CardContent>
    </Card>
  );
}
