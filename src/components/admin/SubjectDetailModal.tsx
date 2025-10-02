import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Video, BookOpen, FolderOpen } from 'lucide-react';
import { adminApiService } from '@/lib/adminApi';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for authenticated requests
const makeAuthenticatedRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('brainac_auth_token');
  const url = `${API_BASE_URL}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : 'Bearer dev-token',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

interface Unit {
  id: string;
  name: string;
  description: string;
  subjectId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface Chapter {
  id: string;
  name: string;
  description: string;
  unitId: string;
  subjectId: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface VideoItem {
  id: string;
  title: string;
  description: string;
  subject: string;
  subjectId: string;
  unitId: string;
  chapterId: string;
  grade: number;
  duration: string;
  videoUrl: string;
  thumbnail: string;
  views: number;
  likes: number;
  order: number;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
}

interface Subject {
  id: string;
  name: string;
  description?: string;
  class: number;
  icon: string;
  color: string;
  bgColor: string;
  totalUnits: number;
  totalChapters: number;
  totalExplainers: number;
  totalVideos: number;
  enrolledStudents: number;
  createdAt: string;
  updatedAt: string;
}

interface SubjectDetailModalProps {
  subject: Subject | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

interface UnitFormData {
  name: string;
  description: string;
  order: number;
}

interface ChapterFormData {
  name: string;
  description: string;
  order: number;
}

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  thumbnail: string;
  tags: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  order: number;
}

export function SubjectDetailModal({ subject, isOpen, onClose, onUpdate }: SubjectDetailModalProps) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [showUnitForm, setShowUnitForm] = useState(false);
  const [showChapterForm, setShowChapterForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);

  const [unitForm, setUnitForm] = useState<UnitFormData>({
    name: '',
    description: '',
    order: 1
  });

  const [chapterForm, setChapterForm] = useState<ChapterFormData>({
    name: '',
    description: '',
    order: 1
  });

  const [videoForm, setVideoForm] = useState<VideoFormData>({
    title: '',
    description: '',
    videoUrl: '',
    duration: '',
    thumbnail: '',
    tags: '',
    difficulty: 'beginner',
    order: 1
  });

  useEffect(() => {
    if (subject && isOpen) {
      fetchSubjectData();
    }
  }, [subject, isOpen]);

  const fetchSubjectData = async () => {
    if (!subject) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch units
      const unitsData = await makeAuthenticatedRequest(`/admin/subjects/${subject.id}/units`);
      
      let fetchedUnits: Unit[] = [];
      if (unitsData.success) {
        fetchedUnits = unitsData.data.units || [];
        setUnits(fetchedUnits);
      }

      // Fetch all chapters for this subject
      const chaptersData: Chapter[] = [];
      for (const unit of fetchedUnits) {
        const chapterData = await makeAuthenticatedRequest(`/admin/units/${unit.id}/chapters`);
        if (chapterData.success) {
          chaptersData.push(...chapterData.data.chapters);
        }
      }
      setChapters(chaptersData);

      // Fetch all videos for this subject
      try {
        const videosResponse = await adminApiService.getVideos({ subject: subject.name });
        if (videosResponse.success) {
          setVideos(videosResponse.data.videos || []);
        }
      } catch (videoError) {
        console.log('Could not fetch videos:', videoError);
        setVideos([]);
      }

    } catch (err) {
      console.error('Error fetching subject data:', err);
      setError('Failed to load subject data');
    } finally {
      setLoading(false);
    }
  };

  const createUnit = async () => {
    if (!subject) return;

    try {
      const data = await makeAuthenticatedRequest(`/admin/subjects/${subject.id}/units`, {
        method: 'POST',
        body: JSON.stringify(unitForm)
      });

      if (data.success) {
        setUnits([...units, data.data]);
        setShowUnitForm(false);
        resetUnitForm();
        onUpdate();
      }
    } catch (err) {
      console.error('Error creating unit:', err);
      setError('Failed to create unit');
    }
  };

  const createChapter = async () => {
    if (!selectedUnit) return;

    try {
      const data = await makeAuthenticatedRequest(`/admin/units/${selectedUnit.id}/chapters`, {
        method: 'POST',
        body: JSON.stringify(chapterForm)
      });

      if (data.success) {
        setChapters([...chapters, data.data]);
        setShowChapterForm(false);
        resetChapterForm();
        onUpdate();
      }
    } catch (err) {
      console.error('Error creating chapter:', err);
      setError('Failed to create chapter');
    }
  };

  const createVideo = async () => {
    if (!selectedChapter) return;

    try {
      const videoData = {
        ...videoForm,
        tags: videoForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      const data = await makeAuthenticatedRequest(`/admin/chapters/${selectedChapter.id}/videos`, {
        method: 'POST',
        body: JSON.stringify(videoData)
      });

      if (data.success) {
        setVideos([...videos, data.data]);
        setShowVideoForm(false);
        resetVideoForm();
        onUpdate();
      }
    } catch (err) {
      console.error('Error creating video:', err);
      setError('Failed to create video');
    }
  };

  const deleteUnit = async (unitId: string) => {
    if (!confirm('Are you sure? This will delete all chapters and videos in this unit.')) return;

    try {
      const response = await makeAuthenticatedRequest(`/admin/units/${unitId}`, {
        method: 'DELETE'
      });

      if (response.success) {
        setUnits(units.filter(u => u.id !== unitId));
        setChapters(chapters.filter(c => c.unitId !== unitId));
        onUpdate();
      }
    } catch (err) {
      console.error('Error deleting unit:', err);
      setError('Failed to delete unit');
    }
  };

  const deleteChapter = async (chapterId: string) => {
    if (!confirm('Are you sure? This will delete all videos in this chapter.')) return;

    try {
      const response = await makeAuthenticatedRequest(`/admin/chapters/${chapterId}`, {
        method: 'DELETE'
      });

      if (response.success) {
        setChapters(chapters.filter(c => c.id !== chapterId));
        setVideos(videos.filter(v => v.chapterId !== chapterId));
        onUpdate();
      }
    } catch (err) {
      console.error('Error deleting chapter:', err);
      setError('Failed to delete chapter');
    }
  };

  const deleteVideo = async (videoId: string) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      await adminApiService.deleteVideo(videoId);
      setVideos(videos.filter(v => v.id !== videoId));
      onUpdate();
    } catch (err) {
      console.error('Error deleting video:', err);
      setError('Failed to delete video');
    }
  };

  const resetUnitForm = () => {
    setUnitForm({ name: '', description: '', order: 1 });
    setEditingUnit(null);
  };

  const resetChapterForm = () => {
    setChapterForm({ name: '', description: '', order: 1 });
    setEditingChapter(null);
  };

  const resetVideoForm = () => {
    setVideoForm({
      title: '',
      description: '',
      videoUrl: '',
      duration: '',
      thumbnail: '',
      tags: '',
      difficulty: 'beginner',
      order: 1
    });
    setEditingVideo(null);
  };

  const getChaptersForUnit = (unitId: string) => {
    return chapters.filter(chapter => chapter.unitId === unitId);
  };

  const getVideosForChapter = (chapterId: string) => {
    return videos.filter(video => video.chapterId === chapterId);
  };

  if (!subject) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-2xl">{subject.icon}</span>
            {subject.name} - Class {subject.class}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <Tabs defaultValue="units" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="units" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Units ({units.length})
            </TabsTrigger>
            <TabsTrigger value="chapters" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Chapters ({chapters.length})
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Videos ({videos.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="units" className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Units</h3>
              <Button onClick={() => setShowUnitForm(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Unit
              </Button>
            </div>

            {showUnitForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Create New Unit</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="unit-name">Unit Name</Label>
                    <Input
                      id="unit-name"
                      value={unitForm.name}
                      onChange={(e) => setUnitForm({ ...unitForm, name: e.target.value })}
                      placeholder="Enter unit name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit-description">Description</Label>
                    <Textarea
                      id="unit-description"
                      value={unitForm.description}
                      onChange={(e) => setUnitForm({ ...unitForm, description: e.target.value })}
                      placeholder="Enter unit description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit-order">Order</Label>
                    <Input
                      id="unit-order"
                      type="number"
                      value={unitForm.order}
                      onChange={(e) => setUnitForm({ ...unitForm, order: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={createUnit}>Create Unit</Button>
                    <Button variant="outline" onClick={() => { setShowUnitForm(false); resetUnitForm(); }}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {units.map((unit) => (
                <Card key={unit.id}>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">{unit.name}</CardTitle>
                        <p className="text-sm text-gray-600">{unit.description}</p>
                        <Badge variant="secondary" className="mt-2">
                          Order: {unit.order}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setSelectedUnit(unit);
                            setShowChapterForm(true);
                          }}
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Add Chapter
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteUnit(unit.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      Chapters: {getChaptersForUnit(unit.id).length}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="chapters" className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Chapters</h3>
            </div>

            {showChapterForm && selectedUnit && (
              <Card>
                <CardHeader>
                  <CardTitle>Create Chapter in "{selectedUnit.name}"</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="chapter-name">Chapter Name</Label>
                    <Input
                      id="chapter-name"
                      value={chapterForm.name}
                      onChange={(e) => setChapterForm({ ...chapterForm, name: e.target.value })}
                      placeholder="Enter chapter name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="chapter-description">Description</Label>
                    <Textarea
                      id="chapter-description"
                      value={chapterForm.description}
                      onChange={(e) => setChapterForm({ ...chapterForm, description: e.target.value })}
                      placeholder="Enter chapter description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="chapter-order">Order</Label>
                    <Input
                      id="chapter-order"
                      type="number"
                      value={chapterForm.order}
                      onChange={(e) => setChapterForm({ ...chapterForm, order: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={createChapter}>Create Chapter</Button>
                    <Button variant="outline" onClick={() => { setShowChapterForm(false); resetChapterForm(); setSelectedUnit(null); }}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {chapters.map((chapter) => {
                const unit = units.find(u => u.id === chapter.unitId);
                return (
                  <Card key={chapter.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{chapter.name}</CardTitle>
                          <p className="text-sm text-gray-600">{chapter.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary">Order: {chapter.order}</Badge>
                            <Badge variant="outline">Unit: {unit?.name}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedChapter(chapter);
                              setShowVideoForm(true);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Video
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteChapter(chapter.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600">
                        Videos: {getVideosForChapter(chapter.id).length}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Videos</h3>
            </div>

            {showVideoForm && selectedChapter && (
              <Card>
                <CardHeader>
                  <CardTitle>Add Video to "{selectedChapter.name}"</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="video-title">Video Title</Label>
                      <Input
                        id="video-title"
                        value={videoForm.title}
                        onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                        placeholder="Enter video title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="video-url">Video URL</Label>
                      <Input
                        id="video-url"
                        value={videoForm.videoUrl}
                        onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                        placeholder="https://youtube.com/..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="video-duration">Duration</Label>
                      <Input
                        id="video-duration"
                        value={videoForm.duration}
                        onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                        placeholder="10:30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="video-difficulty">Difficulty</Label>
                      <select
                        id="video-difficulty"
                        value={videoForm.difficulty}
                        onChange={(e) => setVideoForm({ ...videoForm, difficulty: e.target.value as 'beginner' | 'intermediate' | 'advanced' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="video-description">Description</Label>
                    <Textarea
                      id="video-description"
                      value={videoForm.description}
                      onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                      placeholder="Enter video description"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="video-thumbnail">Thumbnail URL</Label>
                      <Input
                        id="video-thumbnail"
                        value={videoForm.thumbnail}
                        onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="video-tags">Tags (comma separated)</Label>
                      <Input
                        id="video-tags"
                        value={videoForm.tags}
                        onChange={(e) => setVideoForm({ ...videoForm, tags: e.target.value })}
                        placeholder="math, algebra, basic"
                      />
                    </div>
                    <div>
                      <Label htmlFor="video-order">Order</Label>
                      <Input
                        id="video-order"
                        type="number"
                        value={videoForm.order}
                        onChange={(e) => setVideoForm({ ...videoForm, order: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={createVideo}>Add Video</Button>
                    <Button variant="outline" onClick={() => { setShowVideoForm(false); resetVideoForm(); setSelectedChapter(null); }}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {videos.map((video) => {
                const chapter = chapters.find(c => c.id === video.chapterId);
                const unit = units.find(u => u.id === video.unitId);
                return (
                  <Card key={video.id}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">{video.title}</CardTitle>
                          <p className="text-sm text-gray-600">{video.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="secondary">Order: {video.order}</Badge>
                            <Badge variant="outline">Duration: {video.duration}</Badge>
                            <Badge variant="outline">Difficulty: {video.difficulty}</Badge>
                            <Badge variant="outline">Chapter: {chapter?.name}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteVideo(video.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-600">
                        <p>URL: <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{video.videoUrl}</a></p>
                        <p>Views: {video.views} | Likes: {video.likes}</p>
                        <p>Tags: {video.tags.join(', ')}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}