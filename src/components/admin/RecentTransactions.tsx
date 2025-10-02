import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, MoreHorizontal } from 'lucide-react';

interface Transaction {
  id: string;
  user: string;
  email: string;
  plan: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  date: string;
  paymentId: string;
}

const transactions: Transaction[] = [
  {
    id: '1',
    user: 'Rahul Sharma',
    email: 'rahul.sharma@gmail.com',
    plan: 'Yearly Plan',
    amount: 2499,
    status: 'completed',
    date: '2 hours ago',
    paymentId: 'pay_ABC123'
  },
  {
    id: '2',
    user: 'Priya Patel',
    email: 'priya.patel@gmail.com',
    plan: 'Monthly Plan',
    amount: 299,
    status: 'completed',
    date: '5 hours ago',
    paymentId: 'pay_DEF456'
  },
  {
    id: '3',
    user: 'Amit Kumar',
    email: 'amit.kumar@gmail.com',
    plan: 'Quarterly Plan',
    amount: 799,
    status: 'pending',
    date: '1 day ago',
    paymentId: 'pay_GHI789'
  },
  {
    id: '4',
    user: 'Sneha Reddy',
    email: 'sneha.reddy@gmail.com',
    plan: 'Monthly Plan',
    amount: 299,
    status: 'failed',
    date: '2 days ago',
    paymentId: 'pay_JKL012'
  },
  {
    id: '5',
    user: 'Vikash Singh',
    email: 'vikash.singh@gmail.com',
    plan: 'Yearly Plan',
    amount: 2499,
    status: 'completed',
    date: '3 days ago',
    paymentId: 'pay_MNO345'
  }
];

export function RecentTransactions() {
  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <p className="text-sm text-muted-foreground">
          Latest subscription payments and status
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium text-sm">{transaction.user}</h4>
                  <span className="text-sm font-semibold">₹{transaction.amount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{transaction.email}</p>
                    <p className="text-xs text-gray-500">{transaction.plan} • {transaction.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(transaction.status)}
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
          View All Transactions
        </Button>
      </CardContent>
    </Card>
  );
}