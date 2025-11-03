'use client';

import { motion } from 'framer-motion';
import { skills } from '@/data/skills';

function Group({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-white/10 bg-card/80 p-5">
      <h3 className="font-spaceGrotesk text-lg sm:text-xl font-semibold text-white/90 mb-3 border-b border-white/5 pb-2">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.05 }}
            className="capitalize text-sm font-medium text-white/85 rounded-full px-4 py-2 bg-white/5 dark:bg-black/5 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 transition-transform duration-200 ease-in-out"
          >
            {item}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 animated-gradient-bg opacity-50" />
      <div className="container-px max-w-7xl mx-auto py-16">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="font-spaceGrotesk text-3xl sm:text-4xl font-extrabold text-white/90 mb-6 border-b border-white/10 pb-2 text-left">Skills</motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } }
            }}
          >
            {[<Group key="p" title="Programming" items={skills.programming} />,
              <Group key="c" title="Cloud & DevOps" items={skills.cloudDevops} />,
              <Group key="s" title="Cybersecurity & Networking" items={skills.securityNetworking} />,
              <Group key="d" title="Data Science / ML" items={skills.dataMl} />].map((el, idx) => (
              <motion.div key={idx} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}>
                {el}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


