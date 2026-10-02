import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import WalletArt from '@/components/art/WalletArt';
import {
  Section,
  SectionHeader,
  PageHero,
  IconTile,
  FeatureCard,
  CheckItem,
  CTASection,
  ArrowLink,
} from '@/components/ui';
import { walletPage } from '@/lib/pages';

export const metadata = {
  title: 'Digital wallet',
  description:
    'Hold your TrueID credential, share it by QR or link, read every consent you have ever granted, and revoke standing access in one tap.',
};

export default function WalletPage() {
  return (
    <>
      <PageHero
        eyebrow={walletPage.eyebrow}
        title={walletPage.title}
        body={walletPage.body}
        art={<WalletArt className="w-full max-w-[440px]" />}
      />

      <Section>
        <SectionHeader
          eyebrow="What it does"
          title="Six things the wallet is responsible for."
          body="A credential you cannot see, audit, or withdraw is not really yours. These are the controls that make ownership real."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {walletPage.capabilities.map((c, i) => (
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

      {/* Consent log — the feature that distinguishes a wallet from a folder */}
      <Section className="bg-white border-y border-borderc">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <IconTile>
              <Icon name="clipboard" />
            </IconTile>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-navy mt-5 tracking-tight">
              Every share, on the record
            </h2>
            <p className="text-muted mt-4 leading-relaxed">
              The consent history is not a buried settings screen. It is the
              second tab in the app, written in plain language, and it is the
              same record we would produce to a regulator. If a partner still
              holds standing access, you will see it there — and you can end it
              from that row.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
              <ArrowLink href="/privacy-consent">How consent works</ArrowLink>
              <ArrowLink href="/security">Security architecture</ArrowLink>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="card-navy rounded-[20px] p-7">
              <p className="font-mono text-xs text-white/40 uppercase tracking-wide">
                Consent history
              </p>
              <ul className="mt-4 divide-y divide-white/10">
                {[
                  {
                    who: 'Sterling Bank',
                    what: 'kyc_status, full_name',
                    when: 'Standing · since 12 Jun',
                    live: true,
                  },
                  {
                    who: 'MTN Nigeria',
                    what: 'age_over_18',
                    when: 'One-time · 4 Jun',
                    live: false,
                  },
                  {
                    who: 'Lagos State Health',
                    what: 'full_name, date_of_birth',
                    when: 'One-time · 28 May',
                    live: false,
                  },
                ].map((row) => (
                  <li key={row.who} className="py-3.5 flex items-start gap-3">
                    <span className="flex-1 min-w-0">
                      <span className="block font-semibold text-white text-sm">
                        {row.who}
                      </span>
                      <span className="block font-mono text-[12px] text-brand-2 mt-1 truncate">
                        {row.what}
                      </span>
                      <span className="block text-white/40 text-xs mt-1">
                        {row.when}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 text-[11px] font-semibold rounded-full px-2.5 py-1 ${
                        row.live
                          ? 'text-white bg-brand/30'
                          : 'text-white/50 bg-white/10'
                      }`}
                    >
                      {row.live ? 'Revoke' : 'Ended'}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-white/35 text-xs mt-5 leading-relaxed">
                Illustrative example. Partner names shown for layout only.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="Device security"
              title="Losing your phone should not mean losing your identity."
              body="The credential is bound to you, not to the handset in your pocket."
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {walletPage.security.map((s, i) => (
              <Reveal key={s} delay={i % 3}>
                <CheckItem>{s}</CheckItem>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <CTASection
        title="Your credential belongs in your pocket."
        body="Verification is free for individuals, permanently. The wallet comes with it."
        primary={{ href: '/get-started', label: 'Get verified' }}
        secondary={{ href: '/how-it-works', label: 'See how it works' }}
      />
    </>
  );
}
