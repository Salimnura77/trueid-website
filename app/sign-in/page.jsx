import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import SecurityArt from '@/components/art/SecurityArt';
import {
  Section,
  SectionHeader,
  PageHero,
  FeatureCard,
  CheckItem,
  CTASection,
  ArrowLink,
} from '@/components/ui';
import { signInPage } from '@/lib/legal';

export const metadata = {
  title: 'Sign in',
  description:
    'Passwordless access to your TrueID wallet — biometric unlock, passkeys, or a USSD short code. Account access opens with our verification pilots.',
};

export default function SignInPage() {
  return (
    <>
      <PageHero
        eyebrow={signInPage.eyebrow}
        title={signInPage.title}
        body={signInPage.body}
        art={<SecurityArt className="w-full max-w-[440px]" />}
      />

      {/* No form on purpose. The notice explains why, up front, so the page
          does not read like something is broken. */}
      <Section tight>
        <Reveal>
          <div className="card p-7 max-w-3xl border-brand/30 bg-brand/[0.03]">
            <div className="flex items-start gap-4">
              <span className="shrink-0 mt-0.5">
                <Icon name="clock" size={22} />
              </span>
              <div>
                <h2 className="font-display font-bold text-navy">
                  Sign-in is not open yet
                </h2>
                <p className="text-muted text-sm mt-2 leading-relaxed">
                  {signInPage.notice}
                </p>
                <div className="mt-5">
                  <ArrowLink href="/get-started">
                    Get on the list for launch
                  </ArrowLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="How access will work"
          title="No password to forget, or to leak."
          body="Passwords are the weakest part of most identity systems. We are not shipping one."
        />
        <div className="grid sm:grid-cols-3 gap-5 mt-12">
          {signInPage.methods.map((m, i) => (
            <FeatureCard
              key={m.title}
              icon={<Icon name={m.icon} />}
              title={m.title}
              body={m.body}
              delay={i}
            />
          ))}
        </div>
      </Section>

      {/* Anti-phishing commitments — stated on the sign-in page itself, which
          is where someone being scammed is most likely to look. */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-14">
          <div>
            <SectionHeader
              eyebrow="Staying safe"
              title="What we will never ask you for."
              body="Anyone who does is not us. Report it and we will act on it."
            />
            <div className="mt-6">
              <ArrowLink href="/help">Report a suspicious message</ArrowLink>
            </div>
          </div>
          <Reveal delay={1}>
            <ul className="space-y-4">
              {signInPage.security.map((s) => (
                <CheckItem key={s}>{s}</CheckItem>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Not verified yet?"
        body="Verification is free for individuals, permanently. Start with any supported document."
        primary={{ href: '/get-started', label: 'Get verified' }}
        secondary={{ href: '/how-it-works', label: 'See how it works' }}
      />
    </>
  );
}
