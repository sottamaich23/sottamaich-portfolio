'use client';

import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="container-px max-w-7xl mx-auto py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="font-spaceGrotesk text-3xl sm:text-4xl font-extrabold text-white/90 mb-6 border-b border-white/10 pb-2 text-left">Contact</motion.h2>
        <div className="rounded-xl border border-white/10 bg-card/80 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="mailto:sottamaich@gmail.com" className="group flex items-center gap-3 text-white/80 hover:text-white">
              <Mail className="h-5 w-5" /> sottamaich@gmail.com
            </a>
            <a href="https://linkedin.com/in/sottamaich" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-white/80 hover:text-white">
              <Linkedin className="h-5 w-5" /> linkedin.com/in/sottamaich
            </a>
            <a href="https://github.com/sottamaich23" target="_blank" rel="noreferrer" className="group flex items-center gap-3 text-white/80 hover:text-white">
              <Github className="h-5 w-5" /> github.com/sottamaich23
            </a>
            <a href="tel:+919571011135" className="group flex items-center gap-3 text-white/80 hover:text-white">
              <Phone className="h-5 w-5" /> +91 95710 11135
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


