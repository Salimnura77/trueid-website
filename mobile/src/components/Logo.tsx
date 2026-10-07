import React from "react";
import { Image, View } from "react-native";

export const LOGO_BACKGROUND = "#071B2F";

// The supplied original is bundled unchanged. The view only frames its padding.
export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.24,
        overflow: "hidden",
        backgroundColor: LOGO_BACKGROUND,
      }}
    >
      <Image
        source={require("../../assets/trueid-logo.png")}
        accessibilityLabel="TrueID logo"
        resizeMode="contain"
        style={{
          position: "absolute",
          width: size * 1.35,
          height: size * 1.35,
          left: -size * 0.175,
          top: -size * 0.175,
        }}
      />
    </View>
  );
}
