'use client';

import { motion } from 'framer-motion';
import { certifications } from '@/data/certifications';

export function Certifications() {
  return (
    <section id="certifications" className="container-px max-w-7xl mx-auto py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="font-spaceGrotesk text-3xl sm:text-4xl font-extrabold text-white/90 mb-6 border-b border-white/10 pb-2 text-left">Certifications</motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        >
          {certifications.map((c) => (
            <motion.a
              key={`${c.title}-${c.year}`}
              href={c.link || '#'}
              target={c.link ? '_blank' : undefined}
              rel={c.link ? 'noreferrer' : undefined}
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4 hover:border-white/20 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-all duration-300 block"
            >
              <div className="text-white/90">{c.title}</div>
              <div className="text-sm text-white/70">{c.org}</div>
              <div className="text-xs text-white/60">{c.year}</div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}


