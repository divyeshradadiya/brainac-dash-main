import { cn } from "./utils";

/**
 * Get theme-aware card background classes
 * @param variant - The card variant style
 * @returns CSS classes for the card background
 */
export function getCardBackground(variant: "default" | "elevated" | "subtle" = "default") {
  switch (variant) {
    case "elevated":
      return "bg-card/95 backdrop-blur-xl border-0 shadow-xl";
    case "subtle":
      return "bg-card/50 backdrop-blur-sm border border-border/30";
    default:
      return "bg-card/90 backdrop-blur-xl border-0 shadow-lg";
  }
}

/**
 * Get theme-aware gradient background classes
 * @param variant - The gradient variant
 * @returns CSS classes for gradient backgrounds
 */
export function getGradientBackground(variant: "primary" | "secondary" | "accent" | "subtle" = "subtle") {
  switch (variant) {
    case "primary":
      return "bg-gradient-to-br from-background via-primary/5 to-secondary/5";
    case "secondary":
      return "bg-gradient-to-br from-background via-secondary/5 to-accent/5";
    case "accent":
      return "bg-gradient-to-br from-background via-accent/5 to-tertiary/5";
    case "subtle":
    default:
      return "bg-gradient-to-br from-background via-muted/5 to-muted/10";
  }
}

/**
 * Get theme-aware text color classes
 * @param variant - The text variant
 * @returns CSS classes for text colors
 */
export function getTextColor(variant: "default" | "muted" | "primary" | "secondary" = "default") {
  switch (variant) {
    case "muted":
      return "text-muted-foreground";
    case "primary":
      return "text-primary";
    case "secondary":
      return "text-secondary";
    default:
      return "text-foreground";
  }
}

/**
 * Get theme-aware border color classes
 * @param variant - The border variant
 * @returns CSS classes for border colors
 */
export function getBorderColor(variant: "default" | "muted" | "primary" = "default") {
  switch (variant) {
    case "muted":
      return "border-border/50";
    case "primary":
      return "border-primary/30";
    default:
      return "border-border";
  }
}
