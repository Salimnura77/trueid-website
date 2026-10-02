import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import NetworkArt from '@/components/art/NetworkArt';
import {
  Section,
  SectionHeader,
  PageHero,
  FeatureCard,
  CTASection,
  ArrowLink,
} from '@/components/ui';
import { integrationsPage } from '@/lib/pages';

export const metadata = {
  title: 'Integrations',
  description:
    'REST API, hosted verification, QR handoff, webhooks, USSD gateway, and batch re-verification — every path returns the same signed result.',
};

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        eyebrow={integrationsPage.eyebrow}
        title={integrationsPage.title}
        body={integrationsPage.body}
        art={<NetworkArt className="w-full max-w-[440px]" />}
      />

      <Section>
        <SectionHeader
          eyebrow="Integration paths"
          title="Six ways in. One result shape."
          body="Pick the path that matches your product and your timeline. You can start hosted and move to the API later without re-verifying anyone."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {integrationsPage.methods.map((m, i) => (
            <FeatureCard
              key={m.title}
              icon={<Icon name={m.icon} />}
              title={m.title}
              body={m.body}
              href={m.href}
              delay={i % 3}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-white border-y border-borderc">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <SectionHeader
              eyebrow="SDKs"
              title="Server libraries for the stacks you already use."
            />
            <p className="text-muted mt-4 leading-relaxed">
              {integrationsPage.sdkNote}
            </p>
            <div className="mt-7">
              <ArrowLink href="/developers">Read the API reference</ArrowLink>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {integrationsPage.sdks.map((sdk, i) => (
              <Reveal key={sdk} delay={i % 3}>
                <div className="chip rounded-xl px-4 py-4 flex items-center gap-2.5 h-full">
                  <Icon name="code" size={16} />
                  <span className="font-mono text-sm font-medium text-navy">
                    {sdk}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        title="Tell us what you are building."
        body="We will tell you which integration path fits — and honestly, whether we are ready for your use case yet."
        primary={{ href: '/contact', label: 'Talk to us' }}
        secondary={{ href: '/developers', label: 'Read the docs' }}
      />
    </>
  );
}
