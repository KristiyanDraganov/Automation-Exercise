import { test, expect } from "@playwright/test";

test("Verify test cases page", async ({ page }) => {
  // Navigate to the website, accept cookies and verify title
  await page.goto("https://automationexercise.com");
  await page.click('button[aria-label="Consent"]');
  await expect(page).toHaveTitle("Automation Exercise");

  // Click on 'Test Cases' button and verify that user is navigated to test cases page successfully
  await page.click('a[href="/test_cases"]');
  await expect(page).toHaveURL("https://automationexercise.com/test_cases");
});
