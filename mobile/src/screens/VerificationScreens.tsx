import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Choice,
  Confirmation,
  Detail,
  Icon,
  IconTile,
  Notice,
  Row,
  Screen,
  Status,
  Tag,
  Title,
  Txt,
  dateTime,
} from "../components/ui";
import { usePilot } from "../state/PilotProvider";
import { useAppNav, type ScreenProps } from "../navigation/types";
import type { Scenario } from "../domain/model";
import { colors as c } from "../theme";

export function VerifyScreen() {
  const pilot = usePilot();
  const nav = useAppNav();
  const [scenario, setScenario] = useState<Scenario>("verified");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const busy = pilot.state.verification === "checking";
  const run = async () => {
    setConfirm(false);
    setError("");
    try {
      await pilot.verify(scenario);
      if (nav.isFocused()) nav.replace("Result");
    } catch (e) {
      if (nav.isFocused())
        nav.replace("Result", { error: (e as Error).message });
    }
  };
  const submit = () => {
    if (!accepted) {
      setError("Please confirm you want to run a sample check.");
      return;
    }
    if (pilot.state.verification === "verified") setConfirm(true);
    else void run();
  };
  return (
    <Screen
      title="Verify your identity"
      subtitle="A guided sample check, with you in control."
    >
      <Row style={{ gap: 5 }}>
        {["Sample ID", "Demo check", "Your credential"].map((step, i) => (
          <View key={step} style={{ flex: 1, gap: 8 }}>
            <View
              style={{
                height: 4,
                backgroundColor: i === 0 || busy ? c.teal : c.border,
                borderRadius: 4,
              }}
            />
            <Txt muted style={{ fontSize: 10 }}>
              {i + 1}. {step}
            </Txt>
          </View>
        ))}
      </Row>
      <Card>
        <Row>
          <IconTile name="id-card-outline" />
          <View style={{ flex: 1 }}>
            <Title small>National Identity Number</Title>
            <Txt muted style={{ fontSize: 12 }}>
              The only identity type in this pilot
            </Txt>
          </View>
          <Tag text="DEMO" />
        </Row>
        <Detail label="Sample identifier" value="DEMO-NIN-001" />
        <Detail label="Sample person" value="Emeka Okonkwo" />
        <Notice title="No real NIN or document upload">
          This identifier is fictional. The mock service does not contact NIMC
          or any identity provider.
        </Notice>
      </Card>
      <Title small>Choose a demo outcome</Title>
      <View style={{ gap: 10 }}>
        {(
          [
            {
              key: "verified",
              title: "Verified",
              body: "Issue a sample TrueID credential.",
              icon: "checkmark-circle-outline",
            },
            {
              key: "review",
              title: "Needs review",
              body: "Try an uncertain or mismatched sample.",
              icon: "hourglass-outline",
            },
            {
              key: "unable",
              title: "Unable to verify",
              body: "Try a failed check and the support path.",
              icon: "close-circle-outline",
            },
            {
              key: "error",
              title: "Service unavailable",
              body: "Try a simulated connection error.",
              icon: "cloud-offline-outline",
            },
          ] as const
        ).map((item) => (
          <Choice
            key={item.key}
            title={item.title}
            description={item.body}
            icon={item.icon}
            selected={scenario === item.key}
            onPress={() => {
              if (!busy) setScenario(item.key);
            }}
          />
        ))}
      </View>
      <Checkbox
        title="Run this check using sample data"
        subtitle="I understand the result is simulated."
        checked={accepted}
        onPress={() => setAccepted(!accepted)}
        disabled={busy}
      />
      {error ? <Notice title={error} tone="error" /> : null}
      {busy ? (
        <Notice title="Checking the sample…">
          Simulating the verification service. No personal data is being sent.
        </Notice>
      ) : null}
      <Button
        title={busy ? "Checking sample…" : "Run demo verification"}
        loading={busy}
        onPress={submit}
        icon="shield-checkmark-outline"
      />
      <Confirmation
        visible={confirm}
        title="Run another sample check?"
        body="Your current sample credential will be replaced. All active partner access will be revoked, so a later verification cannot revive an old consent."
        confirmLabel="Run another check"
        onConfirm={() => void run()}
        onCancel={() => setConfirm(false)}
      />
    </Screen>
  );
}
export function ResultScreen({ route }: ScreenProps<"Result">) {
  const { state } = usePilot();
  const nav = useAppNav();
  const verified = state.verification === "verified";
  const review = state.verification === "review";
  return (
    <Screen>
      <Card style={{ alignItems: "center", paddingVertical: 32 }}>
        <View
          style={{
            width: 84,
            height: 84,
            borderRadius: 42,
            backgroundColor: verified ? c.tealLight : c.amberLight,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            name={
              verified
                ? "shield-checkmark-outline"
                : review
                  ? "hourglass-outline"
                  : "alert-circle-outline"
            }
            color={verified ? c.teal : c.amber}
            size={43}
          />
        </View>
        <Tag text="SIMULATED RESULT" />
        <Title style={{ textAlign: "center" }}>
          {verified
            ? "Your sample ID is ready."
            : review
              ? "A closer look is needed."
              : "Let’s find another way."}
        </Title>
        <Status status={state.verification} />
        <Txt muted style={{ textAlign: "center" }}>
          {verified
            ? "You can now reuse this sample credential with Kora Finance, one approved request at a time."
            : review
              ? "This sample has uncertain information. Request a demo manual review to see what happens next."
              : "The sample could not be verified. Try another demo outcome or ask for a manual review."}
        </Txt>
      </Card>
      {route.params?.error ? (
        <Notice title="Simulated service error" tone="error">
          {route.params.error}
        </Notice>
      ) : null}
      <Notice title="Demo verification only">
        No real identity check occurred. This result cannot be used to prove
        identity outside this pilot.
      </Notice>
      {verified ? (
        <>
          <Button
            title="View my TrueID"
            onPress={() => nav.replace("Credential")}
            icon="id-card-outline"
          />
          <Button
            title="Review partner requests"
            variant="secondary"
            onPress={() => nav.navigate("Tabs", { screen: "Requests" })}
          />
        </>
      ) : (
        <>
          <Button
            title="Request manual review"
            onPress={() => nav.navigate("Review")}
            icon="people-outline"
          />
          <Button
            title="Try another sample check"
            variant="secondary"
            onPress={() => nav.replace("Verify")}
          />
        </>
      )}
      <Button
        title="Back to home"
        variant="ghost"
        onPress={() => nav.navigate("Tabs", { screen: "Home" })}
      />
    </Screen>
  );
}
export function ReviewScreen() {
  const pilot = usePilot();
  const nav = useAppNav();
  const [reason, setReason] = useState<"mismatch" | "uncertain" | "failed">(
    "mismatch",
  );
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState<boolean | null>(null);
  const ticket = pilot.state.review;
  const allowed = ["review", "unable"].includes(pilot.state.verification);
  return (
    <Screen
      title="Manual review"
      subtitle="A clear next step when a sample check needs help."
    >
      <Notice title="Demo support queue">
        No case is sent to a real reviewer. The controls below simulate a review
        decision without documents or selfies.
      </Notice>
      {ticket ? (
        <Card>
          <Row>
            <IconTile name="file-tray-full-outline" />
            <View style={{ flex: 1 }}>
              <Title small>
                {ticket.status === "queued"
                  ? "Your demo case is queued"
                  : "Demo review completed"}
              </Title>
              <Tag
                text={
                  ticket.status === "queued"
                    ? "AWAITING DEMO REVIEW"
                    : "RESOLVED"
                }
                tone={ticket.status === "queued" ? "amber" : "teal"}
              />
            </View>
          </Row>
          <Detail label="Case reference" value={ticket.id} />
          <Detail label="Requested" value={dateTime(ticket.createdAt)} />
          <Txt muted>
            A reviewer would compare permitted source information, explain any
            mismatch, and notify you of the outcome. No real turnaround is
            promised in this demo.
          </Txt>
        </Card>
      ) : allowed ? (
        <>
          <Title small>What needs a closer look?</Title>
          {(
            [
              {
                key: "mismatch",
                title: "The sample information does not match",
              },
              { key: "uncertain", title: "The result needs clarification" },
              { key: "failed", title: "The sample check failed" },
            ] as const
          ).map((item) => (
            <Choice
              key={item.key}
              title={item.title}
              selected={reason === item.key}
              onPress={() => setReason(item.key)}
            />
          ))}
          <Button
            title="Create demo review case"
            onPress={() => {
              try {
                pilot.review(reason);
              } catch (e) {
                setError((e as Error).message);
              }
            }}
          />
        </>
      ) : (
        <Card>
          <Txt muted>
            Run a sample check with “Needs review” or “Unable to verify” to
            explore this path.
          </Txt>
          <Button
            title="Go to verification"
            onPress={() => nav.navigate("Verify")}
          />
        </Card>
      )}
      {ticket?.status === "queued" ? (
        <Card>
          <Tag text="DEMO REVIEWER CONTROLS" tone="blue" />
          <Title small>Try the review outcome</Title>
          <Txt muted>
            These controls imitate a reviewer. They do not create a real
            verified identity.
          </Txt>
          <Button
            title="Simulate reviewer approval"
            onPress={() => setConfirm(true)}
          />
          <Button
            title="Simulate unsuccessful review"
            variant="secondary"
            onPress={() => setConfirm(false)}
          />
        </Card>
      ) : ticket ? (
        <Button
          title="View verification result"
          onPress={() => nav.navigate("Result")}
        />
      ) : null}
      {error ? <Notice title={error} tone="error" /> : null}
      <Confirmation
        visible={confirm !== null}
        title="Apply a simulated review decision?"
        body="This only changes the sample credential in your local demo."
        confirmLabel="Apply demo decision"
        onConfirm={() => {
          try {
            pilot.resolveReview(confirm === true);
            setConfirm(null);
            nav.replace("Result");
          } catch (e) {
            setError((e as Error).message);
            setConfirm(null);
          }
        }}
        onCancel={() => setConfirm(null)}
      />
    </Screen>
  );
}
