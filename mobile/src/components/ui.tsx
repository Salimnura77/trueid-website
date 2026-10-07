import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "./Logo";
import { colors as c, fonts } from "../theme";
import {
  STATUS_LABELS,
  type AccessStatus,
  type VerificationStatus,
} from "../domain/model";

export type IconName = React.ComponentProps<typeof Ionicons>["name"];
export function Icon({
  name,
  color = c.teal,
  size = 22,
}: {
  name: IconName;
  color?: string;
  size?: number;
}) {
  return <Ionicons name={name} color={color} size={size} accessible={false} />;
}
export function Txt({
  children,
  style,
  muted,
  bold,
  ...rest
}: React.ComponentProps<typeof Text> & { muted?: boolean; bold?: boolean }) {
  return (
    <Text
      {...rest}
      style={[
        styles.text,
        muted && { color: c.muted },
        bold && { fontFamily: fonts.semibold },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
export function Title({
  children,
  small = false,
  style,
}: {
  children: React.ReactNode;
  small?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  return (
    <Txt
      accessibilityRole="header"
      style={[small ? styles.subheading : styles.heading, style]}
    >
      {children}
    </Txt>
  );
}
export function Row({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.row, style]}>{children}</View>;
}
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}
export function IconTile({
  name,
  color = c.teal,
  background = c.tealLight,
}: {
  name: IconName;
  color?: string;
  background?: string;
}) {
  return (
    <View style={[styles.iconTile, { backgroundColor: background }]}>
      <Icon name={name} color={color} />
    </View>
  );
}
export function Brand({
  light = false,
  compact = false,
}: {
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <Row style={{ gap: 9 }}>
      <Logo size={compact ? 38 : 44} />
      <Txt
        style={{
          fontFamily: fonts.bold,
          fontSize: compact ? 21 : 25,
          color: light ? c.white : c.navy,
          letterSpacing: -1,
        }}
      >
        True
        <Txt
          style={{
            fontFamily: fonts.bold,
            color: light ? "#70D7CA" : c.teal,
            fontSize: compact ? 21 : 25,
          }}
        >
          ID
        </Txt>
        <Txt style={{ fontSize: 13, color: light ? "#B9CBDD" : c.muted }}>
          .me
        </Txt>
      </Txt>
    </Row>
  );
}
export function Button({
  title,
  onPress,
  variant = "primary",
  icon,
  disabled,
  loading,
  testID,
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const light = variant === "primary" || variant === "danger";
  const color = light ? c.white : c.teal;
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{
        disabled: !!disabled || !!loading,
        busy: !!loading,
      }}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor:
            variant === "primary"
              ? c.teal
              : variant === "danger"
                ? c.red
                : variant === "secondary"
                  ? c.white
                  : "transparent",
          borderColor: variant === "secondary" ? c.border : "transparent",
          opacity: disabled || loading ? 0.5 : pressed ? 0.78 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={color} />
      ) : icon ? (
        <Icon name={icon} color={color} size={19} />
      ) : null}
      <Txt bold style={{ color, textAlign: "center", flexShrink: 1 }}>
        {title}
      </Txt>
    </Pressable>
  );
}
export function Tag({
  text,
  tone = "teal",
}: {
  text: string;
  tone?: "teal" | "amber" | "red" | "blue" | "muted";
}) {
  const tones = {
    teal: [c.tealLight, c.teal],
    amber: [c.amberLight, c.amber],
    red: [c.redLight, c.red],
    blue: [c.blueLight, "#164BAB"],
    muted: ["#E9EEF4", c.muted],
  };
  return (
    <View style={[styles.tag, { backgroundColor: tones[tone][0] }]}>
      <Txt
        style={{
          fontSize: 11,
          lineHeight: 16,
          fontFamily: fonts.semibold,
          color: tones[tone][1],
        }}
      >
        {text}
      </Txt>
    </View>
  );
}
export function Status({
  status,
}: {
  status: VerificationStatus | AccessStatus;
}) {
  const tone = ["verified", "approved"].includes(status)
    ? "teal"
    : ["review", "pending", "checking"].includes(status)
      ? "amber"
      : ["unable", "declined", "revoked"].includes(status)
        ? "red"
        : "muted";
  return (
    <View accessibilityLabel={`Status: ${STATUS_LABELS[status]}`}>
      <Tag text={STATUS_LABELS[status]} tone={tone} />
    </View>
  );
}
export function Notice({
  title,
  children,
  tone = "info",
}: {
  title: string;
  children?: React.ReactNode;
  tone?: "info" | "warning" | "error" | "success";
}) {
  const color =
    tone === "error" ? c.red : tone === "warning" ? c.amber : c.teal;
  return (
    <View
      accessibilityRole={tone === "error" ? "alert" : undefined}
      accessibilityLiveRegion="polite"
      style={[
        styles.notice,
        {
          backgroundColor:
            tone === "error"
              ? c.redLight
              : tone === "warning"
                ? c.amberLight
                : c.tealLight,
        },
      ]}
    >
      <Icon
        name={
          tone === "error"
            ? "alert-circle-outline"
            : tone === "success"
              ? "checkmark-circle-outline"
              : "information-circle-outline"
        }
        color={color}
        size={20}
      />
      <View style={{ flex: 1, gap: 4 }}>
        <Txt bold style={{ color, fontSize: 13 }}>
          {title}
        </Txt>
        {children ? (
          <Txt style={{ color, fontSize: 12, lineHeight: 19 }}>{children}</Txt>
        ) : null}
      </View>
    </View>
  );
}
export function Screen({
  children,
  title,
  subtitle,
  action,
  testID,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  testID?: string;
}) {
  return (
    <SafeAreaView edges={["left", "right"]} style={styles.fill}>
      <ScrollView
        testID={testID}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={styles.page}
      >
        <View style={styles.pageInner}>
          {title ? (
            <View style={{ gap: 5, marginBottom: 4 }}>
              <Row style={{ justifyContent: "space-between" }}>
                <Title style={{ flex: 1 }}>{title}</Title>
                {action}
              </Row>
              {subtitle ? <Txt muted>{subtitle}</Txt> : null}
            </View>
          ) : null}
          {children}
          <Row style={{ justifyContent: "center", marginTop: 12 }}>
            <Icon name="flask-outline" size={13} color={c.muted} />
            <Txt muted style={{ fontSize: 11 }}>
              TrueID pilot · sample data only
            </Txt>
          </Row>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export function SectionHead({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <Row style={{ justifyContent: "space-between" }}>
      <Title small>{title}</Title>
      {action && onPress ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={action}
          onPress={onPress}
          style={{ minHeight: 44, justifyContent: "center" }}
        >
          <Txt bold style={{ fontSize: 12, color: c.teal }}>
            {action}
          </Txt>
        </Pressable>
      ) : null}
    </Row>
  );
}
export function Choice({
  title,
  description,
  selected,
  onPress,
  icon,
}: {
  title: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
  icon?: IconName;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityLabel={title}
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[
        styles.choice,
        selected && { borderColor: c.teal, backgroundColor: c.tealLight },
      ]}
    >
      {icon ? <IconTile name={icon} /> : null}
      <View style={{ flex: 1, gap: 3 }}>
        <Txt bold>{title}</Txt>
        {description ? (
          <Txt muted style={{ fontSize: 12, lineHeight: 18 }}>
            {description}
          </Txt>
        ) : null}
      </View>
      <Icon
        name={selected ? "radio-button-on" : "radio-button-off"}
        color={selected ? c.teal : c.muted}
      />
    </Pressable>
  );
}
export function Checkbox({
  title,
  subtitle,
  checked,
  onPress,
  disabled,
}: {
  title: string;
  subtitle?: string;
  checked: boolean;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityLabel={title}
      accessibilityState={{ checked, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.choice, checked && { borderColor: "#ACD7CE" }]}
    >
      <Icon
        name={checked ? "checkbox" : "square-outline"}
        color={checked ? c.teal : c.muted}
      />
      <View style={{ flex: 1, gap: 3 }}>
        <Txt bold>{title}</Txt>
        {subtitle ? (
          <Txt muted style={{ fontSize: 12 }}>
            {subtitle}
          </Txt>
        ) : null}
      </View>
    </Pressable>
  );
}
export function Field({
  label,
  value,
  onChangeText,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <View style={{ gap: 8 }}>
      <Txt bold style={{ fontSize: 13 }}>
        {label}
      </Txt>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={c.muted}
        autoCapitalize="none"
        autoCorrect={false}
        maxLength={18}
        style={[styles.input, error ? { borderColor: c.red } : null]}
      />
      {error ? (
        <Txt accessibilityRole="alert" style={{ color: c.red, fontSize: 12 }}>
          {error}
        </Txt>
      ) : null}
    </View>
  );
}
export function Detail({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ gap: 4 }}>
      <Txt muted style={{ fontSize: 12 }}>
        {label}
      </Txt>
      <Txt bold>{value}</Txt>
    </View>
  );
}
export function Empty({
  title,
  body,
  icon = "file-tray-outline",
}: {
  title: string;
  body: string;
  icon?: IconName;
}) {
  return (
    <Card style={{ alignItems: "center", paddingVertical: 30, gap: 12 }}>
      <IconTile name={icon} />
      <Title small>{title}</Title>
      <Txt muted style={{ textAlign: "center", maxWidth: 310 }}>
        {body}
      </Txt>
    </Card>
  );
}
export function MenuRow({
  title,
  subtitle,
  icon,
  onPress,
  trailing,
}: {
  title: string;
  subtitle?: string;
  icon: IconName;
  onPress: () => void;
  trailing?: React.ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={styles.menu}
    >
      <IconTile name={icon} />
      <View style={{ flex: 1, gap: 3 }}>
        <Txt bold>{title}</Txt>
        {subtitle ? (
          <Txt muted style={{ fontSize: 12 }}>
            {subtitle}
          </Txt>
        ) : null}
      </View>
      {trailing}
      <Icon name="chevron-forward" size={17} color={c.muted} />
    </Pressable>
  );
}
export function Confirmation({
  visible,
  title,
  body,
  confirmLabel,
  onConfirm,
  onCancel,
  danger = false,
}: {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}) {
  const titleRef = useRef<Text>(null);
  useEffect(() => {
    if (visible && Platform.OS === "web") {
      const timer = setTimeout(
        () =>
          (titleRef.current as unknown as { focus?: () => void })?.focus?.(),
        50,
      );
      return () => clearTimeout(timer);
    }
  }, [visible]);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.scrim}>
        <View accessibilityViewIsModal style={styles.dialog}>
          <IconTile
            name={danger ? "alert-circle-outline" : "shield-checkmark-outline"}
            color={danger ? c.red : c.teal}
            background={danger ? c.redLight : c.tealLight}
          />
          <Text
            ref={titleRef}
            accessibilityRole="header"
            style={styles.heading}
          >
            {title}
          </Text>
          <Txt muted>{body}</Txt>
          <Button
            title={confirmLabel}
            variant={danger ? "danger" : "primary"}
            onPress={onConfirm}
            testID="confirm-action"
          />
          <Button title="Cancel" variant="secondary" onPress={onCancel} />
        </View>
      </View>
    </Modal>
  );
}
export const dateTime = (at: number) =>
  new Date(at).toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    color: c.ink,
  },
  heading: {
    fontFamily: fonts.bold,
    fontSize: 26,
    lineHeight: 34,
    color: c.navy,
    letterSpacing: -0.8,
  },
  subheading: {
    fontFamily: fonts.heading,
    fontSize: 17,
    lineHeight: 25,
    color: c.navy,
    letterSpacing: -0.4,
  },
  fill: { flex: 1, backgroundColor: c.background },
  page: { flexGrow: 1, padding: 20, paddingBottom: 32 },
  pageInner: { width: "100%", maxWidth: 680, alignSelf: "center", gap: 18 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  card: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.white,
    gap: 14,
  },
  iconTile: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  tag: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  notice: {
    borderRadius: 14,
    padding: 15,
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  choice: {
    borderWidth: 1,
    borderColor: c.border,
    backgroundColor: c.white,
    padding: 15,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minHeight: 58,
  },
  input: {
    borderWidth: 1,
    borderColor: c.border,
    borderRadius: 12,
    padding: 15,
    minHeight: 52,
    fontSize: 15,
    fontFamily: fonts.regular,
    backgroundColor: c.white,
    color: c.ink,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    minHeight: 64,
  },
  scrim: {
    flex: 1,
    backgroundColor: "#061224B8",
    justifyContent: "center",
    padding: 24,
  },
  dialog: {
    backgroundColor: c.white,
    borderRadius: 24,
    padding: 24,
    gap: 17,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
});
