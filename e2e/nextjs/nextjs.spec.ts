import { test, expect } from "@playwright/test";

test("Next.js", async ({ page }) => {
  await page.goto("/");

  expect(await page.innerText("h1")).toBe("Create Tailwind");

  await page.waitForTimeout(3000);

  await expect(page).toHaveScreenshot("nextjs.png", {
    maxDiffPixels: 100,
  });
});
