import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Star, ArrowLeft, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/lib/api";
import type {
  Subject,
  Video,
  SubjectsResponse,
  VideosResponse,
} from "@/types/api";

function Subjects() {
  const { subjectId } = useParams<{ subjectId?: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/signin");
      return;
    }
    loadSubjects();
  }, [isAuthenticated, user, navigate]);
  const loadVideos = useCallback(async () => {
    try {
      setError(null);
      const response: VideosResponse = await apiService.getVideos(subjectId);
      setVideos(response.videos || []);
    } catch (error: unknown) {
      console.error("Failed to load videos:", error);
      setError("Failed to load videos for this subject.");
    }
  }, [subjectId]);

  useEffect(() => {
    if (subjects.length > 0) {  
      loadVideos();
    }
  }, [subjectId, subjects, loadVideos]);
  const loadSubjects = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response: SubjectsResponse = await apiService.getSubjects();
      setSubjects(response.subjects || []);
    } catch (error: unknown) {
      console.error("Failed to load subjects:", error);
      setError("Failed to load subjects. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoClick = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  const handleSubjectClick = (subject: Subject) => {
    navigate(`/subjects/${subject.id}`);
  };

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your class content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-6">
          <CardContent>
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Error Loading Content
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={loadSubjects} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  } 

  if (!subjectId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 text-white">
          <div className="relative z-10 px-6 py-12 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Class {user?.grade} Subjects
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Explore interactive lessons, practice exercises, and educational
                videos designed for your grade level.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {subjects.length} Subjects Available
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <Card
                  key={subject.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">{subject.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {subject.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 mt-4">
                        <Play className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-600">
                          Explore Content
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentSubject = subjects.find((s) => s.id === subjectId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 text-white">
        <div className="relative z-10 px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => navigate("/subjects")}
              className="mb-4 text-white hover:text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Subjects
            </Button>

            <div className="flex items-center gap-4">
              <div className="text-5xl">{currentSubject?.icon}</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {currentSubject?.name}
                </h1>
                <p className="text-blue-100">
                  Class {user?.grade} • {videos.length} videos available
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No videos available yet
              </h3>
              <p className="text-gray-500">
                Content for this subject is coming soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((video) => (
                <Card
                  key={video.id}
                  className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
                  onClick={() => handleVideoClick(video.id)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-12 w-12 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{video.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{video.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Subjects;
