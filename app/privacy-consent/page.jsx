import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import WalletArt from '@/components/art/WalletArt';
import {
  PageHero,
  Section,
  SectionHeader,
  FeatureCard,
  CheckItem,
  Button,
  ArrowLink,
  Eyebrow,
  CTASection,
} from '@/components/ui';
import { privacyPage } from '@/lib/pages';

// The worked example is the point of this page: a partner asks a broad
// question, and what leaves the wallet is the narrowest answer that settles
// it. Both blocks are illustrative of the documented API shape.
const partnerRequest = `POST /v1/verify
{
  "credential_id": "tid_8fK2mQ",
  "purpose": "Age-restricted product and KYC check",
  "requested": [
    "date_of_birth",
    "full_name",
    "nin",
    "kyc_status",
    "address"
  ],
  "scope": "standing"
}`;

const userReturned = `200 OK
{
  "verified": true,
  "matched_source": "NIMC",
  "claims": {
    "over_18": true,
    "kyc_status": "passed"
  },
  "withheld": [
    "date_of_birth",
    "nin",
    "address"
  ],
  "consent": {
    "scope": "one_time",
    "expires_in": 900,
    "receipt_id": "rcp_3nQ7xB"
  }
}`;

const walkthrough = [
  {
    title: 'The partner asked for five attributes',
    body: 'Nothing stops a partner requesting broadly. Their form was probably built around a document upload, so it asks for everything a document would have shown.',
  },
  {
    title: 'You saw the request before it moved',
    body: 'The prompt named the partner, listed each attribute, showed the stated purpose, and flagged that they wanted standing rather than one-time access.',
  },
  {
    title: 'You narrowed it to two claims',
    body: 'Date of birth became "over 18". The NIN and address were declined outright — the product needs an age gate and a KYC status, and it got both.',
  },
  {
    title: 'You downgraded the scope',
    body: 'Standing access became one-time with a 15-minute expiry. If they need to check again, they ask again.',
  },
  {
    title: 'The receipt landed in your wallet',
    body: 'rcp_3nQ7xB records who asked, what was released, what was withheld, and when. It is yours to read, and the withheld list is part of the record.',
  },
];

const revocation = [
  {
    icon: 'refresh',
    title: 'Revoke standing access',
    body: 'One tap in the consent log. The partner is notified by webhook and their next request fails immediately — there is no grace period.',
  },
  {
    icon: 'clock',
    title: 'One-time shares expire themselves',
    body: 'A one-time consent carries an expiry measured in minutes. Nothing to remember and nothing to clean up later.',
  },
  {
    icon: 'file',
    title: 'Delete your account',
    body: 'Self-serve in the app. Your credential is revoked, your data is removed on our published schedule including from backups, and every partner holding standing consent is notified.',
  },
  {
    icon: 'scale',
    title: 'What revocation cannot undo',
    body: 'A partner who lawfully received a claim during the consent period keeps it under their own retention policy and regulatory duties. Revocation stops future access — we will not pretend it rewrites history.',
  },
];

export const metadata = {
  title: 'Privacy & consent',
  description: privacyPage.body,
};

export default function PrivacyConsentPage() {
  return (
    <>
      <PageHero
        eyebrow={privacyPage.eyebrow}
        title={privacyPage.title}
        body={privacyPage.body}
        art={<WalletArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/get-started" size="lg">
            Get verified
          </Button>
          <Button href="/trust-center" variant="onDark" size="lg">
            See the trust center
          </Button>
        </div>
      </PageHero>

      {/* The four-part consent model */}
      <Section>
        <SectionHeader
          eyebrow="The model"
          title="Four steps, and you are in charge of all of them."
          body="Consent is not a checkbox at the end of a form. It is the mechanism by which anything moves at all."
        />
        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {privacyPage.model.map((m, i) => (
            <FeatureCard
              key={m.title}
              icon={<Icon name={m.icon} />}
              title={m.title}
              body={m.body}
              delay={i % 2}
            />
          ))}
        </div>
      </Section>

      {/* Worked example — request vs what is returned */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Worked example"
          title="A lender asks for five things. Two leave your wallet."
          body="This is a real request shape against the documented API. The left block is what a partner sent. The right block is what came back after you approved."
        />

        <div className="grid lg:grid-cols-2 gap-5 mt-12">
          <Reveal className="h-full">
            <div className="card-navy rounded-[20px] p-6 sm:p-7 h-full">
              <div className="flex items-center gap-2">
                <Icon name="code" size={17} color="#42A5F5" />
                <Eyebrow dark>What the partner requested</Eyebrow>
              </div>
              <pre className="font-mono text-[12.5px] leading-relaxed text-white/70 mt-5 overflow-x-auto">
                <code>{partnerRequest}</code>
              </pre>
            </div>
          </Reveal>

          <Reveal delay={1} className="h-full">
            <div className="card-navy rounded-[20px] p-6 sm:p-7 h-full">
              <div className="flex items-center gap-2">
                <Icon name="filter" size={17} color="#42A5F5" />
                <Eyebrow dark>What was actually returned</Eyebrow>
              </div>
              <pre className="font-mono text-[12.5px] leading-relaxed text-white/70 mt-5 overflow-x-auto">
                <code>{userReturned}</code>
              </pre>
            </div>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-10 lg:gap-16 mt-14">
          <Reveal>
            <h3 className="font-display font-extrabold text-navy text-2xl tracking-tight">
              What happened in between
            </h3>
            <p className="text-muted mt-4 leading-relaxed">
              Five steps, none of which required you to understand the API. In
              the wallet this was one screen with toggles.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="card p-6 sm:p-8">
              <ol className="divide-y divide-borderc">
                {walkthrough.map((w, i) => (
                  <li key={w.title} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="text-brand font-display font-bold text-sm w-6 pt-0.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="font-semibold text-navy">{w.title}</h4>
                      <p className="text-muted text-sm mt-1 leading-relaxed">
                        {w.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Consent receipt anatomy + selective disclosure examples */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Consent receipts"
              title={privacyPage.receipt.title}
            />
            <Reveal delay={1}>
              <div className="card p-7 mt-8">
                <ul className="divide-y divide-borderc">
                  {privacyPage.receipt.fields.map((f) => (
                    <li
                      key={f.key}
                      className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
                    >
                      <span className="font-mono text-brand text-xs font-medium shrink-0 sm:w-28">
                        {f.key}
                      </span>
                      <span className="text-muted text-sm leading-relaxed">
                        {f.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-muted text-sm mt-6 leading-relaxed">
                Receipts are append-only. A revoked consent stays in your log
                marked revoked rather than disappearing, because a history you
                can edit is not a record.
              </p>
            </Reveal>
          </div>

          <div>
            <SectionHeader
              eyebrow="Selective disclosure"
              title="The narrowest true answer."
              body="Most questions institutions ask do not need the underlying fact. They need whether a threshold was met."
            />
            <Reveal delay={1}>
              <div className="card p-7 mt-8">
                <ul className="divide-y divide-borderc">
                  {[
                    { asked: 'Is this person an adult?', shared: 'over_18: true', withheld: 'Date of birth' },
                    { asked: 'Have they passed KYC?', shared: 'kyc_status: passed', withheld: 'NIN, BVN, documents' },
                    { asked: 'Do they live in Lagos State?', shared: 'state_matches: true', withheld: 'Street address' },
                    { asked: 'Are they a Nigerian national?', shared: 'nationality: NG', withheld: 'Passport number' },
                  ].map((row) => (
                    <li key={row.asked} className="py-4 first:pt-0 last:pb-0">
                      <p className="font-semibold text-navy text-sm">
                        {row.asked}
                      </p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2.5">
                        <span className="font-mono text-xs text-brand bg-brand/10 rounded-full px-2.5 py-1">
                          {row.shared}
                        </span>
                        <span className="text-muted text-xs">
                          stays in your wallet: {row.withheld}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Revocation & deletion */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Taking it back"
          title="Consent you cannot withdraw is not consent."
          body="Four mechanisms, including an honest account of the one limit revocation has."
        />
        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {revocation.map((r, i) => (
            <FeatureCard
              key={r.title}
              icon={<Icon name={r.icon} />}
              title={r.title}
              body={r.body}
              delay={i % 2}
            />
          ))}
        </div>
      </Section>

      {/* What is never stored / never done */}
      <Section>
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="Never"
              title="Commitments with no exceptions clause."
            />
            <Reveal delay={2} className="mt-8">
              <ArrowLink href="/trust-center">
                See retention periods in the trust center
              </ArrowLink>
            </Reveal>
          </div>
          <Reveal delay={1}>
            <div className="card-navy rounded-[20px] p-8">
              <Eyebrow dark>We will not</Eyebrow>
              <ul className="space-y-3.5 mt-5">
                {privacyPage.neverList.map((n) => (
                  <CheckItem key={n} dark>
                    {n}
                  </CheckItem>
                ))}
              </ul>
              <p className="text-white/45 text-xs mt-7 leading-relaxed">
                The last item is the one with teeth: document images are deleted
                once your credential is issued, so a future request for them —
                from anyone — has nothing to answer with.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Your data, your call."
        body="Verify once, then approve each share on your own terms — and revoke whenever you change your mind."
        primary={{ href: '/get-started', label: 'Get verified' }}
        secondary={{ href: '/security', label: 'How we secure it' }}
      />
    </>
  );
}
