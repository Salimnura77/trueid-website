import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import Accordion from '@/components/Accordion';
import {
  Section,
  SectionHeader,
  PageHero,
  CheckItem,
  CTASection,
  Button,
} from '@/components/ui';
import { pricingPage } from '@/lib/pages';

export const metadata = {
  title: 'Pricing',
  description:
    'Verification is free for individuals, permanently. Partners pay per verification with volume tiers; enterprise and public sector are contracted.',
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow={pricingPage.eyebrow}
        title={pricingPage.title}
        body={pricingPage.body}
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-5 items-start">
          {pricingPage.tiers.map((t, i) => (
            <Reveal key={t.name} delay={i} className="h-full">
              <div
                className={`rounded-[20px] p-8 h-full flex flex-col ${
                  t.featured
                    ? 'card-navy ring-1 ring-brand/40 shadow-[0_20px_50px_-24px_rgba(15,34,56,0.55)]'
                    : 'card'
                }`}
              >
                {t.featured ? (
                  <span className="self-start text-[11px] font-semibold uppercase tracking-wide text-white bg-brand rounded-full px-3 py-1">
                    Most common
                  </span>
                ) : null}

                <h2
                  className={`font-display font-bold text-xl mt-4 ${
                    t.featured ? 'text-white' : 'text-navy'
                  }`}
                >
                  {t.name}
                </h2>

                <div className="mt-4 flex items-baseline gap-2">
                  <span
                    className={`font-display font-extrabold text-3xl tracking-tight ${
                      t.featured ? 'text-white' : 'text-navy'
                    }`}
                  >
                    {t.price}
                  </span>
                  <span
                    className={`text-sm ${
                      t.featured ? 'text-white/50' : 'text-muted'
                    }`}
                  >
                    {t.cadence}
                  </span>
                </div>

                <p
                  className={`text-sm mt-3 leading-relaxed ${
                    t.featured ? 'text-white/60' : 'text-muted'
                  }`}
                >
                  {t.body}
                </p>

                <ul className="space-y-3 mt-7 flex-1">
                  {t.features.map((f) => (
                    <CheckItem key={f} dark={t.featured}>
                      {f}
                    </CheckItem>
                  ))}
                </ul>

                <Button
                  href={t.cta.href}
                  variant={t.featured ? 'primary' : 'onLight'}
                  className="mt-8 w-full"
                >
                  {t.cta.label}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <p className="text-muted text-xs mt-8 max-w-3xl leading-relaxed">
            {pricingPage.note}
          </p>
        </Reveal>
      </Section>

      <Section className="bg-white border-t border-borderc">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Pricing questions"
            title="The things people ask before signing."
            center
          />
          <div className="mt-12">
            <Accordion items={pricingPage.faqs} />
          </div>
        </div>
      </Section>

      <CTASection
        title="Get a quote for your volume."
        body="Tell us your expected verification volume and assurance needs, and we will come back with real numbers."
        primary={{ href: '/contact', label: 'Talk to us' }}
        secondary={{ href: '/developers', label: 'Try the sandbox' }}
      />
    </>
  );
}
