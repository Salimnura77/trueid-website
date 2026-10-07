import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";
import {
  Button,
  Card,
  Checkbox,
  Choice,
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
import { useAppNav } from "../navigation/types";
import {
  ATTRIBUTE_KEYS,
  ATTRIBUTE_LABELS,
  DURATIONS,
  PARTNER,
  PURPOSES,
  type AttributeKey,
  type Duration,
} from "../domain/model";
import { partnerService } from "../services/mock";
import { requestStatus } from "../domain/engine";
import { sampleMetrics } from "../data/sampleMetrics";
import { colors as c, fonts } from "../theme";

export function PartnerScreen() {
  const pilot = usePilot();
  const nav = useAppNav();
  const [keys, setKeys] = useState<AttributeKey[]>([
    "fullName",
    "over18",
    "verification",
  ]);
  const [duration, setDuration] = useState<Duration>("day");
  const [purpose, setPurpose] = useState<"onboarding" | "reuse">("onboarding");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState("");
  const [error, setError] = useState("");
  const [creating, setCreating] = useState(false);
  useFocusEffect(useCallback(() => () => setSelectedId(null), []));
  const request = pilot.state.requests.find((r) => r.id === selectedId);
  // Re-evaluate from current state and clock, never retain released attributes in
  // a separate state object. Revocation and expiry immediately clear this view.
  const result = request
    ? partnerService.read(pilot.state, request.id, pilot.now)
    : null;
  const create = () => {
    try {
      const id = pilot.createRequest(keys, duration, purpose);
      setCreatedId(id);
      setCreating(false);
      setSelectedId(id);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };
  const inspect = (id: string) => {
    try {
      pilot.readPartner(id);
      setSelectedId(id);
      setError("");
    } catch (e) {
      setError((e as Error).message);
    }
  };
  return (
    <Screen
      title="Partner demo"
      subtitle="See the other side of a consent request."
      action={<Tag text="SIMULATION" tone="blue" />}
    >
      <Card style={{ backgroundColor: c.navy, borderColor: c.navy }}>
        <Row>
          <IconTile name="business-outline" />
          <View style={{ flex: 1 }}>
            <Title small style={{ color: "white" }}>
              {PARTNER.name}
            </Title>
            <Txt style={{ color: "#B9CBDD", fontSize: 12 }}>
              Fictional fintech · account onboarding
            </Txt>
          </View>
        </Row>
        <Txt style={{ color: "#D6E2EA", fontSize: 13 }}>
          A small partner workspace for creating requests and checking only the
          information you permit.
        </Txt>
      </Card>
      <Notice title="Same-device demonstration">
        This screen shares the demo app’s state. It is not a separately
        authenticated partner portal or a live integration.
      </Notice>
      <Button
        title={creating ? "Close request form" : "Create verification request"}
        icon={creating ? "close-outline" : "add-outline"}
        onPress={() => setCreating(!creating)}
      />
      {creating ? (
        <Card>
          <Title small>What does the partner need?</Title>
          {ATTRIBUTE_KEYS.map((key) => (
            <Checkbox
              key={key}
              title={ATTRIBUTE_LABELS[key]}
              checked={keys.includes(key)}
              onPress={() =>
                setKeys((current) =>
                  current.includes(key)
                    ? current.filter((k) => k !== key)
                    : [...current, key],
                )
              }
            />
          ))}
          <Title small>Purpose</Title>
          <Choice
            title="Demo account onboarding"
            selected={purpose === "onboarding"}
            onPress={() => setPurpose("onboarding")}
          />
          <Choice
            title="Repeat credential use"
            description="A second request using the same sample credential."
            selected={purpose === "reuse"}
            onPress={() => setPurpose("reuse")}
          />
          <Title small>Access after approval</Title>
          {(["minute", "day", "week"] as const).map((value) => (
            <Choice
              key={value}
              title={DURATIONS[value].label}
              description={
                value === "minute"
                  ? "Useful for testing automatic expiry."
                  : undefined
              }
              selected={duration === value}
              onPress={() => setDuration(value)}
            />
          ))}
          <Button title="Send demo request" onPress={create} />
        </Card>
      ) : null}
      {createdId ? (
        <Notice title="Demo request created" tone="success">
          The request is pending. Open it as the user below to approve or
          decline.
        </Notice>
      ) : null}
      {error ? <Notice title={error} tone="error" /> : null}
      {result && request ? (
        <Card>
          <SectionHead title="Partner-visible result" />
          <Status status={result.status} />
          <Txt muted style={{ fontSize: 11 }}>
            Request …{result.requestId.slice(-9)}
          </Txt>
          {result.status === "approved" ? (
            <>
              <Detail label="Access ends" value={dateTime(result.expiresAt)} />
              <View testID="partner-attributes" style={{ gap: 15 }}>
                {Object.entries(result.attributes).map(([key, value]) => (
                  <Detail
                    key={key}
                    label={ATTRIBUTE_LABELS[key as AttributeKey]}
                    value={value}
                  />
                ))}
              </View>
              <Notice title="Only approved attributes">
                Unchecked attributes, the NIN sample reference, and the session
                label are excluded from this result.
              </Notice>
            </>
          ) : (
            <View testID="partner-attributes">
              <Txt bold>No attributes released.</Txt>
              <Txt muted>
                {result.status === "pending"
                  ? "Waiting for the user’s consent."
                  : result.status === "unavailable"
                    ? "The sample credential is not verified."
                    : `Access is ${result.status}. The partner receives this status only.`}
              </Txt>
            </View>
          )}
          <Button
            title="Check result again"
            variant="secondary"
            onPress={() => inspect(request.id)}
          />
          <Button
            title="Open this request as the user"
            variant="ghost"
            onPress={() => nav.navigate("Request", { id: request.id })}
          />
        </Card>
      ) : null}
      <SectionHead title="Demo requests" />
      {pilot.state.requests.length ? (
        pilot.state.requests.map((r) => (
          <Card key={r.id}>
            <Row style={{ justifyContent: "space-between" }}>
              <Txt bold style={{ flex: 1, fontSize: 13 }}>
                {PURPOSES[r.purpose]}
              </Txt>
              <Status status={requestStatus(r, pilot.now)} />
            </Row>
            <Txt muted style={{ fontSize: 11 }}>
              {dateTime(r.createdAt)} · …{r.id.slice(-9)}
            </Txt>
            <Button
              title="View partner result"
              variant="secondary"
              onPress={() => inspect(r.id)}
            />
            <Button
              title="Review as user"
              variant="ghost"
              onPress={() => nav.navigate("Request", { id: r.id })}
            />
          </Card>
        ))
      ) : (
        <Empty
          title="No requests yet"
          body="Create a sample request to begin."
        />
      )}
      <Button
        title="Pilot metrics & feedback"
        variant="secondary"
        icon="stats-chart-outline"
        onPress={() => nav.navigate("Metrics")}
      />
    </Screen>
  );
}
export function MetricsScreen() {
  const pilot = usePilot();
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(
    pilot.state.feedback?.rating ?? 4,
  );
  const [reason, setReason] = useState<
    "clear" | "too_many_steps" | "needs_context"
  >(pilot.state.feedback?.reason ?? "clear");
  const [saved, setSaved] = useState(false);
  return (
    <Screen
      title="Pilot learning"
      subtitle="A preview of what the pilot will measure."
    >
      <Notice title="Illustrative sample metrics">
        All five metrics below are fixed fictional examples, not real users,
        partner traction, or measurements from this session.
      </Notice>
      {sampleMetrics.map((metric) => (
        <Card key={metric.label}>
          <Row>
            <IconTile name={metric.icon} />
            <View style={{ flex: 1 }}>
              <Txt muted style={{ fontSize: 12 }}>
                {metric.label}
              </Txt>
              <Txt
                style={{
                  fontFamily: fonts.bold,
                  fontSize: 31,
                  lineHeight: 40,
                  color: c.navy,
                }}
              >
                {metric.value}
              </Txt>
            </View>
            <Tag text="SAMPLE" />
          </Row>
          <Txt muted style={{ fontSize: 12 }}>
            {metric.note}
          </Txt>
        </Card>
      ))}
      <Card>
        <Tag text="THIS DEVICE · DEMO EVENTS" tone="blue" />
        <Title small>Your session activity</Title>
        <Detail
          label="Approved demo requests"
          value={String(
            pilot.state.requests.filter((r) => r.approved.length > 0).length,
          )}
        />
        <Detail
          label="Recorded partner reads"
          value={String(
            pilot.state.events.filter((e) => e.kind === "partner_access")
              .length,
          )}
        />
        <Txt muted style={{ fontSize: 12 }}>
          Local demo counts are separate from the illustrative metrics above.
        </Txt>
      </Card>
      <Card>
        <Tag text="DEMO PARTNER FEEDBACK" />
        <Title small>How clear was the consent flow?</Title>
        <Row style={{ flexWrap: "wrap" }}>
          {([1, 2, 3, 4, 5] as const).map((n) => (
            <Button
              key={n}
              title={`${n}`}
              variant={rating === n ? "primary" : "secondary"}
              onPress={() => {
                setRating(n);
                setSaved(false);
              }}
              style={{ minWidth: 46, paddingHorizontal: 12 }}
            />
          ))}
        </Row>
        <Txt muted style={{ fontSize: 11 }}>
          1 = unclear · 5 = very clear
        </Txt>
        {(
          [
            { key: "clear", title: "Clear and easy to understand" },
            { key: "too_many_steps", title: "Too many steps" },
            { key: "needs_context", title: "Needs more explanation" },
          ] as const
        ).map((item) => (
          <Choice
            key={item.key}
            title={item.title}
            selected={reason === item.key}
            onPress={() => {
              setReason(item.key);
              setSaved(false);
            }}
          />
        ))}
        <Button
          title="Save demo feedback"
          onPress={() => {
            pilot.feedback({ rating, reason });
            setSaved(true);
          }}
        />
        {saved ? (
          <Notice title="Demo feedback saved locally" tone="success">
            No response was sent to a server. The sample metrics stay unchanged.
          </Notice>
        ) : null}
      </Card>
    </Screen>
  );
}
