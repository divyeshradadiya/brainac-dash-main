import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Demo user data for testing
const demoUsers = [
  {
    id: '1',
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex@student.school.edu',
    password: 'password123',
    avatar: 'https://github.com/shadcn.png'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarah@student.school.edu',
    password: 'password123',
    avatar: 'https://github.com/shadcn.png'
  }
];

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
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
