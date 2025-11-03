'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/project-card';

export function Projects() {
  return (
    <section id="projects" className="container-px max-w-7xl mx-auto py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="font-spaceGrotesk text-3xl sm:text-4xl font-extrabold text-white/90 mb-6 border-b border-white/10 pb-2 text-left">Projects</motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <ProjectCard key={p.title} image={p.image} title={p.title} description={p.description} tech={p.tech} github={p.github} demo={p.demo} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}


