import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Logo, { LOGO_BACKGROUND } from "./Logo";

export default function LoadingScreen() {
  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <Logo size={180} />
      <Text style={styles.wordmark}>
        True<Text style={{ color: "#56BFFF" }}>ID</Text>
      </Text>
      <Text style={styles.tagline}>Your identity. Your control.</Text>
      <ActivityIndicator
        accessibilityLabel="Opening TrueID"
        color="#56BFFF"
        style={{ marginTop: 28 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: LOGO_BACKGROUND,
  },
  wordmark: {
    marginTop: 24,
    color: "white",
    fontWeight: "700",
    fontSize: 36,
    letterSpacing: -1.2,
  },
  tagline: { marginTop: 10, color: "#C1D1DD", fontSize: 14 },
});
