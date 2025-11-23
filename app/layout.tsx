import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/globals.css';
import { BackgroundConstellations } from '@/components/background-constellations';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','700'], variable: '--font-jakarta', display: 'swap' });

export const metadata: Metadata = {
  title: 'Sottam Aich',
  description: 'I build intelligent, secure, and scalable systems that bridge innovation with reliability.',
  metadataBase: new URL('https://sottam-aich-portfolio.vercel.app'),
  openGraph: {
    title: 'Sottam Aich',
    description: 'I build intelligent, secure, and scalable systems that bridge innovation with reliability.',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sottam Aich',
    description: 'I build intelligent, secure, and scalable systems that bridge innovation with reliability.'
  },
  icons: {
    icon: '/assets/sottam-icon.png',
    shortcut: '/assets/sottam-icon.png',
    apple: '/assets/sottam-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jakarta.variable} bg-background text-foreground overflow-x-hidden`}>
        <div className="canvas-container">
          <BackgroundConstellations />
        </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}


