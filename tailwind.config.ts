import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0b0c',
        foreground: '#f5f5f5',
        muted: '#9CA3AF',
        card: '#0f0f11',
        border: 'rgba(255,255,255,0.06)'
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)'
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        spaceGrotesk: ['var(--font-space-grotesk)']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.35)'
      }
    }
  },
  plugins: [],
};

export default config;


