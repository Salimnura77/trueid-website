import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import NetworkArt from '@/components/art/NetworkArt';
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
import { groupsPage } from '@/lib/pages';

export const metadata = {
  title: 'Groups & communities',
  description: groupsPage.body,
};

// Page-specific narrative: how an affiliation check differs from an identity
// check, step by step. Written inline because it is layout copy for this page.
const affiliationFlow = [
  {
    title: 'You already hold a TrueID credential',
    body: 'Affiliation sits on top of identity. We confirm who you are once, then attach group claims to that same credential rather than starting a separate check.',
  },
  {
    title: 'You name the group and consent to the check',
    body: 'You tell us the institution, licensing body, employer, or cooperative. Nothing is queried until you approve that specific check.',
  },
  {
    title: 'We confirm with the body that actually knows',
    body: 'A school confirms enrolment. A licensing council confirms registration. A cooperative confirms membership and standing. The authority is the source, not a document you photograph.',
  },
  {
    title: 'The result becomes a reusable claim',
    body: '"Is an enrolled student" becomes a claim in your wallet, shareable the same way as any other — and re-checked on a schedule so it stops being true when it stops being true.',
  },
];

export default function GroupsPage() {
  return (
    <>
      <PageHero
        eyebrow={groupsPage.eyebrow}
        title={groupsPage.title}
        body={groupsPage.body}
        art={<NetworkArt className="w-full max-w-[440px]" />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Button href="/get-started" size="lg">
            Verify your affiliation
          </Button>
          <Button href="/contact" variant="onDark" size="lg">
            Run a group offer
          </Button>
        </div>
      </PageHero>

      {/* Identity vs affiliation — the distinction the page rests on */}
      <Section>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-12 lg:gap-16">
          <Reveal>
            <Eyebrow>The distinction</Eyebrow>
          </Reveal>
          <div>
            <Reveal>
              <p className="font-display font-extrabold text-navy text-2xl sm:text-[2rem] leading-[1.28] tracking-tight">
                A government ID proves who you are. It does not prove that you
                are a nurse, a student, or a member in good standing.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <p className="text-muted leading-relaxed mt-6">
                So organisations that offer something to a specific community end
                up collecting evidence themselves: a scanned matriculation card,
                a photographed practising licence, a letter from an employer.
                Each of those is a file to store, a file to secure, and a file
                that is out of date the moment it is saved.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p className="text-muted leading-relaxed mt-4">
                Affiliation verification asks the body that already knows, and
                returns an answer instead of a document. The partner learns that
                you are eligible. They do not receive your student record, your
                licence number, or your payslip.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Group types */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Who this covers"
          title="Affiliations we verify at the source."
          body="Each of these is confirmed with the institution or authority that maintains the record — not inferred from a document you upload."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {groupsPage.groups.map((g, i) => (
            <FeatureCard
              key={g.title}
              icon={<Icon name={g.icon} />}
              title={g.title}
              body={g.body}
              delay={i % 3}
            />
          ))}
        </div>
      </Section>

      {/* How it works + partner side */}
      <Section>
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <div>
            <SectionHeader
              eyebrow="How a group check runs"
              title="Four steps, and none of them ask for a document."
            />
            <div className="mt-8">
              {affiliationFlow.map((s, i) => (
                <Reveal key={s.title} delay={i % 3}>
                  <NumberedStep
                    n={i + 1}
                    title={s.title}
                    body={s.body}
                    last={i === affiliationFlow.length - 1}
                  />
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={1}>
            <div className="card-navy rounded-[20px] p-8 lg:p-10">
              <Eyebrow dark>For partners</Eyebrow>
              <h3 className="font-display font-bold text-white text-xl mt-4">
                {groupsPage.forPartners.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mt-3">
                {groupsPage.forPartners.body}
              </p>
              <ul className="space-y-4 mt-7">
                {groupsPage.forPartners.points.map((p) => (
                  <CheckItem key={p} dark>
                    {p}
                  </CheckItem>
                ))}
              </ul>
              <div className="mt-8 pt-7 border-t border-white/10">
                <p className="text-white/45 text-xs leading-relaxed">
                  Group verification depends on a working agreement with the
                  body that holds the record, so coverage grows institution by
                  institution. If the group you serve is not yet reachable, tell
                  us which one and we will confirm whether it is in scope.
                </p>
                <div className="mt-5">
                  <ArrowLink href="/contact" dark>
                    Ask about a specific group
                  </ArrowLink>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Extend a benefit without collecting a filing cabinet."
        body="Confirm eligibility as a yes or no, and let the record stay with the institution that owns it."
        primary={{ href: '/get-started', label: 'Verify your affiliation' }}
        secondary={{ href: '/contact', label: 'Talk to us' }}
      />
    </>
  );
}
