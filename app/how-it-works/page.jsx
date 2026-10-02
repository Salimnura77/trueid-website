import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import VerifyArt from '@/components/art/VerifyArt';
import {
  Section,
  SectionHeader,
  PageHero,
  IconTile,
  FeatureCard,
  CTASection,
  ArrowLink,
} from '@/components/ui';
import { flowSteps } from '@/lib/content';
import { howItWorksPage } from '@/lib/pages';

export const metadata = {
  title: 'How it works',
  description:
    'Eight steps, once. Register, verify against a government source, receive a signed credential, and share it in seconds — by app, USSD, assisted, or in person.',
};

// lib/pages.js lists three channels; assisted verification through an agent
// is added here rather than editing the shared content file.
const channels = [
  ...howItWorksPage.channels.slice(0, 2),
  {
    icon: 'users',
    title: 'Assisted',
    body: 'A trained agent completes the flow on your behalf while you keep the credential. Useful where literacy or handset access is the barrier.',
  },
  ...howItWorksPage.channels.slice(2),
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow={howItWorksPage.eyebrow}
        title={howItWorksPage.title}
        body={howItWorksPage.body}
        art={<VerifyArt className="w-full max-w-[440px]" />}
      />

      {/* The 8-step flow as a vertical timeline — the connector line makes the
          "once, in order" nature of the flow legible at a glance. */}
      <Section>
        <SectionHeader
          eyebrow="The flow"
          title="Eight steps you complete once."
          body="After the final step, every future verification is a consent prompt — not a new application."
        />
        <ol className="relative mt-14 max-w-3xl">
          {/* Spine behind the numbered markers */}
          <span
            aria-hidden="true"
            className="absolute left-[19px] top-3 bottom-3 w-px bg-borderc"
          />
          {flowSteps.map((s, i) => (
            <Reveal key={s.title} delay={i % 3} as="li" className="relative pl-14 pb-9 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-brand/10 border border-brand/25 flex items-center justify-center font-display font-bold text-sm text-brand"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display font-bold text-navy text-lg">{s.title}</h3>
              <p className="text-muted text-sm mt-1.5 leading-relaxed">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Channels — the inclusion story, told where people are deciding.
          lib/pages.js carries three; the assisted route is added here so the
          shared content file stays untouched. */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Ways to verify"
          title="Four routes to the same credential."
          body="The credential you receive is identical regardless of how you got it. Only the path differs."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {channels.map((c, i) => (
            <FeatureCard
              key={c.title}
              icon={<Icon name={c.icon} />}
              title={c.title}
              body={c.body}
              delay={i % 3}
            />
          ))}
        </div>
        <Reveal delay={2} className="mt-8">
          <ArrowLink href="/digital-inclusion">
            Why offline access is a design requirement
          </ArrowLink>
        </Reveal>
      </Section>

      {/* Assurance tiers */}
      <Section>
        <div className="max-w-2xl">
          <SectionHeader
            eyebrow="Assurance tiers"
            title="Not every service needs the same proof."
            body="Stronger checks take longer, so we do not force everyone through the strictest path for a question that does not need it."
          />
        </div>
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {howItWorksPage.assurance.map((a, i) => (
            <Reveal key={a.tier} delay={i} className="h-full">
              <div className="card p-7 h-full">
                <span className="font-mono text-xs font-medium text-brand bg-brand/10 rounded-md px-2.5 py-1">
                  {a.tier}
                </span>
                <h3 className="font-display font-bold text-navy text-xl mt-4">
                  {a.title}
                </h3>
                <p className="text-muted text-sm mt-2.5 leading-relaxed">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={2}>
          <p className="text-muted text-xs mt-8 max-w-3xl leading-relaxed">
            {howItWorksPage.assuranceNote}
          </p>
        </Reveal>
      </Section>

      {/* What a partner actually receives */}
      <Section className="bg-white border-t border-borderc">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <IconTile>
              <Icon name="eye" />
            </IconTile>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-navy mt-5 tracking-tight">
              What the other side sees
            </h2>
            <p className="text-muted mt-4 leading-relaxed">
              A partner asking whether you are over 18 receives exactly that: a
              signed <span className="font-mono text-sm text-navy">true</span>. Not
              your date of birth, and not a copy of the document it came from. Every
              request is scoped, logged, and revocable from your wallet.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
              <ArrowLink href="/privacy-consent">How consent works</ArrowLink>
              <ArrowLink href="/security">Security architecture</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="card-navy rounded-[20px] p-7">
              <p className="font-mono text-xs text-white/40 uppercase tracking-wide">
                Partner request
              </p>
              <pre className="font-mono text-[13px] text-white/85 mt-3 overflow-x-auto leading-relaxed">
{`{
  "credential_id": "tid_8fK2mQ",
  "attributes": ["age_over_18"]
}`}
              </pre>
              <p className="font-mono text-xs text-white/40 uppercase tracking-wide mt-7">
                Response after your consent
              </p>
              <pre className="font-mono text-[13px] text-brand-2 mt-3 overflow-x-auto leading-relaxed">
{`{
  "verified": true,
  "attributes": { "age_over_18": true },
  "consent": { "scope": "one_time" }
}`}
              </pre>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Ready to verify once and be done?"
        body="Start with any supported document. Verification is free for individuals, permanently."
        primary={{ href: '/get-started', label: 'Get verified' }}
        secondary={{ href: '/faq', label: 'Read the FAQ' }}
      />
    </>
  );
}
