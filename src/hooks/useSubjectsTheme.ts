import { useMemo } from 'react';
import { subjectsTheme, applyTheme, themeClasses } from '@/lib/subjects-theme';

// Hook to easily apply the subjects theme
export const useSubjectsTheme = () => {
  const theme = useMemo(() => ({
    // Direct access to theme object
    colors: subjectsTheme.colors,
    backgrounds: subjectsTheme.backgrounds,
    cards: subjectsTheme.cards,
    header: subjectsTheme.header,
    forms: subjectsTheme.forms,
    progress: subjectsTheme.progress,
    badges: subjectsTheme.badges,
    buttons: subjectsTheme.buttons,
    layout: subjectsTheme.layout,
    animations: subjectsTheme.animations,
    typography: subjectsTheme.typography,

    // Utility functions
    applyTheme,
    classes: themeClasses,

    // Pre-built component styles
    components: {
      // Header component
      Header: {
        container: subjectsTheme.header.container,
        pattern: `${subjectsTheme.header.pattern} ${subjectsTheme.backgrounds.pattern}`,
        content: subjectsTheme.header.content,
        icon: subjectsTheme.header.icon,
        title: subjectsTheme.header.title,
        subtitle: subjectsTheme.header.subtitle,
        stats: subjectsTheme.header.stats
      },

      // Stats card component
      StatsCard: {
        wrapper: subjectsTheme.cards.stats.wrapper,
        glow: subjectsTheme.cards.stats.glow,
        card: subjectsTheme.cards.stats.card,
        content: subjectsTheme.cards.stats.content,
        icon: subjectsTheme.cards.stats.icon,
        progress: subjectsTheme.cards.stats.progress
      },

      // Subject card component
      SubjectCard: {
        wrapper: subjectsTheme.cards.subject.wrapper,
        glow: subjectsTheme.cards.subject.glow,
        card: subjectsTheme.cards.subject.card,
        header: subjectsTheme.cards.subject.header,
        content: subjectsTheme.cards.subject.content
      },

      // Search input component
      SearchInput: {
        wrapper: subjectsTheme.forms.search.wrapper,
        icon: subjectsTheme.forms.search.icon,
        input: subjectsTheme.forms.search.input,
        focus: subjectsTheme.forms.search.focus
      },

      // Select component
      Select: {
        wrapper: subjectsTheme.forms.select.wrapper,
        select: subjectsTheme.forms.select.select,
        icon: subjectsTheme.forms.select.icon
      },

      // Progress component
      Progress: {
        linear: subjectsTheme.progress.linear,
        circular: subjectsTheme.progress.circular
      },

      // Badge component
      Badge: subjectsTheme.badges,

      // Button component
      Button: subjectsTheme.buttons
    },

    // Helper functions for dynamic styling
    helpers: {
      // Get gradient color for a specific subject
      getSubjectGradient: (subjectName: string) => {
        const subjectKey = subjectName.toLowerCase().split(' - ')[0];
        const gradients = subjectsTheme.colors.subjects;
        
        // Handle special cases
        if (subjectKey === 'english literature') return gradients.english;
        if (subjectKey === 'computer science') return gradients.computer;
        if (subjectKey === 'art & design') return gradients.art;
        if (subjectKey === 'physical education') return gradients.physical;
        
        return gradients[subjectKey as keyof typeof gradients] || gradients.mathematics;
      },

      // Get stats card color based on index
      getStatsColor: (index: number) => {
        const colors: (keyof typeof subjectsTheme.colors.stats)[] = ['blue', 'emerald', 'purple', 'orange'];
        return colors[index % colors.length];
      },

      // Get circular progress stroke color
      getProgressColor: (color: string) => {
        if (color.includes('blue')) return 'stroke-blue-500';
        if (color.includes('emerald')) return 'stroke-emerald-500';
        if (color.includes('purple')) return 'stroke-purple-500';
        if (color.includes('orange')) return 'stroke-orange-500';
        if (color.includes('rose')) return 'stroke-rose-500';
        if (color.includes('teal')) return 'stroke-teal-500';
        if (color.includes('pink')) return 'stroke-pink-500';
        if (color.includes('indigo')) return 'stroke-indigo-500';
        return 'stroke-blue-500';
      },

      // Create floating glow effect
      createGlowEffect: (color: string) => 
        `absolute -inset-1 bg-gradient-to-r ${color} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500`,

      // Create glass morphism background
      createGlassBackground: (type: 'light' | 'card' | 'input' = 'card') => 
        subjectsTheme.backgrounds.glass[type],

      // Create gradient text
      createGradientText: (type: keyof typeof subjectsTheme.colors.text) => 
        `bg-gradient-to-r ${subjectsTheme.colors.text[type]} bg-clip-text text-transparent`
    }
  }), []);

  return theme;
};

// Type definitions for better TypeScript support
export type SubjectsTheme = ReturnType<typeof useSubjectsTheme>;
export type ThemeColors = typeof subjectsTheme.colors;
export type ThemeCards = typeof subjectsTheme.cards;
export type ThemeComponents = ReturnType<typeof useSubjectsTheme>['components'];

export default useSubjectsTheme;
