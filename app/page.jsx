import Link from 'next/link';
import {
  Button,
  Section,
  SectionHeader,
  FeatureCard,
  CTASection,
  ArrowLink,
  Eyebrow,
} from '@/components/ui';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import Marquee from '@/components/Marquee';
import Stats from '@/components/Stats';
import HeroArt from '@/components/art/HeroArt';
import NetworkArt from '@/components/art/NetworkArt';
import { stats, supportedDocuments } from '@/lib/site';
import { problems, features, audiences } from '@/lib/content';

export const metadata = {
  description:
    "Verify once with NIN, BVN, Passport, Driver's License, or Voter's Card. Get a reusable, encrypted TrueID credential that works everywhere.",
};

/* The home page is intentionally short: each block is a teaser that
   hands off to a dedicated page. Depth lives on the interior routes. */
export default function HomePage() {
  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="grad-hero relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(75% 65% at 40% 0%, #000 15%, transparent 78%)',
            WebkitMaskImage:
              'radial-gradient(75% 65% at 40% 0%, #000 15%, transparent 78%)',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <Reveal immediate>
              <span className="inline-flex items-center gap-2 chip-dark text-white/90 rounded-full px-4 py-1.5 text-sm font-medium backdrop-blur">
                <span aria-hidden="true">🇳🇬</span> Nigeria&apos;s Trusted Digital
                Identity Platform
              </span>
            </Reveal>

            <Reveal immediate delay={1}>
              <h1 className="font-display font-extrabold text-white text-[2.6rem] leading-[1.08] sm:text-6xl sm:leading-[1.06] mt-6 tracking-tight">
                One Verification.
                <br />
                <span className="grad-text">Lifetime Access.</span>
              </h1>
            </Reveal>

            <Reveal immediate delay={2}>
              <p className="text-white/70 text-lg leading-relaxed mt-6 max-w-xl">
                Verify once using trusted Nigerian identity documents, then access
                banking, government, healthcare, and telecom services instantly
                with your reusable TrueID credential.
              </p>
            </Reveal>

            <Reveal immediate delay={3}>
              <div className="flex flex-col sm:flex-row gap-4 mt-9">
                <Button href="/get-started" size="lg">
                  Get Verified
                </Button>
                <Button href="/partners" variant="onDark" size="lg">
                  Partner With Us
                </Button>
              </div>
            </Reveal>

            <Reveal immediate delay={4}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-10 text-white/50 text-sm">
                <span>NDPR compliant</span>
                <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
                <span>CBN aligned</span>
                <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
                <span>Bank-grade encryption</span>
              </div>
            </Reveal>
          </div>

          <Reveal immediate delay={2} className="flex items-center justify-center">
            <HeroArt />
          </Reveal>
        </div>
      </section>

      <Marquee />

      {/* ---------------- SUPPORTED DOCUMENTS ---------------- */}
      <Section tight>
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-10 lg:gap-16 items-center">
          <Reveal>
            <Eyebrow>Start with what you have</Eyebrow>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-navy mt-3 tracking-tight">
              Five trusted documents. Any one is enough.
            </h2>
            <p className="text-muted mt-4 leading-relaxed">
              We verify against the issuing source in real time — so a single
              document becomes a credential you keep for life.
            </p>
            <ArrowLink href="/how-it-works" className="mt-6">
              See the verification flow
            </ArrowLink>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-3">
            {supportedDocuments.map((doc, i) => (
              <Reveal key={doc.name} delay={Math.min(i, 3)}>
                <div className="chip rounded-xl p-4 flex items-center justify-between gap-3 h-full">
                  <div>
                    <p className="font-semibold text-navy text-sm">{doc.name}</p>
                    <p className="text-muted text-xs mt-0.5">{doc.full}</p>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-brand bg-brand/10 rounded-md px-2 py-1 shrink-0">
                    {doc.issuer}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------- PROBLEM (teaser: 3 of 6) ---------------- */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="The problem"
          title="Nigeria verifies the same person, over and over."
          body="Every bank, lender, and service provider repeats the same identity checks — costing time, money, and trust."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {problems.slice(0, 3).map((p, i) => (
            <FeatureCard
              key={p.title}
              icon={<Icon name={p.icon} />}
              title={p.title}
              body={p.body}
              delay={i}
            />
          ))}
        </div>
        <Reveal delay={2} className="mt-8">
          <ArrowLink href="/solution">See how TrueID solves this</ArrowLink>
        </Reveal>
      </Section>

      {/* ---------------- SOLUTION TEASER ---------------- */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <Eyebrow>Our solution</Eyebrow>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-navy mt-3 tracking-tight">
              Verify once. Carry it everywhere.
            </h2>
            <p className="text-muted text-lg mt-4 leading-relaxed max-w-lg">
              TrueID.me turns a one-time verification into a lifetime credential —
              encrypted, user-controlled, and instantly shareable across every
              partner in the network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button href="/solution">Explore the platform</Button>
              <Button href="/wallet" variant="onLight">
                See the wallet
              </Button>
            </div>
          </Reveal>
          <Reveal delay={2} className="flex justify-center">
            <NetworkArt />
          </Reveal>
        </div>
      </Section>

      {/* ---------------- FEATURES (teaser: 6 of 9) ---------------- */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Key features"
          title="Everything trust infrastructure needs."
          body="One credential, and the tooling around it to make identity work for people, partners, and government."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.slice(0, 6).map((f, i) => (
            <FeatureCard
              key={f.title}
              icon={<Icon name={f.icon} />}
              title={f.title}
              body={f.body}
              href={f.href}
              delay={i % 3}
            />
          ))}
        </div>
        <Reveal delay={2} className="mt-8">
          <ArrowLink href="/features">See all features</ArrowLink>
        </Reveal>
      </Section>

      {/* ---------------- AUDIENCES ---------------- */}
      <Section>
        <SectionHeader
          eyebrow="Built for everyone"
          title="One network, every side of the transaction."
          body="Individuals keep control. Businesses onboard faster. Government reaches the right citizen."
        />
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {audiences.map((a, i) => (
            <Reveal key={a.slug} delay={i} className="h-full">
              <Link
                href={`/${a.slug}`}
                className="card card-hover p-8 h-full flex flex-col focus-ring"
              >
                <h3 className="font-display font-bold text-xl text-navy">
                  {a.label}
                </h3>
                <p className="text-muted text-sm mt-3 leading-relaxed flex-1">
                  {a.body}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand mt-6">
                  For {a.label.toLowerCase()}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14m-6-7 7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Stats
        items={stats}
        note="Market context for the opportunity TrueID addresses. Figures are published national estimates, not TrueID platform metrics."
      />

      {/* ---------------- TRUST + DEVELOPER SPLIT ---------------- */}
      <Section>
        <div className="grid md:grid-cols-2 gap-5">
          <Reveal className="h-full">
            <div className="card p-8 h-full flex flex-col">
              <Eyebrow>Security</Eyebrow>
              <h3 className="font-display font-extrabold text-2xl text-navy mt-3 tracking-tight">
                Privacy by design. Trust by default.
              </h3>
              <p className="text-muted mt-3 leading-relaxed flex-1">
                Every credential is encrypted end to end, and every share requires
                your explicit, logged consent.
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                <ArrowLink href="/security">Security overview</ArrowLink>
                <span className="text-borderc" aria-hidden="true">
                  |
                </span>
                <ArrowLink href="/trust-center">Trust center</ArrowLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1} className="h-full">
            <div className="card-navy rounded-[20px] p-8 h-full flex flex-col">
              <Eyebrow dark>Developer platform</Eyebrow>
              <h3 className="font-display font-extrabold text-2xl text-white mt-3 tracking-tight">
                Ship verification in an afternoon.
              </h3>
              <p className="text-white/60 mt-3 leading-relaxed flex-1">
                REST APIs, SDKs, and webhooks — with sandbox credentials and clear
                documentation from the first call.
              </p>
              <div className="mt-6">
                <ArrowLink href="/developers" dark>
                  Read the docs
                </ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
