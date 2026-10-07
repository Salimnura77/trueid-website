import { Inter, Inconsolata, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';

const inter = Inter({
  variable: '--font-inter',
  weight: ['100', '400', '700', '900'],
  display: 'swap',
  subsets: ['latin'],
});

const interTight = Inconsolata({
  variable: '--font-inter-tight',
  weight: ['400', '700'],
  display: 'swap',
  subsets: ['latin'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  weight: ['100', '400', '700', '800'],
  display: 'swap',
  subsets: ['latin'],
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
