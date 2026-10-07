export type VerificationStatus =
  "unverified" | "checking" | "verified" | "review" | "unable";
export type Scenario = "verified" | "review" | "unable" | "error";
export type AttributeKey =
  "fullName" | "over18" | "nationality" | "verification";
export type RequestStatus =
  "pending" | "approved" | "declined" | "revoked" | "expired";
export type AccessStatus = RequestStatus | "unavailable";
export type Duration = "minute" | "day" | "week";
export type EventKind =
  | "account_created"
  | "sample_loaded"
  | "verification_started"
  | "verification_verified"
  | "verification_review"
  | "verification_unable"
  | "verification_error"
  | "request_created"
  | "consent_approved"
  | "consent_declined"
  | "access_revoked"
  | "access_expired"
  | "partner_access"
  | "partner_denied"
  | "review_requested"
  | "review_resolved"
  | "recovery_requested"
  | "recovery_completed"
  | "feedback_saved";
export interface PartnerRequest {
  id: string;
  purpose: "onboarding" | "reuse";
  requested: AttributeKey[];
  approved: AttributeKey[];
  duration: Duration;
  createdAt: number;
  decidedAt?: number;
  expiresAt: number;
  status: RequestStatus;
}
export interface AuditEvent {
  id: string;
  kind: EventKind;
  at: number;
  requestId?: string;
}
export interface ReviewTicket {
  id: string;
  reason: "mismatch" | "uncertain" | "failed";
  status: "queued" | "resolved";
  createdAt: number;
}
export interface PilotState {
  version: 1;
  initialized: boolean;
  signedIn: boolean;
  profile: "sample" | "new";
  verification: VerificationStatus;
  issuedAt?: number;
  verificationMs?: number;
  requests: PartnerRequest[];
  events: AuditEvent[];
  review?: ReviewTicket;
  recovery?: { status: "queued" | "completed"; createdAt: number };
  feedback?: {
    rating: 1 | 2 | 3 | 4 | 5;
    reason: "clear" | "too_many_steps" | "needs_context";
  };
}
export interface PartnerResult {
  requestId: string;
  status: AccessStatus;
  attributes: Partial<Record<AttributeKey, string>>;
  expiresAt: number;
}

export const ATTRIBUTE_KEYS: AttributeKey[] = [
  "fullName",
  "over18",
  "nationality",
  "verification",
];
export const ATTRIBUTE_LABELS: Record<AttributeKey, string> = {
  fullName: "Full name",
  over18: "Over 18",
  nationality: "Nationality",
  verification: "Verification status",
};
export const SAMPLE_ATTRIBUTES: Record<AttributeKey, string> = {
  fullName: "Emeka Okonkwo",
  over18: "Yes",
  nationality: "Nigerian",
  verification: "Verified · demo",
};
export const PARTNER = {
  name: "Kora Finance",
  initials: "KF",
  description: "Fictional fintech · pilot partner",
};
export const PURPOSES = {
  onboarding: "Open a demo fintech account",
  reuse: "Reuse identity for a second onboarding check",
};
export const DURATIONS: Record<Duration, { label: string; ms: number }> = {
  minute: { label: "1 minute", ms: 60_000 },
  day: { label: "24 hours", ms: 86_400_000 },
  week: { label: "7 days", ms: 604_800_000 },
};
export const STATUS_LABELS: Record<VerificationStatus | AccessStatus, string> =
  {
    unverified: "Not verified",
    checking: "Checking sample",
    verified: "Verified",
    review: "Needs review",
    unable: "Unable to verify",
    pending: "Pending",
    approved: "Active access",
    declined: "Declined",
    revoked: "Revoked",
    expired: "Expired",
    unavailable: "Credential unavailable",
  };
export const EVENT_LABELS: Record<EventKind, string> = {
  account_created: "Demo account created",
  sample_loaded: "Sample credential loaded",
  verification_started: "Sample verification started",
  verification_verified: "Sample verification completed",
  verification_review: "Sample flagged for review",
  verification_unable: "Sample could not be verified",
  verification_error: "Simulated service error",
  request_created: "Kora Finance requested access",
  consent_approved: "You approved selected attributes",
  consent_declined: "You declined the request",
  access_revoked: "Partner access revoked",
  access_expired: "Access or request expired",
  partner_access: "Partner viewed approved attributes",
  partner_denied: "Partner access blocked",
  review_requested: "Demo manual review requested",
  review_resolved: "Demo reviewer completed the case",
  recovery_requested: "Demo recovery requested",
  recovery_completed: "Demo recovery completed",
  feedback_saved: "Sample partner feedback saved",
};
