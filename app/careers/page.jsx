import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import {
  Section,
  SectionHeader,
  PageHero,
  IconTile,
  FeatureCard,
  CTASection,
  ArrowLink,
} from '@/components/ui';
import { careersPage } from '@/lib/pages';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Careers',
  description:
    'A small team building identity infrastructure for 220 million people. Engineering, compliance, partnerships, and operations.',
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow={careersPage.eyebrow}
        title={careersPage.title}
        body={careersPage.body}
      />

      {/* How we work — set expectations before listing areas */}
      <Section>
        <SectionHeader
          eyebrow="How we work"
          title="What working here actually means."
          body="Three things that are true of this team, stated plainly so you can decide whether they appeal to you."
        />
        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {careersPage.values.map((v, i) => (
            <Reveal key={v.title} delay={i} className="h-full">
              <div className="card p-7 h-full">
                <h3 className="font-display font-bold text-navy text-lg">
                  {v.title}
                </h3>
                <p className="text-muted text-sm mt-2.5 leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Areas we hire into */}
      <Section className="bg-white border-y border-borderc">
        <SectionHeader
          eyebrow="Where we need people"
          title="Four areas, all of them load-bearing."
        />
        <div className="grid sm:grid-cols-2 gap-5 mt-12">
          {careersPage.areas.map((a, i) => (
            <Reveal key={a.title} delay={i % 3} className="h-full">
              <div className="card p-7 h-full">
                <h3 className="font-display font-bold text-navy text-lg">
                  {a.title}
                </h3>
                <p className="text-muted text-sm mt-2.5 leading-relaxed">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Open roles — honest empty state rather than invented listings */}
      <Section>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <IconTile>
              <Icon name="users" />
            </IconTile>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-navy mt-5 tracking-tight">
              Open roles
            </h2>
            <p className="text-muted mt-4 leading-relaxed">
              {careersPage.noRolesMessage}
            </p>
            <p className="mt-8">
              <a
                href={`mailto:${site.email}?subject=Working%20at%20TrueID`}
                className="inline-flex items-center gap-2 font-semibold text-brand hover:text-navy transition focus-ring rounded"
              >
                {site.email}
              </a>
            </p>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Think you belong here?"
        body="Tell us which area fits you and what you would want to own. A short, specific note goes further than a formal application."
        primary={{ href: '/contact', label: 'Get in touch' }}
        secondary={{ href: '/about', label: 'Read our story' }}
      />
    </>
  );
}
