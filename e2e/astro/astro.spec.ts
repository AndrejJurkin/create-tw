import { test, expect } from "@playwright/test";

test("Astro", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page).toHaveScreenshot({
    maxDiffPixels: 100,
  });
});
