import { defineConfig, devices } from "@playwright/test";

// Runs against a production build served locally by default. To test a deployed
// preview instead:  E2E_BASE_URL=https://<preview>.vercel.app npx playwright test
// The suite never submits email or contacts anyone: mailto clicks are
// intercepted in e2e/helpers.ts and only the target/state is asserted.
const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3100";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: { baseURL, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "desktop", testMatch: /site\.spec\.ts/, use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    { name: "mobile", testMatch: /(site|mobile)\.spec\.ts/, use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : { command: "npm run start -- --port 3100", url: "http://localhost:3100", reuseExistingServer: false, timeout: 60_000 },
});
