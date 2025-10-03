import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  XCircle,
  CheckCircle,
  Clock,
  Pause,
  RefreshCw,
  DollarSign,
  TrendingUp,
  Users,
  Target
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApiService } from '@/lib/adminApi';

interface Subscription {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subscriptionStatus: 'active' | 'cancelled' | 'expired' | 'paused';
  subscriptionPlan: 'monthly' | 'quarterly' | 'yearly';
  subscriptionStartDate: string;
  subscriptionEndDate?: string;
  razorpaySubscriptionId?: string; // Make this optional since some might not have it
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionFilters {
  status: string;
  plan: string;
  search: string;
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

export default function AdminSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [analytics, setAnalytics] = useState<SubscriptionAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SubscriptionFilters>({
    status: 'all',
    plan: 'all',
    search: ''
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);
  const subscriptionsPerPage = 20;

  // Cancel subscription state
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [subscriptionToCancel, setSubscriptionToCancel] = useState<Subscription | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    fetchSubscriptions();
    fetchAnalytics();
  }, [currentPage, filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchSubscriptions();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const fetchSubscriptions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching subscriptions with filters:', { 
        page: currentPage, 
        limit: subscriptionsPerPage, 
        ...filters 
      });
      
      const response = await adminApiService.getSubscriptions({ 
        page: currentPage, 
        limit: subscriptionsPerPage, 
        ...filters 
      });
      
      console.log('Full subscriptions response:', response);
      
      // The makeRequest function already extracts data.data, so response should be the data object directly
      if (!response) {
        throw new Error('No response received from API');
      }
      
      if (!response.subscriptions) {
        throw new Error('Subscriptions data not found in response');
      }
      
      console.log('Setting subscriptions:', response.subscriptions);
      setSubscriptions(response.subscriptions || []);
      setTotalSubscriptions(response.pagination?.total_count || 0);
      setTotalPages(response.pagination?.total_pages || 1);
    } catch (error) {
      console.error('Detailed error fetching subscriptions:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to load subscriptions: ${errorMessage}`);
      
      // Set empty data on error
      setSubscriptions([]);
      setTotalSubscriptions(0);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      console.log('Fetching subscription analytics...');
      const response = await adminApiService.getSubscriptionAnalytics();
      console.log('Analytics response:', response);
      
      // The makeRequest function already extracts data.data, so response should be the data object directly
      if (!response) {
        console.warn('Analytics response is empty');
        return;
      }
      
      setAnalytics(response); // response is already the data object
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.warn(`Analytics fetch failed: ${errorMessage}`);
      // Don't set error for analytics failure, just log it
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-green-100 text-green-800', icon: CheckCircle },
      cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800', icon: XCircle },
      expired: { label: 'Expired', className: 'bg-gray-100 text-gray-800', icon: Clock },
      paused: { label: 'Paused', className: 'bg-yellow-100 text-yellow-800', icon: Pause },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    const Icon = config.icon;

    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getPlanBadge = (plan: string) => {
    const planConfig = {
      monthly: { label: 'Monthly', className: 'bg-blue-100 text-blue-800' },
      quarterly: { label: 'Quarterly', className: 'bg-purple-100 text-purple-800' },
      yearly: { label: 'Yearly', className: 'bg-orange-100 text-orange-800' },
    };

    const config = planConfig[plan as keyof typeof planConfig] || planConfig.monthly;

    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const handleCancelSubscription = async () => {
    if (!subscriptionToCancel?.razorpaySubscriptionId) {
      setError('No valid subscription ID found for cancellation');
      return;
    }

    try {
      setIsCancelling(true);
      await adminApiService.cancelSubscription(subscriptionToCancel.razorpaySubscriptionId, cancelReason);
      
      // Refresh subscriptions list
      await fetchSubscriptions();
      await fetchAnalytics();
      
      setCancelDialogOpen(false);
      setSubscriptionToCancel(null);
      setCancelReason('');
    } catch (error) {
      console.error('Failed to cancel subscription:', error);
      setError('Failed to cancel subscription');
    } finally {
      setIsCancelling(false);
    }
  };

  const openCancelDialog = (subscription: Subscription) => {
    setSubscriptionToCancel(subscription);
    setCancelDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Subscription Management</h1>
            <p className="text-gray-600 mt-1">Manage user subscriptions and view analytics</p>
          </div>
          <Button onClick={() => window.location.reload()} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.overview.activeSubscriptions}</div>
                <p className="text-xs text-muted-foreground">
                  Total: {analytics.overview.totalSubscriptions}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Recurring Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(analytics.revenue.mrr)}</div>
                <p className="text-xs text-muted-foreground">Per month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.metrics.churnRate}%</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Subscriptions</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.metrics.newSubscriptions30Days}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Plan Distribution */}
        {analytics && (
          <Card>
            <CardHeader>
              <CardTitle>Plan Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{analytics.planDistribution.monthly}</div>
                  <div className="text-sm text-gray-600">Monthly</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{analytics.planDistribution.quarterly}</div>
                  <div className="text-sm text-gray-600">Quarterly</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{analytics.planDistribution.yearly}</div>
                  <div className="text-sm text-gray-600">Yearly</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by user name, email..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="plan">Plan</Label>
                <Select
                  value={filters.plan}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, plan: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  onClick={() => setFilters({ status: 'all', plan: 'all', search: '' })}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subscriptions Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Subscriptions ({totalSubscriptions})</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="ml-2">Loading subscriptions...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Subscription ID</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{subscription.userName}</div>
                            <div className="text-sm text-gray-500">{subscription.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {getPlanBadge(subscription.subscriptionPlan)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(subscription.subscriptionStatus)}
                        </TableCell>
                        <TableCell>{formatDate(subscription.subscriptionStartDate)}</TableCell>
                        <TableCell>
                          {subscription.subscriptionEndDate 
                            ? formatDate(subscription.subscriptionEndDate)
                            : '-'
                          }
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {subscription.razorpaySubscriptionId || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            {subscription.subscriptionStatus === 'active' && subscription.razorpaySubscriptionId && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openCancelDialog(subscription)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <XCircle className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {subscriptions.length === 0 && !isLoading && (
                  <div className="text-center py-8 text-gray-500">
                    No subscriptions found matching your criteria
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-500">
                  Showing {((currentPage - 1) * subscriptionsPerPage) + 1} to{' '}
                  {Math.min(currentPage * subscriptionsPerPage, totalSubscriptions)} of{' '}
                  {totalSubscriptions} subscriptions
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Cancel Subscription Dialog */}
        <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Subscription</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this subscription for {subscriptionToCancel?.userName}?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="cancelReason">Reason for cancellation (optional)</Label>
                <Textarea
                  id="cancelReason"
                  placeholder="Enter reason for cancellation..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setCancelDialogOpen(false)}
                disabled={isCancelling}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleCancelSubscription}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}