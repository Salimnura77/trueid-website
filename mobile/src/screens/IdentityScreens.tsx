import React from "react";
import { Pressable, View } from "react-native";
import {
  Button,
  Card,
  Detail,
  Empty,
  Icon,
  IconTile,
  MenuRow,
  Notice,
  Row,
  Screen,
  SectionHead,
  Status,
  Tag,
  Title,
  Txt,
  dateTime,
} from "../components/ui";
import CredentialCard from "../components/CredentialCard";
import { usePilot } from "../state/PilotProvider";
import { useAppNav } from "../navigation/types";
import {
  ATTRIBUTE_KEYS,
  ATTRIBUTE_LABELS,
  EVENT_LABELS,
  PARTNER,
  SAMPLE_ATTRIBUTES,
} from "../domain/model";
import { requestStatus } from "../domain/engine";
import { colors as c, fonts } from "../theme";

export function HomeScreen() {
  const pilot = usePilot();
  const nav = useAppNav();
  const pending = pilot.state.requests.filter(
    (r) => requestStatus(r, pilot.now) === "pending",
  );
  const active = pilot.state.requests.filter(
    (r) => requestStatus(r, pilot.now) === "approved",
  );
  const verified = pilot.state.verification === "verified";
  return (
    <Screen>
      <Row style={{ justifyContent: "space-between" }}>
        <View style={{ gap: 4, flex: 1 }}>
          <Txt muted style={{ fontSize: 12 }}>
            YOUR PERSONAL IDENTITY SPACE
          </Txt>
          <Title>
            Hello, Emeka <Txt style={{ fontSize: 24 }}>✦</Txt>
          </Title>
          <Txt muted style={{ fontSize: 13 }}>
            Your identity. Always on your terms.
          </Txt>
        </View>
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: "#DAE9E7",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Txt bold style={{ color: c.teal }}>
            EO
          </Txt>
        </View>
      </Row>
      <CredentialCard />
      <Row>
        <Card style={{ flex: 1, gap: 7, padding: 16 }}>
          <Row>
            <Icon name="shield-checkmark-outline" size={17} />
            <Txt muted style={{ fontSize: 11 }}>
              Your credential
            </Txt>
          </Row>
          <Txt style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 32 }}>
            {verified ? "01" : "00"}
          </Txt>
          <Txt muted style={{ fontSize: 11 }}>
            {verified ? "Verified sample" : "Ready to verify"}
          </Txt>
        </Card>
        <Card style={{ flex: 1, gap: 7, padding: 16 }}>
          <Row>
            <Icon name="link-outline" size={17} />
            <Txt muted style={{ fontSize: 11 }}>
              Active access
            </Txt>
          </Row>
          <Txt style={{ fontFamily: fonts.bold, fontSize: 24, lineHeight: 32 }}>
            {String(active.length).padStart(2, "0")}
          </Txt>
          <Txt muted style={{ fontSize: 11 }}>
            You stay in control
          </Txt>
        </Card>
      </Row>
      {!verified ? (
        <Card>
          <Row>
            <IconTile name="scan-outline" />
            <View style={{ flex: 1 }}>
              <Title small>
                {pilot.state.verification === "review"
                  ? "Your next step: review"
                  : "Make your sample ID ready"}
              </Title>
              <Txt muted style={{ fontSize: 12 }}>
                A short, guided demo verification
              </Txt>
            </View>
          </Row>
          <Button
            title={
              pilot.state.verification === "review"
                ? "Open manual review"
                : "Verify sample identity"
            }
            onPress={() =>
              nav.navigate(
                pilot.state.verification === "review" ? "Review" : "Verify",
              )
            }
          />
        </Card>
      ) : null}
      <SectionHead title="Quick actions" />
      <Row style={{ gap: 10 }}>
        {(
          [
            {
              label: "My TrueID",
              icon: "id-card-outline",
              route: "Credential",
            },
            {
              label: "Access history",
              icon: "shield-checkmark-outline",
              route: "Consents",
            },
            {
              label: "Partner demo",
              icon: "business-outline",
              route: "Partner",
            },
          ] as const
        ).map((item) => (
          <Pressable
            key={item.label}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            onPress={() => nav.navigate(item.route)}
            style={{
              flex: 1,
              alignItems: "center",
              backgroundColor: c.white,
              borderColor: c.border,
              borderWidth: 1,
              paddingVertical: 17,
              paddingHorizontal: 6,
              borderRadius: 17,
              gap: 9,
            }}
          >
            <IconTile name={item.icon} />
            <Txt bold style={{ fontSize: 10, textAlign: "center" }}>
              {item.label}
            </Txt>
          </Pressable>
        ))}
      </Row>
      <SectionHead
        title="Waiting for your say"
        action="View requests"
        onPress={() => nav.navigate("Tabs", { screen: "Requests" })}
      />
      {pending.length ? (
        pending.slice(0, 2).map((request) => (
          <Card key={request.id}>
            <Row>
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: c.blueLight,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Txt bold style={{ color: "#164BAB" }}>
                  KF
                </Txt>
              </View>
              <View style={{ flex: 1 }}>
                <Title small>{PARTNER.name}</Title>
                <Txt muted style={{ fontSize: 12 }}>
                  Demo account onboarding
                </Txt>
              </View>
              <Tag text="NEW" tone="amber" />
            </Row>
            <Txt muted style={{ fontSize: 13 }}>
              Would like to access {request.requested.length} sample attributes.
              Nothing is shared until you approve.
            </Txt>
            <Button
              title="Review request"
              variant="secondary"
              onPress={() => nav.navigate("Request", { id: request.id })}
              icon="arrow-forward"
            />
          </Card>
        ))
      ) : (
        <Empty
          title="You’re all caught up"
          body="New requests appear here. Create another from the partner demo to try reusing your credential."
          icon="checkmark-circle-outline"
        />
      )}
      <SectionHead
        title="Recent activity"
        action="See all activity"
        onPress={() => nav.navigate("Activity")}
      />
      <Card>
        {pilot.state.events.slice(0, 3).map((e) => (
          <Row key={e.id} style={{ alignItems: "flex-start" }}>
            <View
              style={{
                marginTop: 6,
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: c.teal,
              }}
            />
            <View style={{ flex: 1 }}>
              <Txt style={{ fontSize: 12 }}>{EVENT_LABELS[e.kind]}</Txt>
              <Txt muted style={{ fontSize: 10 }}>
                {dateTime(e.at)} · demo event
              </Txt>
            </View>
          </Row>
        ))}
      </Card>
      <Notice title="A small pilot. A big idea.">
        One sample identity, one fictional fintech, and a clear record of every
        choice you make.
      </Notice>
    </Screen>
  );
}
export function VaultScreen() {
  const { state } = usePilot();
  const nav = useAppNav();
  return (
    <Screen
      title="My TrueID"
      subtitle="Your reusable identity, in one place."
      action={<Tag text="DEMO VAULT" />}
    >
      <CredentialCard />
      <Button
        title="View credential details"
        icon="id-card-outline"
        onPress={() => nav.navigate("Credential")}
      />
      <Card>
        <SectionHead title="Pilot identity source" />
        <Row>
          <IconTile name="document-text-outline" />
          <View style={{ flex: 1 }}>
            <Txt bold>National Identity Number</Txt>
            <Txt muted style={{ fontSize: 12 }}>
              Mock source · DEMO-NIN-001
            </Txt>
          </View>
        </Row>
        <Status status={state.verification} />
        <Txt muted style={{ fontSize: 12 }}>
          This credential contains fixed fictional attributes. No identity
          documents are stored.
        </Txt>
      </Card>
      <Card>
        <Title small>Built around your permission</Title>
        <MenuRow
          title="Consent history"
          subtitle="See your decisions and manage active access"
          icon="shield-checkmark-outline"
          onPress={() => nav.navigate("Consents")}
        />
        <MenuRow
          title="Verification & review"
          subtitle="Explore the sample verification outcomes"
          icon="scan-outline"
          onPress={() => nav.navigate("Verify")}
        />
      </Card>
      <Notice title="More capabilities are planned">
        Other identity types, payments, USSD, and additional integrations are
        outside this pilot.
      </Notice>
    </Screen>
  );
}
export function CredentialScreen() {
  const { state, alias } = usePilot();
  const nav = useAppNav();
  const verified = state.verification === "verified";
  return (
    <Screen
      title="Credential details"
      subtitle="Know exactly what your sample credential holds."
    >
      <CredentialCard />
      <Card>
        <Row style={{ justifyContent: "space-between" }}>
          <Title small>Credential record</Title>
          <Status status={state.verification} />
        </Row>
        <Detail label="Credential reference" value="TID-DEMO-001" />
        <Detail
          label="Issue date"
          value={state.issuedAt ? dateTime(state.issuedAt) : "Not issued"}
        />
        <Detail
          label="Verification source"
          value="TrueID mock service · sample NIN"
        />
        <Detail
          label="Credential status"
          value={
            verified
              ? "Active sample credential"
              : "No active sample credential"
          }
        />
      </Card>
      <SectionHead title="Available to share" />
      {verified ? (
        <Card>
          {ATTRIBUTE_KEYS.map((key) => (
            <Row
              key={key}
              style={{ justifyContent: "space-between", paddingVertical: 6 }}
            >
              <View style={{ flex: 1 }}>
                <Txt muted style={{ fontSize: 12 }}>
                  {ATTRIBUTE_LABELS[key]}
                </Txt>
                <Txt bold>{SAMPLE_ATTRIBUTES[key]}</Txt>
              </View>
              <Tag text="DEMO VERIFIED" />
            </Row>
          ))}
        </Card>
      ) : (
        <>
          <Empty
            title="No shareable attributes yet"
            body="Complete a successful sample check or a simulated manual review to issue your demo credential."
          />
          <Button
            title="Verify sample identity"
            onPress={() => nav.navigate("Verify")}
          />
        </>
      )}
      <Card>
        <Tag text="USER-ENTERED · NOT VERIFIED" tone="muted" />
        <Detail label="Demo session label" value={alias} />
        <Txt muted style={{ fontSize: 12 }}>
          Your session label is separate from the credential. It is not
          persisted or shared with the partner.
        </Txt>
      </Card>
      <Notice title="A demonstration, not proof of identity">
        “Demo verified” means a mock check passed. There is no government
        endorsement, regulatory approval, or live verification integration.
      </Notice>
      {verified ? (
        <Button
          title="Review partner requests"
          onPress={() => nav.navigate("Tabs", { screen: "Requests" })}
        />
      ) : null}
    </Screen>
  );
}
export function ActivityScreen() {
  const { state } = usePilot();
  return (
    <Screen
      title="Activity history"
      subtitle="A readable record of your demo journey."
    >
      <Notice title="Demo audit records">
        These local records illustrate the events a production system would
        audit. They are editable on the device, capped at 300 entries, and are
        not production evidence.
      </Notice>
      {state.events.length ? (
        <Card>
          {state.events.map((e, i) => (
            <Row
              key={e.id}
              style={{ alignItems: "flex-start", paddingBottom: 12 }}
            >
              <View style={{ alignItems: "center", width: 30, gap: 7 }}>
                <Icon
                  name={
                    e.kind.includes("revoked") || e.kind.includes("denied")
                      ? "lock-closed-outline"
                      : e.kind.includes("verification")
                        ? "shield-checkmark-outline"
                        : "time-outline"
                  }
                  size={20}
                />
                {i < state.events.length - 1 ? (
                  <View
                    style={{ height: 30, width: 1, backgroundColor: c.border }}
                  />
                ) : null}
              </View>
              <View style={{ flex: 1, gap: 4 }}>
                <Txt bold style={{ fontSize: 13 }}>
                  {EVENT_LABELS[e.kind]}
                </Txt>
                <Txt muted style={{ fontSize: 11 }}>
                  {dateTime(e.at)} · demo
                </Txt>
                {e.requestId ? (
                  <Txt muted style={{ fontSize: 10 }}>
                    Request …{e.requestId.slice(-9)}
                  </Txt>
                ) : null}
              </View>
            </Row>
          ))}
        </Card>
      ) : (
        <Empty
          title="No activity yet"
          body="Your sample checks and consent decisions will appear here."
        />
      )}
    </Screen>
  );
}
