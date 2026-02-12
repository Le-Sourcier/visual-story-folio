import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={(e) => !isTransitioning && toggleTheme(e)}
      className="p-3 rounded-2xl bg-secondary border border-border text-foreground hover:bg-secondary/80 transition-all relative overflow-visible group z-50"
      aria-label="Toggle Theme"
      disabled={isTransitioning}
    >
      <div className="relative w-6 h-6">
        <motion.div
          initial={false}
          animate={{
            rotate: theme === 'dark' ? 0 : 90,
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon className="w-5 h-5 text-primary" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            rotate: theme === 'light' ? 0 : -90,
            opacity: theme === 'light' ? 1 : 0,
            scale: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-primary" />
        </motion.div>
      </div>

      {/* Subtle feedback during transition */}
      {isTransitioning && (
        <motion.div
          className="absolute inset-0 border-2 border-primary rounded-2xl"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 1, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}