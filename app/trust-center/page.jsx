import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import SecurityArt from '@/components/art/SecurityArt';
import {
  PageHero,
  Section,
  SectionHeader,
  IconTile,
  CheckItem,
  Button,
  ArrowLink,
  Eyebrow,
  CTASection,
} from '@/components/ui';
import { trustCenterPage } from '@/lib/pages';

// Status labels follow the same discipline as /about: "Built to" means the
// control set is implemented, "Aligned" means mapped to an external
// framework, "In progress" and "Planned" mean not yet complete. Nothing here
// asserts a certification TrueID holds.
const STATUS_NOTE =
  'Status labels are accurate as of the date above. "Built to" means the control set is implemented and in use. "Aligned" means our design is mapped to an external framework. "In progress" means work is underway and independent certification is not complete. "Planned" means it has a committed start, not a result. We do not claim certifications we do not hold, and this page changes when the status does — not when it is convenient.';

const STATUS_AS_OF = '29 July 2026';

const subprocessors = [
  {
    purpose: 'Cloud infrastructure',
    scope: 'Application hosting, encrypted storage, and backups',
    residency: 'Nigeria (primary and backup)',
  },
  {
    purpose: 'Identity source verification',
    scope: 'Real-time checks against government identity registries',
    residency: 'Nigeria',
  },
  {
    purpose: 'Biometric liveness',
    scope: 'Liveness detection and face matching during enrolment',
    residency: 'Contracted to in-country processing',
  },
  {
    purpose: 'Transactional messaging',
    scope: 'SMS and email for one-time codes and consent notifications',
    residency: 'Nigeria, with regional failover',
  },
  {
    purpose: 'USSD gateway',
    scope: 'Feature-phone session delivery through mobile network operators',
    residency: 'Nigeria',
  },
  {
    purpose: 'Error and performance monitoring',
    scope: 'Diagnostics with personal data scrubbed before transmission',
    residency: 'Configured to exclude identity attributes',
  },
];

const uptime = [
  {
    label: 'Target availability',
    value: '99.9%',
    note: 'Monthly, for the verification API and wallet services, measured excluding scheduled maintenance',
  },
  {
    label: 'Status page',
    value: 'Planned',
    note: 'A public status page with historical incident records goes live with the partner API',
  },
  {
    label: 'Service credits',
    value: 'Contracted',
    note: 'Enterprise and public-sector agreements carry credits against the availability target',
  },
  {
    label: 'Published history',
    value: 'From launch',
    note: 'We have no production uptime record to show yet, so we are not showing one',
  },
];

const incident = [
  {
    n: 'Detect',
    title: 'Detection and triage',
    body: 'Alerting on availability, integrity, and anomalous access patterns, with an on-call engineer acknowledging within 15 minutes.',
  },
  {
    n: 'Contain',
    title: 'Containment',
    body: 'Credential issuance and attribute release can be suspended independently, so a fault in one path does not force a full outage.',
  },
  {
    n: 'Notify',
    title: 'Notification',
    body: 'Affected individuals and partners notified in line with NDPR obligations. Regulator notification within 72 hours of becoming aware of a personal-data breach.',
  },
  {
    n: 'Review',
    title: 'Post-incident review',
    body: 'A written review with root cause and corrective actions, published for incidents that affected credential integrity or attribute confidentiality.',
  },
];

const retention = [
  {
    item: 'Document images',
    period: 'Deleted once the credential is issued',
    detail:
      'Verification artefacts exist to establish the credential. Once the signature is issued they serve no purpose, so they do not survive the flow.',
  },
  {
    item: 'Biometric template',
    period: 'Held while the account is active',
    detail:
      'Stored as an encrypted template, never as a raw image, and used only to confirm you are the credential holder.',
  },
  {
    item: 'Consent receipts',
    period: 'Retained for the audit period',
    detail:
      'Kept because they are the record you and a regulator rely on. Retained after revocation so the history stays complete.',
  },
  {
    item: 'Account data',
    period: 'Removed on request',
    detail:
      'Self-serve deletion in the app, propagated to backups on a published schedule rather than "eventually".',
  },
];

export const metadata = {
  title: 'Trust center',
  description: trustCenterPage.body,
};

export default function TrustCenterPage() {
  return (
    <>
      <PageHero
        eyebrow={trustCenterPage.eyebrow}
        title={trustCenterPage.title}
        body={trustCenterPage.body}
        art={<SecurityArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/security" size="lg">
            Security architecture
          </Button>
          <Button href="/contact" variant="onDark" size="lg">
            Report a vulnerability
          </Button>
        </div>
      </PageHero>

      {/* Compliance posture + data practices, straight from the honest status table */}
      <Section>
        <SectionHeader
          eyebrow="Posture"
          title="Where we actually stand."
          body="Two tables. One for the frameworks we are held to, one for how data is handled. Both include the entries that are not finished, because those are the ones worth checking."
        />
        <Reveal delay={1}>
          <p className="font-mono text-brand text-xs font-medium tracking-wide mt-8">
            STATUS AS OF {STATUS_AS_OF.toUpperCase()}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-5 mt-6">
          {trustCenterPage.sections.map((section, si) => (
            <Reveal key={section.title} delay={si} className="h-full">
              <div className="card p-7 h-full">
                <h3 className="font-display font-bold text-navy text-lg">
                  {section.title}
                </h3>
                <ul className="mt-5 divide-y divide-borderc">
                  {section.items.map((item) => (
                    <li key={item.label} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-semibold text-navy text-sm">
                          {item.label}
                        </span>
                        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wide text-brand bg-brand/10 rounded-full px-2.5 py-1">
                          {item.value}
                        </span>
                      </div>
                      <p className="text-muted text-sm mt-2 leading-relaxed">
                        {item.note}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <p className="text-muted text-xs mt-8 max-w-3xl leading-relaxed">
            {STATUS_NOTE}
          </p>
        </Reveal>
      </Section>

      {/* Subprocessors + uptime */}
      <Section className="bg-white border-y border-borderc">
        <div className="grid lg:grid-cols-[1.15fr,1fr] gap-12 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Sub-processors"
              title="Who else touches the data."
              body="Any third party in the path is a party you are trusting too. Categories are listed here; the named current list ships with our data-processing terms, and partners get notice before any addition."
            />
            <Reveal delay={1}>
              <ul className="mt-8 space-y-3">
                {subprocessors.map((s) => (
                  <li key={s.purpose} className="chip rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-display font-bold text-navy text-sm">
                        {s.purpose}
                      </span>
                      <span className="shrink-0 text-muted text-xs font-medium">
                        {s.residency}
                      </span>
                    </div>
                    <p className="text-muted text-sm mt-2 leading-relaxed">
                      {s.scope}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-muted text-xs mt-6 leading-relaxed">
                Vendor names are omitted until contracts are executed, rather
                than listed speculatively. Every sub-processor is bound to
                purpose limitation and to our retention schedule.
              </p>
            </Reveal>
          </div>

          <div>
            <SectionHeader
              eyebrow="Availability"
              title="What we commit to, and what we cannot prove yet."
            />
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {uptime.map((u, i) => (
                <Reveal key={u.label} delay={i % 3} className="h-full">
                  <div className="card p-6 h-full">
                    <span className="font-display font-extrabold text-2xl grad-text">
                      {u.value}
                    </span>
                    <h3 className="font-semibold text-navy text-sm mt-3">
                      {u.label}
                    </h3>
                    <p className="text-muted text-sm mt-1.5 leading-relaxed">
                      {u.note}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Incident response + retention */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Incident response"
              title="What happens on our worst day."
              body="Every operator has incidents. The difference is whether the plan was written before or after the first one."
            />
            <Reveal delay={1}>
              <ol className="mt-8 space-y-4">
                {incident.map((step) => (
                  <li key={step.title} className="card p-6 flex gap-4">
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-mono text-brand text-[11px] font-semibold uppercase tracking-wide bg-brand/10 rounded-full px-3 py-1 h-fit"
                    >
                      {step.n}
                    </span>
                    <div>
                      <h3 className="font-semibold text-navy">{step.title}</h3>
                      <p className="text-muted text-sm mt-1.5 leading-relaxed">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div>
            <SectionHeader
              eyebrow="Data retention"
              title="How long each thing lives."
            />
            <Reveal delay={1}>
              <div className="card p-7 mt-8">
                <ul className="divide-y divide-borderc">
                  {retention.map((r) => (
                    <li key={r.item} className="py-5 first:pt-0 last:pb-0">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-semibold text-navy text-sm">
                          {r.item}
                        </span>
                        <span className="shrink-0 text-brand text-xs font-semibold text-right max-w-[45%]">
                          {r.period}
                        </span>
                      </div>
                      <p className="text-muted text-sm mt-2 leading-relaxed">
                        {r.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={2} className="mt-8">
              <div className="card-navy rounded-[20px] p-8">
                <Eyebrow dark>Your rights</Eyebrow>
                <ul className="space-y-3.5 mt-5">
                  {trustCenterPage.rights.map((r) => (
                    <CheckItem key={r.title} dark>
                      <span className="text-white/85 font-semibold">
                        {r.title}.
                      </span>{' '}
                      {r.body}
                    </CheckItem>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Vulnerability disclosure */}
      <Section className="bg-white border-y border-borderc" tight>
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-10 lg:gap-16 items-start">
          <Reveal>
            <IconTile size="lg">
              <Icon name="shield" size={24} />
            </IconTile>
            <h2 className="font-display font-extrabold text-navy text-2xl sm:text-3xl mt-5 tracking-tight">
              {trustCenterPage.disclosure.title}
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-muted text-lg leading-relaxed">
              {trustCenterPage.disclosure.body}
            </p>
            <div className="mt-8">
              <ArrowLink href="/contact">Contact the security team</ArrowLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Check our work."
        body="If something on this page does not hold up, we would rather hear it from you than defend it later."
        primary={{ href: '/contact', label: 'Ask us a question' }}
        secondary={{ href: '/privacy-consent', label: 'Read the consent model' }}
      />
    </>
  );
}
