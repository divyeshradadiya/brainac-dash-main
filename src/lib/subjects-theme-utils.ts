// Subjects Theme Utilities - Easy application across the app
import { cn } from './utils';

// Utility function to get subject gradient based on name
export const getSubjectGradient = (subjectName: string): string => {
  const subjectKey = subjectName.toLowerCase().split(' - ')[0];
  
  // Handle special cases
  if (subjectKey === 'english literature') return 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600';
  if (subjectKey === 'computer science') return 'bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600';
  if (subjectKey === 'art & design') return 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600';
  if (subjectKey === 'physical education') return 'bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600';
  
  // Map subject names to gradients
  const gradients: Record<string, string> = {
    mathematics: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
    science: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600',
    english: 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
    history: 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600',
    computer: 'bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600',
    geography: 'bg-gradient-to-br from-teal-400 via-teal-500 to-teal-600',
    art: 'bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600',
    physical: 'bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600',
    physics: 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600'
  };
  
  return gradients[subjectKey] || gradients.mathematics;
};

// Utility function to get stats card color based on index
export const getStatsColor = (index: number): string => {
  const colors = ['blue', 'emerald', 'purple', 'orange'];
  return colors[index % colors.length];
};

// Utility function to get progress stroke color
export const getProgressColor = (color: string): string => {
  if (color.includes('blue')) return 'stroke-blue-500';
  if (color.includes('emerald')) return 'stroke-emerald-500';
  if (color.includes('purple')) return 'stroke-purple-500';
  if (color.includes('orange')) return 'stroke-orange-500';
  if (color.includes('rose')) return 'stroke-rose-500';
  if (color.includes('teal')) return 'stroke-teal-500';
  if (color.includes('pink')) return 'stroke-pink-500';
  if (color.includes('indigo')) return 'stroke-indigo-500';
  return 'stroke-blue-500';
};

// Pre-built class combinations for common components
export const subjectsThemeClasses = {
  // Header
  header: 'subjects-header',
  headerPattern: 'subjects-header-pattern',
  headerContent: 'relative z-10 px-6 py-8',
  headerIcon: 'w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg',
  headerTitle: 'text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent',
  headerSubtitle: 'text-gray-600 dark:text-gray-400 font-medium',
  headerStats: 'flex items-center gap-6 pt-1',
  
  // Stats Cards
  statsCard: 'subjects-stats-card',
  statsGlow: (color: string) => cn('subjects-stats-glow', `bg-gradient-to-r ${color}`),
  statsCardContent: 'subjects-stats-card-content',
  statsIcon: (color: string) => cn('w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg', `bg-gradient-to-br ${color}`),
  statsProgress: 'mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
  statsProgressBar: (color: string) => cn('h-full rounded-full transition-all duration-1000', `bg-gradient-to-r ${color}`),
  
  // Subject Cards
  subjectCard: 'subjects-card',
  subjectGlow: (gradient: string) => cn('subjects-card-glow', `bg-gradient-to-r ${gradient}`),
  subjectCardContent: 'subjects-card-content',
  subjectHeader: (gradient: string) => cn('h-32 relative overflow-hidden', `bg-gradient-to-br ${gradient}`),
  subjectContent: 'p-6 space-y-5',
  
  // Search Input
  searchWrapper: 'relative flex-1 group',
  searchIcon: 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors',
  searchInput: 'subjects-search-input',
  searchFocus: 'subjects-search-focus',
  
  // Buttons
  buttonPrimary: 'subjects-button-primary',
  buttonOutline: 'subjects-button-outline',
  buttonGhost: 'hover:bg-white/20 dark:hover:bg-gray-900/20 backdrop-blur-xl transition-all duration-300',
  
  // Progress
  progressCircular: 'subjects-progress-circular',
  progressSvg: 'subjects-progress-svg',
  progressBackground: 'subjects-progress-background',
  progressBar: (color: string) => cn('subjects-progress-bar', color),
  progressText: 'subjects-progress-text',
  
  // Badges
  badgeLevel: 'subjects-badge-level',
  badgeCategory: 'subjects-badge-category',
  badgeType: 'subjects-badge-type',
  
  // Glass Morphism
  glassLight: 'subjects-glass-light',
  glassCard: 'subjects-glass-card',
  glassInput: 'subjects-glass-input',
  
  // Layout
  container: 'flex flex-col transition-all duration-300 ease-in-out',
  main: 'flex-1 p-6 space-y-6 overflow-auto',
  grid: {
    stats: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
    subjects: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8',
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
  }
};

// Helper function to create a themed page wrapper
export const createThemedPage = (title: string, subtitle: string, icon: React.ReactNode, stats?: Array<{ icon: React.ReactNode; label: string; value: string }>) => {
  return {
    header: {
      container: subjectsThemeClasses.header,
      pattern: subjectsThemeClasses.headerPattern,
      content: subjectsThemeClasses.headerContent,
      icon: subjectsThemeClasses.headerIcon,
      title: subjectsThemeClasses.headerTitle,
      subtitle: subjectsThemeClasses.headerSubtitle,
      stats: subjectsThemeClasses.headerStats
    },
    layout: {
      container: subjectsThemeClasses.container,
      main: subjectsThemeClasses.main,
      grid: subjectsThemeClasses.grid
    }
  };
};

// Helper function to create themed stats cards
export const createThemedStatsCards = (stats: Array<{ title: string; value: string | number; icon: React.ReactNode; progress?: number }>) => {
  return stats.map((stat, index) => ({
    wrapper: subjectsThemeClasses.statsCard,
    glow: subjectsThemeClasses.statsGlow(`from-${getStatsColor(index)}-400 to-${getStatsColor(index)}-600`),
    card: subjectsThemeClasses.statsCardContent,
    icon: subjectsThemeClasses.statsIcon(`from-${getStatsColor(index)}-500 to-${getStatsColor(index)}-600`),
    progress: stat.progress !== undefined ? {
      container: subjectsThemeClasses.statsProgress,
      bar: subjectsThemeClasses.statsProgressBar(`from-${getStatsColor(index)}-500 to-${getStatsColor(index)}-600`)
    } : undefined
  }));
};

// Helper function to create themed subject cards
export const createThemedSubjectCards = (subjects: Array<{ name: string; instructor: string; progress: number; level: string }>) => {
  return subjects.map(subject => ({
    wrapper: subjectsThemeClasses.subjectCard,
    glow: subjectsThemeClasses.subjectGlow(getSubjectGradient(subject.name)),
    card: subjectsThemeClasses.subjectCardContent,
    header: subjectsThemeClasses.subjectHeader(getSubjectGradient(subject.name)),
    content: subjectsThemeClasses.subjectContent
  }));
};

export default {
  getSubjectGradient,
  getStatsColor,
  getProgressColor,
  subjectsThemeClasses,
  createThemedPage,
  createThemedStatsCards,
  createThemedSubjectCards
};
