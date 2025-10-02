import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";

interface SubscriptionGuardProps {
  children: ReactNode;
}

export default function SubscriptionGuard({ children }: SubscriptionGuardProps) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!isAuthenticated || !user) {
        setIsChecking(false);
        return;
      }

      try {
        const subscriptionStatus = await apiService.getSubscriptionStatus();

        // If trial is expired and no active subscription, redirect to subscription page
        if (subscriptionStatus.isExpired && subscriptionStatus.needsSubscription) {
          navigate('/subscription', { replace: true });
          return;
        }
      } catch (error) {
        console.error('Failed to check subscription status:', error);
        // On error, allow access to avoid blocking users
      } finally {
        setIsChecking(false);
      }
    };

    checkSubscription();
  }, [isAuthenticated, user, navigate]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
            Checking subscription...
          </h2>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}