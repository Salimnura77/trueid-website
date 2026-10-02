import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import SecurityArt from '@/components/art/SecurityArt';
import {
  Section,
  SectionHeader,
  PageHero,
  FeatureCard,
  CheckItem,
  CTASection,
  ArrowLink,
} from '@/components/ui';
import { securityPillars } from '@/lib/content';
import { securityPage } from '@/lib/pages';

export const metadata = {
  title: 'Security',
  description:
    'Encryption at rest and in transit, HSM-held signing keys, biometric binding, minimum disclosure, and append-only consent receipts.',
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow={securityPage.eyebrow}
        title={securityPage.title}
        body={securityPage.body}
        art={<SecurityArt className="w-full max-w-[440px]" />}
      />

      {/* The four commitments, before the architecture that implements them */}
      <Section>
        <SectionHeader
          eyebrow="What we commit to"
          title="Four promises the architecture has to keep."
          body="Everything further down this page exists to make these four true under pressure, not just on a slide."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {securityPillars.map((p, i) => (
            <FeatureCard
              key={p.title}
              icon={<Icon name={p.icon} />}
              title={p.title}
              body={p.body}
              delay={i % 3}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Architecture"
          title="Six layers, each assuming the others can fail."
          body="No single control is load-bearing on its own. That is the point."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {securityPage.layers.map((l, i) => (
            <FeatureCard
              key={l.title}
              icon={<Icon name={l.icon} />}
              title={l.title}
              body={l.body}
              delay={i % 3}
            />
          ))}
        </div>
      </Section>

      {/* Operational practices on a navy band, matching the original page's rhythm */}
      <section className="grad-hero py-20 lg:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <SectionHeader
              dark
              eyebrow="Operations"
              title="Security is what we do daily, not what we claim once."
              body="Architecture only holds if the people running it are constrained too."
            />
            <Reveal delay={3} className="mt-8">
              <ArrowLink href="/trust-center" dark>
                See compliance status and uptime
              </ArrowLink>
            </Reveal>
          </div>

          <div className="space-y-4">
            {securityPage.practices.map((p, i) => (
              <Reveal key={p} delay={i % 4}>
                <CheckItem dark>{p}</CheckItem>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Section tight className="bg-white border-b border-borderc">
        <Reveal>
          <p className="text-muted text-sm max-w-3xl leading-relaxed">
            {securityPage.note}
          </p>
        </Reveal>
        <Reveal delay={1} className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          <ArrowLink href="/privacy-consent">Consent &amp; privacy model</ArrowLink>
          <ArrowLink href="/trust-center">Trust center</ArrowLink>
        </Reveal>
      </Section>

      <CTASection
        title="Questions your security team needs answered?"
        body="We would rather have the hard conversation before you integrate than after."
        primary={{ href: '/contact', label: 'Talk to us' }}
        secondary={{ href: '/trust-center', label: 'Trust center' }}
      />
    </>
  );
}
