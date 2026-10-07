import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  Brand,
  Button,
  Card,
  Checkbox,
  Confirmation,
  Field,
  Icon,
  Notice,
  Row,
  Screen,
  Tag,
  Title,
  Txt,
} from "../components/ui";
import CredentialCard from "../components/CredentialCard";
import { usePilot } from "../state/PilotProvider";
import { useAppNav } from "../navigation/types";
import { colors as c, fonts } from "../theme";

export function WelcomeScreen() {
  const nav = useAppNav();
  const pilot = usePilot();
  const [confirm, setConfirm] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: c.navy }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient colors={[c.navy, "#123B46"]} style={styles.hero}>
          <View
            style={{
              maxWidth: 540,
              width: "100%",
              alignSelf: "center",
              gap: 24,
            }}
          >
            <Row style={{ justifyContent: "space-between" }}>
              <Brand light />
              <Tag text="PILOT EDITION" />
            </Row>
            <View style={{ gap: 12, marginTop: 22 }}>
              <Txt
                style={{
                  color: "#86DCCA",
                  fontFamily: fonts.semibold,
                  fontSize: 11,
                  letterSpacing: 2,
                }}
              >
                YOUR IDENTITY. YOUR SAY.
              </Txt>
              <Title
                style={{
                  fontSize: 40,
                  lineHeight: 48,
                  color: "white",
                  letterSpacing: -1.7,
                }}
              >
                One identity.{"\n"}More possibilities.
              </Title>
              <Txt style={{ color: "#C1D1DD", fontSize: 15, lineHeight: 25 }}>
                Verify once. Share only what you choose.{"\n"}Stay in control of
                every connection.
              </Txt>
            </View>
            <View
              style={{ transform: [{ rotate: "-2deg" }], marginVertical: 10 }}
            >
              <CredentialCard preview />
            </View>
            <Row style={{ justifyContent: "center", gap: 18 }}>
              {["Verify", "Consent", "Reuse"].map((label, i) => (
                <Row key={label} style={{ gap: 6 }}>
                  <View style={styles.step}>
                    <Txt style={{ color: "#B7EEE0", fontSize: 11 }}>
                      {i + 1}
                    </Txt>
                  </View>
                  <Txt style={{ color: "#D3DFE9", fontSize: 12 }}>{label}</Txt>
                </Row>
              ))}
            </Row>
          </View>
        </LinearGradient>
        <View style={styles.welcomeBottom}>
          <View
            style={{
              maxWidth: 540,
              width: "100%",
              alignSelf: "center",
              gap: 12,
            }}
          >
            <Title small>Meet your TrueID.</Title>
            <Txt muted style={{ fontSize: 13 }}>
              Explore with a fictional profile. No real NIN, selfie, password,
              or bank details needed.
            </Txt>
            {pilot.state.initialized ? (
              <Button
                title="Resume saved demo"
                onPress={pilot.resume}
                icon="play-outline"
              />
            ) : null}
            <Button
              title="Explore sample profile"
              onPress={() =>
                pilot.state.initialized
                  ? setConfirm(true)
                  : pilot.start("sample")
              }
              icon="arrow-forward"
              variant={pilot.state.initialized ? "secondary" : "primary"}
            />
            <Button
              title="Create a demo account"
              variant="secondary"
              onPress={() => nav.navigate("Account")}
            />
            <Row style={{ justifyContent: "center" }}>
              <Icon name="flask-outline" size={15} color={c.muted} />
              <Txt muted style={{ fontSize: 11 }}>
                A simulated pilot. No live identity checks.
              </Txt>
            </Row>
            <Button
              title="Recovery & help"
              variant="ghost"
              onPress={() => nav.navigate("Recovery")}
            />
          </View>
        </View>
      </ScrollView>
      <Confirmation
        visible={confirm}
        title="Start a fresh sample?"
        body="This replaces the saved demo requests and activity on this device."
        confirmLabel="Start sample demo"
        onConfirm={() => {
          setConfirm(false);
          pilot.start("sample");
        }}
        onCancel={() => setConfirm(false)}
      />
    </SafeAreaView>
  );
}
export function AccountScreen() {
  const pilot = usePilot();
  const [alias, setAlias] = useState("Pilot-001");
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const create = () => {
    if (!/^Pilot-[A-Za-z0-9]{2,12}$/.test(alias)) {
      setError(
        "Use a demo label such as Pilot-001 (2–12 letters or digits after Pilot-).",
      );
      return;
    }
    if (!accepted) {
      setError("Confirm that you understand this is a demo.");
      return;
    }
    setError("");
    if (pilot.state.initialized) setConfirm(true);
    else pilot.start("new", alias);
  };
  return (
    <Screen
      title="Your demo starts here"
      subtitle="One sample person. No personal information."
    >
      <Card>
        <Row>
          <View style={styles.sampleAvatar}>
            <Txt
              style={{ color: c.teal, fontFamily: fonts.bold, fontSize: 25 }}
            >
              EO
            </Txt>
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Title small>Emeka Okonkwo</Title>
            <Txt muted>Fictional pilot profile · Lagos</Txt>
            <Tag text="SAMPLE PERSON" />
          </View>
        </Row>
        <Txt muted style={{ fontSize: 13 }}>
          Your demo account uses Emeka’s fixed sample attributes. You will take
          this profile through verification yourself.
        </Txt>
      </Card>
      <Field
        label="Demo label (not your name)"
        value={alias}
        onChangeText={setAlias}
        placeholder="Pilot-001"
      />
      <Notice title="Your label is user-entered">
        It is kept in memory for this session, is not verified, and is never
        shared with the partner.
      </Notice>
      <Checkbox
        title="I understand this uses fictional data"
        subtitle="No government check or live partner integration takes place."
        checked={accepted}
        onPress={() => setAccepted(!accepted)}
      />
      {error ? <Notice title={error} tone="error" /> : null}
      <Button
        title="Create demo account"
        onPress={create}
        icon="arrow-forward"
      />
      <Confirmation
        visible={confirm}
        title="Replace saved demo?"
        body="Creating this demo account clears previous sample consent decisions and activity on this device."
        confirmLabel="Create fresh demo"
        onCancel={() => setConfirm(false)}
        onConfirm={() => {
          setConfirm(false);
          pilot.start("new", alias);
        }}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  hero: { padding: 26, paddingTop: 24, paddingBottom: 34 },
  welcomeBottom: {
    backgroundColor: c.background,
    padding: 26,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flex: 1,
  },
  step: {
    width: 23,
    height: 23,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF14",
  },
  sampleAvatar: {
    height: 70,
    width: 70,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: c.tealLight,
  },
});
