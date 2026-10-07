import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Confirmation,
  Detail,
  Empty,
  IconTile,
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
import { usePilot } from "../state/PilotProvider";
import { useAppNav, type ScreenProps } from "../navigation/types";
import {
  ATTRIBUTE_LABELS,
  DURATIONS,
  PARTNER,
  PURPOSES,
  SAMPLE_ATTRIBUTES,
  type AttributeKey,
  type PartnerRequest,
} from "../domain/model";
import { requestStatus } from "../domain/engine";
import { colors as c, fonts } from "../theme";

function RequestCard({ request }: { request: PartnerRequest }) {
  const { now } = usePilot();
  const nav = useAppNav();
  return (
    <Card>
      <Row>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 14,
            backgroundColor: c.blueLight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Txt bold style={{ color: "#164BAB" }}>
            KF
          </Txt>
        </View>
        <View style={{ flex: 1 }}>
          <Title small>{PARTNER.name}</Title>
          <Txt muted style={{ fontSize: 11 }}>
            Fictional fintech partner
          </Txt>
        </View>
        <Status status={requestStatus(request, now)} />
      </Row>
      <Txt muted style={{ fontSize: 13 }}>
        {PURPOSES[request.purpose]}
      </Txt>
      <Row style={{ flexWrap: "wrap", gap: 6 }}>
        {request.requested.map((key) => (
          <Tag key={key} text={ATTRIBUTE_LABELS[key]} tone="muted" />
        ))}
      </Row>
      <Txt muted style={{ fontSize: 11 }}>
        {dateTime(request.createdAt)} · {DURATIONS[request.duration].label}{" "}
        access if approved
      </Txt>
      <Button
        title={
          requestStatus(request, now) === "pending"
            ? "Review request"
            : "View consent details"
        }
        variant="secondary"
        onPress={() => nav.navigate("Request", { id: request.id })}
      />
    </Card>
  );
}
export function RequestsScreen() {
  const pilot = usePilot();
  const nav = useAppNav();
  const pending = pilot.state.requests.filter(
    (r) => requestStatus(r, pilot.now) === "pending",
  );
  return (
    <Screen
      title="Requests"
      subtitle="Every share starts with your permission."
      action={<Tag text={`${pending.length} PENDING`} tone="amber" />}
    >
      <Notice title="You decide what leaves your credential">
        Check who is asking, why they need it, and how long access lasts. You
        can approve a smaller set of attributes.
      </Notice>
      {pending.length ? (
        pending.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))
      ) : (
        <Empty
          title="No pending requests"
          body="Your decisions are in consent history. Create another sample request in the partner demo."
          icon="checkmark-done-outline"
        />
      )}
      <Button
        title="Consent history"
        variant="secondary"
        icon="time-outline"
        onPress={() => nav.navigate("Consents")}
      />
      <Button
        title="Open partner demo"
        variant="ghost"
        onPress={() => nav.navigate("Partner")}
      />
    </Screen>
  );
}
export function ConsentsScreen() {
  const pilot = usePilot();
  const history = pilot.state.requests.filter(
    (r) => requestStatus(r, pilot.now) !== "pending",
  );
  const active = history.filter(
    (r) => requestStatus(r, pilot.now) === "approved",
  ).length;
  return (
    <Screen
      title="Consent history"
      subtitle="Your decisions, with a way to change your mind."
    >
      <Row>
        <Card style={{ flex: 1 }}>
          <Txt
            style={{
              fontFamily: fonts.bold,
              fontSize: 28,
              lineHeight: 34,
              color: c.teal,
            }}
          >
            {active}
          </Txt>
          <Txt muted>Active access</Txt>
        </Card>
        <Card style={{ flex: 1 }}>
          <Txt style={{ fontFamily: fonts.bold, fontSize: 28, lineHeight: 34 }}>
            {history.length}
          </Txt>
          <Txt muted>Recorded requests</Txt>
        </Card>
      </Row>
      <Notice title="Revocation stops future access">
        Open an active consent to revoke it. The partner demo immediately stops
        displaying those attributes.
      </Notice>
      {history.length ? (
        history.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))
      ) : (
        <Empty
          title="Your choices will appear here"
          body="Approve or decline a partner request to start your demo consent history."
        />
      )}
    </Screen>
  );
}
export function RequestScreen({ route }: ScreenProps<"Request">) {
  const pilot = usePilot();
  const nav = useAppNav();
  const request = pilot.state.requests.find((r) => r.id === route.params.id);
  const [selected, setSelected] = useState<AttributeKey[]>(
    request?.requested ?? [],
  );
  const [confirmation, setConfirmation] = useState<
    "approve" | "decline" | "revoke" | null
  >(null);
  const [error, setError] = useState("");
  if (!request)
    return (
      <Screen>
        <Empty
          title="Request not found"
          body="This demo may have been reset. Return to your requests."
        />
        <Button
          title="Go to requests"
          onPress={() => nav.navigate("Tabs", { screen: "Requests" })}
        />
      </Screen>
    );
  const status = requestStatus(request, pilot.now);
  const pending = status === "pending";
  const confirm = () => {
    try {
      if (confirmation === "revoke") pilot.revoke(request.id);
      else pilot.decide(request.id, confirmation === "approve", selected);
      setConfirmation(null);
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setConfirmation(null);
    }
  };
  const ask = (choice: "approve" | "decline" | "revoke") => {
    if (choice === "approve" && !selected.length) {
      setError("Select at least one attribute, or decline this request.");
      return;
    }
    setError("");
    setConfirmation(choice);
  };
  return (
    <Screen
      title="A request for your identity"
      subtitle="Take a moment. You’re in control."
    >
      <Card>
        <Row>
          <IconTile
            name="business-outline"
            color="#164BAB"
            background={c.blueLight}
          />
          <View style={{ flex: 1 }}>
            <Title small>{PARTNER.name}</Title>
            <Txt muted style={{ fontSize: 12 }}>
              {PARTNER.description}
            </Txt>
          </View>
        </Row>
        <Status status={status} />
        <Detail label="Purpose" value={PURPOSES[request.purpose]} />
        <Detail label="Request date" value={dateTime(request.createdAt)} />
        <Detail
          label="Access duration"
          value={`${DURATIONS[request.duration].label} from approval`}
        />
        <Detail
          label={pending ? "Request valid until" : "Access expires / expired"}
          value={dateTime(request.expiresAt)}
        />
        {request.decidedAt ? (
          <Detail
            label="Decision recorded"
            value={dateTime(request.decidedAt)}
          />
        ) : null}
      </Card>
      <SectionHead
        title={pending ? "Choose what to share" : "Your consented attributes"}
      />
      {pending ? (
        <View style={{ gap: 10 }}>
          {request.requested.map((key) => (
            <Checkbox
              key={key}
              title={ATTRIBUTE_LABELS[key]}
              subtitle={
                pilot.state.verification === "verified"
                  ? `${SAMPLE_ATTRIBUTES[key]} · demo verified`
                  : "Available after sample verification"
              }
              checked={selected.includes(key)}
              onPress={() =>
                setSelected((keys) =>
                  keys.includes(key)
                    ? keys.filter((k) => k !== key)
                    : [...keys, key],
                )
              }
            />
          ))}
        </View>
      ) : request.approved.length ? (
        <Card>
          {request.approved.map((key) => (
            <Detail
              key={key}
              label={ATTRIBUTE_LABELS[key]}
              value={SAMPLE_ATTRIBUTES[key]}
            />
          ))}
          <Txt muted style={{ fontSize: 12 }}>
            {status === "approved"
              ? "Only these attributes are currently accessible to the partner."
              : "This is your historical consent record. These attributes are no longer accessible to the partner."}
          </Txt>
        </Card>
      ) : (
        <Empty
          title="No attributes were shared"
          body="The partner cannot access this sample credential through this request."
        />
      )}
      {pending && pilot.state.verification !== "verified" ? (
        <Notice title="Verify your sample before approving" tone="warning">
          You can decline now, or complete a successful sample verification
          first.
        </Notice>
      ) : null}
      {error ? <Notice title={error} tone="error" /> : null}
      {pending ? (
        <>
          <Button
            title={`Approve ${selected.length} attribute${selected.length === 1 ? "" : "s"}`}
            onPress={() => ask("approve")}
            disabled={pilot.state.verification !== "verified"}
            icon="shield-checkmark-outline"
          />
          <Button
            title="Decline request"
            variant="secondary"
            onPress={() => ask("decline")}
          />
          {pilot.state.verification !== "verified" ? (
            <Button
              title="Verify sample identity"
              variant="ghost"
              onPress={() => nav.navigate("Verify")}
            />
          ) : null}
        </>
      ) : status === "approved" ? (
        <Button
          title="Revoke access"
          variant="danger"
          icon="lock-closed-outline"
          onPress={() => ask("revoke")}
        />
      ) : (
        <Notice title={`This request is ${status}`}>
          {status === "expired"
            ? "Access has ended automatically. A new request needs a fresh decision."
            : "The partner receives a status only, with no attributes."}
        </Notice>
      )}
      <Notice title="A consent decision, not a blanket permission">
        Only the selected attributes are released in this demo. Your sample
        identifier and session label are never part of the request.
      </Notice>
      <Button
        title="View partner demo"
        variant="ghost"
        onPress={() => nav.navigate("Partner")}
      />
      <Confirmation
        visible={confirmation !== null}
        title={
          confirmation === "approve"
            ? "Approve this share?"
            : confirmation === "revoke"
              ? "Revoke partner access?"
              : "Decline this request?"
        }
        body={
          confirmation === "approve"
            ? `Kora Finance will receive ${selected.map((key) => ATTRIBUTE_LABELS[key]).join(", ")} for ${DURATIONS[request.duration].label}. This decision is recorded in demo history.`
            : confirmation === "revoke"
              ? "Future access stops immediately in the demo. In a real service, revocation cannot erase information a partner already lawfully received. This action is recorded."
              : "Kora Finance will receive no attributes. Your decline is recorded, and a new request will need a fresh decision."
        }
        confirmLabel={
          confirmation === "approve"
            ? "Confirm approval"
            : confirmation === "revoke"
              ? "Confirm revocation"
              : "Confirm decline"
        }
        danger={confirmation !== "approve"}
        onConfirm={confirm}
        onCancel={() => setConfirmation(null)}
      />
    </Screen>
  );
}
