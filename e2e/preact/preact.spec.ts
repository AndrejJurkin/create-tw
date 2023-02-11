import { test, expect } from "@playwright/test";

test("Preact", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");

  expect(await page.innerText("h1")).toBe("Create Tailwind");

  await page.waitForTimeout(3000);

  await expect(page).toHaveScreenshot();
});
