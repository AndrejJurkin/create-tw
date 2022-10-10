import { test, expect } from "@playwright/test";

test("Next.js", async ({ page }) => {
  await page.goto("/");

  expect(await page.innerText("h1")).toBe("Create Tailwind");

  // Wait 2 seconds
  await page.waitForTimeout(3000);

  await expect(page).toHaveScreenshot({
    maxDiffPixels: 100,
  });
});
