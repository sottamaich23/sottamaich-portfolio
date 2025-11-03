
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="relative h-8 w-8 rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-colors duration-500 ease-in-out"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 grid place-items-center">
            <span className="text-base">🌙</span>
          </motion.span>
        ) : (
          <motion.span key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0 grid place-items-center">
            <span className="text-base">☀️</span>
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}


