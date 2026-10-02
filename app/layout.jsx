import localFont from 'next/font/local';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';

/* Fonts are self-hosted from app/fonts rather than fetched from Google at
   build time. next/font/google downloads on every cold build and aborts on
   a slow connection, which silently swaps in a fallback face and changes the
   typography. These are the same variable woff2 files Google serves, so the
   rendering is identical — but the build no longer needs the network. */

const inter = localFont({
  src: './fonts/Inter-latin.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
});

const interTight = localFont({
  src: './fonts/InterTight-latin.woff2',
  weight: '100 900',
  style: 'normal',
  variable: '--font-inter-tight',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
});

const jetbrains = localFont({
  src: './fonts/JetBrainsMono-latin.woff2',
  weight: '100 800',
  style: 'normal',
  variable: '--font-jetbrains',
  display: 'swap',
  fallback: ['ui-monospace', 'Consolas', 'monospace'],
});

export const metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interTight.variable} ${jetbrains.variable} font-sans`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:text-navy focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
