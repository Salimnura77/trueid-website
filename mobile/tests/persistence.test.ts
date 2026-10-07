import assert from "node:assert/strict";
import { test } from "node:test";
import { serializeState, restoreState } from "../src/domain/persistence";
import {
  createRequest,
  decideConsent,
  startDemo,
  startVerification,
} from "../src/domain/engine";

const now = 1_790_985_600_000;
test("persist only allowlisted demo metadata, never injected personal data or tokens", () => {
  const base = startDemo("sample", now);
  const extended = {
    ...base,
    alias: "Private session label",
    password: "do-not-store",
    token: "do-not-store",
    nin: "do-not-store",
    requests: base.requests.map((r) => ({
      ...r,
      image: "do-not-store",
      attributes: { fullName: "do-not-store" },
    })),
  };
  const serialized = serializeState(extended);
  assert.equal(serialized.includes("do-not-store"), false);
  assert.equal(serialized.includes("Private session label"), false);
  assert.equal(serialized.includes("Emeka"), false);
  assert.equal(serialized.includes("DEMO-NIN"), false);
  assert.equal(restoreState(serialized, now).signedIn, false);
});
test("restoring an interrupted verification requires a fresh sample check", () => {
  const s = startVerification(startDemo("new", now), now + 1);
  assert.equal(
    restoreState(serializeState(s), now + 2).verification,
    "unverified",
  );
});
test("restoration expires old grants and rejects malformed persisted data", () => {
  let s = createRequest(
    startDemo("sample", now),
    ["over18"],
    "minute",
    "reuse",
    now + 1,
  );
  s = decideConsent(s, s.requests[0].id, true, ["over18"], now + 2);
  assert.equal(
    restoreState(serializeState(s), now + 60_002).requests[0].status,
    "expired",
  );
  assert.throws(() => restoreState("{broken", now));
  assert.throws(() =>
    restoreState(
      JSON.stringify({
        ...s,
        requests: [{ ...s.requests[0], approved: ["nin"] }],
      }),
      now,
    ),
  );
  assert.equal(restoreState(null, now).initialized, false);
});
