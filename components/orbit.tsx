'use client';

import { motion } from 'framer-motion';

type Tech = { label: string; emoji: string; radius: number; size?: number; delay?: number };

const techs: Tech[] = [
  { label: 'React', emoji: '⚛️', radius: 70, delay: 0 },
  { label: 'TensorFlow', emoji: '🧠', radius: 95, delay: 0.1 },
  { label: 'Node.js', emoji: '🟢', radius: 120, delay: 0.2 },
  { label: 'AWS', emoji: '☁️', radius: 145, delay: 0.3 },
  { label: 'Docker', emoji: '🐳', radius: 170, delay: 0.4 },
];

export function Orbit() {
  return (
    <div className="relative mx-auto h-[360px] w-[360px] sm:h-[420px] sm:w-[420px]">
      {/* Rings */}
      {[80, 110, 140, 170].map((r) => (
        <div key={r} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" style={{ width: r * 2, height: r * 2 }} />
      ))}
      {/* Center dot */}
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40" />
      {/* Orbiting techs */}
      {techs.map((t, i) => (
        <motion.div
          key={t.label}
          className="absolute left-1/2 top-1/2"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 24 - i * 2 }}
          style={{ width: 0, height: 0 }}
        >
          <motion.div
            className="-translate-x-1/2 -translate-y-1/2"
            style={{ transform: `translate(${t.radius}px, -50%)` }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: t.delay }}
          >
            <div className="select-none rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white shadow-soft backdrop-blur">
              <span className="mr-1">{t.emoji}</span>
              {t.label}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}


