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
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPosition, setTransitionPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
    
    // Smooth transition for global elements when the class changes
    root.style.transition = 'background-color 0.6s ease-in-out, color 0.6s ease-in-out';
  }, [theme]);

  const toggleTheme = (event?: React.MouseEvent) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Always provide a transition even if no event is present, 
    // but allow the component to handle the lack of coordinates.
    setIsTransitioning(true);
    if (event) {
      setTransitionPosition({ x: event.clientX, y: event.clientY });
    }
    
    // Sequence optimized for the directional sweep:
    // 0ms: Sweep animation starts in ThemeTransition component.
    // 600ms: Theme changes (overlay should be fully covering the screen by now).
    // 1200ms: Transition state ends, allowing for exit animations and interaction.
    
    setTimeout(() => {
      setTheme(newTheme);
    }, 600); 

    setTimeout(() => {
      setIsTransitioning(false);
    }, 1400); 
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