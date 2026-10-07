import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  Choice,
  Confirmation,
  Detail,
  IconTile,
  MenuRow,
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
import { useAppNav } from "../navigation/types";
import { colors as c, fonts } from "../theme";

export function ProfileScreen() {
  const { state, alias } = usePilot();
  const nav = useAppNav();
  return (
    <Screen
      title="Your profile"
      subtitle="A little about your demo. Everything about your control."
    >
      <Card>
        <Row>
          <View
            style={{
              width: 66,
              height: 66,
              borderRadius: 22,
              backgroundColor: c.tealLight,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Txt
              style={{ fontFamily: fonts.bold, fontSize: 24, color: c.teal }}
            >
              EO
            </Txt>
          </View>
          <View style={{ flex: 1, gap: 5 }}>
            <Title small>Emeka Okonkwo</Title>
            <Tag text="FICTIONAL SAMPLE PROFILE" />
            <Status status={state.verification} />
          </View>
        </Row>
        <Detail
          label="Session label · user-entered, not verified"
          value={alias}
        />
        <Txt muted style={{ fontSize: 12 }}>
          The profile’s identity attributes are fixed sample data. Your session
          label is kept only in memory.
        </Txt>
      </Card>
      <Card>
        <MenuRow
          title="Activity history"
          subtitle="Your demo checks, decisions, and partner access"
          icon="time-outline"
          onPress={() => nav.navigate("Activity")}
        />
        <MenuRow
          title="Privacy & consent"
          subtitle="Understand what is stored and shared"
          icon="shield-checkmark-outline"
          onPress={() => nav.navigate("Privacy")}
        />
        <MenuRow
          title="Recovery"
          subtitle="Explore a lost-access support path"
          icon="key-outline"
          onPress={() => nav.navigate("Recovery")}
        />
        <MenuRow
          title="Help & manual review"
          subtitle="A next step when a check needs help"
          icon="help-circle-outline"
          onPress={() => nav.navigate("Help")}
        />
        <MenuRow
          title="Settings"
          subtitle="Manage this local demo"
          icon="settings-outline"
          onPress={() => nav.navigate("Settings")}
        />
      </Card>
      <Card>
        <Tag text="PILOT TOOLS" tone="blue" />
        <MenuRow
          title="Partner demo"
          subtitle="Create a request and inspect its result"
          icon="business-outline"
          onPress={() => nav.navigate("Partner")}
        />
        <MenuRow
          title="Pilot metrics"
          subtitle="Illustrative examples and local feedback"
          icon="stats-chart-outline"
          onPress={() => nav.navigate("Metrics")}
        />
      </Card>
    </Screen>
  );
}
export function RecoveryScreen() {
  const pilot = usePilot();
  const nav = useAppNav();
  const [reason, setReason] = useState("device");
  const [confirm, setConfirm] = useState(false);
  const recovery = pilot.state.recovery;
  return (
    <Screen
      title="Let’s get you back in"
      subtitle="A recovery path that explains the next step."
    >
      <Notice title="Account recovery simulation">
        There is no password, real account, OTP, or identity recovery in this
        pilot. No email or SMS will be sent.
      </Notice>
      {recovery ? (
        <Card>
          <Row>
            <IconTile
              name={
                recovery.status === "queued"
                  ? "hourglass-outline"
                  : "checkmark-circle-outline"
              }
            />
            <View style={{ flex: 1 }}>
              <Title small>
                {recovery.status === "queued"
                  ? "Demo recovery is queued"
                  : "Recovery simulation completed"}
              </Title>
              <Tag
                text={
                  recovery.status === "queued"
                    ? "AWAITING DEMO REVIEW"
                    : "DEMO COMPLETE"
                }
                tone={recovery.status === "queued" ? "amber" : "teal"}
              />
            </View>
          </Row>
          <Detail label="Requested" value={dateTime(recovery.createdAt)} />
          <Txt muted>
            {recovery.status === "queued"
              ? "In a connected service, trained support would confirm account ownership through an approved process before restoring access and ending old sessions."
              : "A demo completion event was recorded. This did not prove account ownership, change your verification status, or authenticate a real account."}
          </Txt>
          {recovery.status === "queued" ? (
            <Button
              title="Simulate recovery completion"
              onPress={() => setConfirm(true)}
            />
          ) : (
            <Button
              title="Return to demo"
              onPress={() =>
                pilot.state.signedIn
                  ? nav.navigate("Tabs", { screen: "Home" })
                  : pilot.state.initialized
                    ? pilot.resume()
                    : nav.navigate("Welcome")
              }
            />
          )}
        </Card>
      ) : (
        <>
          <Title small>What happened?</Title>
          <Choice
            title="I lost access to my device"
            selected={reason === "device"}
            onPress={() => setReason("device")}
          />
          <Choice
            title="I need help getting back in"
            selected={reason === "access"}
            onPress={() => setReason("access")}
          />
          <Button
            title="Start demo recovery"
            onPress={pilot.recover}
            icon="key-outline"
          />
        </>
      )}
      <Card>
        <Title small>We will not ask for</Title>
        <Txt muted>
          Your password, banking PIN, real NIN, or a payment to complete this
          demo. Keep all real identity documents out of the app.
        </Txt>
      </Card>
      <Button
        title="Help & support"
        variant="secondary"
        onPress={() => nav.navigate("Help")}
      />
      <Confirmation
        visible={confirm}
        title="Complete the recovery simulation?"
        body="This records a demo recovery event only. No real account is restored or authenticated."
        confirmLabel="Complete demo recovery"
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          pilot.completeRecovery();
          setConfirm(false);
        }}
      />
    </Screen>
  );
}
export function HelpScreen() {
  const { state } = usePilot();
  const nav = useAppNav();
  const [expanded, setExpanded] = useState<number | null>(0);
  const faqs = [
    {
      q: "Is this a real identity check?",
      a: "No. Every profile, verification result, credential, and partner in this app is sample data. No identity provider or government service is connected.",
    },
    {
      q: "What happens when I revoke access?",
      a: "The partner demo can no longer retrieve or display attributes for that consent. Your own history retains your original decision. In a real service, revocation stops future access; it cannot erase information already received.",
    },
    {
      q: "Can I enter my own NIN or upload an ID?",
      a: "No. The pilot accepts only the supplied DEMO-NIN-001 fixture and does not collect images, selfies, passwords, or real identity information.",
    },
    {
      q: "Does my demo survive an app restart?",
      a: "Only non-sensitive demo choices and event metadata are saved locally. Use Resume saved demo from the welcome screen. The optional session label is not saved.",
    },
    {
      q: "Why does access expire?",
      a: "Each consent has a defined duration starting at approval. A 1-minute option in the partner demo lets you test expiry. Once time runs out, no attributes are released.",
    },
  ];
  return (
    <Screen title="Here to help" subtitle="Clear answers and a next step.">
      <Card>
        <MenuRow
          title="Account recovery"
          subtitle="Try the lost-access support flow"
          icon="key-outline"
          onPress={() => nav.navigate("Recovery")}
        />
        {state.signedIn ? (
          <MenuRow
            title="Manual review"
            subtitle={
              state.review?.status === "queued"
                ? "Your demo case is waiting for review"
                : "For failed, mismatched, or uncertain sample checks"
            }
            icon="people-outline"
            onPress={() => nav.navigate("Review")}
          />
        ) : null}
        <MenuRow
          title="Privacy information"
          subtitle="What is stored and how sharing works"
          icon="shield-outline"
          onPress={() => nav.navigate("Privacy")}
        />
      </Card>
      <Title small>Common questions</Title>
      {faqs.map((faq, i) => (
        <Card key={faq.q}>
          <Button
            title={faq.q}
            variant="ghost"
            onPress={() => setExpanded(expanded === i ? null : i)}
            icon={expanded === i ? "remove-outline" : "add-outline"}
            style={{ justifyContent: "flex-start", paddingHorizontal: 0 }}
          />
          {expanded === i ? <Txt muted>{faq.a}</Txt> : null}
        </Card>
      ))}
      <Notice title="Support in this build is simulated">
        Manual-review and recovery cases stay on this device. No real support
        team receives them.
      </Notice>
    </Screen>
  );
}
export function PrivacyScreen() {
  return (
    <Screen
      title="Privacy, in plain language"
      subtitle="What this demo does with your choices."
    >
      {[
        {
          icon: "phone-portrait-outline" as const,
          title: "Only demo metadata is saved",
          body: "This device stores scenario outcomes, attribute key selections, request timestamps, consent decisions, coded review reasons, demo feedback, and local event records. It does not save the session label or any real identity information.",
        },
        {
          icon: "options-outline" as const,
          title: "You approve specific attributes",
          body: "The partner can request a sample name, an over-18 answer, nationality, and demo verification status. You can uncheck attributes before approval. The sample NIN reference is never shared.",
        },
        {
          icon: "lock-closed-outline" as const,
          title: "Access has a boundary",
          body: "Pending, declined, revoked, expired, and unavailable results contain no attributes. Revocation stops future access. Your own consent history retains a readable record of your decision.",
        },
        {
          icon: "flask-outline" as const,
          title: "A prototype, not a security guarantee",
          body: "Both user and partner views run on the same device. There is no real authentication, cryptographic credential, server authorization, or tamper-proof audit log. Local demo data can be edited by someone controlling the device.",
        },
        {
          icon: "trash-outline" as const,
          title: "You can clear the demo",
          body: "Settings → Reset demo clears this app’s local demo state and returns you to the welcome screen. No remote profile or production identity account exists.",
        },
      ].map((item) => (
        <Card key={item.title}>
          <Row>
            <IconTile name={item.icon} />
            <Title small style={{ flex: 1 }}>
              {item.title}
            </Title>
          </Row>
          <Txt muted>{item.body}</Txt>
        </Card>
      ))}
      <Notice title="No live endorsement or integration">
        TrueID’s broader website describes planned capabilities. This demo does
        not establish regulatory approval, government endorsement, or a
        relationship with a real fintech.
      </Notice>
    </Screen>
  );
}
export function SettingsScreen() {
  const pilot = usePilot();
  const nav = useAppNav();
  const [reset, setReset] = useState(false);
  return (
    <Screen
      title="Settings"
      subtitle="Keep your demo simple and under your control."
    >
      <Card>
        <Title small>About this build</Title>
        <Detail label="App" value="TrueID · Pilot 1.0" />
        <Detail
          label="Verification provider"
          value="Mock adapter · no live connection"
        />
        <Detail label="Identity source" value="NIN sample only" />
        <Detail label="Partner" value="Kora Finance · fictional" />
      </Card>
      <Card>
        <Title small>Planned capabilities</Title>
        {[
          "Wallet transfers & payments",
          "USSD access",
          "Additional identity documents",
          "Live government integrations",
          "Partner SDK & public API",
        ].map((label) => (
          <Row key={label} style={{ justifyContent: "space-between" }}>
            <Txt style={{ flex: 1, fontSize: 13 }}>{label}</Txt>
            <Tag text="PLANNED" tone="muted" />
          </Row>
        ))}
      </Card>
      <Button
        title="Privacy & storage details"
        variant="secondary"
        onPress={() => nav.navigate("Privacy")}
      />
      <Button
        title="Sign out of demo"
        variant="secondary"
        onPress={pilot.signOut}
      />
      <Txt muted style={{ fontSize: 12 }}>
        Signing out keeps demo progress on this device. No authenticated session
        or access token exists.
      </Txt>
      <Button
        title="Reset demo"
        variant="danger"
        onPress={() => setReset(true)}
      />
      <Confirmation
        visible={reset}
        title="Reset your demo?"
        body="This clears saved sample requests, decisions, review status, feedback, and activity on this device. You will return to the welcome screen."
        confirmLabel="Clear demo data"
        danger
        onConfirm={() => {
          setReset(false);
          pilot.reset();
        }}
        onCancel={() => setReset(false)}
      />
    </Screen>
  );
}
