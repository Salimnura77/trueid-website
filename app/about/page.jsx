import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import Stats from '@/components/Stats';
import NetworkArt from '@/components/art/NetworkArt';
import {
  Section,
  SectionHeader,
  Eyebrow,
  PageHero,
  IconTile,
  Button,
  ArrowLink,
  CTASection,
} from '@/components/ui';
import { stats } from '@/lib/site';
import {
  aboutHero,
  mission,
  story,
  timeline,
  commitment,
  values,
  marketContext,
  standards,
  leadership,
  publications,
  careers,
} from '@/lib/about';

export const metadata = {
  title: 'About',
  description:
    'TrueID is building the trust layer for Nigeria — identity you verify once, control completely, and reuse everywhere.',
};

export default function AboutPage() {
  return (
    <>
      {/* 1 — Hero */}
      <PageHero
        eyebrow={aboutHero.eyebrow}
        title={aboutHero.title}
        body={aboutHero.body}
        art={<NetworkArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/how-it-works" size="lg">
            See how it works
          </Button>
          <Button href="/careers" variant="onDark" size="lg">
            Join the team
          </Button>
        </div>
      </PageHero>

      {/* 2 — Mission */}
      <Section className="bg-white border-b border-borderc">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 lg:gap-16">
          <Reveal>
            <Eyebrow>Our mission</Eyebrow>
          </Reveal>
          <div>
            <Reveal>
              <p className="font-display font-extrabold text-navy text-2xl sm:text-[2rem] leading-[1.28] tracking-tight">
                {mission.statement}
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-8 mt-12">
              {mission.support.map((s, i) => (
                <Reveal key={s.title} delay={i + 1}>
                  <h3 className="font-semibold text-navy">{s.title}</h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{s.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 3 — Founding story + timeline */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <SectionHeader eyebrow={story.eyebrow} title={story.title} />
            <div className="mt-6 space-y-4">
              {story.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i}>
                  <p className="text-muted leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={3}>
              <blockquote className="mt-10 pl-5 border-l-2 border-brand">
                <p className="font-display font-bold text-navy text-lg leading-snug">
                  &ldquo;{story.pullQuote.quote}&rdquo;
                </p>
                <footer className="text-muted text-sm mt-3">
                  — {story.pullQuote.attribution}
                </footer>
              </blockquote>
            </Reveal>
          </div>

          {/* Timeline */}
          <Reveal delay={1}>
            <ol className="relative">
              {timeline.map((t, i) => (
                <li key={t.year} className="relative pl-12 pb-10 last:pb-0">
                  {i < timeline.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute left-[15px] top-8 bottom-0 w-px bg-borderc"
                    />
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 w-8 h-8 rounded-full grad-cta flex items-center justify-center shadow-[0_6px_16px_-6px_rgba(30,136,245,0.7)]"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white" />
                  </span>
                  <span className="font-mono text-brand text-xs font-medium tracking-wide">
                    {t.year}
                  </span>
                  <h3 className="font-display font-bold text-navy text-lg mt-1">
                    {t.title}
                  </h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{t.body}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      {/* 4 — Signature commitment */}
      <section className="grad-hero py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 chip-dark rounded-full px-4 py-1.5 text-sm font-semibold text-white">
                <Icon name="heart" size={15} color="#42A5F5" />
                Our commitment
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-[2.6rem] leading-tight text-white mt-5 tracking-tight">
                {commitment.name}
              </h2>
              <p className="text-white/65 text-lg mt-5 leading-relaxed">
                {commitment.intro}
              </p>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
            {commitment.paths.map((p, i) => (
              <Reveal key={p.title} delay={i}>
                <div className="card-navy rounded-[20px] p-6 h-full">
                  <IconTile dark>
                    <Icon name={p.icon} color="#42A5F5" />
                  </IconTile>
                  <h3 className="font-display font-bold text-white mt-4">{p.title}</h3>
                  <p className="text-white/55 text-sm mt-2 leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2} className="mt-10">
            <ArrowLink href="/digital-inclusion" dark>
              How we reach people the internet misses
            </ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* 5 — Values */}
      <Section className="bg-white border-b border-borderc">
        <SectionHeader
          eyebrow="Our promise"
          title="The principles we hold ourselves to."
          body="These are not aspirations. They are commitments you should hold us to, and we publish enough for you to check."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {values.map((v, i) => {
            const inner = (
              <>
                <IconTile>
                  <Icon name={v.icon} />
                </IconTile>
                <h3 className="font-display font-bold text-navy text-lg mt-4">
                  {v.title}
                </h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">{v.body}</p>
                {v.href ? (
                  <span className="inline-flex items-center gap-1.5 text-brand text-sm font-semibold mt-4">
                    Read more
                  </span>
                ) : null}
              </>
            );
            return (
              <Reveal key={v.title} delay={i % 3} className="h-full">
                {v.href ? (
                  <Link href={v.href} className="card card-hover p-7 h-full block focus-ring">
                    {inner}
                  </Link>
                ) : (
                  <div className="card p-7 h-full">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 6 — Market context (honest substitute for adoption stats) */}
      <div>
        <Section tight className="pb-0 lg:pb-0">
          <SectionHeader
            eyebrow="Context"
            title={marketContext.title}
            center
          />
        </Section>
        <Stats items={stats} note={marketContext.note} />
      </div>

      {/* 7 — Standards & certifications */}
      <Section className="bg-white border-b border-borderc">
        <div className="max-w-2xl">
          <SectionHeader
            eyebrow="Trust & standards"
            title={standards.title}
            body={standards.body}
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {standards.items.map((s, i) => (
            <Reveal key={s.name} delay={i % 3}>
              <div className="chip rounded-2xl p-5 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display font-bold text-navy">{s.name}</span>
                  <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-brand bg-brand/10 rounded-full px-2.5 py-1">
                    {s.status}
                  </span>
                </div>
                <p className="text-muted text-sm mt-2.5 leading-relaxed">{s.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={2}>
          <p className="text-muted text-xs mt-8 max-w-3xl leading-relaxed">
            {standards.disclaimer}
          </p>
        </Reveal>
        <Reveal delay={3} className="mt-6">
          <ArrowLink href="/trust-center">Visit the trust center</ArrowLink>
        </Reveal>
      </Section>

      {/* 8 — Leadership */}
      <Section>
        <div className="max-w-2xl">
          <SectionHeader
            eyebrow="Leadership"
            title={leadership.title}
            body={leadership.body}
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12" id="leadership">
          {leadership.people.map((p, i) => (
            <Reveal key={p.name} delay={i}>
              <div className="card p-6 h-full">
                <div
                  aria-hidden="true"
                  className="w-16 h-16 rounded-2xl grad-cta flex items-center justify-center font-display font-extrabold text-white text-xl"
                >
                  {p.name
                    .split(' ')
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <h3 className="font-display font-bold text-navy mt-4">{p.name}</h3>
                <p className="text-brand text-sm font-semibold mt-0.5">{p.role}</p>
                <p className="text-muted text-sm mt-2.5 leading-relaxed">{p.bio}</p>
              </div>
            </Reveal>
          ))}

          {/* Open-roles card sits in the grid so a one-person team still reads deliberately */}
          <Reveal delay={1}>
            <Link
              href="/careers"
              className="card card-hover p-6 h-full flex flex-col justify-between focus-ring"
            >
              <div>
                <IconTile>
                  <Icon name="users" />
                </IconTile>
                <h3 className="font-display font-bold text-navy mt-4">
                  Your name here
                </h3>
                <p className="text-muted text-sm mt-2.5 leading-relaxed">
                  We are hiring across engineering, compliance, and partnerships.
                </p>
              </div>
              <span className="text-brand text-sm font-semibold mt-4">
                View open roles →
              </span>
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* 9 — What we publish (honest substitute for a press wall) */}
      <Section className="bg-white border-y border-borderc">
        <div className="max-w-2xl">
          <SectionHeader
            eyebrow="Transparency"
            title={publications.title}
            body={publications.body}
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {publications.items.map((p, i) => (
            <Reveal key={p.title} delay={i} className="h-full">
              <Link href={p.href} className="card card-hover p-7 h-full block focus-ring">
                <IconTile>
                  <Icon name={p.icon} />
                </IconTile>
                <h3 className="font-display font-bold text-navy text-lg mt-4">
                  {p.title}
                </h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">{p.body}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 10 — Careers CTA */}
      <CTASection
        title={careers.title}
        body={careers.body}
        primary={{ href: '/careers', label: 'View open roles' }}
        secondary={{ href: '/contact', label: 'Get in touch' }}
      />
    </>
  );
}
