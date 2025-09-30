import type {
  ApiResponse,
  Subject,
  Video,
  SubscriptionPlan,
  AuthResponse,
  SubjectsResponse,
  VideosResponse,
  VideoResponse,
  SubscriptionStatusResponse,
  RegisterRequest
} from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('firebase_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || data.message || 'Request failed');
      }

      return data.data || data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getProfile(): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/profile');
  }

  async getSubjects(): Promise<SubjectsResponse> {
    return this.makeRequest<SubjectsResponse>('/subjects');
  }

  async getVideos(subjectId?: string): Promise<VideosResponse> {
    const endpoint = subjectId ? `/subjects/${subjectId}/videos` : '/videos';
    return this.makeRequest<VideosResponse>(endpoint);
  }

  async getVideo(videoId: string): Promise<VideoResponse> {
    return this.makeRequest<VideoResponse>(`/videos/${videoId}`);
  }

  async getSubscriptionStatus(): Promise<SubscriptionStatusResponse> {
    return this.makeRequest<SubscriptionStatusResponse>('/subscription/status');
  }

  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    const response = await this.makeRequest<ApiResponse<SubscriptionPlan[]>>('/subscription/plans');
    return response.data || [];
  }

  async createPaymentOrder(planId: string, amount: number): Promise<{ orderId: string; amount: number; currency: string; key: string }> {
    return this.makeRequest<{ orderId: string; amount: number; currency: string; key: string }>('/subscription/create-order', {
      method: 'POST',
      body: JSON.stringify({ planId, amount }),
    });
  }

  async verifyPayment(data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    planId: string;
  }): Promise<{ message: string; subscriptionStatus: string; subscriptionPlan: string; subscriptionEndDate: string; paymentId: string }> {
    return this.makeRequest<{ message: string; subscriptionStatus: string; subscriptionPlan: string; subscriptionEndDate: string; paymentId: string }>('/subscription/verify-payment', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();
