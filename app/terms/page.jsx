import LegalDoc from '@/components/LegalDoc';
import { CTASection } from '@/components/ui';
import { termsOfService } from '@/lib/legal';

export const metadata = {
  title: 'Terms',
  description:
    'What you can expect from TrueID, what we need from you, and what happens when something goes wrong.',
};

export default function TermsPage() {
  return (
    <>
      <LegalDoc doc={termsOfService} />

      <CTASection
        title="Something here unclear?"
        body="If a term does not read plainly, that is our problem to fix. Tell us which one."
        primary={{ href: '/contact', label: 'Contact us' }}
        secondary={{ href: '/privacy', label: 'Read the privacy policy' }}
      />
    </>
  );
}
