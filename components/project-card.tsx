'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/badge';
import { Github } from 'lucide-react';

type Props = {
  image: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string; // ignored for now; only GitHub is shown
};

export function ProjectCard({ image, title, description, tech, github, demo }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className="group overflow-hidden rounded-xl border border-white/10 bg-card/90 shadow-soft hover:shadow-lg hover:shadow-black/30 transition-shadow"
    >
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-spaceGrotesk text-lg text-white/90">{title}</h3>
        <p className="text-sm text-white/70">{description}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {tech.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-2">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-white/70 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}


