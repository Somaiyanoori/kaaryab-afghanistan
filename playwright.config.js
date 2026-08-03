import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false, // ← Change to false (sequential is more reliable)
  forbidOnly: !!process.env.CI,
  retries: 1, // ← Retry once if fails
  workers: 1, // ← One worker at a time (more reliable)
  reporter: "html",
  timeout: 60000, // ← 60 seconds per test

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15000,
    navigationTimeout: 30000, // ← 30 seconds for navigation
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 120000,
  },
});
