'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="container-px max-w-7xl mx-auto py-16">
      <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="font-spaceGrotesk text-3xl sm:text-4xl font-extrabold text-white/90 mb-6 border-b border-white/10 pb-2 text-left">About</motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <div className="prose prose-invert max-w-none text-white/80 space-y-4">
            <p>
              I’m Sottam Aich, a tech-driven AI/ML developer and cloud-cybersecurity enthusiast passionate about building data-driven, secure, and adaptive systems. My expertise spans across machine learning, network security, and cloud computing—with hands-on experience from internships at Fortinet and HDLC Technologies.
            </p>
            <p>
              I specialize in developing intelligent solutions that merge AI and cloud scalability, leveraging tools like TensorFlow, Keras, AWS, and Azure. My work focuses on creating automation pipelines, detection systems, and robust backend architectures that enhance operational efficiency and security.
            </p>
            <p>
              I thrive at the intersection of innovation and impact—continuously learning, experimenting, and transforming ideas into high-performance solutions that drive real-world results.
            </p>
            <div className="mt-4 space-y-2 text-white/80">
              <div>🎓 <em>B.Tech in CSE (Data Science) — SRM Institute of Science and Technology (2025)</em></div>
              <div>📍 <em>Kolkata, West Bengal, India</em></div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="order-first md:order-none">
          <div className="relative mx-auto aspect-square w-full max-w-[360px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-soft">
            <Image src="/assets/Sottam 15.JPG" alt="Sottam Aich" fill className="object-cover" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}


