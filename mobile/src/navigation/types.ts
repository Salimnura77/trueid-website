import {
  useNavigation,
  type NavigatorScreenParams,
} from "@react-navigation/native";
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
export type TabsParamList = {
  Home: undefined;
  MyID: undefined;
  Requests: undefined;
  Profile: undefined;
};
export type RootParamList = {
  Welcome: undefined;
  Account: undefined;
  Tabs: NavigatorScreenParams<TabsParamList> | undefined;
  Verify: undefined;
  Result: { error?: string } | undefined;
  Credential: undefined;
  Request: { id: string };
  Consents: undefined;
  Activity: undefined;
  Partner: undefined;
  Recovery: undefined;
  Help: undefined;
  Review: undefined;
  Privacy: undefined;
  Settings: undefined;
  Metrics: undefined;
};
export type ScreenProps<K extends keyof RootParamList> = NativeStackScreenProps<
  RootParamList,
  K
>;
export const useAppNav = () =>
  useNavigation<NativeStackNavigationProp<RootParamList>>();
