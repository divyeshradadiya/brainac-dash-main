import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { apiService } from '@/lib/api';
import type { User } from '@/types/api';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
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
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Monitor Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          // Get Firebase ID token
          const token = await firebaseUser.getIdToken();
          apiService.setAuthToken(token);
          
          // Fetch user profile from backend
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
          } else {
            console.error('Failed to fetch user profile:', response.error);
            // If backend profile doesn't exist, user might need to complete registration
            setUser(null);
          }
        } catch (error) {
          console.error('Error setting up user session:', error);
          setUser(null);
        }
      } else {
        // User is signed out
        setUser(null);
        apiService.removeAuthToken();
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get ID token
      const token = await firebaseUser.getIdToken();
      apiService.setAuthToken(token);
      
      // The onAuthStateChanged listener will handle fetching the user profile
      return true;
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
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Get ID token
      const token = await firebaseUser.getIdToken();
      apiService.setAuthToken(token);
      
      // Register user in backend
      const response = await apiService.register({
        email,
        password,
        firstName,
        lastName,
        class: grade,
      });
      
      if (response.success) {
        // The onAuthStateChanged listener will handle fetching the user profile
        return true;
      } else {
        console.error('Backend registration failed:', response.error);
        // Delete the Firebase user if backend registration fails
        await firebaseUser.delete();
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
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
      apiService.removeAuthToken();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const refreshUserProfile = async (): Promise<void> => {
    if (firebaseUser) {
      try {
        const token = await firebaseUser.getIdToken(true); // Force refresh
        apiService.setAuthToken(token);
        
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
        }
      } catch (error) {
        console.error('Error refreshing user profile:', error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    isAuthenticated: !!user && !!firebaseUser,
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