// Content for /about. Structure mirrors the id.me/about section order:
// hero → mission → founding story + timeline → signature commitment →
// values → stats → certifications → leadership → press → careers CTA.
//
// NOTE ON FACTS: TrueID is pre-launch, so no adoption or funding numbers
// are asserted here. Where id.me shows "150M+ members", this page shows
// market-context figures (clearly labelled as Nigeria market data, not
// TrueID metrics) and named delivery commitments instead. Leadership,
// press, and certification entries are placeholders marked in the code
// so they are obvious to fill in and impossible to ship by accident.

export const aboutHero = {
  eyebrow: 'About us',
  title: 'Every Nigerian deserves an identity they control.',
  body: 'We are building the trust layer for Nigeria — so proving who you are takes seconds, happens on your terms, and never costs you your privacy.',
};

export const mission = {
  statement:
    'Our mission is to make Nigeria a more trusted place — delivering the strongest identity assurance with the least friction, at a cost any bank, agency, or citizen can afford.',
  support: [
    {
      title: 'Security without friction',
      body: 'Stronger verification should mean a simpler experience, not a longer queue. Every control we add has to survive that test.',
    },
    {
      title: 'Affordable by design',
      body: 'Verification is free for individuals, permanently. Partners pay per check, so cost scales with use instead of gatekeeping access.',
    },
    {
      title: 'Interoperable by default',
      body: 'A credential is only useful if it travels. We build to work with NIMC, NIBSS, FRSC, INEC, and the institutions that already serve Nigerians.',
    },
  ],
};

export const story = {
  eyebrow: 'Our story',
  title: 'It started with the same form, filled out for the fifth time.',
  paragraphs: [
    'A Nigerian opening a bank account submits a NIN slip, a utility bill, and a passport photograph. Then does it again at the next bank. Again for a SIM registration. Again for a loan. Each institution pays to verify the same person, and each one stores another copy of documents it never needed to hold.',
    'Meanwhile roughly 40 million adults sit outside the formal financial system — many not for want of income, but for want of provable identity in a form an institution will accept.',
    'TrueID exists to break that loop. Verify once against a trusted government source, receive a signed credential that belongs to you, and prove what you need to prove — a name, an age, a KYC status — without surrendering the documents behind it.',
  ],
  pullQuote: {
    quote:
      'Identity should be infrastructure, like roads or power. You should not have to rebuild it every time you want to use it.',
    attribution: 'TrueID founding team',
  },
};

export const timeline = [
  {
    year: '2024',
    title: 'The problem, quantified',
    body: 'Research across banking, telecom, and public-service onboarding maps where repeat verification costs the most and excludes the most people.',
  },
  {
    year: '2025',
    title: 'Platform design',
    body: 'Credential architecture, consent model, and selective-disclosure protocol designed to NDPR requirements from the first line of code.',
  },
  {
    year: '2026',
    title: 'Verification pilots',
    body: 'Integration work against government identity sources, with USSD and agent-assisted paths built alongside the smartphone flow — not after it.',
  },
  {
    year: 'Next',
    title: 'Open network',
    body: 'Partner APIs, sandbox access, and a published trust framework so any institution can join the network on documented terms.',
  },
];

// Signature commitment — the analogue of id.me's "No Identity Left Behind".
export const commitment = {
  name: 'No Nigerian Left Unverified',
  intro:
    'Equity means treating everyone consistently — while recognising that people do not all start from the same place. A verification path that assumes a smartphone, a data plan, and a pristine document excludes millions of the people who need identity most.',
  paths: [
    {
      icon: 'phone',
      title: 'Self-serve online',
      body: 'Verify in minutes from any smartphone or browser, using a document you already hold.',
    },
    {
      icon: 'signal',
      title: 'USSD & feature phone',
      body: 'No data, no app, no problem. Register and share your credential with a short code from any handset.',
    },
    {
      icon: 'video',
      title: 'Assisted video review',
      body: 'When a document is damaged, stale, or mismatched, a trained reviewer completes verification with you — in your language.',
    },
    {
      icon: 'building',
      title: 'In person, near you',
      body: 'Verify face to face through bank branches, agent networks, and enrolment centres for those who cannot or would rather not go online.',
    },
  ],
};

export const values = [
  {
    icon: 'shield',
    title: 'Secure digital identity',
    body: 'Identity fraud is a threat to individuals and to national confidence. We hold ourselves to published assurance standards so a credential issued once is trusted everywhere.',
  },
  {
    icon: 'users',
    title: 'Equitable access',
    body: 'Multiple ways to verify, so nobody is excluded by their documents, their device, or their circumstances.',
    href: '/digital-inclusion',
  },
  {
    icon: 'lock',
    title: 'You control your data',
    body: 'Nothing is shared without your explicit consent. Every share is logged, standing access can be revoked, and you can delete your account at any time.',
    href: '/privacy-consent',
  },
  {
    icon: 'eye',
    title: 'Minimum disclosure',
    body: 'Partners receive the narrowest answer that settles their question — "over 18", "KYC passed" — not a copy of your documents.',
  },
  {
    icon: 'check',
    title: 'User choice',
    body: 'People have different comfort levels with technology. We ask every partner to offer more than one way through.',
  },
  {
    icon: 'scale',
    title: 'Accountable in the open',
    body: 'Standards we claim, uptime we deliver, and incidents we hit are published — not left to a sales conversation.',
    href: '/trust-center',
  },
];

// Nigeria market context. Explicitly NOT TrueID adoption metrics.
export const marketContext = {
  title: 'The market we are building for',
  note: 'Figures describe the Nigerian market TrueID is built to serve. They are not TrueID adoption metrics — we publish those once the network is live.',
};

export const standards = {
  title: 'Held to standards you can check',
  body: 'Security claims are only worth what an outside party will certify. These are the frameworks TrueID is built to, with independent certification pursued ahead of general availability.',
  items: [
    {
      name: 'NDPR',
      caption: "Nigeria Data Protection Regulation — lawful basis, consent, and data-subject rights",
      status: 'Built to',
    },
    {
      name: 'CBN KYC guidance',
      caption: 'Tiered know-your-customer requirements for financial institutions',
      status: 'Aligned',
    },
    {
      name: 'ISO/IEC 27001',
      caption: 'Information security management system',
      status: 'In progress',
    },
    {
      name: 'SOC 2 Type II',
      caption: 'Independently audited security and availability controls',
      status: 'Planned',
    },
    {
      name: 'FIDO2 / WebAuthn',
      caption: 'Phishing-resistant, passwordless authentication',
      status: 'Built to',
    },
    {
      name: 'NIST SP 800-63-3',
      caption: 'Identity assurance levels used as the design reference for our tiers',
      status: 'Design reference',
    },
  ],
  disclaimer:
    'Status labels are accurate as of this page\'s last update. "Built to" means the control set is implemented; "In progress" and "Planned" mean certification is not yet complete. We do not claim certifications we do not hold.',
};

// PLACEHOLDER — replace with real people before launch.
export const leadership = {
  title: 'The team behind the platform',
  body: 'Identity infrastructure asks people for their most sensitive data. The least we can do is put our names to it.',
  placeholder: true,
  people: [
    {
      name: 'Salim Nura Yusuf',
      role: 'Founder',
      bio: 'Leads product and platform direction for TrueID.',
    },
  ],
};

// PLACEHOLDER — no press coverage yet; section renders as a
// "what we publish" strip instead of fabricated logos.
export const publications = {
  title: 'What we publish',
  body: 'Rather than borrow authority we have not earned yet, we publish the material that lets you assess us directly.',
  items: [
    {
      icon: 'file',
      title: 'Trust framework',
      body: 'How credentials are issued, what each assurance tier means, and what a partner may request.',
      href: '/trust-center',
    },
    {
      icon: 'shield',
      title: 'Security overview',
      body: 'Encryption, key management, retention, and incident response in plain language.',
      href: '/security',
    },
    {
      icon: 'eye',
      title: 'Consent & privacy model',
      body: 'What a consent receipt contains, how revocation works, and what we never store.',
      href: '/privacy-consent',
    },
  ],
};

export const careers = {
  title: 'Help us leave no Nigerian unverified.',
  body: 'We are a small team building the trust layer for Africa\'s largest economy. If that sounds like your kind of problem, we would like to meet you.',
};
