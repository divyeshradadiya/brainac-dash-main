import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Welcome back! You've been successfully logged in.");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const success = await login(email, password);
      if (success) {
        // Don't show toast here - let the redirect happen first
        // The useEffect will handle the redirect when isAuthenticated becomes true
      } else {  
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    }
  };

  const handleSignup = async (firstName: string, lastName: string, email: string, password: string, grade: number) => {
    try {
      const success = await signup(firstName, lastName, email, password, grade);
      if (success) {
        // Don't show toast here - let the redirect happen first
        // The useEffect will handle the redirect when isAuthenticated becomes true
      } else {
        toast.error("Registration failed. Please check your information and try again.");
      }
    } catch (error) {
      console.error('Signup error:', error);
      // Extract more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('email-already-in-use')) {
          toast.error("An account with this email already exists. Please try logging in instead.");
        } else if (error.message.includes('weak-password')) {
          toast.error("Password is too weak. Please choose a stronger password.");
        } else if (error.message.includes('invalid-email')) {
          toast.error("Please enter a valid email address.");
        } else {
          toast.error(`Registration failed: ${error.message}`);
        }
      } else {
        toast.error("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <>
      {isLogin ? (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToSignup={() => setIsLogin(false)}
          isLoading={isLoading}
        />
      ) : (
        <SignupForm
          onSignup={handleSignup}
          onSwitchToLogin={() => setIsLogin(true)}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
