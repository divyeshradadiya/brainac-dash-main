
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Zap, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/lib/api';
import type { CancelSubscriptionResponse } from '@/types/api';

interface RazorpayResponse {
  razorpay_subscription_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  duration: string;
  originalPrice?: number;
  discount?: string;
  popular?: boolean;
  features: string[];
}

interface SubscriptionStatus {
  subscriptionStatus: string;
  subscriptionPlan?: string;
  trialEndDate?: string;
  subscriptionEndDate?: string;
  daysRemaining: number;
  isExpired: boolean;
  needsSubscription: boolean;
}

// Load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Subscription() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    loadData();
  }, [isAuthenticated, navigate]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load subscription plans and status
      const [plansResponse, statusResponse] = await Promise.all([
        apiService.getSubscriptionPlans(),
        apiService.getSubscriptionStatus()
      ]);

      setPlans(plansResponse || []);
      setSubscriptionStatus(statusResponse);
    } catch (error: unknown) {
      console.error('Failed to load subscription data:', error instanceof Error ? error.message : 'Unknown error');
      setError('Failed to load subscription information.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Step 1: Create subscription plan in Razorpay
      console.log('Creating subscription plan for:', plan.id);
      const planResponse = await apiService.createSubscriptionPlan(plan.id);
      console.log('Plan created:', planResponse);

      // Step 2: Create subscription using the plan
      console.log('Creating subscription with plan:', planResponse.planId);
      const subscriptionResponse = await apiService.createSubscription(plan.id, planResponse.planId);
      console.log('Subscription created:', subscriptionResponse);

      // Step 3: Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load payment gateway. Please try again.');
      }

      // Step 4: Open Razorpay checkout for subscription
      const options = {
        key: subscriptionResponse.key,
        subscription_id: subscriptionResponse.subscriptionId,
        name: 'Brainac',
        description: `Subscribe to ${plan.name} - Recurring Subscription`,
        
        // Payment method configuration for subscriptions
        config: {
          display: {
            blocks: {
              banks: {
                name: 'Pay with Bank Transfer',
                instruments: [
                  {
                    method: 'netbanking'
                  },
                  {
                    method: 'upi'
                  }
                ]
              },
              card: {
                name: 'Credit/Debit Card',
                instruments: [
                  {
                    method: 'card'
                  }
                ]
              }
            },
            sequence: ['card', 'banks'],
            preferences: {
              show_default_blocks: true
            }
          }
        },
        
        // Enable recurring payment methods
        recurring: 1,
        
        handler: async (response: RazorpayResponse) => {
          try {
            console.log('Subscription payment completed, verifying...', response);
            
            // Verify subscription payment
            const verificationResult = await apiService.verifySubscriptionPayment({
              razorpay_subscription_id: response.razorpay_subscription_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan.id
            });

            console.log('Subscription payment verification result:', verificationResult);

            // Show detailed success message
            const message = `🎉 Subscription Successful!\n\n✅ Plan: ${plan.name}\n💰 Amount: ₹${plan.price}/billing cycle\n📅 Valid until: ${new Date(verificationResult.subscriptionEndDate).toLocaleDateString()}\n🔄 Auto-renewal: Enabled\n🆔 Subscription ID: ${verificationResult.subscriptionId}\n🆔 Payment ID: ${verificationResult.paymentId}`;
            
            alert(message);
            
            // Refresh subscription data and navigate
            await loadData();
            navigate('/subjects-list');
          } catch (error: unknown) {
            console.error('Subscription payment verification failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            setError(`Subscription verification failed: ${errorMessage}. Please contact support with payment ID: ${response.razorpay_payment_id}`);
          }
        },
        prefill: {
          name: `${user?.firstName} ${user?.lastName}`,
          email: user?.email,
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          ondismiss: () => {
            console.log('Subscription modal closed by user');
            setIsProcessing(false);
          },
          escape: false,
          animation: true
        },
        notes: {
          plan_type: plan.id,
          user_email: user?.email || '',
          billing_cycle: plan.duration
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: unknown) {
      console.error('Subscription initiation failed:', error instanceof Error ? error.message : 'Unknown error');
      setError(error instanceof Error ? error.message : 'Failed to initiate subscription.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription? You will lose access to premium content immediately.')) {
      return;
    }

    try {
      setIsCancelling(true);
      setError(null);

      const result = await apiService.cancelSubscription();
      
      console.log('Subscription cancelled:', result);
      
      // Show success message
      alert(`✅ Subscription cancelled successfully!\n\nYour subscription has been cancelled and you will no longer be charged. Thank you for using Brainac!`);
      
      // Refresh subscription data
      await loadData();
    } catch (error: unknown) {
      console.error('Failed to cancel subscription:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to cancel subscription: ${errorMessage}. Please try again or contact support.`);
    } finally {
      setIsCancelling(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.04%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60"></div>
        
        <div className="relative z-10 px-6 py-12 text-center">
          <div className="max-w-4xl mx-auto">
            <Crown className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-blue-100 mb-2">
              Unlock unlimited access to Class {user?.grade} content
            </p>
            
            {/* Subscription Status */}
            {subscriptionStatus && (
              <div className="mt-6 inline-block bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-blue-100">
                  Current Status: <span className="font-semibold">
                    {subscriptionStatus.subscriptionStatus === 'active' ? '✅ Active Subscription' : 
                     subscriptionStatus.subscriptionStatus === 'trial' ? '🎁 Free Trial' : 
                     subscriptionStatus.subscriptionStatus === 'cancelled' ? '❌ Cancelled' : '❌ Expired'}
                  </span>
                </p>
                {subscriptionStatus.daysRemaining > 0 && subscriptionStatus.subscriptionStatus !== 'cancelled' && (
                  <p className="text-xs text-blue-200">
                    {subscriptionStatus.daysRemaining} days remaining
                  </p>
                )}
                {subscriptionStatus.subscriptionStatus === 'cancelled' && (
                  <p className="text-xs text-blue-200">
                    Subscription cancelled - Subscribe again to regain access
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-6 pt-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Current Subscription Management */}
      {subscriptionStatus?.subscriptionStatus === 'active' && (
        <div className="px-6 pt-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50">
                <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                  Current Subscription
                </CardTitle>
                <div className="flex items-center justify-center space-x-4">
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    {subscriptionStatus.subscriptionPlan?.toUpperCase() || 'ACTIVE'}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {subscriptionStatus.daysRemaining} days remaining
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="px-6 pb-6">
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    You're currently enjoying premium access to all content. 
                    You can cancel anytime - there are no commitments or cancellation fees.
                  </p>
                  
                  <Button
                    onClick={handleCancelSubscription}
                    disabled={isCancelling}
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-500 hover:border-red-400"
                  >
                    {isCancelling ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                        Cancelling...
                      </div>
                    ) : (
                      'Cancel Subscription'
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500">
                    Cancel anytime. No questions asked.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Pricing Plans */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden ${
                  plan.popular 
                    ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                    : 'shadow-lg hover:shadow-xl'
                } transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-2 text-sm font-medium">
                    <Zap className="h-4 w-4 inline mr-1" />
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </CardTitle>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-blue-600">₹{plan.price}</span>
                    <span className="text-gray-600">/{plan.duration}</span>
                  </div>
                  
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-gray-400 line-through">₹{plan.originalPrice}</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {plan.discount}
                      </Badge>
                    </div>
                  )}
                </CardHeader>
                
                <CardContent className="px-6 pb-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handleSubscribe(plan)}
                    disabled={isProcessing || (subscriptionStatus?.subscriptionStatus === 'active' && subscriptionStatus?.subscriptionPlan === plan.id)}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                        : ''
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (subscriptionStatus?.subscriptionStatus === 'active' && subscriptionStatus?.subscriptionPlan === plan.id) ? (
                      'Current Plan'
                    ) : subscriptionStatus?.subscriptionStatus === 'cancelled' ? (
                      'Subscribe Again'
                    ) : (
                      `Subscribe Now`
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center space-x-8 text-gray-600">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                <span className="text-sm">Cancel Anytime</span>
              </div>
              <div className="flex items-center">
                <Crown className="h-5 w-5 mr-2" />
                <span className="text-sm">Premium Content</span>
              </div>
            </div>
            
            <p className="text-gray-500 text-sm mt-4">
              All payments are processed securely through Razorpay. No commitment required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}