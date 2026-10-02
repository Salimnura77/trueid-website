import Link from 'next/link';
import Reveal from './Reveal';

/* ------------------------------------------------------------------ *
 * Buttons
 * ------------------------------------------------------------------ */

export function Button({
  href = '#',
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  const sizes = {
    sm: 'px-4 py-2.5 text-[15px]',
    md: 'px-6 py-3.5 text-[15px]',
    lg: 'px-7 py-4 text-base',
  };

  const variants = {
    primary: 'btn-primary text-white',
    onDark: 'btn-ghost-dark text-white',
    onLight: 'btn-ghost-light text-navy',
    text: 'text-brand hover:text-navy',
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-ring ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}

export function ArrowLink({ href, children, dark = false, className = '' }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-semibold transition focus-ring rounded ${
        dark ? 'text-brand-2 hover:text-white' : 'text-brand hover:text-navy'
      } ${className}`}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="transition-transform group-hover:translate-x-1"
      >
        <path
          d="M5 12h14m-6-7 7 7-7 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

/* ------------------------------------------------------------------ *
 * Section scaffolding
 * ------------------------------------------------------------------ */

export function Section({ children, className = '', tight = false, ...rest }) {
  return (
    <section
      className={`${tight ? 'py-16 lg:py-20' : 'py-20 lg:py-28'} ${className}`}
      {...rest}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, dark = false, className = '' }) {
  return (
    <span
      className={`font-semibold text-sm tracking-wide uppercase ${
        dark ? 'text-brand-2' : 'text-brand'
      } ${className}`}
    >
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  dark = false,
  center = false,
  className = '',
}) {
  return (
    <Reveal className={`${center ? 'text-center mx-auto' : ''} max-w-2xl ${className}`}>
      {eyebrow ? <Eyebrow dark={dark}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`font-display font-extrabold text-3xl sm:text-4xl mt-3 tracking-tight ${
          dark ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`text-lg mt-4 leading-relaxed ${
            dark ? 'text-white/60' : 'text-muted'
          }`}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ *
 * Page hero used by every interior page
 * ------------------------------------------------------------------ */

export function PageHero({ eyebrow, title, body, children, art = null }) {
  return (
    <section className="grad-hero relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage:
            'radial-gradient(70% 60% at 50% 0%, #000 20%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(70% 60% at 50% 0%, #000 20%, transparent 75%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className={art ? 'grid lg:grid-cols-2 gap-14 items-center' : 'max-w-3xl'}>
          <div>
            {eyebrow ? (
              <Reveal immediate>
                <span className="inline-flex items-center gap-2 chip-dark text-white/90 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur">
                  {eyebrow}
                </span>
              </Reveal>
            ) : null}
            <Reveal immediate delay={1}>
              <h1 className="font-display font-extrabold text-white text-[2.3rem] leading-[1.1] sm:text-5xl sm:leading-[1.06] mt-6 tracking-tight">
                {title}
              </h1>
            </Reveal>
            {body ? (
              <Reveal immediate delay={2}>
                <p className="text-white/70 text-lg leading-relaxed mt-5 max-w-xl">
                  {body}
                </p>
              </Reveal>
            ) : null}
            {children ? (
              <Reveal immediate delay={3} className="mt-8">
                {children}
              </Reveal>
            ) : null}
          </div>
          {art ? (
            <Reveal immediate delay={2} className="flex justify-center">
              {art}
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ *
 * Cards
 * ------------------------------------------------------------------ */

export function IconTile({ children, dark = false, size = 'md' }) {
  const dims = size === 'lg' ? 'w-14 h-14 rounded-2xl' : 'w-11 h-11 rounded-xl';
  return (
    <div
      className={`${dims} flex items-center justify-center ${
        dark ? 'bg-white/10' : 'bg-brand/10'
      }`}
    >
      {children}
    </div>
  );
}

export function FeatureCard({ icon, title, body, href, delay = 0, dark = false }) {
  const inner = (
    <>
      {icon ? <IconTile dark={dark}>{icon}</IconTile> : null}
      <h3
        className={`font-display font-bold text-lg mt-4 ${
          dark ? 'text-white' : 'text-navy'
        }`}
      >
        {title}
      </h3>
      <p className={`text-sm mt-2 leading-relaxed ${dark ? 'text-white/55' : 'text-muted'}`}>
        {body}
      </p>
      {href ? (
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-semibold mt-4 ${
            dark ? 'text-brand-2' : 'text-brand'
          }`}
        >
          Learn more
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12h14m-6-7 7 7-7 7"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      ) : null}
    </>
  );

  const shell = `${dark ? 'card-navy rounded-[20px]' : 'card'} card-hover p-7 h-full block`;

  return (
    <Reveal delay={delay} className="h-full">
      {href ? (
        <Link href={href} className={`${shell} focus-ring`}>
          {inner}
        </Link>
      ) : (
        <div className={shell}>{inner}</div>
      )}
    </Reveal>
  );
}

export function CheckItem({ children, dark = false }) {
  return (
    <li className="flex gap-3">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0 mt-0.5"
      >
        <circle cx="12" cy="12" r="10" fill={dark ? 'rgba(66,165,245,0.18)' : 'rgba(30,136,245,0.12)'} />
        <path
          d="m8 12.2 2.6 2.6L16 9.4"
          stroke={dark ? '#42A5F5' : '#1E88F5'}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={`text-sm leading-relaxed ${dark ? 'text-white/70' : 'text-muted'}`}>
        {children}
      </span>
    </li>
  );
}

export function NumberedStep({ n, title, body, last = false }) {
  return (
    <div className={`flex gap-4 py-4 ${last ? '' : 'border-b border-borderc'}`}>
      <span className="text-brand font-display font-bold text-sm w-6 pt-0.5 shrink-0">
        {String(n).padStart(2, '0')}
      </span>
      <div>
        <h4 className="font-semibold text-navy">{title}</h4>
        <p className="text-muted text-sm mt-1 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Closing CTA — shared by every page
 * ------------------------------------------------------------------ */

export function CTASection({
  title = "Ready to build Nigeria's digital identity future?",
  body = 'Verification is free for individuals, permanently. Partners can start in the sandbox today.',
  primary = { href: '/get-started', label: 'Get Started' },
  secondary = { href: '/contact', label: 'Partner With Us' },
}) {
  return (
    <section className="grad-hero py-20 lg:py-24 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <Reveal>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            {title}
          </h2>
          <p className="text-white/60 text-lg mt-5">{body}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9">
            <Button href={primary.href} size="lg">
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="onDark" size="lg">
              {secondary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
