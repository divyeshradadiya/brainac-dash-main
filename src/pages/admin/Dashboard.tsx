import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  UserCheck, 
  UserX, 
  Clock, 
  Play,
  BookOpen,
  Eye,
  Plus
} from 'lucide-react';
import { AdminStats } from '@/components/admin/AdminStats';
import { UserGrowthChart } from '@/components/admin/UserGrowthChart';
import { RecentTransactions } from '@/components/admin/RecentTransactions';
import { ActiveUsers } from '@/components/admin/ActiveUsers';
import { ContentOverview } from '@/components/admin/ContentOverview';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApiService } from '@/lib/adminApi';

interface DashboardStats {
  totalStudents: number;
  activeSubscriptions: number;
  trialUsers: number;
  expiredUsers: number;
  monthlyRevenue: number;
  totalRevenue: number;
  totalVideos: number;
  totalSubjects: number;
  newStudentsToday: number;
  paymentsPending: number;
  recentTransactions: any[];
  activeUsers: any[];
  usersByStatus: any;
  revenueByMonth: any[];
  userGrowthByMonth: any[];
}

interface SubscriptionAnalytics {
  overview: {
    activeSubscriptions: number;
    cancelledSubscriptions: number;
    expiredSubscriptions: number;
    totalSubscriptions: number;
  };
  revenue: {
    mrr: number;
    currency: string;
  };
  planDistribution: {
    monthly: number;
    quarterly: number;
    yearly: number;
  };
  metrics: {
    churnRate: number;
    newSubscriptions30Days: number;
    growthRate: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [subscriptionAnalytics, setSubscriptionAnalytics] = useState<SubscriptionAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real data from API
  useEffect(() => {
    fetchDashboardStats();
    fetchSubscriptionAnalytics();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await adminApiService.getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubscriptionAnalytics = async () => {
    try {
      const response = await adminApiService.getSubscriptionAnalytics();
      console.log('Dashboard analytics response:', response); // Debug log
      setSubscriptionAnalytics(response); // response is already the data object from makeRequest
    } catch (error) {
      console.error('Failed to fetch subscription analytics:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error loading dashboard</div>
          <Button onClick={fetchDashboardStats}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-300">Welcome back! Here's what's happening with Brainac today.</p>
              </div>
              <div className="flex space-x-3">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
                <Button variant="outline">Export Data</Button>
              </div>
            </div>
          </div>
        </div>

      <div className="p-6 space-y-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
                  <p className="text-xs opacity-90">+{stats.newStudentsToday} today</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stats.activeSubscriptions.toLocaleString()}</div>
                  <p className="text-xs opacity-90">71.5% conversion</p>
                </div>
                <UserCheck className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Trial Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{stats.trialUsers.toLocaleString()}</div>
                  <p className="text-xs opacity-90">18.8% of total</p>
                </div>
                <Clock className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">₹{(stats.monthlyRevenue / 1000).toFixed(0)}K</div>
                  <p className="text-xs opacity-90">+12.5% from last month</p>
                </div>
                <DollarSign className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Analytics Section */}
        {subscriptionAnalytics && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Subscription Analytics</h2>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/admin/subscriptions'}>
                View All Subscriptions
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Monthly Recurring Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ₹{subscriptionAnalytics.revenue.mrr.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500">Per month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Churn Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {subscriptionAnalytics.metrics.churnRate}%
                  </div>
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">New Subscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {subscriptionAnalytics.metrics.newSubscriptions30Days}
                  </div>
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Plan Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Monthly</span>
                      <span className="font-medium">{subscriptionAnalytics.planDistribution.monthly}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Quarterly</span>
                      <span className="font-medium">{subscriptionAnalytics.planDistribution.quarterly}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Yearly</span>
                      <span className="font-medium">{subscriptionAnalytics.planDistribution.yearly}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RevenueChart data={stats?.revenueByMonth} />
          <UserGrowthChart data={stats?.userGrowthByMonth} />
        </div>

        {/* Detailed Stats and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Status Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                User Status Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">Active</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{stats.activeSubscriptions}</div>
                  <div className="text-xs text-gray-500">71.5%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-sm">Trial</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{stats.trialUsers}</div>
                  <div className="text-xs text-gray-500">18.8%</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-sm">Expired</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{stats.expiredUsers}</div>
                  <div className="text-xs text-gray-500">9.7%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Content Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Videos</span>
                <Badge variant="secondary">{stats.totalVideos}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Subjects</span>
                <Badge variant="secondary">{stats.totalSubjects}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg. Watch Time</span>
                <Badge variant="secondary">24m 35s</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Completion Rate</span>
                <Badge variant="secondary">67.8%</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add New Video
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                View Payments
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics Report
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions transactions={stats?.recentTransactions} />
          <ActiveUsers users={stats?.activeUsers} />
        </div>
      </div>
      </div>
    </AdminLayout>
  );
}