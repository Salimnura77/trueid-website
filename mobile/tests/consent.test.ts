import assert from "node:assert/strict";
import { test } from "node:test";
import {
  accessPartner,
  createRequest,
  decideConsent,
  expireRequests,
  finishVerification,
  partnerResult,
  requestRecovery,
  completeRecovery,
  requestReview,
  resolveReview,
  revokeAccess,
  startDemo,
  startVerification,
} from "../src/domain/engine";
import type { AttributeKey, Scenario } from "../src/domain/model";

const now = 1_790_985_600_000;
test("the new-account journey verifies a fixture and only releases the approved subset", () => {
  let s = startDemo("new", now);
  const id = s.requests[0].id;
  assert.deepEqual(partnerResult(s, id, now).attributes, {});
  assert.throws(
    () => decideConsent(s, id, true, ["fullName"], now),
    /verification/,
  );
  s = finishVerification(
    startVerification(s, now),
    "verified",
    1600,
    now + 1600,
  );
  s = decideConsent(s, id, true, ["over18"], now + 2000);
  assert.deepEqual(partnerResult(s, id, now + 2100).attributes, {
    over18: "Yes",
  });
  assert.equal(s.events[0].kind, "consent_approved");
  s = accessPartner(s, id, now + 2200);
  assert.equal(s.events[0].kind, "partner_access");
});
test("unrequested, unknown and empty attribute grants are rejected", () => {
  const s = startDemo("sample", now);
  const id = s.requests[0].id;
  for (const keys of [[], ["nationality"], ["nin"]])
    assert.throws(() =>
      decideConsent(s, id, true, keys as AttributeKey[], now),
    );
  assert.throws(() => createRequest(s, [], "day", "onboarding", now));
});
test("decline releases nothing and a second decision is rejected", () => {
  let s = startDemo("sample", now);
  const id = s.requests[0].id;
  s = decideConsent(s, id, false, ["fullName"], now + 1);
  assert.deepEqual(partnerResult(s, id, now + 2), {
    requestId: id,
    status: "declined",
    attributes: {},
    expiresAt: now + 1 + 86_400_000,
  });
  assert.throws(
    () => decideConsent(s, id, true, ["fullName"], now + 2),
    /no longer pending/,
  );
});
test("revocation denies subsequent reads while retaining the user consent history", () => {
  let s = startDemo("sample", now);
  const id = s.requests[0].id;
  s = decideConsent(s, id, true, ["fullName", "over18"], now + 1);
  s = revokeAccess(s, id, now + 2);
  assert.equal(partnerResult(s, id, now + 3).status, "revoked");
  assert.deepEqual(partnerResult(s, id, now + 3).attributes, {});
  assert.deepEqual(s.requests[0].approved, ["fullName", "over18"]);
  assert.equal(accessPartner(s, id, now + 3).events[0].kind, "partner_denied");
});
test("access expires exactly at the grant deadline even without a background tick", () => {
  let s = createRequest(
    startDemo("sample", now),
    ["over18"],
    "minute",
    "reuse",
    now + 1,
  );
  const id = s.requests[0].id;
  s = decideConsent(s, id, true, ["over18"], now + 2);
  assert.equal(partnerResult(s, id, now + 60_001).status, "approved");
  assert.equal(partnerResult(s, id, now + 60_002).status, "expired");
  assert.deepEqual(partnerResult(s, id, now + 60_002).attributes, {});
  const expired = expireRequests(s, now + 60_002);
  assert.equal(expired.events[0].kind, "access_expired");
  assert.equal(expireRequests(expired, now + 60_003), expired);
});
test("a request expiring while its confirmation is open cannot be approved", () => {
  const s = startDemo("sample", now);
  const id = s.requests[0].id;
  assert.throws(
    () => decideConsent(s, id, true, ["fullName"], now + 86_400_000),
    /no longer pending/,
  );
});
test("a new verification cannot resurrect old permission", () => {
  let s = startDemo("sample", now);
  const id = s.requests[0].id;
  s = decideConsent(s, id, true, ["fullName"], now + 1);
  s = startVerification(s, now + 2);
  assert.deepEqual(partnerResult(s, id, now + 3).attributes, {});
  s = finishVerification(s, "verified", 1600, now + 1602);
  assert.equal(partnerResult(s, id, now + 1603).status, "revoked");
});
test("an approved request still returns no data if the credential is unavailable", () => {
  let s = startDemo("sample", now);
  const id = s.requests[0].id;
  s = decideConsent(s, id, true, ["fullName"], now + 1);
  s = { ...s, verification: "unable" };
  assert.equal(partnerResult(s, id, now + 2).status, "unavailable");
  assert.deepEqual(partnerResult(s, id, now + 2).attributes, {});
});
test("review, failure, and simulated outage all offer a controlled manual review", () => {
  for (const outcome of ["review", "unable", "error"] as Scenario[]) {
    let s = finishVerification(
      startVerification(startDemo("new", now), now + 1),
      outcome,
      1600,
      now + 1601,
    );
    assert.equal(s.issuedAt, undefined);
    s = requestReview(s, "uncertain", now + 1700);
    assert.equal(s.review?.status, "queued");
    s = resolveReview(s, true, now + 2000);
    assert.equal(s.verification, "verified");
    assert.equal(s.review?.status, "resolved");
    assert.throws(() => resolveReview(s, true, now + 2001));
  }
});
test("repeat credential use requires a separate consent and recovery grants no verification", () => {
  let s = startDemo("sample", now);
  s = decideConsent(s, s.requests[0].id, true, ["fullName"], now + 1);
  s = createRequest(s, ["over18"], "day", "reuse", now + 2);
  assert.equal(partnerResult(s, s.requests[0].id, now + 3).status, "pending");
  assert.deepEqual(partnerResult(s, s.requests[0].id, now + 3).attributes, {});
  let fresh = requestRecovery(startDemo("new", now), now + 1);
  fresh = completeRecovery(fresh, now + 2);
  assert.equal(fresh.verification, "unverified");
  assert.equal(fresh.recovery?.status, "completed");
});
