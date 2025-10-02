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

class AdminApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('brainac_auth_token');
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : 'Bearer dev-token',
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

  // Dashboard Statistics
  async getDashboardStats(): Promise<{
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
  }> {
    return this.makeRequest('/admin/stats');
  }

  // User Management
  async getUsers(filters: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  } = {}): Promise<{
    users: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const params = new URLSearchParams();
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.status) params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    return this.makeRequest(`/admin/users?${params.toString()}`);
  }

  async updateUserSubscription(userId: string, subscriptionData: {
    subscriptionStatus: string;
    subscriptionPlan?: string;
    subscriptionEndDate?: string;
  }): Promise<{ message: string }> {
    return this.makeRequest(`/admin/users/${userId}/subscription`, {
      method: 'PUT',
      body: JSON.stringify(subscriptionData),
    });
  }

  // Subject Management
  async getAdminSubjects(grade?: number): Promise<{
    subjects: any[];
    totalSubjects: number;
    grades: number[];
  }> {
    const params = grade ? `?grade=${grade}` : '';
    return this.makeRequest(`/admin/subjects${params}`);
  }

  async getSubjects(): Promise<any[]> {
    const data = await this.getAdminSubjects();
    return data.subjects;
  }

  async createSubject(subjectData: {
    name: string;
    description: string;
    grade: number;
    icon?: string;
    color?: string;
  }): Promise<any> {
    return this.makeRequest('/admin/subjects', {
      method: 'POST',
      body: JSON.stringify(subjectData),
    });
  }

  async updateSubject(subjectId: string, subjectData: {
    name?: string;
    description?: string;
    grade?: number;
    icon?: string;
    color?: string;
  }): Promise<any> {
    return this.makeRequest(`/admin/subjects/${subjectId}`, {
      method: 'PUT',
      body: JSON.stringify(subjectData),
    });
  }

  async deleteSubject(subjectId: string): Promise<{ message: string }> {
    return this.makeRequest(`/admin/subjects/${subjectId}`, {
      method: 'DELETE',
    });
  }

  // Video Management
  async getVideos(filters: {
    grade?: number;
    subject?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    success: boolean;
    data: {
      videos: any[];
      totalVideos: number;
      page: number;
      totalPages: number;
    };
  }> {
    const params = new URLSearchParams();
    if (filters.grade) params.append('grade', filters.grade.toString());
    if (filters.subject) params.append('subject', filters.subject);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    return this.makeRequest(`/admin/videos?${params.toString()}`);
  }

  async getAdminVideos(filters: {
    grade?: number;
    subject?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<{
    videos: any[];
    pagination: any;
    stats: any;
  }> {
    const params = new URLSearchParams();
    if (filters.grade) params.append('grade', filters.grade.toString());
    if (filters.subject) params.append('subject', filters.subject);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    return this.makeRequest(`/admin/videos?${params.toString()}`);
  }

  async addVideo(videoData: {
    title: string;
    subject: string;
    grade: number;
    duration?: string;
    description?: string;
    videoUrl: string;
    thumbnail?: string;
    category?: string;
  }): Promise<any> {
    return this.makeRequest('/admin/videos', {
      method: 'POST',
      body: JSON.stringify(videoData),
    });
  }

  async updateVideo(videoId: string, updates: any): Promise<{ message: string }> {
    return this.makeRequest(`/admin/videos/${videoId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteVideo(videoId: string): Promise<{ message: string }> {
    return this.makeRequest(`/admin/videos/${videoId}`, {
      method: 'DELETE',
    });
  }

  // Payment Management
  async getPayments(filters?: {
    page?: number;
    limit?: number;
    status?: string;
    method?: string;
    search?: string;
    dateRange?: string;
  }): Promise<any> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }

    const query = queryParams.toString();
    return this.makeRequest(`/admin/payments${query ? `?${query}` : ''}`);
  }

  async getPaymentDetails(paymentId: string): Promise<any> {
    return this.makeRequest(`/admin/payments/${paymentId}`);
  }

  async updatePaymentStatus(paymentId: string, status: string): Promise<{ message: string }> {
    return this.makeRequest(`/admin/payments/${paymentId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async refundPayment(paymentId: string, reason?: string): Promise<{ message: string }> {
    return this.makeRequest(`/admin/payments/${paymentId}/refund`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }
}

export const adminApiService = new AdminApiService();