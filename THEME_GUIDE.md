# Learn Luxe Dashboard Theme Guide

This guide explains how to use the comprehensive theme system designed specifically for the Learn Luxe Dashboard, based on the color usage patterns found in `/pages/Index.tsx`.

## 🎨 Color System

### Primary Colors - Blue (Trust & Learning)
- **Primary**: `hsl(210 100% 50%)` - Used for main actions, icons, and highlights
- **Primary Light**: `hsl(210 100% 95%)` - Light blue backgrounds
- **Primary Dark**: `hsl(210 100% 30%)` - Darker blue for hover states

**Usage Examples:**
```tsx
// Main buttons and actions
<Button className="bg-primary text-primary-foreground">Action</Button>

// Icons and highlights
<BookOpen className="w-6 h-6 text-primary" />

// Light backgrounds
<div className="bg-primary/10 text-primary">Progress Badge</div>

// Borders and accents
<Avatar className="border-2 border-primary/20" />
```

### Secondary Colors - Green (Growth & Success)
- **Secondary**: `hsl(142 76% 36%)` - Used for success states, progress
- **Secondary Light**: `hsl(142 76% 95%)` - Light green backgrounds
- **Secondary Dark**: `hsl(142 76% 25%)` - Darker green for hover states

**Usage Examples:**
```tsx
// Success states and progress
<div className="bg-secondary text-secondary-foreground">Success</div>

// Progress indicators
<ProgressCard progress={85} className="text-secondary" />

// Light backgrounds
<div className="bg-secondary/10 text-secondary">Achievement</div>
```

### Accent Colors - Orange (Energy & Motivation)
- **Accent**: `hsl(25 95% 53%)` - Used for time-related elements, energy
- **Accent Light**: `hsl(25 95% 95%)` - Light orange backgrounds
- **Accent Dark**: `hsl(25 95% 35%)` - Darker orange for hover states

**Usage Examples:**
```tsx
// Time-related elements
<Clock className="w-6 h-6 text-accent" />

// Energy and motivation elements
<div className="bg-accent text-accent-foreground">Study Hours</div>

// Light backgrounds
<div className="bg-accent/10 text-accent">Time Badge</div>
```

### Tertiary Colors - Purple (Creativity & Innovation)
- **Tertiary**: `hsl(262 83% 58%)` - Used for creative elements, innovation
- **Tertiary Light**: `hsl(262 83% 95%)` - Light purple backgrounds
- **Tertiary Dark**: `hsl(262 83% 35%)` - Darker purple for hover states

**Usage Examples:**
```tsx
// Creative elements
<div className="bg-tertiary text-tertiary-foreground">Innovation</div>

// Light backgrounds
<div className="bg-tertiary/10 text-tertiary">Creative Badge</div>
```

## 🎯 Semantic Colors

### Success (Green)
- Used for grades, achievements, positive feedback
```tsx
<TrendingUp className="w-6 h-6 text-success" />
<div className="bg-success/10 text-success">Grade Average</div>
```

### Warning (Amber)
- Used for badges, warnings, attention-grabbing elements
```tsx
<Trophy className="w-6 h-6 text-warning" />
<div className="bg-warning/10 text-warning">Badges Earned</div>
```

### Destructive (Red)
- Used for notifications, errors, destructive actions
```tsx
<span className="bg-destructive text-destructive-foreground">4</span>
<div className="bg-destructive/10 text-destructive">Error Message</div>
```

## 🎨 Opacity Variants

All colors support opacity variants from 10% to 90%:

```tsx
// Examples
<div className="bg-primary/10">10% opacity</div>
<div className="bg-primary/20">20% opacity</div>
<div className="bg-primary/30">30% opacity</div>
<div className="bg-primary/40">40% opacity</div>
<div className="bg-primary/50">50% opacity</div>
<div className="bg-primary/60">60% opacity</div>
<div className="bg-primary/70">70% opacity</div>
<div className="bg-primary/80">80% opacity</div>
<div className="bg-primary/90">90% opacity</div>
```

## 🌈 Gradients

### Available Gradients
- `bg-gradient-primary` - Blue gradient
- `bg-gradient-secondary` - Green gradient
- `bg-gradient-accent` - Orange gradient
- `bg-gradient-tertiary` - Purple gradient
- `bg-gradient-hero` - Blue to purple gradient
- `bg-gradient-success` - Green gradient

**Usage Examples:**
```tsx
<div className="bg-gradient-primary text-white">Primary Gradient</div>
<div className="bg-gradient-hero text-white">Hero Gradient</div>
```

## 🎭 Shadows

### Standard Shadows
- `shadow-xs` - Extra small shadow
- `shadow-sm` - Small shadow
- `shadow-md` - Medium shadow
- `shadow-lg` - Large shadow
- `shadow-xl` - Extra large shadow
- `shadow-2xl` - 2X large shadow

### Custom Shadows
- `shadow-card` - Card shadow
- `shadow-card-hover` - Card hover shadow
- `shadow-soft` - Soft shadow

**Usage Examples:**
```tsx
<div className="shadow-card hover:shadow-card-hover">Card</div>
<div className="shadow-soft">Soft Element</div>
```

## 🎬 Animations

### Available Animations
- `animate-shimmer` - Shimmer effect
- `animate-progress-shimmer` - Progress shimmer
- `animate-float` - Floating animation
- `animate-bounce-gentle` - Gentle bounce
- `animate-pulse-slow` - Slow pulse

**Usage Examples:**
```tsx
<div className="animate-float">Floating Element</div>
<div className="animate-pulse-slow">Slow Pulse</div>
```

## 🧩 Component Classes

### Card System
```tsx
.card-modern          // Modern card with hover effects
.card-elevated        // Elevated card with blur
.card-interactive     // Interactive card with scale
.card-subtle          // Subtle card with transparency
```

### Button System
```tsx
.btn-primary          // Primary button with glow
.btn-secondary        // Secondary button with glow
.btn-accent           // Accent button with glow
.btn-ghost            // Ghost button
```

### Navigation System
```tsx
.nav-item             // Navigation item with animations
.nav-item.active      // Active navigation state
```

### Progress System
```tsx
.progress-modern      // Modern progress bar
.progress-bar         // Standard progress bar
```

### Badge System
```tsx
.badge-modern         // Modern badge
.badge-primary        // Primary badge
.badge-secondary      // Secondary badge
.badge-accent         // Accent badge
.badge-success        // Success badge
.badge-warning        // Warning badge
.badge-destructive    // Destructive badge
```

### Input System
```tsx
.input-modern         // Modern input with focus effects
```

### Avatar System
```tsx
.avatar-modern        // Modern avatar with ring
```

## 📐 Layout Utilities

### Modern Layout Classes
```tsx
.layout-modern        // Modern layout container
.grid-modern          // Modern grid
.section-modern       // Modern section
.responsive-container // Responsive container
.responsive-grid      // Responsive grid
```

### Hover Effects
```tsx
.hover-lift           // Lift on hover
.hover-scale          // Scale on hover
.hover-glow           // Glow on hover
```

## 🎨 Sidebar Theme

The sidebar uses specific theme colors:

```tsx
// Sidebar background
<div className="bg-sidebar">

// Sidebar text
<span className="text-sidebar-foreground">

// Sidebar borders
<div className="border-sidebar-border">

// Sidebar accent (hover states)
<div className="bg-sidebar-accent">

// Sidebar primary (active states)
<div className="bg-sidebar-primary text-sidebar-primary-foreground">
```

## 🔧 Implementation Examples

### Stats Cards
```tsx
<StatsCard
  title="Subjects This Term"
  value="8"
  change="+1 new subject"
  trend="up"
  icon={<BookOpen className="w-6 h-6 text-primary" />}
/>
```

### Progress Cards
```tsx
<ProgressCard
  title="Mathematics - Algebra"
  progress={85}
  instructor="Mrs. Smith"
  duration="10 chapters"
  level="Intermediate"
/>
```

### Navigation Items
```tsx
<NavLink
  to="/subjects"
  className={({ isActive }) =>
    cn(
      "group relative transition-all duration-300 ease-out",
      isActive
        ? "bg-sidebar-primary text-sidebar-primary-foreground"
        : "text-sidebar-foreground hover:bg-sidebar-accent"
    )
  }
>
```

### Buttons
```tsx
<Button className="bg-primary text-primary-foreground hover:bg-primary-dark">
  Primary Action
</Button>

<Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
  Secondary Action
</Button>
```

### Badges
```tsx
<Badge className="bg-primary/10 text-primary border-primary/20">
  Primary Badge
</Badge>

<Badge className="bg-success/10 text-success border-success/20">
  Success Badge
</Badge>
```

## 🎯 Best Practices

1. **Consistency**: Always use theme colors instead of hardcoded values
2. **Semantic Meaning**: Use colors that match their purpose (success for achievements, warning for badges, etc.)
3. **Accessibility**: Ensure sufficient contrast ratios
4. **Opacity**: Use opacity variants for subtle backgrounds and borders
5. **Hover States**: Use darker variants for hover states
6. **Gradients**: Use gradients sparingly for emphasis and hero sections

## 🚀 Theme Showcase

Visit `/theme` in the application to see a live demonstration of all theme colors, components, and utilities.

## 📝 Usage in Index.tsx

The theme is specifically designed based on the color usage patterns found in `/pages/Index.tsx`:

1. **Blue (Primary)** - Used for main navigation, icons, and primary actions
2. **Green (Secondary/Success)** - Used for progress indicators and achievements
3. **Orange (Accent)** - Used for time-related elements and energy indicators
4. **Purple (Tertiary)** - Used for creative elements and innovation
5. **Neutral Grays** - Used for backgrounds, borders, and secondary text

This ensures consistency across the entire application while providing a comprehensive design system for future development.
