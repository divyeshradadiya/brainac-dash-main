import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  CreditCard,
  Eye
} from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  description?: string;
}

const StatsCard = ({ title, value, change, changeType, icon, description }: StatsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive': return <TrendingUp className="h-3 w-3" />;
      case 'negative': return <TrendingDown className="h-3 w-3" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={`flex items-center text-xs ${getChangeColor()}`}>
          {getChangeIcon()}
          <span className="ml-1">{change}</span>
          {description && <span className="text-gray-500 ml-1">from last month</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export function AdminStats() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹12,34,567",
      change: "+20.1%",
      changeType: "positive" as const,
      icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
      description: "from last month"
    },
    {
      title: "Active Users",
      value: "2,350",
      change: "+180.1%",
      changeType: "positive" as const,
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
      description: "from last month"
    },
    {
      title: "Subscriptions",
      value: "1,847",
      change: "+19%",
      changeType: "positive" as const,
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
      description: "from last month"
    },
    {
      title: "Video Views",
      value: "45,231",
      change: "+7.2%",
      changeType: "positive" as const,
      icon: <Eye className="h-4 w-4 text-muted-foreground" />,
      description: "from last month"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}