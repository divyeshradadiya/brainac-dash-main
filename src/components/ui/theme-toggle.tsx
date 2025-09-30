import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default" | "lg";
}

export function ThemeToggle({ className, size = "default" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      variant="ghost"
      size={size === "sm" ? "sm" : size === "lg" ? "lg" : "default"}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`transition-all duration-300 hover:bg-muted/50 ${className || ""}`}
    >
                   {theme === "light" ? (
               <Moon className="h-8 w-8" />
             ) : (
               <Sun className="h-8 w-8" />
             )}
    </Button>
  );
}
