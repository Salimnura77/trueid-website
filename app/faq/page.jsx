import Accordion from '@/components/Accordion';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import {
  Section,
  SectionHeader,
  PageHero,
  FeatureCard,
  CTASection,
  ArrowLink,
} from '@/components/ui';
import { faqs } from '@/lib/content';

export const metadata = {
  title: 'FAQ',
  description:
    'Answers on supported documents, cost, who can see your data, feature-phone access, and how TrueID relates to your NIN.',
};

// Where people usually go after the FAQ. Kept in the page because it is
// navigation, not content.
const nextReads = [
  {
    icon: 'shield',
    title: 'Security architecture',
    body: 'Encryption, HSM-held signing keys, biometric binding, and what happens if a layer fails.',
    href: '/security',
  },
  {
    icon: 'eye',
    title: 'Privacy and consent',
    body: 'What a partner receives when you approve a request, and how to revoke standing access.',
    href: '/privacy-consent',
  },
  {
    icon: 'code',
    title: 'Developer docs',
    body: 'Endpoints, sandbox fixtures, and webhooks for teams integrating verification.',
    href: '/developers',
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions worth a straight answer."
        body="If something here is unclear or missing, ask us directly — we would rather answer it once publicly than privately ten times."
      />

      {/* The questions themselves. Accordion is a client component; the page
          around it stays server-rendered. */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <Accordion items={faqs} />
        </div>
      </Section>

      {/* Read-next, for the questions that need more than a paragraph */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Going deeper"
          title="Some answers need more than a paragraph."
          body="These three pages cover what the FAQ can only summarise."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {nextReads.map((r, i) => (
            <FeatureCard
              key={r.title}
              icon={<Icon name={r.icon} />}
              title={r.title}
              body={r.body}
              href={r.href}
              delay={i % 3}
            />
          ))}
        </div>
      </Section>

      <Section tight>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="card p-7">
              <h2 className="font-display font-bold text-navy text-lg">
                Still not answered?
              </h2>
              <p className="text-muted text-sm mt-2 leading-relaxed">
                Reach the team directly, or browse the help centre for
                step-by-step guides.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
                <ArrowLink href="/contact">Contact us</ArrowLink>
                <ArrowLink href="/help">Help centre</ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
