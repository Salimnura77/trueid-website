'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { nav } from '@/lib/site';
import Logo from './Logo';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileGroup, setMobileGroup] = useState(null);
  const closeTimer = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on route change.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileGroup(null);
  }, [pathname]);

  // Escape closes the open mega-menu.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const openWithHover = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };

  const closeWithDelay = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  const isActive = (href) =>
    href && href !== '/' && pathname.startsWith(href.split('#')[0]);

  return (
    <header
      id="nav"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || openMenu || mobileOpen
          ? 'bg-white/85 backdrop-blur-xl border-b border-borderc shadow-[0_1px_0_rgba(15,23,42,0.06)]'
          : 'border-b border-transparent'
      }`}
      onMouseLeave={closeWithDelay}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between"
        aria-label="Main"
      >
        <Link href="/" className="shrink-0 focus-ring rounded-lg">
          <Logo />
          <span className="sr-only">TrueID.me home</span>
        </Link>

        {/* ---------- Desktop ---------- */}
        <div className="hidden lg:flex items-center gap-1 text-[15px] font-medium">
          {nav.map((item) =>
            item.columns ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => openWithHover(item.label)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition focus-ring ${
                    openMenu === item.label
                      ? 'text-navy bg-lightbg'
                      : 'text-navy/75 hover:text-navy'
                  }`}
                  aria-expanded={openMenu === item.label}
                  aria-haspopup="true"
                  onClick={() =>
                    setOpenMenu(openMenu === item.label ? null : item.label)
                  }
                >
                  {item.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={`transition-transform ${
                      openMenu === item.label ? 'rotate-180' : ''
                    }`}
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {openMenu === item.label ? (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                    <div className="card p-3 shadow-2xl shadow-navy/10 w-[38rem] grid grid-cols-2 gap-2">
                      {item.columns.map((col) => (
                        <div key={col.heading} className="p-2">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted/70 px-2 mb-1.5">
                            {col.heading}
                          </p>
                          {col.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block px-2.5 py-2 rounded-xl hover:bg-lightbg transition focus-ring"
                            >
                              <span className="block font-semibold text-navy text-sm">
                                {sub.label}
                              </span>
                              <span className="block text-muted text-xs mt-0.5 leading-snug">
                                {sub.desc}
                              </span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg transition focus-ring ${
                  isActive(item.href)
                    ? 'text-brand'
                    : 'text-navy/75 hover:text-navy'
                }`}
              >
                {item.label}
              </Link>
            ),
          )}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link
            href="/sign-in"
            className="px-4 py-2.5 text-[15px] font-semibold text-navy hover:text-brand transition focus-ring rounded-lg"
          >
            Sign In
          </Link>
          <Link
            href="/get-started"
            className="btn-primary px-5 py-2.5 rounded-xl text-white text-[15px] font-semibold transition focus-ring"
          >
            Get Started
          </Link>
        </div>

        {/* ---------- Mobile trigger ---------- */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden p-2 -mr-2 focus-ring rounded-lg text-navy"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* ---------- Mobile sheet ---------- */}
      {mobileOpen ? (
        <div className="lg:hidden bg-white border-t border-borderc max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-6 py-4">
            {nav.map((item) =>
              item.columns ? (
                <div key={item.label} className="border-b border-borderc/70">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-3.5 font-semibold text-navy focus-ring rounded"
                    onClick={() =>
                      setMobileGroup(mobileGroup === item.label ? null : item.label)
                    }
                    aria-expanded={mobileGroup === item.label}
                  >
                    {item.label}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`transition-transform ${
                        mobileGroup === item.label ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="m6 9 6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {mobileGroup === item.label ? (
                    <div className="pb-3 space-y-2.5">
                      {item.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="text-[11px] font-bold uppercase tracking-wider text-muted/70 mt-2 mb-1">
                            {col.heading}
                          </p>
                          {col.items.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block py-2 pl-3 border-l-2 border-borderc text-sm text-navy/80 hover:text-brand hover:border-brand transition"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3.5 font-semibold text-navy border-b border-borderc/70"
                >
                  {item.label}
                </Link>
              ),
            )}

            <div className="flex gap-3 pt-5 pb-2">
              <Link
                href="/sign-in"
                className="flex-1 text-center py-3 rounded-xl border border-borderc font-semibold text-navy"
              >
                Sign In
              </Link>
              <Link
                href="/get-started"
                className="flex-1 text-center py-3 rounded-xl btn-primary text-white font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
