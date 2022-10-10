import { test, expect } from "@playwright/test";

test("Next.js", async ({ page }) => {
  await page.goto("http://localhost:3000");

  expect(await page.innerText("h1")).toBe("Create Tailwind");

  await expect(page).toHaveScreenshot({
    maxDiffPixels: 100,
  });
});
