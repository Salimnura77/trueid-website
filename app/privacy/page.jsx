import LegalDoc from '@/components/LegalDoc';
import { CTASection, Section, SectionHeader, ArrowLink } from '@/components/ui';
import Reveal from '@/components/Reveal';
import { privacyPolicy } from '@/lib/legal';

export const metadata = {
  title: 'Privacy',
  description:
    'What TrueID collects, what we refuse to do with it, your rights under the NDPR, and how long we keep anything.',
};

export default function PrivacyPage() {
  return (
    <>
      <LegalDoc doc={privacyPolicy} />

      <Section tight className="bg-white border-y border-borderc">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Going deeper"
            title="How consent actually works in the product."
            body="This page states the policy. The consent model page shows the mechanics — what a receipt contains, and what a partner receives when you approve a request."
          />
          <Reveal delay={1} className="mt-7">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <ArrowLink href="/privacy-consent">The consent model</ArrowLink>
              <ArrowLink href="/security">Security architecture</ArrowLink>
              <ArrowLink href="/trust-center">Trust center</ArrowLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="Questions about how we handle your data?"
        body="Ask us directly. We would rather answer it once publicly than privately ten times."
        primary={{ href: '/contact', label: 'Contact us' }}
        secondary={{ href: '/faq', label: 'Read the FAQ' }}
      />
    </>
  );
}
