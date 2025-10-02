import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { AuthPage } from "@/components/auth/AuthPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import SubscriptionGuard from "@/components/auth/SubscriptionGuard";
import { FloatingDoubtButton } from "@/components/ui/floating-doubt-button";
import Index from "./pages/Index";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";
import BookDetail from "./pages/BookDetail";
import Homework from "./pages/Homework";
import Quiz from "./pages/Quiz";
import Grades from "./pages/Grades";
import Achievements from "./pages/Achievements";
import StudyGroups from "./pages/StudyGroups";
import Settings from "./pages/Settings";
import { ThemeShowcase } from "@/components/ThemeShowcase";
import NotFound from "./pages/NotFound";
import Subscription from "./pages/Subscription";
import AdminDashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <Index />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
              <Route path="/subjects" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <Subjects />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
              <Route path="/subject/:subject" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <SubjectDetail />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
              <Route path="/book/:subject" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <BookDetail />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
            <Route path="/subjects-list" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <BookDetail />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
              <Route path="/homework" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <Homework />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
              <Route path="/quiz" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <Quiz />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
              <Route path="/grades" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <Grades />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
              <Route path="/achievements" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <Achievements />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
              <Route path="/subscription" element={
                <ProtectedRoute>
                  <Subscription />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            <Route path="/groups" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <StudyGroups />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/theme-showcase" element={
                <ProtectedRoute>
                  <SubscriptionGuard>
                    <ThemeShowcase />
                  </SubscriptionGuard>
                </ProtectedRoute>
              } />
              <Route path="/auth" element={<AuthPage />} />
              {/* <Route path="/signin" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} /> */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingDoubtButton />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
