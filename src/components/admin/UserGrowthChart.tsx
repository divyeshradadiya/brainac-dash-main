import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { month: 'Jan', newUsers: 85, activeUsers: 420, trialUsers: 45 },
  { month: 'Feb', newUsers: 120, activeUsers: 485, trialUsers: 52 },
  { month: 'Mar', newUsers: 95, activeUsers: 510, trialUsers: 38 },
  { month: 'Apr', newUsers: 145, activeUsers: 595, trialUsers: 65 },
  { month: 'May', newUsers: 180, activeUsers: 720, trialUsers: 78 },
  { month: 'Jun', newUsers: 220, activeUsers: 850, trialUsers: 92 },
  { month: 'Jul', newUsers: 250, activeUsers: 950, trialUsers: 105 },
  { month: 'Aug', newUsers: 195, activeUsers: 920, trialUsers: 88 },
  { month: 'Sep', newUsers: 275, activeUsers: 1050, trialUsers: 115 },
  { month: 'Oct', newUsers: 320, activeUsers: 1180, trialUsers: 135 },
  { month: 'Nov', newUsers: 285, activeUsers: 1250, trialUsers: 125 },
  { month: 'Dec', newUsers: 350, activeUsers: 1420, trialUsers: 145 }
];

export function UserGrowthChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Growth Trends</CardTitle>
        <p className="text-sm text-muted-foreground">
          New registrations, active users, and trial conversions
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="newUsers" fill="#3b82f6" name="New Users" />
            <Bar dataKey="trialUsers" fill="#f59e0b" name="Trial Users" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}