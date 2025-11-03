'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data/experience';

export function Experience() {
  return (
    <section id="experience" className="container-px max-w-7xl mx-auto py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="font-spaceGrotesk text-3xl sm:text-4xl font-extrabold text-white/90 mb-6 border-b border-white/10 pb-2 text-left">Experience</motion.h2>
        <div className="relative">
          <div className="absolute left-2 md:left-1/2 -translate-x-0 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />
          <div className="space-y-8">
            {experience.map((item, idx) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="relative grid md:grid-cols-2 gap-6"
              >
                <div className="md:text-right pr-6">
                  <div className="font-spaceGrotesk text-white/90">{item.role}</div>
                  <div className="text-sm text-white/70">{item.company}</div>
                  <div className="text-xs text-white/60">{item.period}</div>
                </div>
                <div className="pl-6">
                  <div className="relative">
                    <div className="absolute left-0 top-1 bottom-1 border-l border-white/10" />
                    <ul className="ml-3 text-white/75 space-y-2">
                      {item.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="select-none">{p.includes('firewalls') || p.includes('encryption') || p.includes('IDS/IPS') ? '🔐' : p.includes('AWS') || p.includes('Azure') || p.includes('cloud') ? '☁️' : '⚙️'}</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}


