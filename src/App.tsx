import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "next-themes";
import { AuthPage } from "@/components/auth/AuthPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/subjects" element={
                <ProtectedRoute>
                  <Subjects />
                </ProtectedRoute>
              } />
              <Route path="/subject/:subject" element={
                <ProtectedRoute>
                  <SubjectDetail />
                </ProtectedRoute>
              } />
            <Route path="/subjects-list" element={
                <ProtectedRoute>
                  <BookDetail />
                </ProtectedRoute>
              } />
              <Route path="/homework" element={
                <ProtectedRoute>
                  <Homework />
                </ProtectedRoute>
              } />
              <Route path="/quiz" element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              } />
              <Route path="/grades" element={
                <ProtectedRoute>
                  <Grades />
                </ProtectedRoute>
              } />
              <Route path="/achievements" element={
                <ProtectedRoute>
                  <Achievements />
                </ProtectedRoute>
              } />
            <Route path="/groups" element={
                <ProtectedRoute>
                  <StudyGroups />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/theme-showcase" element={
                <ProtectedRoute>
                  <ThemeShowcase />
                </ProtectedRoute>
              } />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/signin" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
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
