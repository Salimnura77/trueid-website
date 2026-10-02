// Central site metadata, navigation graph, and shared content.
// Keeping this in one place means the nav, footer, and sitemap never drift apart.

export const site = {
  name: 'TrueID.me',
  tagline: "Nigeria's Trusted Digital Identity Platform",
  description:
    "Verify once with NIN, BVN, Passport, Driver's License, or Voter's Card. Get a reusable, encrypted TrueID credential that works everywhere — banking, government, healthcare, telecom.",
  email: 'Salimnurayusuf@gmail.com',
  phone: '0814 881 8289',
};

// Primary navigation. `columns` renders as a mega-menu panel.
export const nav = [
  {
    label: 'Solutions',
    columns: [
      {
        heading: 'By audience',
        items: [
          { label: 'Individuals', href: '/individuals', desc: 'Verify once, use everywhere' },
          { label: 'Businesses', href: '/businesses', desc: 'Faster, cheaper onboarding' },
          { label: 'Government', href: '/government', desc: 'Efficient service delivery' },
        ],
      },
      {
        heading: 'By capability',
        items: [
          { label: 'How it works', href: '/how-it-works', desc: 'The 8-step verification flow' },
          { label: 'Digital wallet', href: '/wallet', desc: 'Credentials, payments, consent' },
          { label: 'Groups & communities', href: '/groups', desc: 'Verify affiliation, not just identity' },
        ],
      },
    ],
  },
  {
    label: 'Platform',
    columns: [
      {
        heading: 'Product',
        items: [
          { label: 'Features', href: '/features', desc: 'Everything trust infrastructure needs' },
          { label: 'Developers', href: '/developers', desc: 'APIs, SDKs, and webhooks' },
          { label: 'Integrations', href: '/integrations', desc: 'Connect your existing stack' },
        ],
      },
      {
        heading: 'Trust',
        items: [
          { label: 'Security', href: '/security', desc: 'Privacy by design, trust by default' },
          { label: 'Trust center', href: '/trust-center', desc: 'Compliance, uptime, and audits' },
          { label: 'Privacy & consent', href: '/privacy-consent', desc: 'You control every share' },
        ],
      },
    ],
  },
  {
    label: 'Company',
    columns: [
      {
        heading: 'About us',
        items: [
          { label: 'About TrueID', href: '/about', desc: 'Our mission and our story' },
          { label: 'Leadership', href: '/about#leadership', desc: 'The team behind the platform' },
          { label: 'Careers', href: '/careers', desc: 'Build the identity layer with us' },
        ],
      },
      {
        heading: 'Resources',
        items: [
          { label: 'Digital inclusion', href: '/digital-inclusion', desc: 'Identity for every Nigerian' },
          { label: 'Partners', href: '/partners', desc: 'Our ecosystem network' },
          { label: 'Help centre', href: '/help', desc: 'Answers and support' },
        ],
      },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
];

export const footerNav = [
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Leadership', href: '/about#leadership' },
      { label: 'Careers', href: '/careers' },
      { label: 'Partners', href: '/partners' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Solutions',
    links: [
      { label: 'Individuals', href: '/individuals' },
      { label: 'Businesses', href: '/businesses' },
      { label: 'Government', href: '/government' },
      { label: 'Groups', href: '/groups' },
      { label: 'Digital wallet', href: '/wallet' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Developers', href: '/developers' },
      { label: 'Integrations', href: '/integrations' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Trust',
    links: [
      { label: 'Security', href: '/security' },
      { label: 'Trust center', href: '/trust-center' },
      { label: 'Privacy & consent', href: '/privacy-consent' },
      { label: 'Digital inclusion', href: '/digital-inclusion' },
      { label: 'Help centre', href: '/help' },
    ],
  },
];

export const ecosystem = [
  'Tier-1 Banks',
  'Fintech Partners',
  'Government Agencies',
  'Healthcare Networks',
  'Telecom Operators',
  'Insurance Providers',
];

export const stats = [
  { target: 220, suffix: 'M+', label: 'Population' },
  { target: 40, suffix: 'M+', label: 'Unbanked adults' },
  { target: 20, suffix: 'B+', prefix: '$', label: 'Annual remittances' },
  { target: 1, suffix: 'B+', prefix: '$', label: 'Annual fintech investment' },
];

export const supportedDocuments = [
  { name: 'NIN', full: 'National Identification Number', issuer: 'NIMC' },
  { name: 'BVN', full: 'Bank Verification Number', issuer: 'NIBSS' },
  { name: 'Passport', full: 'International Passport', issuer: 'NIS' },
  { name: "Driver's License", full: "Driver's License", issuer: 'FRSC' },
  { name: "Voter's Card", full: 'Permanent Voter Card', issuer: 'INEC' },
];
