import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Mail, MessageCircle } from 'lucide-react';

interface ActiveUser {
  id: string;
  name: string;
  email: string;
  grade: number;
  status: 'active' | 'trial' | 'expired';
  lastActive: string;
  videosWatched: number;
  joinDate: string;
}

const activeUsers: ActiveUser[] = [
  {
    id: '1',
    name: 'Arjun Mehta',
    email: 'arjun.mehta@gmail.com',
    grade: 10,
    status: 'active',
    lastActive: '2 minutes ago',
    videosWatched: 45,
    joinDate: '2024-01-15'
  },
  {
    id: '2',
    name: 'Kavya Nair',
    email: 'kavya.nair@gmail.com',
    grade: 9,
    status: 'trial',
    lastActive: '15 minutes ago',
    videosWatched: 12,
    joinDate: '2024-09-28'
  },
  {
    id: '3',
    name: 'Rohit Verma',
    email: 'rohit.verma@gmail.com',
    grade: 8,
    status: 'active',
    lastActive: '1 hour ago',
    videosWatched: 78,
    joinDate: '2023-11-20'
  },
  {
    id: '4',
    name: 'Ananya Joshi',
    email: 'ananya.joshi@gmail.com',
    grade: 7,
    status: 'expired',
    lastActive: '2 days ago',
    videosWatched: 23,
    joinDate: '2024-08-10'
  },
  {
    id: '5',
    name: 'Karthik Rao',
    email: 'karthik.rao@gmail.com',
    grade: 10,
    status: 'active',
    lastActive: '30 minutes ago',
    videosWatched: 56,
    joinDate: '2024-02-05'
  }
];

export function ActiveUsers() {
  const getStatusBadge = (status: ActiveUser['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'trial':
        return <Badge className="bg-blue-100 text-blue-800">Trial</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800">Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
        <p className="text-sm text-muted-foreground">
          Recently active students and their engagement
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activeUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">{user.name}</h4>
                  <span className="text-xs text-gray-500">Class {user.grade}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.videosWatched} videos • {user.lastActive}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(user.status)}
                    <Button variant="ghost" size="sm">
                      <Mail className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Users
        </Button>
      </CardContent>
    </Card>
  );
}