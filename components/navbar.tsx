'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-foreground/5 border-b border-foreground/10"
    >
      <nav className="container-px max-w-6xl mx-auto flex items-center justify-between h-14">
        <Link href="#home" className="flex items-center gap-3">
          <span className="relative inline-flex h-[42px] w-[42px] shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_0_2px_rgba(255,255,255,0.15)]">
            <Image src="/assets/Sottam 15.JPG" alt="Sottam Aich" fill className="object-cover" />
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-[15px] text-foreground/70 hover:text-foreground transition-colors group font-medium"
              >
                <span>{link.label}</span>
                <span className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-white/80 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          <a href="#contact" className="md:hidden text-[15px] text-white/80 font-medium">Contact</a>
        </div>
      </nav>
    </motion.header>
  );
}


