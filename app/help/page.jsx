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
import { helpPage } from '@/lib/pages';

export const metadata = {
  title: 'Help centre',
  description:
    'Getting verified, your wallet, privacy and sharing, and USSD access — plus answers to the questions we are asked most.',
};

export default function HelpPage() {
  return (
    <>
      <PageHero
        eyebrow={helpPage.eyebrow}
        title={helpPage.title}
        body={helpPage.body}
      />

      <Section>
        <SectionHeader
          eyebrow="Browse by topic"
          title="Four areas cover most questions."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {helpPage.topics.map((t, i) => (
            <FeatureCard
              key={t.title}
              icon={<Icon name={t.icon} />}
              title={t.title}
              body={t.body}
              delay={i % 3}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-white border-y border-borderc">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Common questions"
            title="Asked most often."
            center
          />
          <div className="mt-12">
            <Accordion items={helpPage.faqs} />
          </div>
        </div>
      </Section>

      <Section tight>
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="card p-7">
              <h2 className="font-display font-bold text-navy text-lg">
                Need a person?
              </h2>
              <p className="text-muted text-sm mt-2 leading-relaxed">
                Support, security reports, and partnership enquiries all reach a
                named human — not a ticket queue that closes itself.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
                <ArrowLink href="/contact">Contact us</ArrowLink>
                <ArrowLink href="/faq">General FAQ</ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Ready to verify once and be done?"
        body="Verification is free for individuals, permanently — by app, browser, USSD, or in person."
        primary={{ href: '/get-started', label: 'Get verified' }}
        secondary={{ href: '/contact', label: 'Contact support' }}
      />
    </>
  );
}
