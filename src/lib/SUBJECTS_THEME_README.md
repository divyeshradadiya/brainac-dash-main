# 🎨 Subjects Theme System

A comprehensive theme system based on the beautiful design patterns from the `Subjects.tsx` page. This theme captures the glass morphism effects, gradient designs, and modern UI patterns that make the subjects page so visually appealing.

## 📁 File Structure

```
src/
├── lib/
│   ├── subjects-theme.ts          # Main theme configuration
│   └── SUBJECTS_THEME_README.md   # This documentation
├── hooks/
│   └── useSubjectsTheme.ts        # React hook for theme usage
└── components/
    └── theme/
        └── SubjectsThemeExample.tsx # Example components
```

## 🚀 Quick Start

### 1. Import the Theme Hook

```tsx
import { useSubjectsTheme } from '@/hooks/useSubjectsTheme';

const MyComponent = () => {
  const theme = useSubjectsTheme();
  
  return (
    <div className={theme.layout.container}>
      {/* Your themed content */}
    </div>
  );
};
```

### 2. Use Pre-built Components

```tsx
import { ThemedHeader, ThemedStatsCard, ThemedSubjectCard } from '@/components/theme/SubjectsThemeExample';

const MyPage = () => {
  return (
    <>
      <ThemedHeader
        title="My Dashboard"
        subtitle="Welcome to your learning journey"
        icon={<GraduationCap className="w-6 h-6 text-white" />}
      />
      
      <ThemedStatsCard
        title="Total Courses"
        value="12"
        icon={<BookOpen className="w-6 h-6 text-white" />}
        progress={75}
        color="blue"
      />
      
      <ThemedSubjectCard
        title="Mathematics - Algebra"
        instructor="Mrs. Sarah Smith"
        progress={85}
        level="Intermediate"
        subjectName="Mathematics"
      />
    </>
  );
};
```

## 🎨 Theme Components

### Header Component

```tsx
<ThemedHeader
  title="Page Title"
  subtitle="Page description"
  icon={<YourIcon />}
  stats={[
    { icon: <Icon1 />, label: "Label 1", value: "Value 1" },
    { icon: <Icon2 />, label: "Label 2", value: "Value 2" }
  ]}
/>
```

**Features:**
- Gradient background with SVG pattern
- Floating decorative elements
- Glass morphism effects
- Responsive design
- Dark mode support

### Stats Card Component

```tsx
<ThemedStatsCard
  title="Card Title"
  value="42"
  icon={<YourIcon />}
  progress={75} // Optional
  color="blue" // blue, emerald, purple, orange
  index={0} // Auto-assigns color if not specified
/>
```

**Features:**
- Floating glow effect on hover
- Glass morphism background
- Gradient progress bars
- Animated transitions
- Color-coded themes

### Subject Card Component

```tsx
<ThemedSubjectCard
  title="Subject Name"
  instructor="Instructor Name"
  progress={85}
  level="Intermediate"
  subjectName="Mathematics" // Auto-determines gradient
  onClick={() => handleClick()}
/>
```

**Features:**
- Gradient header with decorative elements
- Circular progress indicator
- Hover animations and scaling
- Subject-specific color schemes
- Glass morphism effects

### Search Input Component

```tsx
<ThemedSearchInput
  placeholder="Search..."
  value={searchTerm}
  onChange={setSearchTerm}
/>
```

**Features:**
- Glass morphism styling
- Focus effects with gradient borders
- Icon integration
- Smooth transitions

## 🎯 Direct Theme Usage

### Colors

```tsx
const theme = useSubjectsTheme();

// Primary gradients
theme.colors.primary.blue // 'from-blue-500 to-purple-600'
theme.colors.primary.slate // 'from-slate-50 via-blue-50 to-indigo-50'

// Stats card gradients
theme.colors.stats.blue // 'from-blue-400 to-blue-600'
theme.colors.stats.emerald // 'from-emerald-400 to-emerald-600'

// Subject-specific gradients
theme.colors.subjects.mathematics // 'from-blue-400 via-blue-500 to-blue-600'
theme.colors.subjects.science // 'from-emerald-400 via-emerald-500 to-emerald-600'

// Text gradients
theme.colors.text.header // 'from-gray-900 via-blue-800 to-purple-800'
```

### Layout Classes

```tsx
theme.layout.container // Main container
theme.layout.main // Main content area
theme.layout.grid.stats // Stats grid (4 columns)
theme.layout.grid.subjects // Subjects grid (3 columns)
theme.layout.grid.responsive // Responsive grid
```

### Component Classes

```tsx
// Header
theme.components.Header.container
theme.components.Header.title
theme.components.Header.subtitle

// Cards
theme.components.StatsCard.wrapper
theme.components.StatsCard.card
theme.components.SubjectCard.wrapper
theme.components.SubjectCard.card

// Forms
theme.components.SearchInput.wrapper
theme.components.SearchInput.input
theme.components.Select.select

// Buttons
theme.components.Button.primary
theme.components.Button.outline
theme.components.Button.ghost
```

## 🛠 Helper Functions

### Dynamic Color Assignment

```tsx
// Get subject gradient based on name
const gradient = theme.helpers.getSubjectGradient('Mathematics');
// Returns: 'from-blue-400 via-blue-500 to-blue-600'

// Get stats card color based on index
const color = theme.helpers.getStatsColor(0);
// Returns: 'blue'

// Get progress stroke color
const strokeColor = theme.helpers.getProgressColor('from-blue-400 to-blue-600');
// Returns: 'stroke-blue-500'
```

### Style Creation

```tsx
// Create glow effect
const glowEffect = theme.helpers.createGlowEffect('from-blue-400 to-blue-600');

// Create glass background
const glassBg = theme.helpers.createGlassBackground('card');

// Create gradient text
const gradientText = theme.helpers.createGradientText('header');
```

## 🎨 Customization

### Adding New Colors

```tsx
// In subjects-theme.ts
colors: {
  stats: {
    // ... existing colors
    pink: 'from-pink-400 to-pink-600',
    cyan: 'from-cyan-400 to-cyan-600'
  }
}
```

### Creating Custom Components

```tsx
const MyCustomCard = () => {
  const theme = useSubjectsTheme();
  
  return (
    <div className={theme.components.StatsCard.wrapper}>
      <div className={cn(
        theme.components.StatsCard.glow,
        'bg-gradient-to-r from-pink-400 to-pink-600'
      )} />
      <Card className={theme.components.StatsCard.card}>
        {/* Your content */}
      </Card>
    </div>
  );
};
```

## 🌟 Design Features

### Glass Morphism
- Backdrop blur effects
- Semi-transparent backgrounds
- Layered depth perception

### Gradient Effects
- Multi-color gradients
- Text gradient overlays
- Hover state transitions

### Animations
- Smooth transitions (300ms, 500ms, 1000ms)
- Hover scaling effects
- Glow effect animations
- Progress bar animations

### Responsive Design
- Mobile-first approach
- Flexible grid systems
- Adaptive spacing

### Dark Mode Support
- Automatic dark mode detection
- Consistent color schemes
- Proper contrast ratios

## 📱 Responsive Breakpoints

```tsx
// Grid layouts automatically adapt:
// Mobile: 1 column
// Tablet: 2 columns  
// Desktop: 3-4 columns
// Large: 4+ columns

theme.layout.grid.stats // 1 → 2 → 4 columns
theme.layout.grid.subjects // 1 → 2 → 3 columns
```

## 🎯 Best Practices

1. **Use the Hook**: Always use `useSubjectsTheme()` hook for consistent theming
2. **Pre-built Components**: Leverage existing components when possible
3. **Color Consistency**: Use theme colors instead of hardcoded values
4. **Responsive Design**: Use theme grid classes for layouts
5. **Accessibility**: Theme includes proper contrast and focus states

## 🔧 Integration with Existing Components

The theme works seamlessly with existing shadcn/ui components:

```tsx
import { Card, Button, Input } from '@/components/ui';
import { useSubjectsTheme } from '@/hooks/useSubjectsTheme';

const MyComponent = () => {
  const theme = useSubjectsTheme();
  
  return (
    <Card className={theme.components.StatsCard.card}>
      <Button className={theme.components.Button.primary}>
        Click me
      </Button>
      <Input className={theme.components.SearchInput.input} />
    </Card>
  );
};
```

## 🚀 Performance

- Theme is memoized for optimal performance
- CSS classes are pre-defined
- No runtime style generation
- Minimal bundle size impact

---

**🎨 This theme system brings the beautiful design patterns from the Subjects page to your entire application!**
