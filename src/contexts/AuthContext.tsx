import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '@/lib/api';
import type { User } from '@/types/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password: string, grade: number) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Monitor Firebase auth state changes
  useEffect(() => {
    // Check for stored authentication on app start
    const checkStoredAuth = () => {
      try {
        const storedUser = localStorage.getItem('brainac_user');
        const storedToken = localStorage.getItem('brainac_auth_token');
        
        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          apiService.setAuthToken(storedToken);
        }
      } catch (error) {
        console.error('Error restoring auth state:', error);
        // Clear invalid stored data
        localStorage.removeItem('brainac_user');
        localStorage.removeItem('brainac_auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkStoredAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Login via backend
      const response = await apiService.login(email, password);
      
      if (response.customToken) {
        // Store auth data in localStorage instead of using Firebase custom token
        const userData: User = {
          uid: response.uid,
          email: response.email,
          firstName: response.displayName?.split(' ')[0] || '',
          lastName: response.displayName?.split(' ')[1] || '',
          grade: response.class,
          subscriptionStatus: response.subscriptionStatus as 'trial' | 'active' | 'expired' | 'cancelled',
          trialEndDate: response.trialEndDate,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        };
        
        // Store user data and auth token
        localStorage.setItem('brainac_user', JSON.stringify(userData));
        localStorage.setItem('brainac_auth_token', response.customToken);
        
        setUser(userData);
        setIsLoading(false);
        
        return true;
      } else {
        console.error('Login failed: No custom token received');
        setIsLoading(false);
        return false;
      }
    } catch (error: unknown) {
      console.error('Login error:', error instanceof Error ? error.message : 'Login failed');
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    grade: number
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Register via backend
      const response = await apiService.register({
        email,
        password,
        firstName,
        lastName,
        class: grade,
      });
      
      if (response.customToken) {
        // Store auth data in localStorage instead of using Firebase custom token
        const userData: User = {
          uid: response.uid,
          email: response.email,
          firstName: firstName,
          lastName: lastName,
          grade: response.class,
          subscriptionStatus: response.subscriptionStatus as 'trial' | 'active' | 'expired' | 'cancelled',
          trialEndDate: response.trialEndDate,
          createdAt: response.createdAt,
          updatedAt: response.updatedAt,
        };
        
        // Store user data and auth token
        localStorage.setItem('brainac_user', JSON.stringify(userData));
        localStorage.setItem('brainac_auth_token', response.customToken);
        
        setUser(userData);
        setIsLoading(false);
        
        return true;
      } else {
        console.error('Registration failed: No custom token received');
        setIsLoading(false);
        return false;
      }
    } catch (error: unknown) {
      console.error('Signup error:', error instanceof Error ? error.message : 'Signup failed');
      setIsLoading(false);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Clear localStorage
      localStorage.removeItem('brainac_user');
      localStorage.removeItem('brainac_auth_token');
      
      setUser(null);
      apiService.removeAuthToken();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshUserProfile = async (): Promise<void> => {
    try {
      const storedToken = localStorage.getItem('brainac_auth_token');
      if (!storedToken) {
        console.error('No auth token found');
        return;
      }

      apiService.setAuthToken(storedToken);
      
      const response = await apiService.getProfile();
      if (response.success && response.data) {
        // Convert backend response to User type
        const userData: User = {
          uid: response.data.uid,
          email: response.data.email,
          firstName: response.data.displayName?.split(' ')[0] || '',
          lastName: response.data.displayName?.split(' ')[1] || '',
          grade: response.data.class,
          subscriptionStatus: response.data.subscriptionStatus as 'trial' | 'active' | 'expired' | 'cancelled',
          trialEndDate: response.data.trialEndDate,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        };
        setUser(userData);
        
        // Update localStorage with fresh user data
        localStorage.setItem('brainac_user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error refreshing user profile:', error);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}