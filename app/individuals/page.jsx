import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import WalletArt from '@/components/art/WalletArt';
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
  IconTile,
  CTASection,
} from '@/components/ui';
import { audiences } from '@/lib/content';

const person = audiences[0];

export const metadata = {
  title: person.label,
  description: person.body,
};

// Day-to-day moments where a reusable credential replaces paperwork.
// Kept inline: this is page-specific narrative, not shared content.
const dayToDay = [
  {
    icon: 'bank',
    title: 'Opening an account',
    body: 'Instead of a NIN slip, a utility bill, and a passport photograph, you approve one consent prompt. The bank receives a signed confirmation, not your document folder.',
  },
  {
    icon: 'qr',
    title: 'Proving your age at a counter',
    body: 'Present a QR code. The scanner learns that you are over 18 — not your birthday, not your address, not your NIN.',
  },
  {
    icon: 'signal',
    title: 'Sending money from a feature phone',
    body: 'Dial the short code, confirm with your PIN, done. Every capability in the app has a path that needs no data plan.',
  },
  {
    icon: 'clipboard',
    title: 'Checking who holds what',
    body: 'Your consent log lists every share you have ever approved: who asked, what they got, when it expires.',
  },
  {
    icon: 'refresh',
    title: 'Changing your mind',
    body: 'Revoke a standing consent in one tap. The partner is notified by webhook and their next request fails.',
  },
  {
    icon: 'video',
    title: 'When a document does not match',
    body: 'A damaged card or a name spelled differently gets assisted review by a trained person, in English, Hausa, Yoruba, or Igbo — not a rejection screen.',
  },
];

const firstWeek = [
  {
    title: 'Verify once',
    body: 'One supported document — NIN, BVN, passport, driver’s licence, or voter’s card.',
  },
  {
    title: 'Confirm it is you',
    body: 'A liveness-checked selfie binds the credential to you, so a stolen phone is not a stolen identity.',
  },
  {
    title: 'Credential lands in your wallet',
    body: 'Signed, encrypted, held on your device with an encrypted backup for device loss.',
  },
  {
    title: 'Share on request, forever',
    body: 'Every verification after the first is a consent prompt measured in seconds.',
  },
];

export default function IndividualsPage() {
  return (
    <>
      <PageHero
        eyebrow={person.label}
        title={person.title}
        body={person.body}
        art={<WalletArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/get-started" size="lg">
            Get verified
          </Button>
          <Button href="/wallet" variant="onDark" size="lg">
            See the wallet
          </Button>
        </div>
      </PageHero>

      {/* What you get — the four benefits from the audience content, made concrete */}
      <Section>
        <div className="grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="What you get"
              title="Four things change the day you verify."
              body="Verification is free for individuals, permanently. Partners pay per check, which is what funds the platform."
            />
            <Reveal delay={2} className="mt-8">
              <ArrowLink href="/pricing">Why it stays free for you</ArrowLink>
            </Reveal>
          </div>
          <Reveal delay={1}>
            <div className="card-navy rounded-[20px] p-8">
              <Eyebrow dark>Your credential</Eyebrow>
              <ul className="space-y-3.5 mt-5">
                {person.benefits.map((b) => (
                  <CheckItem key={b} dark>
                    {b}
                  </CheckItem>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Day to day — the part a person actually experiences */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Day to day"
          title="What this looks like in an ordinary week."
          body="Not the architecture — the moments where identity currently costs you an afternoon."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {dayToDay.map((d, i) => (
            <FeatureCard
              key={d.title}
              icon={<Icon name={d.icon} />}
              title={d.title}
              body={d.body}
              delay={i % 3}
            />
          ))}
        </div>
      </Section>

      {/* First-time flow + what stays private */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Getting started"
              title="The one time you do the work."
              body="Under five minutes on a phone or browser. Longer if you would rather have an agent walk you through it — and that path produces the same credential."
            />
            <Reveal delay={1}>
              <div className="card p-6 sm:p-8 bg-white mt-8">
                {firstWeek.map((s, i, arr) => (
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
          </div>

          <div>
            <Reveal>
              <IconTile size="lg">
                <Icon name="lock" size={24} />
              </IconTile>
              <h2 className="font-display font-extrabold text-navy text-2xl sm:text-3xl mt-5 tracking-tight">
                What a partner never receives.
              </h2>
              <p className="text-muted text-lg mt-4 leading-relaxed">
                Selective disclosure is the default path, not a setting you have
                to find. A lender asking whether you are over 18 and KYC-passed
                gets those two answers and nothing else.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <ul className="space-y-3.5 mt-8">
                {[
                  'Your document images — they are deleted once your credential is issued',
                  'Attributes the partner did not ask for and you did not approve',
                  'Your biometric template, which is only ever used to verify you',
                  'A record sold to anyone, for any price, at any time',
                ].map((n) => (
                  <li key={n} className="flex gap-3 text-sm text-muted leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-muted/40"
                    />
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={2} className="mt-8">
              <ArrowLink href="/privacy-consent">
                Read the consent model in full
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <CTASection
        title="Verify once. Use it for life."
        body="Free for individuals, permanently — on a smartphone, over USSD, or in person."
        primary={{ href: '/get-started', label: 'Get verified' }}
        secondary={{ href: '/help', label: 'Read the help centre' }}
      />
    </>
  );
}
