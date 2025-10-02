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
  RegisterRequest,
  UpdateProfileRequest
} from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('brainac_auth_token');
    return {
      'Content-Type': 'application/json',
      // For development, always include a dummy token if none exists
      Authorization: token ? `Bearer ${token}` : 'Bearer dev-token',
    };
  }

  setAuthToken(token: string): void {
    localStorage.setItem('brainac_auth_token', token);
  }

  removeAuthToken(): void {
    localStorage.removeItem('brainac_auth_token');
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

  async register(userData: RegisterRequest): Promise<AuthResponse & {customToken: string}> {
    return this.makeRequest<AuthResponse & {customToken: string}>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(email: string, password: string): Promise<AuthResponse & {customToken: string}> {
    return this.makeRequest<AuthResponse & {customToken: string}>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async getProfile(): Promise<ApiResponse<AuthResponse>> {
    return this.makeRequest<ApiResponse<AuthResponse>>('/auth/profile');
  }

  async updateProfile(userData: UpdateProfileRequest): Promise<ApiResponse<{message: string}>> {
    return this.makeRequest<ApiResponse<{message: string}>>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getSubjects(): Promise<SubjectsResponse> {
    return this.makeRequest<SubjectsResponse>('/subjects');
  }

  async getSubjectDetails(subjectId: string): Promise<any> {
    return this.makeRequest<any>(`/subjects/${subjectId}`);
  }

  async getVideos(subjectId?: string): Promise<VideosResponse> {
    const endpoint = subjectId ? `/subjects/${subjectId}/videos` : '/subjects/all/videos';
    return this.makeRequest<VideosResponse>(endpoint);
  }

  async getVideo(videoId: string): Promise<VideoResponse> {
    return this.makeRequest<VideoResponse>(`/subjects/videos/${videoId}`);
  }

  async getSubscriptionStatus(): Promise<SubscriptionStatusResponse> {
    return this.makeRequest<SubscriptionStatusResponse>('/subscription/status');
  }

  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    const response = await this.makeRequest<{plans: SubscriptionPlan[]}>('/subscription/plans');
    return response.plans || [];
  }

  async createPaymentOrder(planId: string, amount: number): Promise<{ orderId: string; amount: number; currency: string; key: string; isMock?: boolean }> {
    console.log('API: Creating payment order with', { planId, amount });
    
    try {
      const response = await this.makeRequest<{ orderId: string; amount: number; currency: string; key: string; isMock?: boolean }>('/subscription/create-order', {
        method: 'POST',
        body: JSON.stringify({ planId, amount }),
      });
      
      console.log('API: Order response:', response);
      
      if (!response || !response.orderId) {
        throw new Error('Invalid order response structure');
      } 
      
      return response;
    } catch (error) {
      console.error('API: Error creating payment order:', error);
      throw error;
    }
  }  async verifyPayment(data: {
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
