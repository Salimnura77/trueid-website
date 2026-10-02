import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import VerifyArt from '@/components/art/VerifyArt';
import {
  PageHero,
  Section,
  SectionHeader,
  FeatureCard,
  NumberedStep,
  CheckItem,
  Button,
  ArrowLink,
  Eyebrow,
  CTASection,
} from '@/components/ui';
import { audiences } from '@/lib/content';

const business = audiences[1];

// Page-specific narrative. The funnel stages describe where document-upload
// onboarding leaks customers, and what replaces each stage.
const funnel = [
  {
    stage: 'Start',
    leak: 'Customer sees a document-upload screen and closes the tab.',
    fix: 'They see a consent prompt for a credential they already hold.',
  },
  {
    stage: 'Capture',
    leak: 'Blurred photographs, cropped cards, glare on a laminated ID.',
    fix: 'Nothing is captured. The credential was verified once, at source.',
  },
  {
    stage: 'Review',
    leak: 'Manual review queues measured in days, not seconds.',
    fix: 'A signed attestation returns in real time, with an assurance tier attached.',
  },
  {
    stage: 'Re-KYC',
    leak: 'The same customer re-verified from scratch at renewal.',
    fix: 'Batch re-verification confirms current status against the credential.',
  },
];

const integration = [
  {
    title: 'Get sandbox keys',
    body: 'Self-serve from the dashboard. Fixtures cover every failure path, including manual review, so you build against reality rather than the happy case.',
  },
  {
    title: 'Choose an integration shape',
    body: 'REST API for full control, hosted verification for the fastest path live, or QR handoff for in-branch and point-of-sale.',
  },
  {
    title: 'Request the narrowest claim',
    body: 'Ask for "over 18" or "kyc_status" rather than a full profile. Narrower scopes convert better and shrink what you have to store.',
  },
  {
    title: 'Subscribe to webhooks',
    body: 'Revocation, re-verification, and status changes arrive as events. No polling, and no stale customer records.',
  },
];

const controls = [
  {
    icon: 'brain',
    title: 'Fraud signal that compounds',
    body: 'Document tampering signals, device reputation, and velocity checks run on every request. Network-wide patterns surface anomalies no single institution sees alone.',
  },
  {
    icon: 'scale',
    title: 'Assurance tiers you select',
    body: 'Tier 1 for age assertions and low-value wallets, Tier 2 for standard KYC, Tier 3 where address confirmation and multiple sources are required.',
  },
  {
    icon: 'clipboard',
    title: 'Audit your regulator can read',
    body: 'Every share writes a consent receipt: requester, scope, attributes, timestamp. Exportable without commissioning a bespoke report.',
  },
  {
    icon: 'code',
    title: 'Operational safety by default',
    body: 'Versioned endpoints with a published deprecation policy, idempotency keys on every write, and errors that name the field and the fix.',
  },
];

export const metadata = {
  title: business.label,
  description: business.body,
};

export default function BusinessesPage() {
  return (
    <>
      <PageHero
        eyebrow={business.label}
        title={business.title}
        body={business.body}
        art={<VerifyArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/contact" size="lg">
            Talk to us
          </Button>
          <Button href="/developers" variant="onDark" size="lg">
            Read the API docs
          </Button>
        </div>
      </PageHero>

      {/* The funnel — where document upload leaks, and what replaces it */}
      <Section>
        <SectionHeader
          eyebrow="Onboarding"
          title="Every upload screen is a place customers leave."
          body="Document collection is not one step. It is four, and each one loses people who fully intended to become your customer."
        />
        <div className="mt-12 space-y-4">
          {funnel.map((f, i) => (
            <Reveal key={f.stage} delay={i % 3}>
              <div className="card p-6 sm:p-7 grid md:grid-cols-[140px,1fr,1fr] gap-5 md:gap-8 items-start">
                <span className="font-display font-bold text-navy">{f.stage}</span>
                <p className="text-muted text-sm leading-relaxed flex gap-3">
                  <span
                    aria-hidden="true"
                    className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-muted/40"
                  />
                  {f.leak}
                </p>
                <p className="text-navy text-sm leading-relaxed flex gap-3">
                  <Icon name="check" size={18} className="shrink-0 mt-0.5" />
                  {f.fix}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={2}>
          <p className="text-muted text-xs mt-8 max-w-3xl leading-relaxed">
            Improvement depends on your current flow, your assurance tier, and
            your customer mix. We would rather size it with you against your own
            funnel data than advertise a percentage we cannot stand behind.
          </p>
        </Reveal>
      </Section>

      {/* What you get — benefits + controls */}
      <Section className="bg-white border-y border-borderc">
        <div className="grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="What you get"
              title="A verification you did not have to perform."
              body="Reusable credentials mean you stop paying for work another institution already did against the same source."
            />
            <Reveal delay={1} className="mt-8">
              <div className="card-navy rounded-[20px] p-8">
                <Eyebrow dark>For your business</Eyebrow>
                <ul className="space-y-3.5 mt-5">
                  {business.benefits.map((b) => (
                    <CheckItem key={b} dark>
                      {b}
                    </CheckItem>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {controls.map((c, i) => (
              <FeatureCard
                key={c.title}
                icon={<Icon name={c.icon} />}
                title={c.title}
                body={c.body}
                delay={i % 2}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Integration path + pricing pointer */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Integration"
              title="From sandbox key to live traffic."
              body="Four steps, none of which require a sales call to begin."
            />
            <Reveal delay={1}>
              <div className="card p-6 sm:p-8 bg-white mt-8">
                {integration.map((s, i, arr) => (
                  <NumberedStep
                    key={s.title}
                    n={i + 1}
                    title={s.title}
                    body={s.body}
                    last={i === arr.length - 1}
                  />
                ))}
              </div>
            </Reveal>
            <Reveal delay={2} className="mt-8">
              <ArrowLink href="/integrations">
                Compare integration methods
              </ArrowLink>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <div className="card p-8 bg-white h-full flex flex-col">
              <Eyebrow>Pricing</Eyebrow>
              <h3 className="font-display font-extrabold text-navy text-2xl mt-3 tracking-tight">
                You pay per completed check.
              </h3>
              <p className="text-muted mt-4 leading-relaxed">
                Rates depend on assurance tier and volume, with discounts as
                usage grows. Requests that fail on our side, or never reach a
                source, are not billed. There is no minimum commitment on the
                business tier.
              </p>
              <ul className="space-y-3.5 mt-7 flex-1">
                <CheckItem>
                  Verification stays free for individuals — partner fees fund the
                  platform
                </CheckItem>
                <CheckItem>
                  Volume-tiered per-verification pricing, quoted directly until
                  general availability
                </CheckItem>
                <CheckItem>
                  Enterprise and public-sector terms cover data residency, uptime
                  credits, and named incident contacts
                </CheckItem>
              </ul>
              <div className="mt-8">
                <ArrowLink href="/pricing">See the pricing page</ArrowLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Onboard verified customers in seconds."
        body="Tell us your use case and volume, and we will tell you honestly whether we fit yet."
        primary={{ href: '/contact', label: 'Talk to us' }}
        secondary={{ href: '/pricing', label: 'See pricing' }}
      />
    </>
  );
}
