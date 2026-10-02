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
import { solutionSteps } from '@/lib/content';
import { solutionPage } from '@/lib/pages';

export const metadata = {
  title: 'Our solution',
  description: solutionPage.body,
};

export default function SolutionPage() {
  return (
    <>
      <PageHero
        eyebrow={solutionPage.eyebrow}
        title={solutionPage.title}
        body={solutionPage.body}
        art={<VerifyArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/get-started" size="lg">
            Get verified
          </Button>
          <Button href="/how-it-works" variant="onDark" size="lg">
            See the flow
          </Button>
        </div>
      </PageHero>

      {/* Four steps — the core of the original SOLUTION section */}
      <Section>
        <SectionHeader
          eyebrow="The short version"
          title="Four steps, once."
          body="Everything after this is a consent prompt that takes seconds."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {solutionSteps.map((s, i) => (
            <Reveal key={s.title} delay={i} className="h-full">
              <div className="card p-7 h-full">
                <span className="font-display font-extrabold text-4xl grad-text">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display font-bold text-navy text-lg mt-4">
                  {s.title}
                </h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* What makes it different */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Why it works"
          title="A credential beats another copy of your documents."
          body="The difference is not a better upload form. It is that the documents stop travelling at all."
        />
        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {solutionPage.pillars.map((p, i) => (
            <FeatureCard
              key={p.title}
              icon={<Icon name={p.icon} />}
              title={p.title}
              body={p.body}
              delay={i % 2}
            />
          ))}
        </div>
      </Section>

      {/* Before / after */}
      <Section>
        <SectionHeader
          eyebrow="The change"
          title="Same person, same documents, different outcome."
          center
        />
        <div className="grid md:grid-cols-2 gap-5 mt-14">
          <Reveal className="h-full">
            <div className="card p-8 h-full bg-white">
              <Eyebrow className="!text-muted">Without TrueID</Eyebrow>
              <ul className="space-y-3.5 mt-5">
                {solutionPage.before.map((b) => (
                  <li key={b} className="flex gap-3 text-sm text-muted leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-muted/40"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={1} className="h-full">
            <div className="card-navy rounded-[20px] p-8 h-full">
              <Eyebrow dark>With TrueID</Eyebrow>
              <ul className="space-y-3.5 mt-5">
                {solutionPage.after.map((a) => (
                  <CheckItem key={a} dark>
                    {a}
                  </CheckItem>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Outcomes per audience */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Who benefits"
          title="The same credential, three different wins."
        />
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {solutionPage.outcomes.map((o, i) => (
            <Reveal key={o.title} delay={i} className="h-full">
              <div className="card p-7 h-full flex flex-col">
                <h3 className="font-display font-bold text-navy text-lg">{o.title}</h3>
                <p className="text-muted text-sm mt-2.5 leading-relaxed flex-1">
                  {o.body}
                </p>
                <div className="mt-6">
                  <ArrowLink href={o.href}>Read more</ArrowLink>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Full 8-step flow teaser */}
      <Section>
        <div className="grid lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Under the hood"
              title="What actually happens when you verify."
              body="The eight steps between your first document and a credential you can reuse forever."
            />
            <Reveal delay={2} className="mt-8">
              <ArrowLink href="/how-it-works">
                See channels and assurance tiers
              </ArrowLink>
            </Reveal>
          </div>
          <Reveal delay={1}>
            <div className="card p-6 sm:p-8 bg-white">
              {[
                { title: 'Register', body: 'App, web, or USSD — whichever fits your access.' },
                { title: 'Verify against source', body: 'Real-time checks against government APIs.' },
                { title: 'Credential issued', body: 'Signed, encrypted, and yours alone.' },
                { title: 'Share with consent', body: 'One scan, one approval, one logged receipt.' },
              ].map((s, i, arr) => (
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
      </Section>

      <CTASection />
    </>
  );
}
