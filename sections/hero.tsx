'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NeuralSphere } from '@/components/neural-sphere';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden min-h-[85vh] md:min-h-screen">
      {/* Full-bleed neural background */}
      <div className="absolute inset-0 -z-10">
        <NeuralSphere className="!absolute !inset-0 !w-full !h-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>
      <div className="container-px max-w-7xl mx-auto py-24 md:py-28 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center min-h-[85vh] md:min-h-screen">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
          <h1 className="font-spaceGrotesk font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white">
            Hi, I’m <span className="text-white whitespace-nowrap">Sottam Aich</span>.
          </h1>
          <p className="text-xl sm:text-2xl text-white/85 whitespace-nowrap">
            AI/ML Developer | Cloud & Cybersecurity Enthusiast
          </p>
          <p className="text-white/70 leading-relaxed max-w-prose text-base sm:text-lg">
            I build intelligent, secure, and scalable systems that bridge innovation with reliability.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="https://drive.google.com/file/d/1ZBrEpBOJ8E5RRDiFxbX3jbx0jNOI4Ccr/view?usp=drive_link" target="_blank" rel="noreferrer" className="group">
              <Button size="lg" className="rounded-lg shadow-sm hover:shadow transition-shadow bg-white/10 hover:bg-white/15 ring-1 ring-inset ring-white/10 group-hover:ring-white/20">
                View Resume
              </Button>
            </a>
            <a href="#contact" className="group">
              <Button size="lg" variant="ghost" className="rounded-lg hover:shadow bg-transparent hover:bg-white/5 ring-1 ring-inset ring-white/10 group-hover:ring-white/20">
                Contact Me
              </Button>
            </a>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="relative" />
      </div>
    </section>
  );
}


