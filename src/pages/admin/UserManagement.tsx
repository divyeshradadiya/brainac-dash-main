import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Search, 
  Filter, 
  Download,
  Mail,
  MoreHorizontal,
  UserCheck,
  UserX,
  Clock
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  grade: number;
  status: 'active' | 'trial' | 'expired';
  subscriptionPlan?: string;
  joinDate: string;
  lastActive: string;
  totalVideos: number;
  totalWatchTime: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    grade: 10,
    status: 'active',
    subscriptionPlan: 'yearly',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
    totalVideos: 125,
    totalWatchTime: 2850
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@gmail.com',
    grade: 9,
    status: 'trial',
    joinDate: '2024-09-28',
    lastActive: '1 day ago',
    totalVideos: 15,
    totalWatchTime: 420
  },
  // Add more mock users...
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'trial' | 'expired'>('all');

  const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><UserCheck className="h-3 w-3 mr-1" />Active</Badge>;
      case 'trial':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Trial</Badge>;
      case 'expired':
        return <Badge className="bg-red-100 text-red-800"><UserX className="h-3 w-3 mr-1" />Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage students, subscriptions, and user activity</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Users
              </Button>
              <Button>
                <Mail className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filters and Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                  size="sm"
                >
                  All Users
                </Button>
                <Button
                  variant={filterStatus === 'active' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('active')}
                  size="sm"
                >
                  Active
                </Button>
                <Button
                  variant={filterStatus === 'trial' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('trial')}
                  size="sm"
                >
                  Trial
                </Button>
                <Button
                  variant={filterStatus === 'expired' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('expired')}
                  size="sm"
                >
                  Expired
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      {getStatusBadge(user.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Grade:</span> {user.grade}
                      </div>
                      <div>
                        <span className="font-medium">Videos:</span> {user.totalVideos}
                      </div>
                      <div>
                        <span className="font-medium">Watch Time:</span> {Math.floor(user.totalWatchTime / 60)}h {user.totalWatchTime % 60}m
                      </div>
                      <div>
                        <span className="font-medium">Last Active:</span> {user.lastActive}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}