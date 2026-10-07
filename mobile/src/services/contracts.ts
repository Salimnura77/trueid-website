import type {
  AttributeKey,
  Duration,
  PartnerRequest,
  PartnerResult,
  PilotState,
  Scenario,
} from "../domain/model";

// Replace these adapters only after provider authorization and server-side access
// control exist. The mock is a single-device demonstration, not a trust boundary.
export interface VerificationService {
  readonly mode: "demo";
  verify(input: {
    sampleReference: "DEMO-NIN-001";
    scenario: Scenario;
  }): Promise<{ outcome: Exclude<Scenario, "error">; elapsedMs: number }>;
}
export interface PartnerService {
  readonly mode: "demo";
  create(
    state: PilotState,
    input: {
      attributes: AttributeKey[];
      duration: Duration;
      purpose: PartnerRequest["purpose"];
    },
    now: number,
  ): PilotState;
  read(state: PilotState, requestId: string, now: number): PartnerResult;
}
