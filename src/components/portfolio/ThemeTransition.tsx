import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

/**
 * ThemeTransition Component
 * Implements a circular diagonal bubble transition between themes.
 * 
 * Dark -> Light:
 * Bubble starts at toggle button, expands and moves diagonally to bottom-left.
 * 
 * Light -> Dark:
 * Bubble starts large at bottom-left, moves diagonally to toggle button and shrinks.
 */
export function ThemeTransition() {
  const { isTransitioning, theme, transitionPosition } = useTheme();
  const [targetTheme, setTargetTheme] = useState<'light' | 'dark' | null>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const transitionStarted = useRef(false);

  useEffect(() => {
    if (isTransitioning && !transitionStarted.current) {
      transitionStarted.current = true;
      setTargetTheme(theme === 'dark' ? 'light' : 'dark');
      
      if (transitionPosition) {
        setCoords(transitionPosition);
      } else {
        // Fallback to top-right if no event position is provided
        setCoords({ x: window.innerWidth * 0.9, y: 50 });
      }
    } else if (!isTransitioning) {
      transitionStarted.current = false;
    }
  }, [isTransitioning, theme, transitionPosition]);

  if (!targetTheme) return null;

  // The overlay color should be the target theme's background
  const overlayColor = targetTheme === 'light' ? 'bg-zinc-50' : 'bg-zinc-950';

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="theme-bubble-overlay"
          initial={
            targetTheme === 'light'
              ? { clipPath: `circle(0% at ${coords.x}px ${coords.y}px)`, opacity: 1 }
              : { clipPath: `circle(150% at 0% 100%)`, opacity: 1 }
          }
          animate={{
            clipPath: targetTheme === 'light'
              ? [
                  `circle(0% at ${coords.x}px ${coords.y}px)`,
                  `circle(80% at 50% 50%)`,
                  `circle(150% at 0% 100%)`
                ]
              : [
                  `circle(150% at 0% 100%)`,
                  `circle(80% at 50% 50%)`,
                  `circle(0% at ${coords.x}px ${coords.y}px)`
                ]
          }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
          transition={{
            duration: 1.2,
            ease: [0.6, 0.05, 0.01, 0.9],
            times: [0, 0.4, 1]
          }}
          className={`fixed inset-0 z-[9999] pointer-events-none ${overlayColor}`}
          style={{ 
            willChange: 'clip-path',
            // Hex values to ensure perfect match if tailwind classes aren't enough
            backgroundColor: targetTheme === 'light' ? '#fafafa' : '#09090b' 
          }}
        />
      )}
    </AnimatePresence>
  );
}