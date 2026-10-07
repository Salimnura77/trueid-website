import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "../theme";
import { usePilot } from "../state/PilotProvider";
import { Brand, Icon, Row, Txt } from "./ui";
import { STATUS_LABELS } from "../domain/model";
import Logo from "./Logo";

export default function CredentialCard({
  preview = false,
}: {
  preview?: boolean;
}) {
  const { state } = usePilot();
  const verified = preview || state.verification === "verified";
  return (
    <LinearGradient
      colors={["#0B1628", "#122E46", "#133D44"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View pointerEvents="none" style={styles.orbit} />
      <View
        pointerEvents="none"
        style={[
          styles.orbit,
          { right: -94, top: -44, width: 300, height: 300 },
        ]}
      />
      <Row style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <Brand compact light />
        <View style={styles.demo}>
          <Txt
            style={{
              color: "#D6F7ED",
              fontSize: 10,
              fontFamily: fonts.semibold,
              letterSpacing: 1,
            }}
          >
            DEMO CREDENTIAL
          </Txt>
        </View>
      </Row>
      <Row style={{ marginTop: 28, marginBottom: 24 }}>
        <View style={styles.avatar}>
          <Txt style={{ fontFamily: fonts.bold, fontSize: 22, color: "white" }}>
            EO
          </Txt>
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <Txt
            style={{
              color: "white",
              fontFamily: fonts.bold,
              fontSize: 21,
              lineHeight: 28,
            }}
          >
            Emeka Okonkwo
          </Txt>
          <Txt style={{ color: "#B3C7D7", fontSize: 11, letterSpacing: 1.7 }}>
            TID · DEMO · 001
          </Txt>
        </View>
        <Logo size={39} />
      </Row>
      <View
        style={{ height: 1, backgroundColor: "#FFFFFF20", marginBottom: 14 }}
      />
      <Row style={{ justifyContent: "space-between" }}>
        <Row style={{ gap: 6 }}>
          <Icon
            name={verified ? "checkmark-circle" : "time-outline"}
            color={verified ? "#7FE1C2" : "#F4D696"}
            size={16}
          />
          <Txt
            style={{
              fontSize: 12,
              color: verified ? "#A4EFDB" : "#F4D696",
              fontFamily: fonts.semibold,
            }}
          >
            {preview
              ? "Verified sample"
              : `${STATUS_LABELS[state.verification]} · demo`}
          </Txt>
        </Row>
        <Txt style={{ fontSize: 10, color: "#BED0DE", letterSpacing: 1.5 }}>
          NIGERIA
        </Txt>
      </Row>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  card: { padding: 22, borderRadius: 23, overflow: "hidden", minHeight: 242 },
  avatar: {
    width: 54,
    height: 59,
    backgroundColor: "#FFFFFF13",
    borderColor: "#FFFFFF29",
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  demo: {
    backgroundColor: "#FFFFFF12",
    borderColor: "#FFFFFF22",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
  },
  orbit: {
    position: "absolute",
    borderColor: "#9CE4DE14",
    borderWidth: 1,
    width: 240,
    height: 240,
    borderRadius: 200,
    right: -64,
    top: -14,
  },
});
