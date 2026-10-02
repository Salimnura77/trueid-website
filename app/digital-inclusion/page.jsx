import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import VerifyArt from '@/components/art/VerifyArt';
import {
  PageHero,
  Section,
  SectionHeader,
  FeatureCard,
  CheckItem,
  Button,
  ArrowLink,
  Eyebrow,
  IconTile,
  CTASection,
} from '@/components/ui';
import { inclusionPage } from '@/lib/pages';

export const metadata = {
  title: 'Digital inclusion',
  description: inclusionPage.body,
};

// The four access paths, expanded with the reason each one exists. The paths
// themselves mirror the "No Nigerian Left Unverified" commitment on /about;
// the "why" is page-specific narrative, so it lives here.
const paths = [
  {
    icon: 'phone',
    title: 'Self-serve online',
    body: 'Verify in minutes from any smartphone or browser, using a document you already hold.',
    why: 'This is the cheapest path to run and the fastest to finish, so it carries the people it can carry. It is the default — not the only option — because designing for it alone is what excludes everyone else.',
  },
  {
    icon: 'signal',
    title: 'USSD & feature phone',
    body: 'No data, no app, no problem. Register and share your credential with a short code from any handset.',
    why: 'Feature phones remain common outside major cities, and a data plan is a recurring cost even where coverage exists. A short code works on the handset someone already owns, with no download and no airtime spent on data.',
  },
  {
    icon: 'video',
    title: 'Assisted video review',
    body: 'When a document is damaged, stale, or mismatched, a trained reviewer completes verification with you — in your language.',
    why: 'Automated checks fail on the documents real life produces: a laminated card that has faded, a name spelled differently across two IDs, a slip printed years ago. A machine rejection should route to a person, not to a dead end.',
  },
  {
    icon: 'building',
    title: 'In person, near you',
    body: 'Verify face to face through bank branches, agent networks, and enrolment centres for those who cannot or would rather not go online.',
    why: 'Some people have no phone of their own, and some would simply rather be walked through it by someone in the room. Using agent networks and branches that already exist keeps the nearest access point from being in another state.',
  },
];

export default function DigitalInclusionPage() {
  return (
    <>
      <PageHero
        eyebrow={inclusionPage.eyebrow}
        title={inclusionPage.title}
        body={inclusionPage.body}
        art={<VerifyArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/get-started" size="lg">
            Start verifying
          </Button>
          <Button href="/about" variant="onDark" size="lg">
            Why we build this way
          </Button>
        </div>
      </PageHero>

      {/* Four access paths — the substance of the page */}
      <Section>
        <SectionHeader
          eyebrow="No Nigerian Left Unverified"
          title="Four ways in. Every one of them finishes."
          body="Equity means treating everyone consistently while recognising that people do not all start from the same place. So there is no single front door — there are four, and they issue the same credential."
        />
        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {paths.map((p, i) => (
            <Reveal key={p.title} delay={i % 3} className="h-full">
              <div className="card p-7 h-full">
                <IconTile>
                  <Icon name={p.icon} />
                </IconTile>
                <h3 className="font-display font-bold text-navy text-lg mt-4">
                  {p.title}
                </h3>
                <p className="text-muted text-sm mt-2 leading-relaxed">{p.body}</p>
                <div className="mt-5 pt-5 border-t border-borderc">
                  <Eyebrow className="text-xs">Why it exists</Eyebrow>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{p.why}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* The specific barriers each path is answering */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="What actually blocks people"
          title="The barriers are specific, so the answers are too."
          body="None of these are edge cases. Each one is a reason a verification flow built for one kind of user quietly fails for a large number of Nigerians."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {inclusionPage.barriers.map((b, i) => (
            <FeatureCard
              key={b.title}
              icon={<Icon name={b.icon} />}
              title={b.title}
              body={b.body}
              delay={i % 3}
            />
          ))}
        </div>
      </Section>

      {/* Commitments + market context */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <SectionHeader
              eyebrow="What we commit to"
              title="Rules we hold ourselves to, not aspirations."
              body="These constrain what we are allowed to ship. If a feature cannot satisfy them, it is not finished."
            />
            <ul className="space-y-4 mt-8">
              {inclusionPage.commitments.map((c) => (
                <CheckItem key={c}>{c}</CheckItem>
              ))}
            </ul>
            <div className="mt-8">
              <ArrowLink href="/how-it-works">See the verification flow</ArrowLink>
            </div>
          </div>

          <Reveal delay={1}>
            <div className="card-navy rounded-[20px] p-8 lg:p-10">
              <Eyebrow dark>Market context</Eyebrow>
              <p className="text-white/70 text-sm leading-relaxed mt-4">
                Roughly 40 million Nigerian adults sit outside the formal
                financial system — many not for want of income, but for want of
                provable identity in a form an institution will accept.
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-4">
                That figure is Nigeria market context, not a TrueID metric. We
                have no adoption numbers to report yet. What we can state is the
                design consequence: a smartphone-only product would leave most
                of those adults exactly where they are, which is why the
                non-smartphone paths are built first-class rather than promised
                later.
              </p>
              <p className="text-white/45 text-xs leading-relaxed mt-6 pt-6 border-t border-white/10">
                Verification is free for individuals, permanently. Partners pay
                per check, so cost scales with use instead of gatekeeping
                access.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Identity should reach everyone, not just the connected."
        body="Start with the path that fits the phone in your hand — or the branch down the road."
        primary={{ href: '/get-started', label: 'Get verified' }}
        secondary={{ href: '/contact', label: 'Partner with us' }}
      />
    </>
  );
}
