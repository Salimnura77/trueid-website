// Content for the pages split out of the original landing page, plus the
// new id.me-inspired routes. Pages stay layout-only; all copy lives here.
//
// FACTUAL DISCIPLINE: TrueID is pre-launch. Nothing here asserts adoption
// numbers, partner names, certifications held, or press coverage. Partner
// categories are described generically ("tier-1 banks") rather than named,
// and forward-looking items are labelled as such.

/* ------------------------------------------------------------------ *
 * /solution
 * ------------------------------------------------------------------ */

export const solutionPage = {
  eyebrow: 'Our solution',
  title: 'Verify once. Carry it everywhere.',
  body: 'TrueID turns a single, source-verified identity check into a reusable credential that belongs to you — encrypted, portable, and shareable only with your consent.',
  pillars: [
    {
      icon: 'badge',
      title: 'A credential, not a copy',
      body: 'Instead of another folder of scanned documents, you receive a cryptographically signed credential. Partners verify the signature, not your paperwork.',
    },
    {
      icon: 'filter',
      title: 'Answers, not documents',
      body: 'A lender asking "is this person over 18 and KYC-passed?" gets exactly that answer. Your date of birth and document images never leave your wallet.',
    },
    {
      icon: 'refresh',
      title: 'Reusable by design',
      body: 'The tenth verification costs the same effort as the first: zero. Onboarding at a new partner becomes a consent prompt, not a queue.',
    },
    {
      icon: 'globe',
      title: 'Interoperable with what exists',
      body: 'We verify against the sources institutions already trust — NIMC, NIBSS, NIS, FRSC, INEC — rather than asking Nigeria to adopt a parallel identity.',
    },
  ],
  before: [
    'Fresh document upload at every provider',
    'Days of manual review before first transaction',
    'Each institution stores its own copy of your ID',
    'Cost of verification paid again, per provider',
    'No record of who holds what about you',
  ],
  after: [
    'One verification against the issuing source',
    'Seconds to onboard at any partner in the network',
    'Documents stay with you; partners get attestations',
    'Verification cost falls with every reuse',
    'A consent log you can read and revoke from',
  ],
  outcomes: [
    {
      title: 'For the person',
      body: 'Identity stops being an obstacle. One check, then service access on demand — including from a feature phone.',
      href: '/individuals',
    },
    {
      title: 'For the institution',
      body: 'Lower cost per verified customer, fewer abandoned sign-ups, and a fraud posture that improves as the network grows.',
      href: '/businesses',
    },
    {
      title: 'For the country',
      body: 'A trust layer that makes financial inclusion, subsidy targeting, and public service delivery measurable instead of hopeful.',
      href: '/government',
    },
  ],
};

/* ------------------------------------------------------------------ *
 * /features — grouping for the full feature list
 * ------------------------------------------------------------------ */

export const featureGroups = [
  {
    heading: 'Verification',
    body: 'Everything needed to establish identity once, against a source that institutions already trust.',
    picks: ['One-time verification', 'QR verification', 'Biometric authentication', 'AI fraud detection'],
  },
  {
    heading: 'Control',
    body: 'The credential belongs to the person. These are the controls that make that claim real.',
    picks: ['Privacy controls', 'Selective disclosure', 'Digital wallet'],
  },
  {
    heading: 'Reach',
    body: 'Identity infrastructure that assumes a smartphone excludes the people who need it most.',
    picks: ['Offline / USSD support', 'API integration'],
  },
];

/* ------------------------------------------------------------------ *
 * /security
 * ------------------------------------------------------------------ */

export const securityPage = {
  eyebrow: 'Security',
  title: 'Privacy by design. Trust by default.',
  body: 'Identity data is the most sensitive data a person has. Our architecture assumes that any single layer can fail, and that no operator should be able to read your documents.',
  layers: [
    {
      icon: 'lock',
      title: 'Encryption everywhere',
      body: 'TLS 1.3 in transit; AES-256 at rest. Document images and biometric templates are encrypted with per-user keys so a database copy alone reveals nothing.',
    },
    {
      icon: 'key',
      title: 'Key management',
      body: 'Signing keys live in a hardware security module and never enter application memory. Credential signatures are verifiable without contacting us.',
    },
    {
      icon: 'fingerprint',
      title: 'Binding to the person',
      body: 'Liveness-checked face matching and fingerprint verification tie the credential to its owner, so a stolen phone is not a stolen identity.',
    },
    {
      icon: 'eye',
      title: 'Minimum disclosure',
      body: 'Attribute-level sharing is the default path, not an advanced setting. Partners request the narrowest claim that answers their question.',
    },
    {
      icon: 'clipboard',
      title: 'Consent receipts',
      body: 'Every share writes an append-only record: who asked, what they received, when, and under what scope. You can read and revoke from your wallet.',
    },
    {
      icon: 'brain',
      title: 'Fraud detection',
      body: 'Document tampering signals, device reputation, and velocity checks run on every request, with anomalies escalated to human review.',
    },
  ],
  practices: [
    'Least-privilege access with break-glass auditing for every production action',
    'Data retention limits, with deletion propagated to backups on a published schedule',
    'Independent penetration testing before general availability',
    'Coordinated vulnerability disclosure with a published contact and response window',
    'Incident notification commitments aligned to NDPR obligations',
  ],
  note: 'This page describes the security architecture as designed and implemented. Where an external certification is in progress rather than held, the trust center says so explicitly.',
};

/* ------------------------------------------------------------------ *
 * /developers
 * ------------------------------------------------------------------ */

export const developersPage = {
  eyebrow: 'Developer platform',
  title: 'Ship verification in an afternoon.',
  body: 'A REST API, server SDKs, and webhooks — with sandbox credentials that behave like production and documentation written by the people who built the endpoints.',
  quickstart: [
    { title: 'Create a sandbox key', body: 'Self-serve from the dashboard. No sales call to start building.' },
    { title: 'Request a verification', body: 'POST the credential ID and the attributes you actually need.' },
    { title: 'Handle the consent prompt', body: 'The user approves in their wallet; you receive the result.' },
    { title: 'Subscribe to webhooks', body: 'Get notified on revocation, re-verification, and status changes.' },
  ],
  endpoints: [
    { method: 'POST', path: '/v1/verify', body: 'Request attributes from a credential, subject to user consent' },
    { method: 'GET', path: '/v1/credentials/:id', body: 'Check credential status, assurance tier, and issuance date' },
    { method: 'POST', path: '/v1/sessions', body: 'Start a hosted verification flow and receive a redirect URL' },
    { method: 'GET', path: '/v1/consents', body: 'List active consents your application holds' },
    { method: 'DELETE', path: '/v1/consents/:id', body: 'Release a standing consent your application no longer needs' },
    { method: 'POST', path: '/v1/webhooks', body: 'Register an endpoint for verification and revocation events' },
  ],
  principles: [
    'Versioned endpoints with a published deprecation policy',
    'Idempotency keys on every write, so retries are safe',
    'Errors that name the field and the fix, not just a status code',
    'Sandbox fixtures for every failure path, including manual review',
  ],
};

/* ------------------------------------------------------------------ *
 * /how-it-works — extra detail beyond the 8-step flow
 * ------------------------------------------------------------------ */

export const howItWorksPage = {
  eyebrow: 'How it works',
  title: 'From first document to instant verification.',
  body: 'Eight steps, once. Everything after that is a consent prompt that takes seconds.',
  channels: [
    { icon: 'phone', title: 'App or web', body: 'The full flow on any smartphone or browser, typically under five minutes.' },
    { icon: 'signal', title: 'USSD', body: 'Register and share from any handset with a short code. No data required.' },
    { icon: 'building', title: 'In person', body: 'Agent networks, bank branches, and enrolment centres for assisted verification.' },
  ],
  assurance: [
    {
      tier: 'Tier 1',
      title: 'Basic',
      body: 'A single verified government identifier. Sufficient for low-value wallets and age assertions.',
    },
    {
      tier: 'Tier 2',
      title: 'Verified',
      body: 'Identifier plus liveness-checked biometric match. Meets standard KYC for most financial onboarding.',
    },
    {
      tier: 'Tier 3',
      title: 'Enhanced',
      body: 'Multiple corroborating sources plus address confirmation. For higher-limit accounts and regulated products.',
    },
  ],
  assuranceNote:
    'Tier definitions are TrueID\'s own and are designed against CBN tiered KYC guidance and NIST SP 800-63-3 assurance levels. Individual partners decide which tier their product requires.',
};

/* ------------------------------------------------------------------ *
 * /wallet
 * ------------------------------------------------------------------ */

export const walletPage = {
  eyebrow: 'Digital wallet',
  title: 'Your credentials, your money, your consent log.',
  body: 'One app that holds the credential you earned, shows you every share you have ever approved, and lets you cut off access the moment you change your mind.',
  capabilities: [
    {
      icon: 'badge',
      title: 'Credential vault',
      body: 'Your TrueID credential and any partner-issued attestations, held on-device with encrypted backup for device loss.',
    },
    {
      icon: 'qr',
      title: 'Share by QR or link',
      body: 'Present a QR in person or send a one-time link online. Each share carries a scope and an expiry.',
    },
    {
      icon: 'clipboard',
      title: 'Consent history',
      body: 'A plain-language record of who requested what, when, and whether it was one-time or standing access.',
    },
    {
      icon: 'refresh',
      title: 'Revoke in one tap',
      body: 'Standing access can be withdrawn at any time. Partners are notified by webhook and lose access immediately.',
    },
    {
      icon: 'coins',
      title: 'Send and receive',
      body: 'Verified-identity payments between wallets, so the person on the other side of a transfer is who they claim to be.',
    },
    {
      icon: 'signal',
      title: 'Works without data',
      body: 'Balance checks, transfers, and credential sharing over USSD when you have no connection or no smartphone.',
    },
  ],
  security: [
    'Biometric or PIN unlock on every session',
    'New-device restore requires a fresh liveness check',
    'Old devices lose access the instant a restore completes',
    'Screenshot and screen-record blocking on credential views',
  ],
};

/* ------------------------------------------------------------------ *
 * /groups
 * ------------------------------------------------------------------ */

export const groupsPage = {
  eyebrow: 'Groups & communities',
  title: 'Prove your affiliation, not just your identity.',
  body: 'Plenty of things you need to prove are not on a government ID: that you are a student, a health worker, a cooperative member, a serving officer. Group verification handles those.',
  groups: [
    { icon: 'users', title: 'Students', body: 'Enrolment confirmed with the institution, so student pricing reaches actual students.' },
    { icon: 'heart', title: 'Health workers', body: 'Professional registration verified with the licensing body.' },
    { icon: 'shield', title: 'Serving & retired officers', body: 'Service status confirmed for benefits and dedicated products.' },
    { icon: 'bank', title: 'Cooperative members', body: 'Membership and standing verified for group lending and savings.' },
    { icon: 'building', title: 'Employees', body: 'Employment confirmed for payroll lending and corporate benefits.' },
    { icon: 'globe', title: 'Diaspora', body: 'Nigerian nationality confirmed abroad for remittance and investment products.' },
  ],
  forPartners: {
    title: 'For organisations running a group offer',
    body: 'If you extend a discount, a benefit, or a restricted product to a defined community, TrueID confirms eligibility without you collecting and storing member documents.',
    points: [
      'Eligibility answered as a yes or no, with no personal file to hold',
      'Re-checks on a schedule you set, so lapsed members drop off automatically',
      'One integration covers every group type you support',
    ],
  },
};

/* ------------------------------------------------------------------ *
 * /trust-center
 * ------------------------------------------------------------------ */

export const trustCenterPage = {
  eyebrow: 'Trust center',
  title: 'What we claim, and how you can check it.',
  body: 'A security page is marketing until someone outside the company can verify it. This is where we publish the checkable version — including the parts that are not finished.',
  sections: [
    {
      title: 'Compliance posture',
      items: [
        { label: 'NDPR', value: 'Built to', note: 'Lawful basis, consent records, and data-subject rights implemented' },
        { label: 'CBN tiered KYC', value: 'Aligned', note: 'Assurance tiers mapped to CBN customer due-diligence tiers' },
        { label: 'ISO/IEC 27001', value: 'In progress', note: 'ISMS implemented; external certification not yet complete' },
        { label: 'SOC 2 Type II', value: 'Planned', note: 'Observation window begins ahead of general availability' },
      ],
    },
    {
      title: 'Data practices',
      items: [
        { label: 'Data residency', value: 'Nigeria', note: 'Primary storage and backups held in-country' },
        { label: 'Retention', value: 'Purpose-limited', note: 'Verification artefacts deleted once the credential is issued' },
        { label: 'Sub-processors', value: 'Published', note: 'A current list, with notice before any addition' },
        { label: 'Deletion', value: 'Self-serve', note: 'Account deletion available in-app, propagated to backups' },
      ],
    },
  ],
  rights: [
    { title: 'Access', body: 'Request a copy of everything we hold about you, in a portable format.' },
    { title: 'Correction', body: 'Dispute an attribute that a source got wrong, with our help escalating to the issuer.' },
    { title: 'Deletion', body: 'Close your account and have your data removed on a published schedule.' },
    { title: 'Objection', body: 'Withdraw consent for any processing that is not required to maintain your credential.' },
  ],
  disclosure: {
    title: 'Report a vulnerability',
    body: 'If you have found a security issue, we want to hear about it before anyone else does. Report it and we will acknowledge within two business days, keep you updated, and credit you if you would like.',
  },
};

/* ------------------------------------------------------------------ *
 * /privacy-consent
 * ------------------------------------------------------------------ */

export const privacyPage = {
  eyebrow: 'Privacy & consent',
  title: 'Nothing is shared unless you say so.',
  body: 'Consent is the whole product, not a checkbox in the flow. Here is exactly what a partner sees, what they never see, and what you can take back.',
  model: [
    {
      icon: 'eye',
      title: 'You see the request first',
      body: 'Before anything moves, you see who is asking, which attributes they want, why, and whether it is one-time or standing access.',
    },
    {
      icon: 'filter',
      title: 'They get a claim, not a document',
      body: '"Over 18" instead of a date of birth. "KYC passed" instead of a NIN. Attribute-level sharing is the default.',
    },
    {
      icon: 'clipboard',
      title: 'The share is recorded',
      body: 'Each approval writes a consent receipt to your wallet: requester, scope, attributes, timestamp, expiry.',
    },
    {
      icon: 'refresh',
      title: 'You can revoke it',
      body: 'Standing access ends the moment you withdraw it. The partner is notified and further requests fail.',
    },
  ],
  neverList: [
    'Sell your personal data, ever',
    'Share attributes with a partner you have not approved',
    'Use your biometric template for anything other than verifying you',
    'Track your activity across partner services for advertising',
    'Keep verification documents after your credential is issued',
  ],
  receipt: {
    title: 'What a consent receipt contains',
    fields: [
      { key: 'requester', value: 'Verified partner name and registration' },
      { key: 'attributes', value: 'Exactly which claims were released' },
      { key: 'purpose', value: 'The stated reason for the request' },
      { key: 'scope', value: 'one_time or standing, with expiry' },
      { key: 'granted_at', value: 'Timestamp of your approval' },
      { key: 'revocable', value: 'Whether and how you can withdraw it' },
    ],
  },
};

/* ------------------------------------------------------------------ *
 * /digital-inclusion
 * ------------------------------------------------------------------ */

export const inclusionPage = {
  eyebrow: 'Digital inclusion',
  title: 'Identity for the Nigerians the internet misses.',
  body: 'Roughly 40 million adults sit outside the formal financial system. Building a smartphone-only identity product would leave most of them exactly where they are.',
  barriers: [
    {
      icon: 'phone',
      title: 'No smartphone',
      body: 'Feature phones remain common outside major cities. Our USSD flow covers registration, sharing, and transfers with no app and no data.',
    },
    {
      icon: 'signal',
      title: 'No reliable data',
      body: 'Where connectivity is intermittent, verification resumes rather than restarting, and offline QR presentation works without a live connection.',
    },
    {
      icon: 'clipboard',
      title: 'Imperfect documents',
      body: 'Damaged, expired, or name-mismatched documents get assisted review instead of a rejection screen.',
    },
    {
      icon: 'globe',
      title: 'Language',
      body: 'Interfaces and assisted review in English, Hausa, Yoruba, and Igbo, so the flow does not assume fluency in one language.',
    },
    {
      icon: 'users',
      title: 'Low digital confidence',
      body: 'Agent-assisted enrolment for people who would rather have a person walk them through it than a screen.',
    },
    {
      icon: 'building',
      title: 'Distance',
      body: 'Verification through existing agent networks and branches, so the nearest access point is not in another state.',
    },
  ],
  commitments: [
    'Verification is free for individuals, permanently',
    'Every capability available in the app has a non-smartphone path',
    'Assisted review by a trained human for any document a machine rejects',
    'No verification path that requires a bank account to begin',
  ],
};

/* ------------------------------------------------------------------ *
 * /partners
 * ------------------------------------------------------------------ */

export const partnersPage = {
  eyebrow: 'Partners',
  title: 'One integration, a network that compounds.',
  body: 'Every institution that joins makes the credential more useful to the next one — and cheaper to verify for everyone already in.',
  categories: [
    { icon: 'bank', title: 'Banks & fintech', body: 'Account opening, tiered KYC, and re-verification without repeat document collection.' },
    { icon: 'building', title: 'Government agencies', body: 'Benefit targeting and service access with auditable consent at every step.' },
    { icon: 'heart', title: 'Healthcare', body: 'Patient identity across facilities, so records follow the person.' },
    { icon: 'signal', title: 'Telecoms', body: 'SIM registration and subscriber verification in seconds.' },
    { icon: 'shield', title: 'Insurance', body: 'Policyholder verification and fraud reduction at claim time.' },
    { icon: 'globe', title: 'Remittance', body: 'Sender and recipient verification for cross-border transfers.' },
  ],
  why: [
    { title: 'Lower cost per check', body: 'Reusable credentials mean you stop paying for verification work another institution already did.' },
    { title: 'Fewer drop-offs', body: 'Consent prompts convert better than document upload forms. Abandonment falls with them.' },
    { title: 'Shared fraud signal', body: 'Network-wide anomaly detection catches patterns no single institution can see alone.' },
    { title: 'Compliance you can show', body: 'Consent receipts and audit trails your regulator can read without a bespoke report.' },
  ],
  process: [
    { title: 'Talk to us', body: 'Tell us your use case and volume. We will tell you honestly whether we fit yet.' },
    { title: 'Sandbox', body: 'Build against realistic fixtures, including every failure path, before signing anything.' },
    { title: 'Compliance review', body: 'Data processing terms, scope limits, and assurance tier agreed in writing.' },
    { title: 'Go live', body: 'Production keys, monitoring, and a named contact for incidents.' },
  ],
};

/* ------------------------------------------------------------------ *
 * /pricing
 * ------------------------------------------------------------------ */

export const pricingPage = {
  eyebrow: 'Pricing',
  title: 'Free for people. Usage-based for partners.',
  body: 'Individuals never pay to prove who they are. Institutions pay per verification, so cost tracks value instead of gatekeeping access.',
  tiers: [
    {
      name: 'Individual',
      price: 'Free',
      cadence: 'always',
      body: 'For any Nigerian who needs a verified identity credential.',
      features: [
        'Verification with any supported document',
        'Reusable TrueID credential',
        'Digital wallet and consent log',
        'Unlimited shares with partners',
        'USSD and assisted verification paths',
      ],
      cta: { href: '/get-started', label: 'Get verified' },
    },
    {
      name: 'Business',
      price: 'Per verification',
      cadence: 'volume-tiered',
      body: 'For fintechs, lenders, and platforms onboarding verified customers.',
      featured: true,
      features: [
        'REST API, SDKs, and webhooks',
        'Sandbox with full failure-path fixtures',
        'Tier 1–3 assurance levels',
        'Consent receipts and audit export',
        'Volume discounts as usage grows',
      ],
      cta: { href: '/contact', label: 'Talk to us' },
    },
    {
      name: 'Enterprise & public sector',
      price: 'Custom',
      cadence: 'contracted',
      body: 'For banks, agencies, and operators with regulatory and scale requirements.',
      features: [
        'Dedicated environment and data residency terms',
        'Custom assurance and retention policies',
        'Uptime commitments with credits',
        'Named support and incident contacts',
        'Onboarding and integration assistance',
      ],
      cta: { href: '/contact', label: 'Contact sales' },
    },
  ],
  note: 'Per-verification rates depend on assurance tier and volume. We publish partner pricing at general availability; until then, rates are quoted directly so we are not advertising numbers we might have to change.',
  faqs: [
    { q: 'Will individual verification ever cost money?', a: 'No. Free individual verification is a commitment, not an introductory offer. Partner fees fund the platform.' },
    { q: 'Do I pay for failed verifications?', a: 'You pay for completed checks against a source. Requests that fail on our side, or never reach a source, are not billed.' },
    { q: 'Is there a minimum commitment?', a: 'No minimum for the business tier. Enterprise agreements are contracted to your requirements.' },
  ],
};

/* ------------------------------------------------------------------ *
 * /careers
 * ------------------------------------------------------------------ */

export const careersPage = {
  eyebrow: 'Careers',
  title: 'Build the trust layer for 220 million people.',
  body: 'We are early, small, and working on a problem where getting it wrong has real consequences for real people. If that appeals to you rather than worrying you, read on.',
  values: [
    { title: 'Small team, wide scope', body: 'You will own systems end to end. There is no layer of process between you and the problem.' },
    { title: 'Correctness matters here', body: 'We build identity infrastructure. We would rather ship a week late than ship something that leaks.' },
    { title: 'Build for the harder case first', body: 'The feature phone user and the damaged document are the design brief, not the edge case.' },
  ],
  areas: [
    { title: 'Engineering', body: 'Backend, mobile, and security engineering across the credential platform and wallet.' },
    { title: 'Compliance & risk', body: 'NDPR, CBN engagement, and the trust framework that partners are held to.' },
    { title: 'Partnerships', body: 'Bringing banks, agencies, and operators onto the network.' },
    { title: 'Operations', body: 'Assisted verification, agent networks, and support in four languages.' },
  ],
  openRoles: [],
  noRolesMessage:
    'We do not have formally posted openings yet. If you read the areas above and think you belong in one, write to us anyway — early hires are found this way more often than through job boards.',
};

/* ------------------------------------------------------------------ *
 * /contact
 * ------------------------------------------------------------------ */

export const contactPage = {
  eyebrow: 'Contact',
  title: 'Talk to a person.',
  body: 'Partnership enquiries, press, security reports, or a question the help centre did not answer.',
  routes: [
    { icon: 'building', title: 'Partnerships', body: 'Integration, pricing, and pilot enquiries from institutions.' },
    { icon: 'shield', title: 'Security', body: 'Vulnerability reports and responsible disclosure. We respond within two business days.' },
    { icon: 'users', title: 'Support', body: 'Help with your credential, wallet, or a verification that did not complete.' },
    { icon: 'clipboard', title: 'Press & data requests', body: 'Media enquiries and formal data-subject or legal requests.' },
  ],
};

/* ------------------------------------------------------------------ *
 * /integrations
 * ------------------------------------------------------------------ */

export const integrationsPage = {
  eyebrow: 'Integrations',
  title: 'Fits the stack you already run.',
  body: 'Verification should slot into your existing onboarding, not replace it. Every path below returns the same signed result.',
  methods: [
    {
      icon: 'code',
      title: 'REST API',
      body: 'Direct server-to-server integration. Full control over the flow and the UI your customer sees.',
      href: '/developers',
    },
    {
      icon: 'globe',
      title: 'Hosted verification',
      body: 'Redirect to a TrueID-hosted flow and receive the result on return. The fastest path to live.',
    },
    {
      icon: 'qr',
      title: 'QR handoff',
      body: 'For in-branch and point-of-sale: the customer scans, approves in their wallet, and your terminal gets the result.',
    },
    {
      icon: 'bolt',
      title: 'Webhooks',
      body: 'React to revocation, re-verification, and status changes without polling.',
    },
    {
      icon: 'signal',
      title: 'USSD gateway',
      body: 'Route feature-phone customers through the same verification your app uses.',
    },
    {
      icon: 'clipboard',
      title: 'Batch re-verification',
      body: 'Re-confirm an existing customer book against current credential status.',
    },
  ],
  sdks: ['Node.js', 'Python', 'PHP', 'Java', 'Go', '.NET'],
  sdkNote: 'Server SDKs are released alongside the public API. Until then, the REST endpoints are stable and documented.',
};

/* ------------------------------------------------------------------ *
 * /help
 * ------------------------------------------------------------------ */

export const helpPage = {
  eyebrow: 'Help centre',
  title: 'How can we help?',
  body: 'Answers to the questions we get asked most. If yours is not here, a person will answer it.',
  topics: [
    { icon: 'badge', title: 'Getting verified', body: 'Documents, timings, and what to do if a check fails.' },
    { icon: 'wallet', title: 'Your wallet', body: 'Credentials, transfers, and recovering a lost device.' },
    { icon: 'eye', title: 'Privacy & sharing', body: 'What partners see, and how to revoke access.' },
    { icon: 'signal', title: 'USSD & feature phones', body: 'Using TrueID without a smartphone or data.' },
  ],
  faqs: [
    {
      q: 'My verification failed. What now?',
      a: 'Most failures come from a name or date mismatch between your document and the issuing source. Start the flow again and check the spelling exactly as it appears on the document. If it still fails, request assisted review — a trained reviewer will complete it with you, including by video or in person.',
    },
    {
      q: 'I lost my phone. Is my credential gone?',
      a: 'No. Install the app on a new device and re-authenticate with a liveness check. Your credential restores from encrypted backup, and the lost device loses access the moment the restore completes.',
    },
    {
      q: 'How do I stop a partner from accessing my data?',
      a: 'Open your wallet, go to consent history, find the partner, and revoke. Standing access ends immediately and the partner is notified. Anything they lawfully recorded during the consent period stays under their own retention policy — revocation stops future access.',
    },
    {
      q: 'Can I use TrueID without a smartphone?',
      a: 'Yes. Register, verify, share your credential, and send or receive money over USSD from any handset. No app, no data plan.',
    },
    {
      q: 'How do I delete my account?',
      a: 'Account deletion is available in the app under privacy settings. Your credential is revoked, your data is removed on our published schedule including from backups, and partners holding standing consent are notified.',
    },
    {
      q: 'Is TrueID a government service?',
      a: 'No. TrueID verifies against government identity sources and is built to align with NDPR and CBN KYC guidance, but it is an independent platform, not a government agency.',
    },
  ],
};

/* ------------------------------------------------------------------ *
 * /get-started
 * ------------------------------------------------------------------ */

export const getStartedPage = {
  eyebrow: 'Get started',
  title: 'Get verified once. Use it for life.',
  body: 'Pick the path that fits how you access the internet. All three produce the same credential.',
  paths: [
    {
      icon: 'phone',
      title: 'On your phone or browser',
      body: 'The full flow, usually under five minutes.',
      steps: ['Enter your NIN, BVN, or another supported document', 'Take a liveness-checked selfie', 'Receive your credential in your wallet'],
      featured: true,
    },
    {
      icon: 'signal',
      title: 'By USSD',
      body: 'No app, no data, any handset.',
      steps: ['Dial the TrueID short code', 'Follow the prompts to enter your identifier', 'Complete a biometric check at any agent to reach Tier 2'],
    },
    {
      icon: 'building',
      title: 'In person',
      body: 'With help, near you.',
      steps: ['Visit a partner branch, agent, or enrolment centre', 'Bring one supported document', 'Walk out verified, with your credential on your phone or as a code'],
    },
  ],
  requirements: [
    'One supported document: NIN, BVN, passport, driver\'s licence, or voter\'s card',
    'Your name and date of birth as they appear on that document',
    'A device for the biometric step, or an agent visit to complete it',
  ],
  launchNote:
    'TrueID is pre-launch. Registration opens with our verification pilots — leave your details and we will contact you when your access channel is live.',
};
