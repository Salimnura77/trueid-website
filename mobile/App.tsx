import React, { useEffect } from "react";
import { Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from "@expo-google-fonts/plus-jakarta-sans";
import AppNavigator from "./src/navigation/AppNavigator";
import { PilotProvider, usePilot } from "./src/state/PilotProvider";
import { Button, Notice } from "./src/components/ui";
import LoadingScreen from "./src/components/LoadingScreen";
import { colors } from "./src/theme";

if (Platform.OS !== "web") {
  void SplashScreen.preventAutoHideAsync().catch(console.warn);
}

function Content() {
  const { ready, storageError, clearStorageError } = usePilot();
  useEffect(() => {
    if (ready && Platform.OS !== "web") SplashScreen.hide();
  }, [ready]);
  if (!ready) return <LoadingScreen />;
  return (
    <View style={{ flex: 1 }}>
      {storageError ? (
        <View style={{ padding: 15, backgroundColor: colors.background }}>
          <Notice title="Local storage notice" tone="warning">
            {storageError}
          </Notice>
          <Button
            title="Continue this session"
            variant="ghost"
            onPress={clearStorageError}
          />
        </View>
      ) : null}
      <AppNavigator />
    </View>
  );
}
export default function App() {
  const [loaded, error] = useFonts({
    Inter: Inter_400Regular,
    InterMedium: Inter_500Medium,
    InterSemiBold: Inter_600SemiBold,
    Jakarta: PlusJakartaSans_600SemiBold,
    JakartaBold: PlusJakartaSans_700Bold,
  });
  if (!loaded && !error) return <LoadingScreen />;
  return (
    <SafeAreaProvider>
      <PilotProvider>
        <Content />
      </PilotProvider>
    </SafeAreaProvider>
  );
}
