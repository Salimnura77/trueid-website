import React from "react";
import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Brand, Icon, Tag, type IconName } from "../components/ui";
import { usePilot } from "../state/PilotProvider";
import { requestStatus } from "../domain/engine";
import { colors as c, fonts } from "../theme";
import type { RootParamList, TabsParamList } from "./types";
import { WelcomeScreen, AccountScreen } from "../screens/OnboardingScreens";
import {
  HomeScreen,
  VaultScreen,
  CredentialScreen,
  ActivityScreen,
} from "../screens/IdentityScreens";
import {
  VerifyScreen,
  ResultScreen,
  ReviewScreen,
} from "../screens/VerificationScreens";
import {
  RequestsScreen,
  ConsentsScreen,
  RequestScreen,
} from "../screens/ConsentScreens";
import { PartnerScreen, MetricsScreen } from "../screens/PartnerScreens";
import {
  ProfileScreen,
  RecoveryScreen,
  HelpScreen,
  PrivacyScreen,
  SettingsScreen,
} from "../screens/SupportScreens";

const Stack = createNativeStackNavigator<RootParamList>();
const Tabs = createBottomTabNavigator<TabsParamList>();
const icons: Record<keyof TabsParamList, IconName> = {
  Home: "grid-outline",
  MyID: "id-card-outline",
  Requests: "shield-checkmark-outline",
  Profile: "person-circle-outline",
};
function MainTabs() {
  const insets = useSafeAreaInsets();
  const { state, now } = usePilot();
  const pending = state.requests.filter(
    (r) => requestStatus(r, now) === "pending",
  ).length;
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerTitle: () => <Brand compact />,
        headerRight: () => (
          <View style={{ marginRight: 20 }}>
            <Tag text="DEMO PILOT" />
          </View>
        ),
        headerTitleAlign: "left",
        headerShadowVisible: false,
        headerStyle: { backgroundColor: c.background },
        sceneStyle: { backgroundColor: c.background },
        tabBarActiveTintColor: c.teal,
        tabBarInactiveTintColor: c.muted,
        tabBarStyle: {
          height: 67 + Math.max(insets.bottom, 8),
          paddingTop: 9,
          paddingBottom: Math.max(insets.bottom, 8),
          backgroundColor: c.white,
          borderTopColor: c.border,
        },
        tabBarLabelStyle: {
          fontFamily: fonts.medium,
          fontSize: 11,
          marginTop: 3,
        },
        tabBarIcon: ({ color }) => (
          <Icon name={icons[route.name]} color={color} size={23} />
        ),
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen
        name="MyID"
        component={VaultScreen}
        options={{ title: "My ID" }}
      />
      <Tabs.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          tabBarBadge: pending || undefined,
          tabBarBadgeStyle: {
            backgroundColor: c.teal,
            color: c.white,
            fontSize: 10,
          },
        }}
      />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}
export default function AppNavigator() {
  const { state } = usePilot();
  return (
    <NavigationContainer
      key={state.signedIn ? "signed-in" : "guest"}
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: c.teal,
          background: c.background,
          card: c.background,
          text: c.ink,
          border: c.border,
        },
      }}
    >
      <Stack.Navigator
        screenOptions={{
          statusBarStyle: "dark",
          headerTintColor: c.navy,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: c.background },
          headerTitleStyle: { fontFamily: fonts.heading, fontSize: 15 },
          headerBackButtonDisplayMode: "minimal",
          contentStyle: { backgroundColor: c.background },
        }}
      >
        {state.signedIn ? (
          <>
            <Stack.Screen
              name="Tabs"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Verify"
              component={VerifyScreen}
              options={{ title: "Sample verification" }}
            />
            <Stack.Screen
              name="Result"
              component={ResultScreen}
              options={{ title: "Verification result" }}
            />
            <Stack.Screen
              name="Credential"
              component={CredentialScreen}
              options={{ title: "My TrueID" }}
            />
            <Stack.Screen
              name="Request"
              component={RequestScreen}
              options={{ title: "Review request" }}
            />
            <Stack.Screen
              name="Consents"
              component={ConsentsScreen}
              options={{ title: "Your permissions" }}
            />
            <Stack.Screen
              name="Activity"
              component={ActivityScreen}
              options={{ title: "Activity" }}
            />
            <Stack.Screen
              name="Partner"
              component={PartnerScreen}
              options={{ title: "Pilot workspace" }}
            />
            <Stack.Screen
              name="Metrics"
              component={MetricsScreen}
              options={{ title: "Pilot learning" }}
            />
            <Stack.Screen
              name="Review"
              component={ReviewScreen}
              options={{ title: "Demo manual review" }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{ title: "Settings" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false, statusBarStyle: "light" }}
            />
            <Stack.Screen
              name="Account"
              component={AccountScreen}
              options={{ title: "Create demo account" }}
            />
          </>
        )}
        <Stack.Screen
          name="Recovery"
          component={RecoveryScreen}
          options={{ title: "Account recovery" }}
        />
        <Stack.Screen
          name="Help"
          component={HelpScreen}
          options={{ title: "Help & support" }}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyScreen}
          options={{ title: "Privacy" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
