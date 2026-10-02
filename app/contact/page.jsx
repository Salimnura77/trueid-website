import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import {
  Section,
  SectionHeader,
  PageHero,
  IconTile,
  CTASection,
} from '@/components/ui';
import { contactPage } from '@/lib/pages';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Contact',
  description:
    'Partnership enquiries, security disclosure, support, and press. Reach the TrueID team directly.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        body={contactPage.body}
      />

      {/* Direct details first — the thing most visitors came for */}
      <Section>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-12 lg:gap-16">
          <div>
            <Reveal>
              <h2 className="font-display font-extrabold text-2xl text-navy tracking-tight">
                Reach us directly
              </h2>
              <p className="text-muted mt-3 leading-relaxed">
                We are a small team, so these reach real people rather than a
                ticket queue.
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              <Reveal delay={1}>
                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <IconTile size="sm">
                      <Icon name="clipboard" size={18} />
                    </IconTile>
                    <div>
                      <p className="text-muted text-xs uppercase tracking-wide font-semibold">
                        Email
                      </p>
                      <a
                        href={`mailto:${site.email}`}
                        className="font-semibold text-navy hover:text-brand transition focus-ring rounded break-all"
                      >
                        {site.email}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={2}>
                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <IconTile size="sm">
                      <Icon name="phone" size={18} />
                    </IconTile>
                    <div>
                      <p className="text-muted text-xs uppercase tracking-wide font-semibold">
                        Phone
                      </p>
                      <a
                        href={`tel:${site.phone.replace(/\s/g, '')}`}
                        className="font-semibold text-navy hover:text-brand transition focus-ring rounded"
                      >
                        {site.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* What to write about, so mail lands in the right place */}
          <div>
            <Reveal>
              <h2 className="font-display font-extrabold text-2xl text-navy tracking-tight">
                What are you writing about?
              </h2>
              <p className="text-muted mt-3 leading-relaxed">
                Name the area in your subject line and it reaches the right
                person faster.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {contactPage.routes.map((r, i) => (
                <Reveal key={r.title} delay={i % 3} className="h-full">
                  <div className="chip rounded-2xl p-5 h-full">
                    <IconTile size="sm">
                      <Icon name={r.icon} size={18} />
                    </IconTile>
                    <h3 className="font-display font-bold text-navy mt-3.5">
                      {r.title}
                    </h3>
                    <p className="text-muted text-sm mt-1.5 leading-relaxed">
                      {r.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Security disclosure gets its own callout — it matters more than a grid cell */}
      <Section tight className="bg-white border-y border-borderc">
        <Reveal>
          <div className="card-navy rounded-[20px] p-8 lg:p-10">
            <div className="max-w-3xl">
              <IconTile dark>
                <Icon name="shield" color="#42A5F5" />
              </IconTile>
              <h2 className="font-display font-extrabold text-2xl text-white mt-5 tracking-tight">
                Found a vulnerability?
              </h2>
              <p className="text-white/65 mt-3 leading-relaxed">
                Report it to us before disclosing it publicly and we will
                acknowledge within two business days, keep you updated while we
                fix it, and credit you if you want the credit. We will not pursue
                legal action against good-faith research that avoids privacy
                violations and service disruption.
              </p>
              <p className="mt-6">
                <a
                  href={`mailto:${site.email}?subject=Security%20disclosure`}
                  className="inline-flex items-center gap-2 font-semibold text-brand-2 hover:text-white transition focus-ring rounded break-all"
                >
                  {site.email}
                </a>
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <CTASection
        title="Looking for something specific?"
        body="The help centre covers verification, wallet, and consent questions. Partner integration details live in the developer docs."
        primary={{ href: '/help', label: 'Visit help centre' }}
        secondary={{ href: '/developers', label: 'Developer docs' }}
      />
    </>
  );
}
