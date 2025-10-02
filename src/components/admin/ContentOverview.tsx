import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Eye, Edit, Trash2, Plus } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  subject: string;
  grade: number;
  duration: string;
  views: number;
  status: 'published' | 'draft' | 'pending';
  uploadDate: string;
}

const contentItems: ContentItem[] = [
  {
    id: '1',
    title: 'Quadratic Equations - Complete Guide',
    subject: 'Mathematics',
    grade: 10,
    duration: '45:30',
    views: 1247,
    status: 'published',
    uploadDate: '2024-09-15'
  },
  {
    id: '2',
    title: 'Photosynthesis Process Explained',
    subject: 'Biology',
    grade: 9,
    duration: '32:15',
    views: 892,
    status: 'published',
    uploadDate: '2024-09-20'
  },
  {
    id: '3',
    title: 'Indian Independence Movement',
    subject: 'History',
    grade: 8,
    duration: '28:45',
    views: 567,
    status: 'draft',
    uploadDate: '2024-09-28'
  },
  {
    id: '4',
    title: 'Chemical Bonding Fundamentals',
    subject: 'Chemistry',
    grade: 10,
    duration: '38:20',
    views: 1023,
    status: 'published',
    uploadDate: '2024-09-25'
  },
  {
    id: '5',
    title: 'Shakespeare\'s Hamlet Analysis',
    subject: 'English',
    grade: 9,
    duration: '41:10',
    views: 445,
    status: 'pending',
    uploadDate: '2024-09-30'
  }
];

export function ContentOverview() {
  const getStatusBadge = (status: ContentItem['status']) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800">Draft</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Content Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage videos, subjects, and educational content
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Video
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {contentItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{item.title}</h4>
                  {getStatusBadge(item.status)}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{item.subject} • Class {item.grade}</span>
                  <span className="flex items-center">
                    <Play className="h-3 w-3 mr-1" />
                    {item.duration}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    {item.views} views
                  </span>
                  <span>Uploaded {new Date(item.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          View All Content
        </Button>
      </CardContent>
    </Card>
  );
}