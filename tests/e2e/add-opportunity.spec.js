import { test, expect } from "@playwright/test";

test.describe("Add Opportunity Form", () => {
  // Skip all tests in this file - requires authentication
  test.skip(true, "Requires Clerk authentication - covered by unit tests");

  test.beforeEach(async ({ page }) => {
    await page.goto("/add-opportunity", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
  });

  test("should load add opportunity page", async ({ page }) => {
    await expect(page).toHaveURL(/add-opportunity/);
  });
});
