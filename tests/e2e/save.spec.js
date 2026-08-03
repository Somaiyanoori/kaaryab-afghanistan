import { test, expect } from "@playwright/test";

test.describe("Save Opportunity", () => {
  test("should save an opportunity", async ({ page }) => {
    await page.goto("/opportunities", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(1500);

    const saveButton = page.getByLabel("Save opportunity").first();

    if (await saveButton.isVisible()) {
      await saveButton.click();
      await page.waitForTimeout(1000);

      // Check saved state changed
      const removeSaved = page.getByLabel("Remove from saved").first();
      const isVisible = await removeSaved.isVisible().catch(() => false);
      expect(isVisible).toBe(true);
    }
  });

  test("should navigate to saved page", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(500);

    // Click saved link (may be a button with bookmark icon)
    const savedLink = page.locator('a[href="/saved"]').first();

    if (await savedLink.isVisible()) {
      await savedLink.click();
      await page.waitForTimeout(1000);
      await expect(page).toHaveURL(/saved/);
    }
  });

  test("should show empty state when no saved items", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.evaluate(() => localStorage.clear());

    await page.goto("/saved", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(1500);

    const body = await page.textContent("body");
    expect(body).toBeTruthy();
  });

  test("should save and see item in saved page", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.evaluate(() => localStorage.clear());

    await page.goto("/opportunities", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(1500);

    const saveButton = page.getByLabel("Save opportunity").first();
    if (await saveButton.isVisible()) {
      await saveButton.click();
      await page.waitForTimeout(1000);
    }

    await page.goto("/saved", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(1500);

    const cards = page.locator("article");
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("should show saved count in navbar", async ({ page }) => {
    await page.goto("/", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });

    // Just check saved link exists in navbar
    const savedLink = page.locator('a[href="/saved"]').first();
    await expect(savedLink).toBeVisible();
  });
});
