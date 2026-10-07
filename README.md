# TrueID.me

## React Native pilot app

The Expo / React Native / TypeScript pilot lives in [`mobile/`](mobile/README.md).
It adapts the design in `TrueIDDigitalIdentityApp/` and includes sample identity
verification, consent, credential reuse, partner results, revocation, and support.

```sh
cd mobile
npm ci
npm start
```

The documentation below describes the separate Next.js marketing website.

Public website for a proposed Nigerian digital identity platform: verify once,
receive a reusable credential, and share identity attributes with consent.

## Project status

This repository contains the pre-launch marketing website. Authentication,
identity verification, credential issuance, payments, USSD, and partner APIs
are described in the website copy but are not implemented in this source.
Sign-in is informational, and the waitlist link leads to the contact page.

The source was imported from the supplied text export. Its original README and
three font binaries were represented only as `[Binary file]` and were unavailable.
This README replaces the omitted README.

## Stack

- Next.js 14.2.5 with the App Router
- React 18.3.1
- Tailwind CSS 3.4.10
- JavaScript and JSX

## Setup

Install Node.js compatible with Next.js 14 (Node.js 18.17 or newer) and npm.

Restore these font assets before running or building the site; `app/layout.jsx`
imports them using `next/font/local`:

```text
app/fonts/Inter-latin.woff2
app/fonts/InterTight-latin.woff2
app/fonts/JetBrainsMono-latin.woff2
```

Then install dependencies and start the development server:

```sh
npm install
npm run dev
```

Open http://localhost:3000.

To build and run the production website:

```sh
npm run build
npm start
```

## Structure

```text
app/              Pages, root layout, and global styles
components/       Shared UI and interactive components
components/art/   Custom SVG illustrations
lib/              Site metadata, navigation, page copy, and policy summaries
```

Shared branding and contact details live in `lib/site.js`. Product copy lives
primarily in `lib/content.js` and `lib/pages.js`; company and policy copy live
in `lib/about.js` and `lib/legal.js`.

`CLAUDE-CODE-CLI.bat` is an auxiliary launcher supplied with the export. It is
not needed to run the website. It changes local Claude configuration to use
a third-party API endpoint and stores the key entered by the operator.

## Validation

The initial import was checked against the supplied text export. No application
build has been run; the required font binaries were not included in the export.
