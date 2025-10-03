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
import { 
  Users,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  UserCheck,
  UserX,
  Clock
} from 'lucide-react';
import { adminApiService } from '@/lib/adminApi';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface User {
  id: string;
  uid: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  class: number;
  subscriptionStatus: 'active' | 'trial' | 'expired' | 'cancelled';
  subscriptionPlan?: string;
  subscriptionEndDate?: string;
  createdAt: string;
  updatedAt: string;
  videosWatched?: number;
  totalWatchTime?: number;
  paymentStatus?: 'paid' | 'pending' | 'failed';
  location?: string;
}

interface UserFilters {
  status: string;
  grade: string;
  search: string;
  paymentStatus: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UserFilters>({
    status: 'all',
    grade: 'all',
    search: '',
    paymentStatus: 'all'
  });
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [subscriptionFormData, setSubscriptionFormData] = useState({
    subscriptionStatus: '',
    subscriptionPlan: '',
    subscriptionEndDate: ''
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 20;

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        fetchUsers();
      } else {
        setCurrentPage(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const filterParams = {
        page: currentPage,
        limit: usersPerPage,
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.search && { search: filters.search }),
      };

      const data = await adminApiService.getUsers(filterParams);
      setUsers(data.users || []);
      setTotalUsers(data.pagination?.total || 0);
      setTotalPages(data.pagination?.totalPages || 1);
      
      // Apply client-side filters for grade and paymentStatus
      filterUsers(data.users || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = (userList: User[]) => {
    let filtered = userList;

    if (filters.grade !== 'all') {
      filtered = filtered.filter(user => user.class === parseInt(filters.grade));
    }

    if (filters.paymentStatus !== 'all') {
      filtered = filtered.filter(user => user.paymentStatus === filters.paymentStatus);
    }

    setFilteredUsers(filtered);
  };

  const handleUpdateSubscription = async () => {
    if (!selectedUser) return;

    try {
      await adminApiService.updateUserSubscription(selectedUser.id, subscriptionFormData);
      await fetchUsers(); // Refresh the list
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      setSubscriptionFormData({
        subscriptionStatus: '',
        subscriptionPlan: '',
        subscriptionEndDate: ''
      });
    } catch (error) {
      console.error('Failed to update user subscription:', error);
      setError('Failed to update user subscription');
    }
  };

  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setSubscriptionFormData({
      subscriptionStatus: user.subscriptionStatus,
      subscriptionPlan: user.subscriptionPlan || '',
      subscriptionEndDate: user.subscriptionEndDate || ''
    });
    setIsEditDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', className: 'bg-green-100 text-green-800' },
      trial: { label: 'Trial', className: 'bg-yellow-100 text-yellow-800' },
      expired: { label: 'Expired', className: 'bg-red-100 text-red-800' },
      cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.cancelled;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { label: 'Paid', className: 'bg-green-100 text-green-800' },
      pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      failed: { label: 'Failed', className: 'bg-red-100 text-red-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.failed;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const exportUsers = () => {
    const csvContent = [
      ['Name', 'Email', 'Grade', 'Subscription Status', 'Join Date', 'Videos Watched'].join(','),
      ...filteredUsers.map(user => [
        user.name,
        user.email,
        user.class || 'N/A',
        user.subscriptionStatus,
        new Date(user.createdAt).toLocaleDateString(),
        user.videosWatched || 0
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading && currentPage === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
              <p className="text-gray-600 dark:text-gray-300">Manage student accounts and subscriptions</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={exportUsers}>
                <Download className="h-4 w-4 mr-2" />
                Export Users
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-500">Registered students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {users.filter(u => u.subscriptionStatus === 'active').length}
              </div>
              <p className="text-xs text-gray-500">Paid subscriptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Trial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {users.filter(u => u.subscriptionStatus === 'trial').length}
              </div>
              <p className="text-xs text-gray-500">Free trial users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Expired</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {users.filter(u => u.subscriptionStatus === 'expired').length}
              </div>
              <p className="text-xs text-gray-500">Need renewal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Cancelled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {users.filter(u => u.subscriptionStatus === 'cancelled').length}
              </div>
              <p className="text-xs text-gray-500">Cancelled subscriptions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(users.filter(u => u.paymentStatus === 'paid').length * 299).toLocaleString()}</div>
              <p className="text-xs text-gray-500">This month</p>
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
                <Label htmlFor="search">Search Users</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    className="pl-10"
                    placeholder="Search by name or email..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status-filter">Subscription Status</Label>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="grade-filter">Grade</Label>
                <Select value={filters.grade} onValueChange={(value) => handleFilterChange('grade', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Grades" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    {[6, 7, 8, 9, 10].map(grade => (
                      <SelectItem key={grade} value={grade.toString()}>Class {grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="payment-filter">Payment Status</Label>
                <Select value={filters.paymentStatus} onValueChange={(value) => handleFilterChange('paymentStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Payments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>&nbsp;</Label>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setFilters({ status: 'all', grade: 'all', search: '', paymentStatus: 'all' })}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Users ({filteredUsers.length})
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
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {(user.name || user.firstName || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-medium">{user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown User'}</div>
                          <div className="text-sm text-gray-500">{user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-1" />
                          {user.email}
                        </div>
                        {user.phone && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="h-4 w-4 mr-1" />
                            {user.phone}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Class {user.class}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getStatusBadge(user.subscriptionStatus)}
                        {user.subscriptionPlan && (
                          <div className="text-sm text-gray-500">{user.subscriptionPlan}</div>
                        )}
                        {user.subscriptionEndDate && (
                          <div className="text-xs text-gray-500">
                            Expires: {new Date(user.subscriptionEndDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{user.videosWatched || 0} videos</div>
                        <div className="text-xs text-gray-500">
                          {Math.round((user.totalWatchTime || 0) / 60)}h watch time
                        </div>
                        <div className="text-xs text-gray-500">
                          Last active: {new Date(user.updatedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.paymentStatus ? getPaymentStatusBadge(user.paymentStatus) : <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(user.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openEditDialog(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
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
                  Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, totalUsers)} of {totalUsers} users
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

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Subscription</DialogTitle>
            <DialogDescription>
              Update subscription status and plan for {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="subscription-status">Subscription Status</Label>
              <Select 
                value={subscriptionFormData.subscriptionStatus} 
                onValueChange={(value) => setSubscriptionFormData({ ...subscriptionFormData, subscriptionStatus: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trial">Trial</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subscription-plan">Subscription Plan</Label>
              <Select 
                value={subscriptionFormData.subscriptionPlan} 
                onValueChange={(value) => setSubscriptionFormData({ ...subscriptionFormData, subscriptionPlan: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Plan</SelectItem>
                  <SelectItem value="yearly">Yearly Plan</SelectItem>
                  <SelectItem value="trial">Free Trial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="subscription-end-date">Subscription End Date</Label>
              <Input
                id="subscription-end-date"
                type="date"
                value={subscriptionFormData.subscriptionEndDate}
                onChange={(e) => setSubscriptionFormData({ ...subscriptionFormData, subscriptionEndDate: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateSubscription}>Update Subscription</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
    </AdminLayout>
  );
}