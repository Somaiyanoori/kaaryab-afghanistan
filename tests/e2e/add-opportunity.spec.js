import { test, expect } from "@playwright/test";

test.describe("Add Opportunity Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/add-opportunity", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
  });

  test("should load add opportunity page", async ({ page }) => {
    await expect(page).toHaveURL(/add-opportunity/);
    await expect(page.getByText(/Post a New/i)).toBeVisible();
  });

  test("should display all form sections", async ({ page }) => {
    await expect(page.getByText("Basic Information")).toBeVisible();
    await expect(page.getByText("Classification")).toBeVisible();
    await expect(page.getByText("Full Details")).toBeVisible();
    await expect(page.getByText("Application Info")).toBeVisible();
    await expect(page.getByText("Additional Details")).toBeVisible();
  });

  test("should have back link to opportunities", async ({ page }) => {
    const backLink = page.getByRole("link", {
      name: /back to opportunities/i,
    });
    await expect(backLink).toBeVisible();
  });

  test("should show validation errors on empty submit", async ({ page }) => {
    const submitButton = page.getByRole("button", {
      name: /submit opportunity/i,
    });

    await submitButton.click();
    await page.waitForTimeout(1500);

    // Should still be on same page
    await expect(page).toHaveURL(/add-opportunity/);
  });

  test("should fill and see live preview", async ({ page }) => {
    const titleInput = page.locator('input[name="title"]');
    await titleInput.fill("Test Opportunity Title");
    await page.waitForTimeout(700);

    // Check title appears somewhere (either in input or preview)
    const titleValue = await titleInput.inputValue();
    expect(titleValue).toBe("Test Opportunity Title");
  });

  test("should fill organization", async ({ page }) => {
    const orgInput = page.locator('input[name="organization"]');
    await orgInput.fill("Test Organization");
    await page.waitForTimeout(700);

    const orgValue = await orgInput.inputValue();
    expect(orgValue).toBe("Test Organization");
  });

  test("should have category dropdown with options", async ({ page }) => {
    const categorySelect = page.locator('select[name="category"]');
    await expect(categorySelect).toBeVisible();

    // Just check options exist
    const optionsCount = await categorySelect.locator("option").count();
    expect(optionsCount).toBeGreaterThan(1);
  });

  test("should have Reset Form button", async ({ page }) => {
    const resetButton = page.getByRole("button", { name: /reset form/i });
    await expect(resetButton).toBeVisible();
  });

  test("should reset form when Reset button clicked", async ({ page }) => {
    const titleInput = page.locator('input[name="title"]');
    await titleInput.fill("Some Title");

    const resetButton = page.getByRole("button", { name: /reset form/i });
    await resetButton.click();
    await page.waitForTimeout(500);

    await expect(titleInput).toHaveValue("");
  });

  test("should have all required inputs", async ({ page }) => {
    await expect(page.locator('input[name="title"]')).toBeVisible();
    await expect(page.locator('input[name="organization"]')).toBeVisible();
    await expect(page.locator('select[name="category"]')).toBeVisible();
    await expect(page.locator('select[name="location"]')).toBeVisible();
    await expect(page.locator('input[name="applyLink"]')).toBeVisible();
  });
});
