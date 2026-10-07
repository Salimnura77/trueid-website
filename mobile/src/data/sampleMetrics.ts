// Illustrative research fixtures. These are NOT measured adoption or live usage.
export const sampleMetrics = [
  {
    label: "Verification completion",
    value: "84%",
    note: "21 of 25 illustrative attempts",
    icon: "checkmark-circle-outline",
  },
  {
    label: "Median time to verify",
    value: "1m 42s",
    note: "Across 21 sample completions",
    icon: "time-outline",
  },
  {
    label: "Consent approval",
    value: "76%",
    note: "19 of 25 illustrative requests",
    icon: "shield-checkmark-outline",
  },
  {
    label: "Repeat credential use",
    value: "8",
    note: "Sample users with a second share",
    icon: "repeat-outline",
  },
  {
    label: "Partner feedback",
    value: "4.4 / 5",
    note: "5 fictional evaluation responses",
    icon: "chatbubble-ellipses-outline",
  },
] as const;
