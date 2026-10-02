// Legal + account-access content.
//
// NOTE: the privacy and terms text below is a plain-language SUMMARY of the
// intended policy, written to match what the product actually does. It is
// explicitly labelled as pre-launch and NOT presented as an executed legal
// agreement — a lawyer needs to review and replace these before launch.
// Each page carries that notice visibly so it cannot ship unnoticed.

export const legalNotice =
  'TrueID is pre-launch. This page describes our intended policy in plain language so you can assess us now. It is not yet a binding agreement, and it will be replaced by a reviewed legal document before registration opens.';

export const privacyPolicy = {
  eyebrow: 'Privacy',
  title: 'What we collect, and what we refuse to.',
  body: 'The short version: we collect the minimum needed to verify you, we never sell it, and we never share it without a specific consent from you that you can withdraw.',
  updated: '29 July 2026',
  sections: [
    {
      title: 'What we collect',
      points: [
        'Identity data you submit: your name, date of birth, and the identifier on the document you verify with (NIN, BVN, passport, licence, or voter\'s card number).',
        'A biometric template derived from your liveness check, used to confirm you are the person the credential belongs to.',
        'Verification results returned by the issuing source — whether the record matched, not a copy of the source record.',
        'Consent records: which partner requested what, when, and under what scope.',
        'Technical data needed for security: device fingerprint, IP address, and request timestamps.',
      ],
    },
    {
      title: 'What we do not do',
      points: [
        'We do not sell your data, and we do not share it for advertising.',
        'We do not give a partner more than the specific attributes you approved.',
        'We do not retain document images after verification completes, beyond the fraud-review window we publish.',
        'We do not use your data to train models that would let anyone reconstruct it.',
      ],
    },
    {
      title: 'Your rights under the NDPR',
      points: [
        'Access: request a copy of what we hold about you, from your wallet or by email.',
        'Correction: fix inaccurate data, including re-verifying against a corrected source record.',
        'Erasure: delete your account. Your credential is revoked and your data is removed on our published schedule, including from backups.',
        'Withdraw consent: revoke any standing partner access at any time, with immediate effect.',
        'Object and restrict: tell us to stop a specific processing activity, and we will either stop or explain the lawful basis we rely on.',
      ],
    },
    {
      title: 'Lawful basis',
      points: [
        'Consent, for every share of your attributes with a partner.',
        'Contract, for operating the wallet and credential you asked us to issue.',
        'Legal obligation, where financial-services regulation requires us to retain a record.',
        'Legitimate interest, strictly for fraud prevention and platform security.',
      ],
    },
    {
      title: 'Retention',
      points: [
        'Credential and account data: for as long as your account is open, then deleted on the published schedule.',
        'Consent receipts: retained as an audit record, because removing them would remove your own evidence of what happened.',
        'Document images: deleted after the fraud-review window closes.',
        'Security logs: retained for a limited period, then aggregated beyond identification.',
      ],
    },
  ],
};

export const termsOfService = {
  eyebrow: 'Terms',
  title: 'The deal, in plain language.',
  body: 'What you can expect from us, what we need from you, and what happens when something goes wrong.',
  updated: '29 July 2026',
  sections: [
    {
      title: 'Using TrueID',
      points: [
        'Verification and your credential are free for individuals, permanently.',
        'You must be the person you are verifying as. Verifying on behalf of someone else, or with a document that is not yours, ends your account.',
        'You are responsible for keeping your device unlock and PIN private. We will never ask you for either.',
        'Your credential is yours. You decide every share, and you can delete your account at any time.',
      ],
    },
    {
      title: 'What we commit to',
      points: [
        'We verify against the issuing source and tell you honestly when a check fails and why.',
        'We share only the attributes you specifically approve, with the partner you approved them for.',
        'We publish our security architecture, uptime, and incident history rather than describing them only in sales conversations.',
        'We notify you of a breach affecting your data without waiting to be asked.',
      ],
    },
    {
      title: 'Partner obligations',
      points: [
        'Partners may request only the narrowest attributes their stated purpose requires.',
        'Partners may not re-share what they receive, or repurpose it beyond the consented scope.',
        'Partners must honour revocation immediately on webhook notice.',
        'We suspend partners who breach these terms, and we tell affected users.',
      ],
    },
    {
      title: 'Limits',
      points: [
        'TrueID confirms identity attributes. It is not a credit decision, an eligibility ruling, or a guarantee of anyone\'s conduct.',
        'We are not a government agency, and we do not issue the underlying documents we verify against.',
        'Service availability targets and remedies are set out in partner agreements, not in this summary.',
      ],
    },
  ],
};

export const signInPage = {
  eyebrow: 'Sign in',
  title: 'Sign in to your wallet.',
  body: 'Account access opens with our verification pilots. When it does, this is how you will get in — no password to forget or leak.',
  methods: [
    {
      icon: 'fingerprint',
      title: 'Biometric unlock',
      body: 'Face or fingerprint on your own device. The check happens on the device; we never receive an image.',
    },
    {
      icon: 'key',
      title: 'Passkey',
      body: 'Phishing-resistant sign-in built on FIDO2 and WebAuthn. Nothing to type, nothing to steal.',
    },
    {
      icon: 'signal',
      title: 'USSD short code',
      body: 'Reach your credential and balance from any feature phone, with a PIN instead of a passkey.',
    },
  ],
  security: [
    'We will never ask for your PIN, passkey, or a one-time code by phone, SMS, or email.',
    'Every new-device sign-in requires a fresh liveness check, and the previous device loses access immediately.',
    'Every sign-in appears in your wallet\'s activity log, with device and location.',
  ],
  notice:
    'Registration is not open yet, so there is no sign-in form on this page. That is deliberate: we would rather show you nothing than collect credentials for an account that does not exist.',
};
