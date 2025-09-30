import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  TrendingUp, 
  Clock, 
  User, 
  Search, 
  Target, 
  Star,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { useSubjectsTheme } from '@/hooks/useSubjectsTheme';
import { cn } from '@/lib/utils';

// Example: Header Component using the theme
export const ThemedHeader: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  stats?: Array<{ icon: React.ReactNode; label: string; value: string }>;
}> = ({ title, subtitle, icon, stats }) => {
  const theme = useSubjectsTheme();

  return (
    <header className={theme.components.Header.container}>
      <div className={theme.components.Header.pattern} />
      <div className={theme.components.Header.content}>
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={theme.components.Header.icon}>
                {icon}
              </div>
              <div>
                <h1 className={theme.components.Header.title}>
                  {title}
                </h1>
                <p className={theme.components.Header.subtitle}>
                  {subtitle}
                </p>
              </div>
            </div>
            
            {stats && (
              <div className={theme.components.Header.stats}>
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    {stat.icon}
                    <span>{stat.label}: {stat.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Example: Stats Card Component using the theme
export const ThemedStatsCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  progress?: number;
  color?: 'blue' | 'emerald' | 'purple' | 'orange';
  index?: number;
}> = ({ title, value, icon, progress, color, index = 0 }) => {
  const theme = useSubjectsTheme();
  const statsColor = color || theme.helpers.getStatsColor(index);

  return (
    <div className={theme.components.StatsCard.wrapper}>
      <div className={cn(
        theme.components.StatsCard.glow,
        `bg-gradient-to-r ${theme.colors.stats[statsColor]}`
      )} />
      <Card className={theme.components.StatsCard.card}>
        <CardContent className={theme.components.StatsCard.content}>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className={theme.typography.subtitle}>{title}</p>
              <p className={cn(
                'text-3xl font-bold bg-clip-text text-transparent',
                `bg-gradient-to-r ${theme.colors.text.stats[statsColor]}`
              )}>
                {value}
              </p>
            </div>
            <div className={cn(
              theme.components.StatsCard.icon,
              `bg-gradient-to-br ${theme.colors.stats[statsColor]}`
            )}>
              {icon}
            </div>
          </div>
          
          {progress !== undefined && (
            <div className={theme.components.StatsCard.progress}>
              <div 
                className={cn(
                  'h-full rounded-full transition-all duration-1000',
                  `bg-gradient-to-r ${theme.colors.stats[statsColor]}`
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Example: Subject Card Component using the theme
export const ThemedSubjectCard: React.FC<{
  title: string;
  instructor: string;
  progress: number;
  level: string;
  subjectName: string;
  onClick?: () => void;
}> = ({ title, instructor, progress, level, subjectName, onClick }) => {
  const theme = useSubjectsTheme();
  const gradient = theme.helpers.getSubjectGradient(subjectName);
  const progressColor = theme.helpers.getProgressColor(gradient);

  return (
    <div className={theme.components.SubjectCard.wrapper} onClick={onClick}>
      <div className={cn(
        theme.components.SubjectCard.glow,
        `bg-gradient-to-r ${gradient}`
      )} />
      
      <Card className={theme.components.SubjectCard.card}>
        {/* Gradient header */}
        <div className={cn(
          theme.components.SubjectCard.header,
          `bg-gradient-to-br ${gradient}`
        )}>
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-16 h-16 bg-white/10 rounded-full opacity-30" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full opacity-40" />
          
          {/* Subject icon */}
          <div className="absolute bottom-4 left-6">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Level badge */}
          <div className="absolute top-4 left-4">
            <Badge className={theme.components.Badge.level}>
              <Star className="w-3 h-3 mr-1" />
              {level}
            </Badge>
          </div>
        </div>

        <CardContent className={theme.components.SubjectCard.content}>
          {/* Title and instructor */}
          <div className="space-y-2">
            <CardTitle className={theme.typography.title}>
              {title}
            </CardTitle>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <User className="w-4 h-4" />
              <span className="font-medium">{instructor}</span>
            </div>
          </div>

          {/* Progress section with circular indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Learning Progress
              </span>
            </div>
            
            {/* Circular Progress */}
            <div className={theme.components.Progress.circular.container}>
              <svg className={theme.components.Progress.circular.svg} viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  className={theme.components.Progress.circular.background}
                  strokeWidth="4"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  className={cn(theme.components.Progress.circular.progress, progressColor)}
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (1 - progress / 100)}`}
                />
              </svg>
              
              <div className={theme.components.Progress.circular.text}>
                <span className="text-[14px] font-bold text-gray-900 dark:text-white">
                  {progress}%
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Example: Search Input Component using the theme
export const ThemedSearchInput: React.FC<{
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}> = ({ placeholder, value, onChange }) => {
  const theme = useSubjectsTheme();

  return (
    <div className={theme.components.SearchInput.wrapper}>
      <Search className={theme.components.SearchInput.icon} />
      <Input 
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={theme.components.SearchInput.input}
      />
      <div className={theme.components.SearchInput.focus} />
    </div>
  );
};

// Example: Usage demonstration
export const SubjectsThemeDemo: React.FC = () => {
  const theme = useSubjectsTheme();

  return (
    <div className={theme.layout.container}>
      {/* Header Example */}
      <ThemedHeader
        title="My Subjects 📚"
        subtitle="Track your progress across all subjects"
        icon={<GraduationCap className="w-6 h-6 text-white" />}
        stats={[
          { icon: <Target className="w-4 h-4 text-blue-500" />, label: "8 Active Subjects", value: "" },
          { icon: <Sparkles className="w-4 h-4 text-purple-500" />, label: "Excellence Journey", value: "" }
        ]}
      />

      {/* Main Content */}
      <main className={theme.layout.main}>
        {/* Stats Cards Example */}
        <div className={theme.layout.grid.stats}>
          <ThemedStatsCard
            title="Total Subjects"
            value="8"
            icon={<BookOpen className="w-6 h-6 text-white" />}
            progress={75}
            color="blue"
          />
          <ThemedStatsCard
            title="Avg. Progress"
            value="85%"
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            progress={85}
            color="emerald"
          />
          <ThemedStatsCard
            title="Next Class"
            value="Today"
            icon={<Clock className="w-6 h-6 text-white" />}
            progress={66}
            color="purple"
          />
          <ThemedStatsCard
            title="Instructors"
            value="6"
            icon={<User className="w-6 h-6 text-white" />}
            color="orange"
          />
        </div>

        {/* Search Example */}
        <div className="flex gap-4">
          <ThemedSearchInput
            placeholder="Search subjects or instructors..."
            value=""
            onChange={() => {}}
          />
          <Button className={theme.components.Button.primary}>
            Search
          </Button>
        </div>

        {/* Subject Cards Example */}
        <div className={theme.layout.grid.subjects}>
          <ThemedSubjectCard
            title="Mathematics - Algebra"
            instructor="Mrs. Sarah Smith"
            progress={85}
            level="Intermediate"
            subjectName="Mathematics"
          />
          <ThemedSubjectCard
            title="Science - Physics"
            instructor="Mr. David Johnson"
            progress={72}
            level="Beginner"
            subjectName="Science"
          />
          <ThemedSubjectCard
            title="English Literature"
            instructor="Ms. Emily Davis"
            progress={91}
            level="Advanced"
            subjectName="English Literature"
          />
        </div>
      </main>
    </div>
  );
};

export default SubjectsThemeDemo;
