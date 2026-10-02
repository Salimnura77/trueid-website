import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import NetworkArt from '@/components/art/NetworkArt';
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
import { features } from '@/lib/content';
import { featureGroups } from '@/lib/pages';

export const metadata = {
  title: 'Features',
  description:
    'Nine capabilities that turn one source-verified identity check into a credential you reuse for life — verification, control, and reach.',
};

// Resolve each group's `picks` (feature titles) against the feature list so
// copy stays in lib/content.js and grouping stays in lib/pages.js.
const grouped = featureGroups.map((g) => ({
  ...g,
  items: g.picks
    .map((title) => features.find((f) => f.title === title))
    .filter(Boolean),
}));

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="Nine capabilities, one credential."
        body="Everything below exists to serve a single promise: verify once against the source, then never hand over your documents again."
        art={<NetworkArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/get-started" size="lg">
            Get verified
          </Button>
          <Button href="/developers" variant="onDark" size="lg">
            Read the API docs
          </Button>
        </div>
      </PageHero>

      {/* Themed clusters rather than one flat grid — each group answers a
          different question about the credential. */}
      {grouped.map((group, gi) => (
        <Section
          key={group.heading}
          className={gi % 2 === 1 ? 'bg-white border-y border-borderc' : ''}
        >
          <SectionHeader
            eyebrow={`0${gi + 1} — ${group.heading}`}
            title={group.heading}
            body={group.body}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {group.items.map((f, i) => (
              <FeatureCard
                key={f.title}
                icon={<Icon name={f.icon} />}
                title={f.title}
                body={f.body}
                href={f.href}
                delay={i % 3}
              />
            ))}
          </div>
        </Section>
      ))}

      {/* What the feature list adds up to */}
      <Section>
        <div className="grid lg:grid-cols-[1fr,1.1fr] gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeader
              eyebrow="The point of all of it"
              title="Features are only useful if the tenth check is free."
              body="A verification product that is impressive once and painful again is just a nicer upload form. These capabilities are chosen so reuse costs nothing."
            />
            <Reveal delay={2} className="mt-8">
              <ArrowLink href="/how-it-works">
                See the full eight-step flow
              </ArrowLink>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <div className="card-navy rounded-[20px] p-8">
              <Eyebrow dark>What that buys you</Eyebrow>
              <ul className="space-y-3.5 mt-5">
                <CheckItem dark>
                  One check against NIMC, NIBSS, FRSC, or INEC — not one per
                  provider
                </CheckItem>
                <CheckItem dark>
                  Partners receive a signed claim, so your document images stay
                  in your wallet
                </CheckItem>
                <CheckItem dark>
                  A consent receipt for every share, readable and revocable by
                  you
                </CheckItem>
                <CheckItem dark>
                  A USSD path for every capability, because a smartphone
                  requirement is an exclusion requirement
                </CheckItem>
                <CheckItem dark>
                  Assurance tiers mapped to CBN tiered KYC, so partners request
                  the level their product actually needs
                </CheckItem>
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection />
    </>
  );
}
