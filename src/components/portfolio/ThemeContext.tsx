import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: (event?: React.MouseEvent) => void;
  isTransitioning: boolean;
  transitionPosition: { x: number; y: number } | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPosition, setTransitionPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (event?: React.MouseEvent) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    if (event) {
      setTransitionPosition({ x: event.clientX, y: event.clientY });
      setIsTransitioning(true);
      
      // We change the theme slightly after the animation starts to catch the mid-point
      // Increased duration in ThemeTransition.tsx to 1.1s, so we adjust timings here.
      setTimeout(() => {
        setTheme(newTheme);
      }, 400); // 400ms is a good sweet spot for a 1.1s animation

      setTimeout(() => {
        setIsTransitioning(false);
      }, 1200); // Wait for the full animation + exit to finish
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning, transitionPosition }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}