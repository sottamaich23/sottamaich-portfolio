'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NeuralSphere } from '@/components/neural-sphere';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden min-h-screen">
      {/* Neural sphere */}
      <div className="absolute inset-0 -z-10">
        <NeuralSphere className="!absolute !inset-0" />
      </div>

      {/* Content */}
      <div className="container-px max-w-7xl mx-auto relative z-10 flex flex-col justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl space-y-5 md:space-y-6 pt-16 md:pt-0"
        >
          <div className="space-y-2">
            <h1 className="font-spaceGrotesk font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-foreground">
              Hi, I'm
            </h1>
            <h1 className="font-spaceGrotesk font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Sottam Aich.</span>
            </h1>
          </div>
          <div className="space-y-6 mt-6">
            <p className="text-xl sm:text-2xl opacity-85 leading-relaxed">
              AI/ML Developer <br className="hidden sm:block" />
              Cloud & Cybersecurity Enthusiast
            </p>
            <p className="opacity-70 leading-relaxed max-w-[600px] text-lg">
              I build intelligent, secure, and scalable systems <br className="hidden sm:block" />
              that bridge innovation with reliability.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 pt-6">
            <a href="https://drive.google.com/file/d/1ZBrEpBOJ8E5RRDiFxbX3jbx0jNOI4Ccr/view?usp=drive_link" target="_blank" rel="noreferrer" className="group">
              <Button size="lg" className="rounded-lg shadow-sm hover:shadow transition-shadow bg-foreground/10 hover:bg-foreground/15 ring-1 ring-inset ring-foreground/10 group-hover:ring-foreground/20 text-foreground">
                Resume
              </Button>
            </a>
            <a href="#projects" className="group">
              <Button size="lg" variant="ghost" className="rounded-lg hover:shadow bg-transparent hover:bg-foreground/5 ring-1 ring-inset ring-foreground/10 group-hover:ring-foreground/20 text-foreground">
                View my work
              </Button>
            </a>
            <a href="#contact" className="group">
              <Button size="lg" variant="ghost" className="rounded-lg hover:shadow bg-transparent hover:bg-foreground/5 ring-1 ring-inset ring-foreground/10 group-hover:ring-foreground/20 text-foreground">
                Contact Me
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


