// Subjects Theme System - Based on the beautiful design patterns from Subjects.tsx
// This theme captures the glass morphism, gradient effects, and modern UI patterns

export const subjectsTheme = {
  // Color Palette - Based on the gradient patterns used in Subjects.tsx
  colors: {
    // Primary gradient colors from the header
    primary: {
      blue: 'from-blue-500 to-purple-600',
      slate: 'from-slate-50 via-blue-50 to-indigo-50',
      dark: 'from-gray-900 via-blue-900/20 to-indigo-900/20'
    },
    
    // Stats card gradients
    stats: {
      blue: 'from-blue-400 to-blue-600',
      emerald: 'from-emerald-400 to-emerald-600', 
      purple: 'from-purple-400 to-purple-600',
      orange: 'from-orange-400 to-orange-600'
    },
    
    // Subject card gradients (from the subjects array)
    subjects: {
      mathematics: 'from-blue-400 via-blue-500 to-blue-600',
      science: 'from-emerald-400 via-emerald-500 to-emerald-600',
      english: 'from-purple-400 via-purple-500 to-purple-600',
      history: 'from-orange-400 via-orange-500 to-orange-600',
      computer: 'from-rose-400 via-rose-500 to-rose-600',
      geography: 'from-teal-400 via-teal-500 to-teal-600',
      art: 'from-pink-400 via-pink-500 to-pink-600',
      physical: 'from-indigo-400 via-indigo-500 to-indigo-600'
    },
    
    // Text gradients
    text: {
      header: 'from-gray-900 via-blue-800 to-purple-800',
      headerDark: 'from-white via-blue-200 to-purple-200',
      stats: {
        blue: 'from-blue-600 to-blue-800',
        emerald: 'from-emerald-600 to-emerald-800',
        purple: 'from-purple-600 to-purple-800',
        orange: 'from-orange-600 to-orange-800'
      }
    }
  },

  // Background patterns and effects
  backgrounds: {
    // SVG pattern from header
    pattern: "bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.04%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-60",
    
    // Glass morphism backgrounds
    glass: {
      light: 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm',
      card: 'bg-white dark:bg-gray-900/90 backdrop-blur-xl',
      input: 'bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm'
    }
  },

  // Card styles based on the stats cards
  cards: {
    // Stats card with floating glow effect
    stats: {
      wrapper: 'group relative',
      glow: 'absolute -inset-1 bg-gradient-to-r rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500',
      card: 'relative bg-white dark:bg-gray-900/90 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden',
      content: 'p-6',
      icon: 'w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg',
      progress: 'mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'
    },
    
    // Subject card with enhanced effects
    subject: {
      wrapper: 'group relative cursor-pointer',
      glow: 'absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-75 transition-all duration-500 rounded-2xl blur-lg',
      card: 'relative bg-white dark:bg-gray-900/90 backdrop-blur-xl border-0 shadow-xl group-hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl group-hover:scale-[1.02]',
      header: 'h-32 bg-gradient-to-br relative overflow-hidden',
      content: 'p-6 space-y-5'
    }
  },

  // Header styles
  header: {
    container: 'relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 border-b border-border/50 overflow-hidden',
    pattern: 'absolute inset-0',
    content: 'relative z-10 px-6 py-8',
    icon: 'w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg',
    title: 'text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent',
    subtitle: 'text-gray-600 dark:text-gray-400 font-medium',
    stats: 'flex items-center gap-6 pt-1'
  },

  // Form elements
  forms: {
    search: {
      wrapper: 'relative flex-1 group',
      icon: 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors',
      input: 'h-12 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500',
      focus: 'absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none'
    },
    
    select: {
      wrapper: 'relative',
      select: 'appearance-none h-12 px-4 pr-10 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 cursor-pointer hover:border-blue-400 min-w-[140px]',
      icon: 'absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'
    }
  },

  // Progress indicators
  progress: {
    // Linear progress bar
    linear: {
      container: 'w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden',
      bar: 'h-full bg-primary rounded-full transition-all duration-1000'
    },
    
    // Circular progress (from subject cards)
    circular: {
      container: 'relative w-16 h-16',
      svg: 'w-16 h-16 transform -rotate-90',
      background: 'stroke-gray-200 dark:stroke-gray-700',
      progress: 'transition-all duration-1000 ease-out stroke-linecap-round',
      text: 'absolute inset-0 flex items-center justify-center text-[14px] font-bold'
    }
  },

  // Badge styles
  badges: {
    level: 'bg-white/20 backdrop-blur-sm text-white border-white/30 font-medium px-3 py-1',
    category: 'bg-black/70 text-white text-xs',
    type: 'bg-primary text-white text-xs'
  },

  // Button styles
  buttons: {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
    outline: 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-white/20 hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300',
    ghost: 'hover:bg-white/20 dark:hover:bg-gray-900/20 backdrop-blur-xl transition-all duration-300'
  },

  // Layout utilities
  layout: {
    container: 'flex flex-col transition-all duration-300 ease-in-out',
    main: 'flex-1 p-6 space-y-6 overflow-auto',
    grid: {
      stats: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
      subjects: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8',
      responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    }
  },

  // Animation classes
  animations: {
    pulse: 'animate-pulse',
    hover: {
      lift: 'group-hover:scale-[1.02]',
      glow: 'group-hover:opacity-75',
      shadow: 'group-hover:shadow-2xl'
    },
    transition: {
      fast: 'transition-all duration-300',
      medium: 'transition-all duration-500',
      slow: 'transition-all duration-1000'
    }
  },

  // Typography
  typography: {
    title: 'text-xl font-bold text-gray-900 dark:text-white',
    subtitle: 'text-sm font-medium text-gray-600 dark:text-gray-400',
    body: 'text-gray-700 dark:text-gray-300',
    caption: 'text-xs text-gray-500 dark:text-gray-400'
  }
};

// Utility functions for applying theme
export const applyTheme = {
  // Apply stats card styling
  statsCard: (color: keyof typeof subjectsTheme.colors.stats) => ({
    wrapper: `group relative`,
    glow: `absolute -inset-1 bg-gradient-to-r ${subjectsTheme.colors.stats[color]} rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500`,
    card: subjectsTheme.cards.stats.card,
    content: subjectsTheme.cards.stats.content,
    icon: `w-12 h-12 bg-gradient-to-br ${subjectsTheme.colors.stats[color]} rounded-xl flex items-center justify-center shadow-lg`,
    progress: subjectsTheme.cards.stats.progress
  }),

  // Apply subject card styling
  subjectCard: (color: string) => ({
    wrapper: subjectsTheme.cards.subject.wrapper,
    glow: `absolute -inset-1 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-75 transition-all duration-500 rounded-2xl blur-lg`,
    card: subjectsTheme.cards.subject.card,
    header: `h-32 bg-gradient-to-br ${color} relative overflow-hidden`,
    content: subjectsTheme.cards.subject.content
  }),

  // Apply header styling
  header: () => ({
    container: subjectsTheme.header.container,
    pattern: `${subjectsTheme.header.pattern} ${subjectsTheme.backgrounds.pattern}`,
    content: subjectsTheme.header.content,
    icon: subjectsTheme.header.icon,
    title: subjectsTheme.header.title,
    subtitle: subjectsTheme.header.subtitle,
    stats: subjectsTheme.header.stats
  }),

  // Apply search input styling
  searchInput: () => ({
    wrapper: subjectsTheme.forms.search.wrapper,
    icon: subjectsTheme.forms.search.icon,
    input: subjectsTheme.forms.search.input,
    focus: subjectsTheme.forms.search.focus
  })
};

// Pre-built component classes
export const themeClasses = {
  // Header
  header: 'relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 border-b border-border/50 overflow-hidden',
  
  // Stats cards
  statsCard: 'group relative',
  statsCardGlow: 'absolute -inset-1 bg-gradient-to-r rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500',
  statsCardContent: 'relative bg-white dark:bg-gray-900/90 backdrop-blur-xl border-0 shadow-xl rounded-2xl overflow-hidden',
  
  // Subject cards
  subjectCard: 'group relative cursor-pointer',
  subjectCardGlow: 'absolute -inset-1 bg-gradient-to-r opacity-0 group-hover:opacity-75 transition-all duration-500 rounded-2xl blur-lg',
  subjectCardContent: 'relative bg-white dark:bg-gray-900/90 backdrop-blur-xl border-0 shadow-xl group-hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl group-hover:scale-[1.02]',
  
  // Form elements
  searchInput: 'h-12 pl-12 pr-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500',
  
  // Buttons
  primaryButton: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
  outlineButton: 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl border-white/20 hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300',
  
  // Layout
  mainContainer: 'flex-1 p-6 space-y-6 overflow-auto',
  statsGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6',
  subjectsGrid: 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'
};

export default subjectsTheme;
