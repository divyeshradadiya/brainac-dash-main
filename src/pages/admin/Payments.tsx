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
  CreditCard,
  Search,
  Filter,
  Download,
  Eye,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { adminApiService } from '@/lib/adminApi';

interface Payment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentMethod?: 'razorpay' | 'card' | 'upi' | 'netbanking';
  planId: string;
  planName: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
  // Subscription-specific fields
  razorpaySubscriptionId?: string;
  subscriptionStatus?: 'active' | 'cancelled' | 'expired' | 'paused';
  isRecurring?: boolean;
  nextBillingDate?: string;
  billingCycle?: 'monthly' | 'quarterly' | 'yearly';
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface Subscription {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subscriptionStatus: 'active' | 'cancelled' | 'expired' | 'paused';
  subscriptionPlan: 'monthly' | 'quarterly' | 'yearly';
  subscriptionStartDate: string;
  subscriptionEndDate?: string;
  razorpaySubscriptionId: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
}

interface PaymentFilters {
  status: string;
  method: string;
  search: string;
  dateRange: string;
}

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PaymentFilters>({
    status: 'all',
    method: 'all',
    search: '',
    dateRange: 'all'
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const paymentsPerPage = 20;

  useEffect(() => {
    fetchPayments();
  }, [currentPage, filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchPayments();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Use real API integration
      const data = await adminApiService.getPayments({ 
        page: currentPage, 
        limit: paymentsPerPage, 
        ...filters 
      });
      
      setPayments(data.payments);
      setTotalPayments(data.pagination.total_count);
      setTotalPages(data.pagination.total_pages);
      filterPayments(data.payments);
    } catch (error) {
      console.error('Failed to fetch payments:', error);
      setError('Failed to load payments');
    } finally {
      setIsLoading(false);
    }
  };

  const filterPayments = (paymentList: Payment[]) => {
    let filtered = paymentList;

    if (filters.status !== 'all') {
      filtered = filtered.filter(payment => payment.status === filters.status);
    }

    if (filters.method !== 'all') {
      filtered = filtered.filter(payment => (payment.paymentMethod || 'razorpay') === filters.method);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(payment =>
        payment.userName.toLowerCase().includes(searchTerm) ||
        payment.userEmail.toLowerCase().includes(searchTerm) ||
        payment.razorpayPaymentId?.toLowerCase().includes(searchTerm) ||
        payment.planName.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredPayments(filtered);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { label: 'Completed', className: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800', icon: Clock },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-800', icon: XCircle },
      refunded: { label: 'Refunded', className: 'bg-blue-100 text-blue-800', icon: RefreshCw }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.failed;
    const Icon = config.icon;
    
    return (
      <Badge className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getMethodBadge = (method: string) => {
    const methodConfig = {
      razorpay: { label: 'Razorpay', className: 'bg-purple-100 text-purple-800' },
      card: { label: 'Card', className: 'bg-blue-100 text-blue-800' },
      upi: { label: 'UPI', className: 'bg-green-100 text-green-800' },
      netbanking: { label: 'Net Banking', className: 'bg-orange-100 text-orange-800' }
    };
    
    const config = methodConfig[method as keyof typeof methodConfig] || methodConfig.razorpay;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getTypeBadge = (payment: Payment) => {
    const isSubscription = payment.razorpaySubscriptionId || payment.isRecurring;
    
    if (isSubscription) {
      const subscriptionConfig = {
        active: { label: 'Subscription', className: 'bg-green-100 text-green-800' },
        cancelled: { label: 'Cancelled Sub', className: 'bg-red-100 text-red-800' },
        expired: { label: 'Expired Sub', className: 'bg-gray-100 text-gray-800' },
        paused: { label: 'Paused Sub', className: 'bg-yellow-100 text-yellow-800' }
      };
      
      const status = payment.subscriptionStatus || 'active';
      const config = subscriptionConfig[status as keyof typeof subscriptionConfig] || subscriptionConfig.active;
      return <Badge className={config.className}>{config.label}</Badge>;
    }
    
    return <Badge className="bg-gray-100 text-gray-800">One-time</Badge>;
  };

  const exportPayments = () => {
    const csvContent = [
      ['Date', 'User', 'Email', 'Amount', 'Status', 'Method', 'Plan', 'Payment ID'].join(','),
      ...filteredPayments.map(payment => [
        new Date(payment.createdAt).toLocaleDateString(),
        payment.userName,
        payment.userEmail,
        `₹${payment.amount}`,
        payment.status,
        payment.paymentMethod || 'razorpay',
        payment.planName,
        payment.razorpayPaymentId || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFilterChange = (key: keyof PaymentFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const getTotalRevenue = () => {
    return filteredPayments
      .filter(payment => payment.status === 'completed')
      .reduce((sum, payment) => sum + payment.amount, 0);
  };

  if (isLoading && currentPage === 1) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payments...</p>
          </div>
        </div>
      </AdminLayout>
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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Management</h1>
                <p className="text-gray-600 dark:text-gray-300">Track and manage all payment transactions</p>
              </div>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={exportPayments}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Payments
                </Button>
                <Button onClick={fetchPayments}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{getTotalRevenue().toLocaleString()}</div>
                <p className="text-xs text-gray-500">From successful payments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{payments.length}</div>
                <p className="text-xs text-gray-500">All time transactions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Successful</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {payments.filter(p => p.status === 'completed').length}
                </div>
                <p className="text-xs text-gray-500">Completed transactions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {payments.filter(p => p.status === 'pending').length}
                </div>
                <p className="text-xs text-gray-500">Awaiting confirmation</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="search">Search Payments</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      className="pl-10"
                      placeholder="Search by user, email, or payment ID..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="method-filter">Payment Method</Label>
                  <Select value={filters.method} onValueChange={(value) => handleFilterChange('method', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Methods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Methods</SelectItem>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date-filter">Date Range</Label>
                  <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange('dateRange', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>&nbsp;</Label>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setFilters({ status: 'all', method: 'all', search: '', dateRange: 'all' })}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payments ({filteredPayments.length})
                </div>
                {isLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.id}</div>
                          {payment.razorpayPaymentId && (
                            <div className="text-sm text-gray-500">{payment.razorpayPaymentId}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{payment.userName}</div>
                          <div className="text-sm text-gray-500">{payment.userEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">₹{payment.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{payment.currency}</div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(payment.status)}
                      </TableCell>
                      <TableCell>
                        {getMethodBadge(payment.paymentMethod || 'razorpay')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.planName}</Badge>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(payment)}
                        {payment.razorpaySubscriptionId && (
                          <div className="text-xs text-gray-500 mt-1">
                            Sub: {payment.razorpaySubscriptionId.slice(-8)}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(payment.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(payment.createdAt).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {((currentPage - 1) * paymentsPerPage) + 1} to {Math.min(currentPage * paymentsPerPage, totalPayments)} of {totalPayments} payments
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    >
                      Previous
                    </Button>
                    <span className="flex items-center px-3 py-1 text-sm">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}