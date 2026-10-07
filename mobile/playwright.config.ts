import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  use: {
    ...devices["iPhone 13"],
    browserName: "chromium",
    channel: process.env.PLAYWRIGHT_CHANNEL,
    baseURL: "http://localhost:8081",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "npm start -- --port 8081 --localhost",
    url: "http://localhost:8081",
    reuseExistingServer: true,
    timeout: 180_000,
    env: { CI: "1", EXPO_NO_TELEMETRY: "1", EXPO_OFFLINE: "1" },
  },
});
