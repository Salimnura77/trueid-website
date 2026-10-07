import {
  ATTRIBUTE_KEYS,
  DURATIONS,
  SAMPLE_ATTRIBUTES,
  type AttributeKey,
  type AuditEvent,
  type Duration,
  type EventKind,
  type PartnerRequest,
  type PartnerResult,
  type PilotState,
  type Scenario,
} from "./model";

let sequence = 0;
export const makeId = (prefix: string, now: number) =>
  `${prefix}-${now}-${++sequence}`;
export const emptyState = (): PilotState => ({
  version: 1,
  initialized: false,
  signedIn: false,
  profile: "new",
  verification: "unverified",
  requests: [],
  events: [],
});
const event = (
  kind: EventKind,
  now: number,
  requestId?: string,
): AuditEvent => ({
  id: makeId("evt", now),
  kind,
  at: now,
  ...(requestId ? { requestId } : {}),
});
function record(
  state: PilotState,
  kind: EventKind,
  now: number,
  requestId?: string,
): PilotState {
  return {
    ...state,
    events: [event(kind, now, requestId), ...state.events].slice(0, 300),
  };
}
export function requestStatus(request: PartnerRequest, now: number) {
  return (request.status === "approved" || request.status === "pending") &&
    now >= request.expiresAt
    ? "expired"
    : request.status;
}
export function expireRequests(state: PilotState, now: number): PilotState {
  let next = state;
  for (const request of state.requests) {
    if (
      request.status !== "expired" &&
      requestStatus(request, now) === "expired"
    ) {
      next = record(
        {
          ...next,
          requests: next.requests.map((r) =>
            r.id === request.id ? { ...r, status: "expired" } : r,
          ),
        },
        "access_expired",
        now,
        request.id,
      );
    }
  }
  return next;
}
export function createRequest(
  state: PilotState,
  requested: AttributeKey[],
  duration: Duration,
  purpose: PartnerRequest["purpose"],
  now: number,
): PilotState {
  const attributes = ATTRIBUTE_KEYS.filter((key) => requested.includes(key));
  if (
    !attributes.length ||
    !DURATIONS[duration] ||
    !["onboarding", "reuse"].includes(purpose)
  )
    throw new Error(
      "Choose at least one attribute and a valid access duration.",
    );
  if (!state.initialized) throw new Error("Start a demo account first.");
  const request: PartnerRequest = {
    id: makeId("req", now),
    purpose,
    requested: attributes,
    approved: [],
    duration,
    createdAt: now,
    expiresAt: now + 86_400_000,
    status: "pending",
  };
  return record(
    { ...state, requests: [request, ...state.requests].slice(0, 100) },
    "request_created",
    now,
    request.id,
  );
}
export function startDemo(profile: "sample" | "new", now: number): PilotState {
  let state: PilotState = {
    ...emptyState(),
    initialized: true,
    signedIn: true,
    profile,
    verification: profile === "sample" ? "verified" : "unverified",
    ...(profile === "sample" ? { issuedAt: now, verificationMs: 2400 } : {}),
  };
  state = record(
    state,
    profile === "sample" ? "sample_loaded" : "account_created",
    now,
  );
  return createRequest(
    state,
    ["fullName", "over18", "verification"],
    "day",
    "onboarding",
    now,
  );
}
export function startVerification(state: PilotState, now: number): PilotState {
  if (state.verification === "checking")
    throw new Error("A sample check is already running.");
  let next = expireRequests(state, now);
  for (const request of next.requests.filter((r) => r.status === "approved"))
    next = revokeAccess(next, request.id, now);
  return record(
    {
      ...next,
      verification: "checking",
      issuedAt: undefined,
      verificationMs: undefined,
      review: undefined,
    },
    "verification_started",
    now,
  );
}
export function finishVerification(
  state: PilotState,
  outcome: Scenario,
  elapsedMs: number,
  now: number,
): PilotState {
  if (state.verification !== "checking") return state;
  const status = outcome === "error" ? "unable" : outcome;
  return record(
    {
      ...state,
      verification: status,
      issuedAt: status === "verified" ? now : undefined,
      verificationMs: elapsedMs,
    },
    outcome === "error" ? "verification_error" : `verification_${outcome}`,
    now,
  );
}
export function decideConsent(
  state: PilotState,
  id: string,
  approve: boolean,
  selected: AttributeKey[],
  now: number,
): PilotState {
  const current = state.requests.find((r) => r.id === id);
  if (!current || requestStatus(current, now) !== "pending")
    throw new Error("This request is no longer pending.");
  if (approve && state.verification !== "verified")
    throw new Error("Complete sample verification before approving access.");
  if (
    approve &&
    (!selected.length ||
      selected.some(
        (k) => !current.requested.includes(k) || !ATTRIBUTE_KEYS.includes(k),
      ))
  )
    throw new Error("Choose only attributes requested by this partner.");
  const approved = approve
    ? ATTRIBUTE_KEYS.filter((k) => selected.includes(k))
    : [];
  return record(
    {
      ...state,
      requests: state.requests.map((r) =>
        r.id === id
          ? {
              ...r,
              status: approve ? "approved" : "declined",
              approved,
              decidedAt: now,
              expiresAt: now + DURATIONS[r.duration].ms,
            }
          : r,
      ),
    },
    approve ? "consent_approved" : "consent_declined",
    now,
    id,
  );
}
export function revokeAccess(
  state: PilotState,
  id: string,
  now: number,
): PilotState {
  const current = state.requests.find((r) => r.id === id);
  if (!current || requestStatus(current, now) !== "approved")
    throw new Error("There is no active access to revoke.");
  return record(
    {
      ...state,
      requests: state.requests.map((r) =>
        r.id === id ? { ...r, status: "revoked" } : r,
      ),
    },
    "access_revoked",
    now,
    id,
  );
}
export function partnerResult(
  state: PilotState,
  id: string,
  now: number,
): PartnerResult {
  const request = state.requests.find((r) => r.id === id);
  if (!request) throw new Error("Request not found.");
  const status = requestStatus(request, now);
  const effective =
    status === "approved" && state.verification !== "verified"
      ? "unavailable"
      : status;
  const attributes: PartnerResult["attributes"] = {};
  if (effective === "approved") {
    for (const key of ATTRIBUTE_KEYS)
      if (request.approved.includes(key) && request.requested.includes(key))
        attributes[key] = SAMPLE_ATTRIBUTES[key];
  }
  return {
    requestId: id,
    status: effective,
    attributes,
    expiresAt: request.expiresAt,
  };
}
export function accessPartner(
  state: PilotState,
  id: string,
  now: number,
): PilotState {
  const next = expireRequests(state, now);
  return record(
    next,
    partnerResult(next, id, now).status === "approved"
      ? "partner_access"
      : "partner_denied",
    now,
    id,
  );
}
export function requestReview(
  state: PilotState,
  reason: "mismatch" | "uncertain" | "failed",
  now: number,
): PilotState {
  if (!["review", "unable"].includes(state.verification))
    throw new Error(
      "Manual review is available after a failed or uncertain sample check.",
    );
  if (state.review?.status === "queued") return state;
  return record(
    {
      ...state,
      verification: "review",
      review: {
        id: makeId("review", now),
        reason,
        status: "queued",
        createdAt: now,
      },
    },
    "review_requested",
    now,
  );
}
export function resolveReview(
  state: PilotState,
  approved: boolean,
  now: number,
): PilotState {
  if (state.review?.status !== "queued")
    throw new Error("No review is waiting.");
  const next = record(
    {
      ...state,
      verification: approved ? "verified" : "unable",
      issuedAt: approved ? now : undefined,
      review: { ...state.review, status: "resolved" },
    },
    "review_resolved",
    now,
  );
  return record(
    next,
    approved ? "verification_verified" : "verification_unable",
    now,
  );
}
export function requestRecovery(state: PilotState, now: number): PilotState {
  return record(
    { ...state, recovery: { status: "queued", createdAt: now } },
    "recovery_requested",
    now,
  );
}
export function completeRecovery(state: PilotState, now: number): PilotState {
  if (state.recovery?.status !== "queued")
    throw new Error("Start a demo recovery first.");
  return record(
    { ...state, recovery: { ...state.recovery, status: "completed" } },
    "recovery_completed",
    now,
  );
}
export function saveFeedback(
  state: PilotState,
  feedback: NonNullable<PilotState["feedback"]>,
  now: number,
): PilotState {
  return record({ ...state, feedback }, "feedback_saved", now);
}
