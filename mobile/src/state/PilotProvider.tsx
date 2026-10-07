import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AppState } from "react-native";
import * as engine from "../domain/engine";
import type {
  AttributeKey,
  Duration,
  PartnerRequest,
  PilotState,
  Scenario,
} from "../domain/model";
import { verificationService, partnerService } from "../services/mock";
import { demoStorage } from "../services/storage";

function usePilotStore() {
  const [state, setState] = useState<PilotState>(engine.emptyState);
  const current = useRef(state);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState("");
  const [alias, setAlias] = useState("Pilot-001");
  const [now, setNow] = useState(() => Date.now());
  const revision = useRef(0);
  const commit = useCallback((change: (s: PilotState) => PilotState) => {
    const next = change(current.current);
    if (next !== current.current) {
      current.current = next;
      setState(next);
    }
    return next;
  }, []);
  useEffect(() => {
    let active = true;
    demoStorage
      .load()
      .then((saved) => {
        if (active) {
          current.current = saved;
          setState(saved);
        }
      })
      .catch(() => {
        if (active)
          setStorageError(
            "Saved demo progress could not be loaded. You can start a new demo.",
          );
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    if (ready)
      demoStorage
        .save(state)
        .catch(() =>
          setStorageError(
            "Demo progress could not be saved on this device. You can continue in this session.",
          ),
        );
  }, [state, ready]);
  useEffect(() => {
    const tick = () => {
      const at = Date.now();
      setNow(at);
      commit((s) => engine.expireRequests(s, at));
    };
    const timer = setInterval(tick, 1000);
    const subscription = AppState.addEventListener("change", (mode) => {
      if (mode === "active") tick();
    });
    return () => {
      clearInterval(timer);
      subscription.remove();
    };
  }, [commit]);
  return {
    state,
    now,
    ready,
    alias,
    storageError,
    clearStorageError: () => setStorageError(""),
    start: (profile: "sample" | "new", label = "Pilot-001") => {
      revision.current++;
      setAlias(label);
      commit(() => engine.startDemo(profile, Date.now()));
    },
    resume: () => commit((s) => ({ ...s, signedIn: true })),
    signOut: () => {
      revision.current++;
      commit((s) => ({
        ...s,
        signedIn: false,
        verification:
          s.verification === "checking" ? "unverified" : s.verification,
      }));
    },
    reset: () => {
      revision.current++;
      setAlias("Pilot-001");
      commit(engine.emptyState);
    },
    async verify(scenario: Scenario) {
      const version = revision.current;
      const started = Date.now();
      commit((s) => engine.startVerification(s, started));
      try {
        const result = await verificationService.verify({
          sampleReference: "DEMO-NIN-001",
          scenario,
        });
        if (version === revision.current)
          commit((s) =>
            engine.finishVerification(
              s,
              result.outcome,
              result.elapsedMs,
              Date.now(),
            ),
          );
      } catch (error) {
        if (version === revision.current)
          commit((s) =>
            engine.finishVerification(
              s,
              "error",
              Date.now() - started,
              Date.now(),
            ),
          );
        throw error;
      }
    },
    createRequest: (
      attributes: AttributeKey[],
      duration: Duration,
      purpose: PartnerRequest["purpose"],
    ) =>
      commit((s) =>
        partnerService.create(s, { attributes, duration, purpose }, Date.now()),
      ).requests[0].id,
    decide: (id: string, approve: boolean, keys: AttributeKey[]) =>
      commit((s) => engine.decideConsent(s, id, approve, keys, Date.now())),
    revoke: (id: string) =>
      commit((s) => engine.revokeAccess(s, id, Date.now())),
    readPartner: (id: string) =>
      commit((s) => engine.accessPartner(s, id, Date.now())),
    review: (reason: "mismatch" | "uncertain" | "failed") =>
      commit((s) => engine.requestReview(s, reason, Date.now())),
    resolveReview: (approved: boolean) =>
      commit((s) => engine.resolveReview(s, approved, Date.now())),
    recover: () => commit((s) => engine.requestRecovery(s, Date.now())),
    completeRecovery: () =>
      commit((s) => engine.completeRecovery(s, Date.now())),
    feedback: (feedback: NonNullable<PilotState["feedback"]>) =>
      commit((s) => engine.saveFeedback(s, feedback, Date.now())),
  };
}
const Context = createContext<ReturnType<typeof usePilotStore> | null>(null);
export function PilotProvider({ children }: { children: React.ReactNode }) {
  return (
    <Context.Provider value={usePilotStore()}>{children}</Context.Provider>
  );
}
export function usePilot() {
  const context = useContext(Context);
  if (!context) throw new Error("PilotProvider is missing.");
  return context;
}
