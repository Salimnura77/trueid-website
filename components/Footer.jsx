import Link from 'next/link';
import { site, footerNav } from '@/lib/site';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Logo dark />
            <p className="text-white/40 text-sm mt-5 max-w-xs leading-relaxed">
              Nigeria&apos;s trusted digital identity and wallet platform. One
              verification. Lifetime access.
            </p>
            <p className="text-white/30 text-xs mt-6 leading-relaxed">
              Contact:{' '}
              <a
                href={`mailto:${site.email}`}
                className="hover:text-white/60 transition"
              >
                {site.email}
              </a>
              <br />
              {site.phone}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {['NDPR compliant', 'CBN aligned'].map((badge) => (
                <span
                  key={badge}
                  className="chip-dark text-white/60 text-[11px] font-medium rounded-full px-3 py-1"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.heading}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2.5 text-white/40 text-sm">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition focus-ring rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} TrueID.me. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/30 text-xs">
            <Link href="/privacy" className="hover:text-white/60 transition">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white/60 transition">
              Terms
            </Link>
            <Link href="/privacy-consent" className="hover:text-white/60 transition">
              NDPR
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
