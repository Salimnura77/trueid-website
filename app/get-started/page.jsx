import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import VerifyArt from '@/components/art/VerifyArt';
import {
  Section,
  SectionHeader,
  PageHero,
  IconTile,
  CheckItem,
  Button,
  ArrowLink,
} from '@/components/ui';
import { supportedDocuments } from '@/lib/site';
import { getStartedPage } from '@/lib/pages';

export const metadata = {
  title: 'Get started',
  description:
    'Three ways to get verified: on your phone, by USSD from any handset, or in person at a partner branch or agent. All three produce the same credential.',
};

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow={getStartedPage.eyebrow}
        title={getStartedPage.title}
        body={getStartedPage.body}
        art={<VerifyArt className="w-full max-w-[440px]" />}
      />

      {/* Three channels, side by side, so no channel reads like the fallback */}
      <Section>
        <SectionHeader
          eyebrow="Choose your path"
          title="Three ways in. One credential."
          body="The smartphone flow is the fastest, but it is not the only one. USSD and in-person verification reach the same assurance tiers."
        />
        <div className="grid md:grid-cols-3 gap-5 mt-14">
          {getStartedPage.paths.map((p, i) => (
            <Reveal key={p.title} delay={i} className="h-full">
              <div
                className={`rounded-[20px] p-7 h-full flex flex-col ${
                  p.featured
                    ? 'card-navy shadow-[0_18px_40px_-24px_rgba(15,34,56,0.55)]'
                    : 'card'
                }`}
              >
                <IconTile dark={p.featured}>
                  <Icon name={p.icon} color={p.featured ? '#42A5F5' : '#1E88F5'} />
                </IconTile>
                <h3
                  className={`font-display font-bold text-lg mt-4 ${
                    p.featured ? 'text-white' : 'text-navy'
                  }`}
                >
                  {p.title}
                </h3>
                <p
                  className={`text-sm mt-2 ${
                    p.featured ? 'text-white/55' : 'text-muted'
                  }`}
                >
                  {p.body}
                </p>

                <ol className="mt-6 space-y-3 flex-1">
                  {p.steps.map((s, n) => (
                    <li key={s} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className={`shrink-0 w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] font-semibold ${
                          p.featured
                            ? 'bg-white/10 text-brand-2'
                            : 'bg-brand/10 text-brand'
                        }`}
                      >
                        {n + 1}
                      </span>
                      <span
                        className={`text-sm leading-relaxed ${
                          p.featured ? 'text-white/70' : 'text-muted'
                        }`}
                      >
                        {s}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2} className="mt-8">
          <ArrowLink href="/digital-inclusion">
            Why we build every channel at once
          </ArrowLink>
        </Reveal>
      </Section>

      {/* What to have ready */}
      <Section className="bg-white border-y border-borderc">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <SectionHeader
              eyebrow="Before you start"
              title="What to have ready."
            />
            <div className="mt-8 space-y-3">
              {getStartedPage.requirements.map((r) => (
                <CheckItem key={r}>{r}</CheckItem>
              ))}
            </div>
          </div>

          <div>
            <Reveal>
              <h3 className="font-display font-bold text-navy text-lg">
                Any one of these documents is enough
              </h3>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {supportedDocuments.map((doc, i) => (
                <Reveal key={doc.name} delay={Math.min(i, 3)}>
                  <div className="chip rounded-xl p-4 h-full">
                    <p className="font-semibold text-navy text-sm">{doc.name}</p>
                    <p className="text-muted text-xs mt-0.5">{doc.full}</p>
                    <span className="inline-block mt-2.5 text-[11px] font-mono font-medium text-brand bg-brand/10 rounded-md px-2 py-1">
                      {doc.issuer}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Pre-launch: an honest waitlist instead of a dead signup form */}
      <section className="grad-cta py-20 lg:py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Be first in line.
            </h2>
            <p className="text-white/80 mt-5 leading-relaxed">
              {getStartedPage.launchNote}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-9">
              <Button href="/contact" variant="onLight" size="lg">
                Join the waitlist
              </Button>
              <Button href="/how-it-works" variant="onDark" size="lg">
                See the full flow
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
