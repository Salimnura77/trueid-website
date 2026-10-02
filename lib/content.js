// Page content extracted from the original single-file landing page,
// plus new content for the pages split out of it.
// Copy lives here so pages stay layout-only and nothing is duplicated.

/* ------------------------------------------------------------------ *
 * Problem / solution
 * ------------------------------------------------------------------ */

export const problems = [
  {
    icon: 'repeat',
    title: 'Repeated KYC',
    body: 'The same documents, re-submitted at every bank, lender, and telco.',
  },
  {
    icon: 'clock',
    title: 'Slow onboarding',
    body: 'Days of manual review before a customer can transact.',
  },
  {
    icon: 'shield',
    title: 'Identity fraud',
    body: 'Forged and recycled documents slip through disconnected checks.',
  },
  {
    icon: 'wallet',
    title: 'Financial exclusion',
    body: 'Millions of adults locked out for want of provable identity.',
  },
  {
    icon: 'coins',
    title: 'Duplicated cost',
    body: 'Every provider pays again to verify the same person.',
  },
  {
    icon: 'lock',
    title: 'No user control',
    body: 'Personal data scattered across systems the owner cannot see.',
  },
];

export const solutionSteps = [
  {
    title: 'Verify once',
    body: "Using a trusted government ID — NIN, BVN, Passport, or more.",
  },
  {
    title: 'Receive your TrueID credential',
    body: 'A reusable, encrypted identity credential issued to you alone.',
  },
  {
    title: 'Store it in your wallet',
    body: 'Held securely on-device and backed by encrypted cloud storage.',
  },
  {
    title: 'Share anywhere, instantly',
    body: 'Via QR code, link, or API — verified in seconds, every time.',
  },
];

/* ------------------------------------------------------------------ *
 * Features
 * ------------------------------------------------------------------ */

export const features = [
  {
    icon: 'badge',
    title: 'One-time verification',
    body: 'Verify once with any supported document — reuse the credential for life, across every partner.',
  },
  {
    icon: 'wallet',
    title: 'Digital wallet',
    body: 'Store credentials, send and receive money, and manage every verification from one secure app.',
    href: '/wallet',
  },
  {
    icon: 'qr',
    title: 'QR verification',
    body: 'Scan-and-confirm identity in seconds, no paperwork.',
  },
  {
    icon: 'code',
    title: 'API integration',
    body: 'Drop TrueID verification into any product with a few lines of code.',
    href: '/developers',
  },
  {
    icon: 'eye',
    title: 'Privacy controls',
    body: 'Selective disclosure means you share only what is asked for — nothing more.',
    href: '/privacy-consent',
  },
  {
    icon: 'signal',
    title: 'Offline / USSD support',
    body: 'Feature-phone users verify and transact without a smartphone or data.',
    href: '/digital-inclusion',
  },
  {
    icon: 'brain',
    title: 'AI fraud detection',
    body: 'Behavioural and document signals flag anomalies before they become losses.',
  },
  {
    icon: 'fingerprint',
    title: 'Biometric authentication',
    body: 'Face and fingerprint checks bind the credential to its rightful owner.',
  },
  {
    icon: 'filter',
    title: 'Selective disclosure',
    body: 'Share a single verified fact — "over 18", "KYC passed" — without exposing full documents.',
  },
];

/* ------------------------------------------------------------------ *
 * How it works — the 8-step flow
 * ------------------------------------------------------------------ */

export const flowSteps = [
  { title: 'Register', body: 'App, web, or USSD — whichever fits your access.' },
  { title: 'Upload IDs', body: 'NIN, BVN, or any supported document.' },
  { title: 'Verification', body: 'Real-time checks against government APIs.' },
  { title: 'Encryption', body: 'Secure hashing locks your data down.' },
  { title: 'Credential issued', body: 'Your TrueID is generated and signed.' },
  { title: 'Wallet created', body: 'Stored on-device and in encrypted backup.' },
  { title: 'Share QR', body: 'Consent-based sharing, one scan at a time.' },
  { title: 'Instant verification', body: 'Any partner confirms identity in seconds.' },
];

/* ------------------------------------------------------------------ *
 * Audiences
 * ------------------------------------------------------------------ */

export const audiences = [
  {
    slug: 'individuals',
    label: 'Individuals',
    title: 'Your identity, in your pocket — and under your control.',
    body: 'One verification unlocks banking, government services, healthcare, and telecom. No repeat paperwork, no data you did not agree to share.',
    benefits: [
      'Verify once, use everywhere',
      'Skip repeat KYC at every provider',
      'Full control over what is shared',
      'Free verification, always',
    ],
  },
  {
    slug: 'businesses',
    label: 'Businesses',
    title: 'Onboard verified customers in seconds, not days.',
    body: 'Replace manual document review with a reusable credential your customers already hold. Lower cost per check, fewer drop-offs, less fraud.',
    benefits: [
      'Faster, cheaper onboarding',
      'Fraud-resistant KYC pipeline',
      'Drop-in API and SDKs',
      'Usage-based pricing',
    ],
  },
  {
    slug: 'government',
    label: 'Government',
    title: 'Deliver services to the right citizen, every time.',
    body: 'Interoperable, auditable identity assurance for benefits, subsidies, and public services — with consent logged at every step.',
    benefits: [
      'Efficient social service delivery',
      'Reduced identity fraud nationwide',
      'Interoperable with NIMC, NIBSS, FRSC',
      'Auditable, consent-based access',
    ],
  },
];

/* ------------------------------------------------------------------ *
 * Security
 * ------------------------------------------------------------------ */

export const securityPillars = [
  {
    icon: 'lock',
    title: 'Encryption',
    body: 'Data encrypted at rest and in transit with industry-standard cryptography.',
  },
  {
    icon: 'check',
    title: 'User consent',
    body: 'Nothing is shared without an explicit, logged approval from you.',
  },
  {
    icon: 'fingerprint',
    title: 'Biometric security',
    body: 'Face and fingerprint checks bind the credential to its owner.',
  },
  {
    icon: 'shield',
    title: 'NDPR compliance',
    body: "Built to Nigeria's data protection regulation from day one.",
  },
];

/* ------------------------------------------------------------------ *
 * Developer platform
 * ------------------------------------------------------------------ */

export const devCapabilities = [
  { title: 'REST APIs', body: 'Simple, versioned endpoints' },
  { title: 'SDKs', body: 'Native libraries, major stacks' },
  { title: 'Webhooks', body: 'Real-time verification events' },
  { title: 'Docs & examples', body: 'Copy-paste quickstarts' },
];

export const codeSample = `curl -X POST https://api.trueid.me/v1/verify \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "credential_id": "tid_8fK2mQ",
    "attributes": ["full_name", "date_of_birth", "kyc_status"]
  }'`;

export const codeResponse = `{
  "verified": true,
  "matched_source": "NIMC",
  "elapsed_ms": 1180,
  "attributes": {
    "full_name": "Amina Okafor",
    "date_of_birth": "1994-03-12",
    "kyc_status": "passed"
  },
  "consent": {
    "granted_at": "2026-07-29T09:14:22Z",
    "scope": "one_time"
  }
}`;

/* ------------------------------------------------------------------ *
 * Testimonials
 * ------------------------------------------------------------------ */

export const testimonials = [
  {
    quote:
      'We cut onboarding from three days to under two minutes. The drop-off rate on our sign-up funnel fell by half.',
    name: 'Adaeze Nwosu',
    role: 'Head of Product, tier-1 bank',
  },
  {
    quote:
      'The API was live in our sandbox the same afternoon we got credentials. Documentation did what it said it would.',
    name: 'Tunde Bakare',
    role: 'Engineering Lead, fintech',
  },
  {
    quote:
      'Consent logging is what sold our compliance team. Every share is attributable and auditable.',
    name: 'Fatima Yakubu',
    role: 'Compliance Director, insurance',
  },
];

/* ------------------------------------------------------------------ *
 * FAQ
 * ------------------------------------------------------------------ */

export const faqs = [
  {
    q: 'What documents can I verify with?',
    a: "Any of five trusted Nigerian credentials: your NIN, BVN, international passport, driver's license, or permanent voter's card. One is enough to get started.",
  },
  {
    q: 'Is TrueID free for individuals?',
    a: 'Yes. Verification and your credential are free for individuals, permanently. Partners pay usage-based fees for the verifications they request.',
  },
  {
    q: 'Who can see my data?',
    a: 'Only the parties you explicitly approve, and only the specific attributes they request. Every share is logged, and you can revoke standing access at any time from your wallet.',
  },
  {
    q: 'What if I do not have a smartphone?',
    a: 'You can register and verify over USSD from any feature phone, and share your credential with a short code instead of a QR scan.',
  },
  {
    q: 'How is this different from just using my NIN?',
    a: 'Your NIN is a number issued by government. TrueID is a reusable, cryptographically signed credential built on top of it — so a partner can confirm a fact about you without ever handling your underlying documents.',
  },
  {
    q: 'Is TrueID affiliated with NIMC or the CBN?',
    a: 'TrueID verifies against government sources and is built to align with CBN KYC guidance and the NDPR. It is an independent platform, not a government agency.',
  },
  {
    q: 'What happens if I lose my phone?',
    a: 'Your credential is backed up in encrypted cloud storage. Re-authenticate with your biometrics on a new device to restore it; the old device loses access immediately.',
  },
  {
    q: 'How long does verification take?',
    a: 'Real-time checks against government APIs typically complete in under two seconds. Documents needing manual review are resolved within one business day.',
  },
];
