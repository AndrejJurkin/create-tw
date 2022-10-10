import { test, expect } from "@playwright/test";

test("React", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");

  expect(await page.innerText("h1")).toBe("Create Tailwind");

  await expect(page).toHaveScreenshot({
    maxDiffPixels: 100,
  });
});
