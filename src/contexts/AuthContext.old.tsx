import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { apiService, User } from '../lib/api';

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
          const response = await apiService.getUserProfile();
          if (response.success && response.data) {
            setUser(response.data.user);
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
    } catch (error: any) {
      console.error('Login error:', error);
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
      const response = await apiService.registerUser({
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
    } catch (error: any) {
      console.error('Signup error:', error);
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
        
        const response = await apiService.getUserProfile();
        if (response.success && response.data) {
          setUser(response.data.user);
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
  useEffect(() => {
    const savedUser = localStorage.getItem('studyspace_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('studyspace_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo authentication logic - always succeed for demo purposes
    // In a real app, you would validate against actual user data
    const foundUser = demoUsers.find(u => u.email === email && u.password === password);
    
    // For demo: if exact match found, use that user, otherwise create a demo user
    let userData: User;
    if (foundUser) {
      userData = {
        id: foundUser.id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        avatar: foundUser.avatar
      };
    } else {
      // Create a demo user with the provided email
      userData = {
        id: Date.now().toString(),
        firstName: email.split('@')[0] || 'Demo',
        lastName: 'User',
        email: email,
        avatar: 'https://github.com/shadcn.png'
      };
    }
    
    setUser(userData);
    localStorage.setItem('studyspace_user', JSON.stringify(userData));
    setIsLoading(false);
    return true;
  };

  const signup = async (firstName: string, lastName: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check if user already exists
    const existingUser = demoUsers.find(u => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false; // User already exists
    }
    
    // Create new user (in a real app, this would be saved to a database)
    const newUser: User = {
      id: Date.now().toString(),
      firstName,
      lastName,
      email,
      avatar: 'https://github.com/shadcn.png'
    };
    
    setUser(newUser);
    localStorage.setItem('studyspace_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studyspace_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
