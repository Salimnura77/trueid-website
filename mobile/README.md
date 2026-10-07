# TrueID mobile pilot

An Expo + React Native + TypeScript app demonstrating one narrowly scoped flow:
verify a fictional NIN profile, issue a sample credential, and reuse selected
attributes with a fictional fintech through explicit consent.

The visual system adapts `../TrueIDDigitalIdentityApp`: deep navy credential
cards, Plus Jakarta Sans headings, Inter body text, rounded white panels, quiet
blue accents, and teal actions and status indicators. The existing Next.js site
and Figma/Vite reference remain separate projects.

## Run locally

Use Node.js 22.13+ (Node 24 is also supported by this setup) and npm.

```sh
cd mobile
npm ci
npm start
```

- **Android:** open a compatible Expo Go build and scan the terminal QR code, or
  run `npm run android` with an Android emulator installed and running.
- **iPhone:** use the Camera app to open the terminal QR code in a compatible
  Expo Go build. The computer and phone must be able to reach one another.
- **iOS Simulator:** on macOS with Xcode installed, run `npm run ios`.
- **Web preview:** run `npm run web` and open the URL printed by Expo.

This app uses Expo SDK 57 / React Native 0.86.3. Expo Go must support that SDK.
If it does not, install `expo-dev-client` with `npx expo install expo-dev-client`
and make a development build. Native simulator/emulator tools are separate from
the JavaScript dependencies. Windows cannot run Apple's iOS Simulator.

An optional `eas.json` provides development, internal preview, and production
profiles. For an Android preview APK, after signing into your Expo account:

```sh
npx eas-cli@latest build --platform android --profile preview
```

iOS device builds require your Apple signing setup. No app-store release, cloud
build, or live deployment is performed by starting this project.

## Try the complete pilot

1. Choose **Explore sample profile** for an already demo-verified credential, or
   **Create a demo account** to begin unverified. The optional session label
   accepts `Pilot-001`-style aliases; do not enter your name.
2. Run a sample NIN check. Select **Verified**, **Needs review**, **Unable to
   verify**, or **Service unavailable** to exercise the corresponding path.
3. Open **Requests**, review Kora Finance's purpose, date, duration and attributes,
   uncheck anything you do not want to share, and approve or decline. Both
   decisions require a confirmation.
4. Open **Partner demo**, then **View partner result**. Only the attributes
   approved by the user appear. All other states return an empty attribute set.
5. Open the user's consent record and **Revoke access**. Confirm the action and
   inspect the partner result again. Previously released attributes disappear.
6. Create another request for **Repeat credential use**. The existing credential
   can be used again, but the new request requires a separate consent.
7. Select **1 minute** when creating a request to test real clock-based expiry.
   A pending request is valid for 24 hours; approved access starts its selected
   duration at the moment of approval. Expiry is checked on each read, on a
   timer, and when the app returns to the foreground.
8. Try **Manual review** after a failed or uncertain check. Submit a coded reason
   and use the clearly labelled simulated reviewer controls to resolve it.
9. Explore **Recovery**, **Activity history**, and **Pilot metrics** from Profile.

## Demo profile

- Fictional person: **Emeka Okonkwo**
- Credential: **TID-DEMO-001**
- Only identifier: **DEMO-NIN-001** (not a real NIN)
- Sample attributes: full name, over-18 answer, nationality, verification status
- Partner: **Kora Finance**, a fictional fintech with no live integration
- There are no passwords, OTPs, real accounts, access tokens, or document uploads.

## Implemented screens

Welcome, demo account creation/resumption, Home, verification and result, My ID
vault, credential details, request review, consent history and revocation,
partner request/result workspace, activity history, manual review, recovery,
help, privacy, settings, and pilot metrics with local coded feedback.

Home, My ID, Requests and Profile are React Navigation bottom tabs. Detail views
use a typed React Navigation native stack. The explicit feature brief's React
Navigation requirement takes precedence over the generated starter's generic
Expo Router guidance.

## Structure

```text
src/components/   Shared accessible controls, dialogs and the credential card
src/screens/      Mobile screens grouped by user journey
src/navigation/   Typed native stack and bottom tabs
src/domain/       Pure state transitions and access-control rules
src/services/     Replaceable verification/partner adapters and local storage
src/state/        App state, persistence, expiry timer and service orchestration
src/data/         Clearly labelled fictional measurement fixtures
tests/            Domain and access-control tests
e2e/              End-to-end browser tests of the Expo web build
```

## What is persisted

AsyncStorage holds a versioned, schema-validated whitelist of **non-sensitive
demo metadata only**: scenario status, attribute keys (not attribute values),
request IDs/timestamps, consent decisions, event codes, coded review/recovery
state, and a numeric/coded feedback response. At most 100 requests and 300 events
are retained. Arbitrary fields are stripped before serialization. The session
label stays in memory. No real identity data is collected.

On restart, choose **Resume saved demo** explicitly. An interrupted sample check
returns to an unverified state. Settings → **Reset demo** replaces the stored
demo state with an empty state. Storage failures are shown to the user.

## Service boundaries and limitations

`src/services/contracts.ts` defines the verification and partner interfaces;
`src/services/mock.ts` supplies their current adapters. A real implementation
needs authorized provider access, server-side authentication and authorization,
secure credential issuance, enforceable consent, approved retention policies,
and an independently protected audit system. Do not connect real identity data
to this local mock.

Both user and partner screens run in one app. The client-side guard is useful
for demonstrating behaviour; it is not a production security boundary. Device
owners can edit local data. Consent history and access logs are demo records,
not tamper-proof evidence. Manual review and recovery are simulations and do not
contact staff or restore real accounts. No email, SMS or real notifications are
sent. Reverification revokes previous active grants before issuing a new sample
credential, so old consents cannot silently become active again.

The five headline pilot metrics are fixed illustrative fixtures. They are
explicitly separate from the local session counts and saved sample feedback.
No values represent actual traction. There is no government endorsement,
certification claim, or live fintech partnership in this app.

Payments, wallet transfers, USSD, multiple identity types, government/healthcare
integrations, public APIs, SDKs and advanced fraud detection are **Planned** and
are intentionally outside this pilot.

## Checks

```sh
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run export:all
npx expo-doctor
```

Validated in this workspace: TypeScript and ESLint passed; all 13 domain tests
and 4 browser journeys passed; Android, iOS, and web bundles exported successfully.
Expo Doctor passed 19 of 21 checks. Its Expo schema and React Native Directory
checks could not complete because the online services were unreachable. No
Android device/emulator was connected, so native device UI testing remains.

The browser suite requires Playwright Chromium (`npx playwright install chromium`).
It starts or reuses Expo on port 8081 and exercises a mobile viewport. The native
exports validate iOS and Android JavaScript bundles; they do not replace testing
on a simulator or a physical phone.

On Windows, an installed Microsoft Edge can run the browser checks without a
separate Chromium download:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm run test:e2e
```

The domain suite covers selective disclosure, invalid approvals, decline,
revocation, expiry, reverification, manual review, recovery, and the persistence
allowlist. Browser tests cover the main consent journey, saved demo resumption,
failed verification and review, recovery, expiry, and compact/tablet layouts.

The original supplied logo is bundled unchanged as `assets/trueid-logo.png` and
used for the launcher, native splash screen, welcome/header branding, and
credential cards. The in-app loading screen uses the same artwork while fonts
and saved demo state load. Native splash changes require a new app build; check
their final appearance in a preview or production build, as described in the
[Expo splash screen guide](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/).

Official setup references: [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/),
[React Navigation](https://reactnavigation.org/docs/getting-started/), and
[Expo development builds](https://docs.expo.dev/develop/development-builds/introduction/).
#   M o b l i e - T I D  
 