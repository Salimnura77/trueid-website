import { z } from "zod";
import { emptyState, expireRequests } from "../domain/engine";
import { EVENT_LABELS, type PilotState } from "../domain/model";

const time = z.number().finite().nonnegative();
const id = z.string().regex(/^(req|evt|review)-\d+-\d+$/);
const attributes = z
  .array(z.enum(["fullName", "over18", "nationality", "verification"]))
  .max(4);
// Whitelist demo metadata. No attribute values, alias, identifiers, documents,
// secrets or free-form text can enter storage through this schema.
const schema = z.object({
  version: z.literal(1),
  initialized: z.boolean(),
  signedIn: z.boolean(),
  profile: z.enum(["sample", "new"]),
  verification: z.enum([
    "unverified",
    "checking",
    "verified",
    "review",
    "unable",
  ]),
  issuedAt: time.optional(),
  verificationMs: time.optional(),
  requests: z
    .array(
      z.object({
        id,
        purpose: z.enum(["onboarding", "reuse"]),
        requested: attributes,
        approved: attributes,
        duration: z.enum(["minute", "day", "week"]),
        createdAt: time,
        decidedAt: time.optional(),
        expiresAt: time,
        status: z.enum([
          "pending",
          "approved",
          "declined",
          "revoked",
          "expired",
        ]),
      }),
    )
    .max(100),
  events: z
    .array(
      z.object({
        id,
        kind: z.enum(
          Object.keys(EVENT_LABELS) as [
            keyof typeof EVENT_LABELS,
            ...(keyof typeof EVENT_LABELS)[],
          ],
        ),
        at: time,
        requestId: id.optional(),
      }),
    )
    .max(300),
  review: z
    .object({
      id,
      reason: z.enum(["mismatch", "uncertain", "failed"]),
      status: z.enum(["queued", "resolved"]),
      createdAt: time,
    })
    .optional(),
  recovery: z
    .object({ status: z.enum(["queued", "completed"]), createdAt: time })
    .optional(),
  feedback: z
    .object({
      rating: z.union([
        z.literal(1),
        z.literal(2),
        z.literal(3),
        z.literal(4),
        z.literal(5),
      ]),
      reason: z.enum(["clear", "too_many_steps", "needs_context"]),
    })
    .optional(),
});
export function serializeState(state: PilotState): string {
  return JSON.stringify(schema.parse({ ...state, signedIn: false }));
}
export function restoreState(raw: string | null, now: number): PilotState {
  if (!raw) return emptyState();
  const state = schema.parse(JSON.parse(raw));
  return expireRequests(
    {
      ...state,
      signedIn: false,
      verification:
        state.verification === "checking" ? "unverified" : state.verification,
    },
    now,
  );
}
