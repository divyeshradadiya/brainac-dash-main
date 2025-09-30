import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      toast.success("Welcome back! You've been successfully logged in.");
    } catch (error) {
      toast.error("An error occurred during login. Please try again.");
    }
  };

  const handleSignup = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const success = await signup(firstName, lastName, email, password);
      if (success) {
        toast.success("Account created successfully! Welcome to Brainac.");
      } else {
        toast.error("An account with this email already exists. Please try logging in instead.");
      }
    } catch (error) {
      toast.error("An error occurred during signup. Please try again.");
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
