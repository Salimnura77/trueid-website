import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import {
  PageHero,
  Section,
  SectionHeader,
  NumberedStep,
  CheckItem,
  Button,
  ArrowLink,
  Eyebrow,
  IconTile,
  CTASection,
} from '@/components/ui';
import { devCapabilities, codeSample, codeResponse } from '@/lib/content';
import { developersPage } from '@/lib/pages';

export const metadata = {
  title: 'Developers',
  description: developersPage.body,
};

// Icons for the four platform capabilities, kept here so lib/content.js
// stays copy-only.
const capabilityIcons = ['code', 'file', 'bolt', 'clipboard'];

export default function DevelopersPage() {
  return (
    <>
      <PageHero
        eyebrow={developersPage.eyebrow}
        title={developersPage.title}
        body={developersPage.body}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/get-started" size="lg">
            Get sandbox access
          </Button>
          <Button href="/integrations" variant="onDark" size="lg">
            Compare integration paths
          </Button>
        </div>
      </PageHero>

      {/* Platform surface */}
      <Section>
        <SectionHeader
          eyebrow="The platform"
          title="Four things to integrate against."
          body="No bespoke onboarding, no proprietary protocol to learn. If you have shipped against a payments API, this will feel familiar."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {devCapabilities.map((c, i) => (
            <Reveal key={c.title} delay={i % 3} className="h-full">
              <div className="card card-hover p-7 h-full">
                <IconTile>
                  <Icon name={capabilityIcons[i] || 'code'} />
                </IconTile>
                <h3 className="font-display font-bold text-navy text-lg mt-4">
                  {c.title}
                </h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Request / response — dark code panels, no highlighting library */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="A verification, end to end"
          title="One request, one consent prompt, one signed answer."
          body="You ask for the narrowest set of attributes your product needs. The person approves in their wallet. You get claims, not document images."
        />
        <div className="grid lg:grid-cols-2 gap-5 mt-12">
          <Reveal className="h-full">
            <div className="card-navy rounded-[20px] p-6 sm:p-7 h-full">
              <div className="flex items-center gap-3">
                <span className="chip-dark rounded-full px-3 py-1 text-xs font-semibold text-brand-2">
                  Request
                </span>
                <span className="text-white/40 text-xs font-mono">
                  POST /v1/verify
                </span>
              </div>
              <div className="mt-5 overflow-x-auto">
                <pre className="text-[13px] leading-relaxed">
                  <code className="font-mono text-white/80">{codeSample}</code>
                </pre>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1} className="h-full">
            <div className="card-navy rounded-[20px] p-6 sm:p-7 h-full">
              <div className="flex items-center gap-3">
                <span className="chip-dark rounded-full px-3 py-1 text-xs font-semibold text-brand-2">
                  Response
                </span>
                <span className="text-white/40 text-xs font-mono">200 OK</span>
              </div>
              <div className="mt-5 overflow-x-auto">
                <pre className="text-[13px] leading-relaxed">
                  <code className="font-mono text-white/80">{codeResponse}</code>
                </pre>
              </div>
            </div>
          </Reveal>
        </div>
        <Reveal delay={2} className="mt-8">
          <p className="text-muted text-sm leading-relaxed max-w-3xl">
            Sandbox keys return the same shape as production, including the
            failure paths — mismatched name, expired document, and manual review
            all have fixtures you can trigger on demand.
          </p>
        </Reveal>
      </Section>

      {/* Quickstart + endpoints */}
      <Section>
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="Quickstart"
              title="From key to first verified user."
              body="Self-serve from the dashboard. There is no sales call between you and a working integration."
            />
            <Reveal delay={2} className="mt-8">
              <ArrowLink href="/integrations">
                See hosted, QR, and USSD paths
              </ArrowLink>
            </Reveal>
          </div>
          <Reveal delay={1}>
            <div className="card p-6 sm:p-8 bg-white">
              {developersPage.quickstart.map((s, i, arr) => (
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

        <div className="mt-16">
          <Reveal>
            <Eyebrow>Endpoints</Eyebrow>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            {developersPage.endpoints.map((e, i) => (
              <Reveal key={e.path} delay={i % 3} className="h-full">
                <div className="card p-5 h-full bg-white">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="chip rounded-md px-2 py-1 text-xs font-mono font-semibold text-brand">
                      {e.method}
                    </span>
                    <code className="font-mono text-sm text-navy">{e.path}</code>
                  </div>
                  <p className="text-muted text-sm mt-2.5 leading-relaxed">
                    {e.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* API principles */}
      <Section className="bg-white border-y border-borderc">
        <div className="grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="How we treat the API"
              title="An identity API you can depend on for years."
              body="Verification sits in your onboarding critical path. Breaking it quietly is not an option we allow ourselves."
            />
          </div>
          <Reveal delay={1}>
            <div className="card-navy rounded-[20px] p-8">
              <Eyebrow dark>Commitments</Eyebrow>
              <ul className="space-y-3.5 mt-5">
                {developersPage.principles.map((p) => (
                  <CheckItem key={p} dark>
                    {p}
                  </CheckItem>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Build your first verification today."
        body="Sandbox credentials are self-serve. Talk to us when you are ready for production keys."
        primary={{ href: '/get-started', label: 'Get sandbox access' }}
        secondary={{ href: '/contact', label: 'Talk to engineering' }}
      />
    </>
  );
}
