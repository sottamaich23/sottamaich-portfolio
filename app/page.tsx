'use client';

import { Navbar } from '@/components/navbar';
import { Hero } from '@/sections/hero';
import { About } from '@/sections/about';
import { Skills } from '@/sections/skills';
import { Experience } from '@/sections/experience';
import { Projects } from '@/sections/projects';
import { Certifications } from '@/sections/certifications';
import { Contact } from '@/sections/contact';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </motion.div>
      <footer aria-label="site footer" className="container-px pt-8 border-t border-white/6 text-white/90">
        <div className="max-w-6xl mx-auto py-8">
          <p className="text-sm sm:text-base text-left sm:text-center">Crafted with ☕ & Cloud Magic by Sottam Aich</p>
          <p className="text-xs sm:text-sm text-left sm:text-center mt-1">© 2025—All Rights Reserved</p>
        </div>
      </footer>
    </main>
  );
}


