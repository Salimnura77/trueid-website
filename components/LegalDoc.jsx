import Reveal from './Reveal';
import { Section, PageHero } from './ui';
import { legalNotice } from '@/lib/legal';

/**
 * Shared renderer for /privacy and /terms. Both documents have the same
 * shape (intro + titled sections of bullet points), so the layout lives
 * here and only the content differs.
 *
 * The pre-launch notice is rendered by this component rather than by each
 * page, so neither document can ship without it.
 */
export default function LegalDoc({ doc }) {
  return (
    <>
      <PageHero eyebrow={doc.eyebrow} title={doc.title} body={doc.body} />

      <Section>
        <div className="max-w-3xl mx-auto">
          {/* Pre-launch disclaimer — deliberately above the content, not buried */}
          <Reveal>
            <div className="card border-brand/30 bg-brand/[0.04] p-6">
              <p className="text-navy text-sm leading-relaxed">{legalNotice}</p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <p className="text-muted text-xs mt-6 font-mono">
              Last updated {doc.updated}
            </p>
          </Reveal>

          <div className="mt-12 space-y-12">
            {doc.sections.map((s, i) => (
              <Reveal key={s.title} delay={i % 3}>
                <section>
                  <h2 className="font-display font-extrabold text-navy text-xl sm:text-2xl tracking-tight">
                    {s.title}
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-brand shrink-0"
                        />
                        <span className="text-muted text-[15px] leading-relaxed">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
