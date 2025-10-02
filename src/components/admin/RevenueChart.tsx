import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { month: 'Jan', revenue: 45000, subscriptions: 120 },
  { month: 'Feb', revenue: 52000, subscriptions: 145 },
  { month: 'Mar', revenue: 48000, subscriptions: 135 },
  { month: 'Apr', revenue: 61000, subscriptions: 180 },
  { month: 'May', revenue: 73000, subscriptions: 220 },
  { month: 'Jun', revenue: 85000, subscriptions: 250 },
  { month: 'Jul', revenue: 92000, subscriptions: 275 },
  { month: 'Aug', revenue: 88000, subscriptions: 260 },
  { month: 'Sep', revenue: 96000, subscriptions: 290 },
  { month: 'Oct', revenue: 105000, subscriptions: 315 },
  { month: 'Nov', revenue: 112000, subscriptions: 340 },
  { month: 'Dec', revenue: 125000, subscriptions: 380 }
];

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly revenue and subscription trends
        </p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [
                name === 'revenue' ? `₹${value.toLocaleString()}` : value,
                name === 'revenue' ? 'Revenue' : 'Subscriptions'
              ]}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#3b82f6" 
              fill="#3b82f6"
              fillOpacity={0.1}
            />
            <Line 
              type="monotone" 
              dataKey="subscriptions" 
              stroke="#10b981" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}