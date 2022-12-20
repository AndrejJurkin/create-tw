import { test, expect } from "@playwright/test";

test("Nuxt.js", async ({ page }) => {
  await page.goto("http://localhost:3000");

  expect(await page.innerText("h1")).toBe("Create Tailwind");

  await page.waitForTimeout(3000);

  await expect(page).toHaveScreenshot({
    maxDiffPixels: 100,
  });
});
