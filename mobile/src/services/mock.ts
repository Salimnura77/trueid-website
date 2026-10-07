import { createRequest, partnerResult } from "../domain/engine";
import type { PartnerService, VerificationService } from "./contracts";

export const verificationService: VerificationService = {
  mode: "demo",
  async verify({ sampleReference, scenario }) {
    if (sampleReference !== "DEMO-NIN-001")
      throw new Error("Only the supplied sample identifier is accepted.");
    const started = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 1600));
    if (scenario === "error")
      throw new Error(
        "The simulated provider is unavailable. Try another outcome or request a demo manual review.",
      );
    return { outcome: scenario, elapsedMs: Date.now() - started };
  },
};
export const partnerService: PartnerService = {
  mode: "demo",
  create: (state, input, now) =>
    createRequest(state, input.attributes, input.duration, input.purpose, now),
  read: partnerResult,
};
