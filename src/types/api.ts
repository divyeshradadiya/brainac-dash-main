// Type definitions for Brainac API
export interface User {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  grade: number;
  subscriptionStatus: 'trial' | 'active' | 'expired' | 'cancelled';
  trialEndDate?: string;
  subscriptionEndDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Video {
  id: string;
  title: string;
  subject: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: string;
  description: string;
  videoUrl: string;
  createdAt?: string;
}

export interface SubscriptionPlan {
  id: 'monthly' | 'quarterly' | 'yearly';
  name: string;
  price: number;
  currency: string;
  duration: string;
  originalPrice?: number;
  discount?: string;
  popular?: boolean;
  features: string[];
}

export interface SubscriptionStatus {
  subscriptionStatus: 'trial' | 'active' | 'expired' | 'cancelled';
  subscriptionPlan?: string;
  trialEndDate?: string;
  subscriptionEndDate?: string;
  daysRemaining: number;
  isExpired: boolean;
  needsSubscription: boolean;
}

export interface SubscriptionStatusResponse {
  subscriptionStatus: string;
  subscriptionPlan?: string;
  trialEndDate?: string;
  subscriptionEndDate?: string;
  daysRemaining: number;
  isExpired: boolean;
  needsSubscription: boolean;
}

// API Response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  error?: string;
  message?: string;
}

// Auth API responses
export interface AuthResponse {
  uid: string;
  email: string;
  displayName: string;
  class: number;
  subscriptionStatus: string;
  trialEndDate?: string;
}

export interface AuthRegisterResponse {
  token: string;
  user: User;
}

export interface AuthProfileResponse {
  user: User;
}

// Subjects API responses
export interface SubjectsResponse {
  class: number;
  subjects: Subject[];
  subscriptionStatus: string;
  trialEndDate?: string;
}

export interface VideosResponse {
  class: number;
  videos: Video[];
  totalVideos: number;
}

export interface VideoResponse {
  video: Video;
  class: number;
}

// Subscription API responses
export interface SubscriptionPlansResponse {
  plans: SubscriptionPlan[];
  trialDuration: string;
  currency: string;
}

export interface CreateOrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
}

export interface VerifyPaymentResponse {
  message: string;
  subscriptionStatus: string;
  subscriptionPlan: string;
  subscriptionEndDate: string;
  paymentId: string;
}

// Request types
export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  class: number;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  class?: number;
}

export interface CreateOrderRequest {
  planId: string;
  amount: number;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  planId: string;
}