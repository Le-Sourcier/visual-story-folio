import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';

export function ThemeTransition() {
  const { isTransitioning, transitionPosition, theme } = useTheme();

  if (!isTransitioning || !transitionPosition) return null;

  const isToLight = theme === 'light';

  // Smooth easing function for a more premium feel
  // cubic-bezier(0.85, 0, 0.15, 1) provides a very smooth start and end
  const easing = [0.85, 0, 0.15, 1];

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ 
            clipPath: isToLight 
              ? `circle(0% at ${transitionPosition.x}px ${transitionPosition.y}px)` 
              : `circle(150% at ${transitionPosition.x}px ${transitionPosition.y}px)`,
            opacity: isToLight ? 0.8 : 1,
            scale: isToLight ? 0.98 : 1,
          }}
          animate={{ 
            clipPath: isToLight 
              ? `circle(150% at ${transitionPosition.x}px ${transitionPosition.y}px)` 
              : `circle(0% at ${transitionPosition.x}px ${transitionPosition.y}px)`,
            opacity: 1,
            scale: 1,
          }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.4, ease: "easeOut" }
          }}
          transition={{ 
            duration: 1.1, // Slightly longer for more "grace"
            ease: easing,
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            pointerEvents: 'none',
            willChange: 'clip-path, opacity, transform',
          }}
          className="bg-white dark:bg-zinc-950" // Match target theme backgrounds more closely if needed
        />
      )}
    </AnimatePresence>
  );
}