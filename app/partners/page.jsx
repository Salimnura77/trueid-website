import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import NetworkArt from '@/components/art/NetworkArt';
import {
  Section,
  SectionHeader,
  PageHero,
  FeatureCard,
  NumberedStep,
  CTASection,
  Button,
} from '@/components/ui';
import { partnersPage } from '@/lib/pages';

export const metadata = {
  title: 'Partners',
  description:
    'Banks, government agencies, healthcare, telecoms, insurance, and remittance operators join one network and stop paying for verification work already done.',
};

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow={partnersPage.eyebrow}
        title={partnersPage.title}
        body={partnersPage.body}
        art={<NetworkArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/contact" size="lg">
            Talk to us
          </Button>
          <Button href="/developers" variant="onDark" size="lg">
            Read the docs
          </Button>
        </div>
      </PageHero>

      <Section>
        <SectionHeader
          eyebrow="Who joins"
          title="Six sectors, one credential."
          body="Each of these already verifies identity. The difference is doing it once, together."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {partnersPage.categories.map((c, i) => (
            <FeatureCard
              key={c.title}
              icon={<Icon name={c.icon} />}
              title={c.title}
              body={c.body}
              delay={i % 3}
            />
          ))}
        </div>
      </Section>

      <Section className="bg-white border-y border-borderc">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-12 lg:gap-16">
          <SectionHeader
            eyebrow="Why it pays"
            title="The network effect is the product."
          />
          <div className="grid sm:grid-cols-2 gap-8">
            {partnersPage.why.map((w, i) => (
              <Reveal key={w.title} delay={i % 2}>
                <h3 className="font-display font-bold text-navy">{w.title}</h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Getting started"
          title="Four steps to production."
          body="You can build and test the whole integration before you commit to anything."
        />
        <div className="mt-12 max-w-2xl">
          {partnersPage.process.map((p, i) => (
            <NumberedStep
              key={p.title}
              n={i + 1}
              title={p.title}
              body={p.body}
              last={i === partnersPage.process.length - 1}
            />
          ))}
        </div>
      </Section>

      <CTASection
        title="Join the network early."
        body="We are onboarding pilot partners now. Tell us your use case and we will tell you honestly whether we fit yet."
        primary={{ href: '/contact', label: 'Start a conversation' }}
        secondary={{ href: '/pricing', label: 'See pricing' }}
      />
    </>
  );
}
