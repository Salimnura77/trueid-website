import { test, expect, type Page } from "@playwright/test";
const button = (page: Page, name: string) =>
  page.getByRole("button", { name, exact: true });
const runtimeErrors = new WeakMap<Page, string[]>();
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
});
test.afterEach(async ({ page }) => {
  expect(runtimeErrors.get(page)).toEqual([]);
});

test("sample onboarding, selective consent, partner access, revocation and persistence", async ({
  page,
}) => {
  await button(page, "Explore sample profile").click();
  await expect(page.getByText("Hello, Emeka")).toBeVisible();
  await page.screenshot({
    path: "test-results/home-mobile.png",
    fullPage: true,
  });
  await button(page, "Review request").click();
  await page.getByRole("checkbox", { name: "Full name", exact: true }).click();
  await page
    .getByRole("checkbox", { name: "Verification status", exact: true })
    .click();
  await button(page, "Approve 1 attribute").click();
  await expect(button(page, "Confirm approval")).toBeVisible();
  await button(page, "Cancel").click();
  await expect(button(page, "Approve 1 attribute")).toBeVisible();
  await button(page, "Approve 1 attribute").click();
  await button(page, "Confirm approval").click();
  await expect(button(page, "Revoke access")).toBeVisible();
  await button(page, "View partner demo").click();
  await button(page, "View partner result").first().click();
  const attributes = page.getByTestId("partner-attributes");
  await expect(attributes).toContainText("Over 18");
  await expect(attributes).not.toContainText("Full name");
  await expect(attributes).not.toContainText("Emeka");
  await expect(attributes).not.toContainText("DEMO-NIN");
  await page.screenshot({
    path: "test-results/partner-mobile.png",
    fullPage: true,
  });
  await button(page, "Open this request as the user").click();
  await button(page, "Revoke access").click();
  await button(page, "Confirm revocation").click();
  await button(page, "View partner demo").click();
  await button(page, "View partner result").first().click();
  await expect(page.getByTestId("partner-attributes")).toContainText(
    "No attributes released.",
  );
  await page.reload();
  await button(page, "Resume saved demo").click();
  await button(page, "Access history").click();
  await expect(page.getByText("Revoked", { exact: true })).toBeVisible();
});

test("new demo validation, failed verification, manual review, then a declined request", async ({
  page,
}) => {
  await button(page, "Create a demo account").click();
  await page
    .getByRole("textbox", { name: "Demo label (not your name)" })
    .fill("a real name");
  await button(page, "Create demo account").click();
  await expect(page.getByRole("alert")).toContainText("Use a demo label");
  await page
    .getByRole("textbox", { name: "Demo label (not your name)" })
    .fill("Pilot-Test");
  await page
    .getByRole("checkbox", { name: "I understand this uses fictional data" })
    .click();
  await button(page, "Create demo account").click();
  await button(page, "Verify sample identity").click();
  await page
    .getByRole("radio", { name: "Unable to verify", exact: true })
    .click();
  await page
    .getByRole("checkbox", { name: "Run this check using sample data" })
    .click();
  await button(page, "Run demo verification").click();
  await button(page, "Request manual review").click();
  await button(page, "Create demo review case").click();
  await button(page, "Simulate reviewer approval").click();
  await button(page, "Apply demo decision").click();
  await expect(
    page.getByRole("heading", {
      name: "Your sample ID is ready.",
      exact: true,
    }),
  ).toBeVisible();
  await button(page, "Review partner requests").click();
  await button(page, "Review request").click();
  await button(page, "Decline request").click();
  await button(page, "Confirm decline").click();
  await button(page, "View partner demo").click();
  await button(page, "View partner result").first().click();
  await expect(page.getByTestId("partner-attributes")).toContainText(
    "No attributes released.",
  );
});

test("compact layouts, demo recovery, and tablet credential view", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await expect(button(page, "Explore sample profile")).toBeVisible();
  await page.screenshot({
    path: "test-results/welcome-compact.png",
    fullPage: true,
  });
  await button(page, "Recovery & help").click();
  await button(page, "Start demo recovery").click();
  await button(page, "Simulate recovery completion").click();
  await button(page, "Complete demo recovery").click();
  await expect(
    page.getByRole("heading", {
      name: "Recovery simulation completed",
      exact: true,
    }),
  ).toBeVisible();
  await button(page, "Return to demo").click();
  await button(page, "Explore sample profile").click();
  await button(page, "My TrueID").click();
  await expect(
    page.getByRole("heading", { name: "Credential details", exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({
    path: "test-results/credential-tablet.png",
    fullPage: true,
  });
  const dimensions = await page.evaluate(() => ({
    available: window.innerWidth,
    content: document.documentElement.scrollWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.available);
});

test("sample request expires without revealing stale attributes", async ({
  page,
}) => {
  await button(page, "Explore sample profile").click();
  await button(page, "Partner demo").click();
  await button(page, "Create verification request").click();
  await page.getByRole("radio", { name: "1 minute", exact: true }).click();
  await button(page, "Send demo request").click();
  await button(page, "Open this request as the user").click();
  await button(page, "Approve 3 attributes").click();
  await button(page, "Confirm approval").click();
  await button(page, "View partner demo").click();
  await button(page, "View partner result").first().click();
  await expect(page.getByTestId("partner-attributes")).toContainText(
    "Emeka Okonkwo",
  );
  await page.clock.install();
  await page.clock.fastForward(61_000);
  await expect(page.getByTestId("partner-attributes")).toContainText(
    "No attributes released.",
  );
});
