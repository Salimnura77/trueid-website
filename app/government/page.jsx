import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import NetworkArt from '@/components/art/NetworkArt';
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

const gov = audiences[2];

// Page-specific narrative. Service delivery cases are described as design
// intent, not as programmes already running.
const delivery = [
  {
    icon: 'users',
    title: 'Benefit targeting',
    body: 'Confirm that a named beneficiary is the person collecting, without building another register. Duplicate and ghost enrolments fail at the point of claim rather than at audit, months later.',
  },
  {
    icon: 'building',
    title: 'Service access',
    body: 'One credential across agencies, so a citizen who proved their identity for a health card does not start over for a licence renewal or a school placement.',
  },
  {
    icon: 'signal',
    title: 'Reach without a smartphone',
    body: 'USSD and agent-assisted paths mean a programme is not restricted to citizens with data plans. The people most likely to need a benefit are least likely to have one.',
  },
  {
    icon: 'coins',
    title: 'Subsidy and payment integrity',
    body: 'Verified-identity disbursement, so funds reach the intended recipient and reconciliation does not depend on manual name matching.',
  },
];

const audit = [
  {
    title: 'Every access is attributable',
    body: 'Each release of an attribute writes an append-only consent receipt: which agency asked, what was returned, when, under what stated purpose, and for how long.',
  },
  {
    title: 'Least privilege is the default request',
    body: 'An agency confirming eligibility asks for the eligibility claim, not a full citizen profile. The narrow request is the easy one to make.',
  },
  {
    title: 'Citizens can read their own log',
    body: 'The same record is visible in the citizen\'s wallet. Oversight does not depend on an agency choosing to disclose it.',
  },
  {
    title: 'Exportable for oversight',
    body: 'Audit trails export in a form a supervising body can read directly, without commissioning a bespoke report from a vendor.',
  },
];

const sources = [
  {
    name: 'NIMC',
    role: 'National Identity Number as the primary identity anchor',
  },
  {
    name: 'NIBSS',
    role: 'Bank Verification Number for financial-sector identity assurance',
  },
  {
    name: 'FRSC',
    role: "Driver's licence as a corroborating credential",
  },
  {
    name: 'INEC',
    role: "Permanent voter's card as a corroborating credential",
  },
  {
    name: 'NIS',
    role: 'International passport for citizens and diaspora verification',
  },
];

const engagement = [
  {
    title: 'Scope the programme',
    body: 'Which citizens, which claim, which access channels. We would rather tell you a use case does not fit yet than pilot it badly.',
  },
  {
    title: 'Data-processing terms',
    body: 'Lawful basis, retention, scope limits, and residency agreed in writing before any live data moves.',
  },
  {
    title: 'Sandbox and pilot',
    body: 'A bounded pilot against realistic fixtures, including the failure paths — damaged documents, name mismatches, offline enrolment.',
  },
  {
    title: 'Measured rollout',
    body: 'Production access with published uptime commitments, named incident contacts, and audit export from day one.',
  },
];

export const metadata = {
  title: gov.label,
  description: gov.body,
};

export default function GovernmentPage() {
  return (
    <>
      <PageHero
        eyebrow={gov.label}
        title={gov.title}
        body={gov.body}
        art={<NetworkArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/contact" size="lg">
            Discuss a programme
          </Button>
          <Button href="/trust-center" variant="onDark" size="lg">
            Review our trust center
          </Button>
        </div>
      </PageHero>

      {/* Service delivery */}
      <Section>
        <div className="grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="Service delivery"
              title="The hard part is not the policy. It is knowing who is in front of you."
              body="Most delivery failures are identity failures: the wrong person collects, the right person cannot prove eligibility, or the same person is counted twice."
            />
            <Reveal delay={1} className="mt-8">
              <div className="card-navy rounded-[20px] p-8">
                <Eyebrow dark>For public institutions</Eyebrow>
                <ul className="space-y-3.5 mt-5">
                  {gov.benefits.map((b) => (
                    <CheckItem key={b} dark>
                      {b}
                    </CheckItem>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {delivery.map((d, i) => (
              <FeatureCard
                key={d.title}
                icon={<Icon name={d.icon} />}
                title={d.title}
                body={d.body}
                delay={i % 2}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* Auditability */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Auditability"
          title="Consent that survives an audit."
          body="A citizen-facing identity system without a readable access log is a system nobody can hold to account. The log is part of the product, not a reporting add-on."
        />
        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {audit.map((a, i) => (
            <Reveal key={a.title} delay={i % 3} className="h-full">
              <div className="card p-7 h-full">
                <h3 className="font-display font-bold text-navy text-lg">
                  {a.title}
                </h3>
                <p className="text-muted text-sm mt-2.5 leading-relaxed">
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={2} className="mt-10">
          <ArrowLink href="/privacy-consent">
            See what a consent receipt contains
          </ArrowLink>
        </Reveal>
      </Section>

      {/* Interoperability + engagement */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Interoperability"
              title="Built on the sources you already trust."
              body="TrueID is not a parallel identity for Nigeria. It verifies against the registries that already hold authoritative records and issues a reusable credential on top of them."
            />
            <Reveal delay={1}>
              <ul className="mt-8 space-y-3">
                {sources.map((s) => (
                  <li key={s.name} className="chip rounded-2xl p-5 flex gap-4">
                    <span className="font-display font-bold text-navy shrink-0 w-16">
                      {s.name}
                    </span>
                    <span className="text-muted text-sm leading-relaxed">
                      {s.role}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-muted text-xs mt-6 leading-relaxed">
                TrueID is an independent platform, not a government agency, and
                is not affiliated with or endorsed by the bodies listed above.
                Source integrations are pursued on documented terms with each
                data custodian; where an integration is not yet live, the
                relevant document simply is not offered as a verification path.
              </p>
            </Reveal>
          </div>

          <div>
            <SectionHeader
              eyebrow="How engagement works"
              title="Pilot first, scale on evidence."
            />
            <Reveal delay={1}>
              <div className="card p-6 sm:p-8 bg-white mt-8">
                {engagement.map((s, i, arr) => (
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
              <ArrowLink href="/partners">
                Read the partner process in full
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <CTASection
        title="Deliver to the right citizen, every time."
        body="Tell us the programme and the population. We will be direct about what we can support today."
        primary={{ href: '/contact', label: 'Discuss a programme' }}
        secondary={{ href: '/security', label: 'Review security' }}
      />
    </>
  );
}
