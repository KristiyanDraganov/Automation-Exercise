import { test, expect } from "@playwright/test";

test("Contact Us Form", async ({ page }) => {
  // Navigate to the website, accept cookies and verify title
  await page.goto("https://automationexercise.com");
  await page.click('button[aria-label="Consent"]');
  await expect(page).toHaveTitle("Automation Exercise");

  // Click on 'Contact Us' button and verify 'Get In Touch' is visible
  await page.click('a[href="/contact_us"]');
  await expect(
    page.getByRole("heading", { name: "Get In Touch" })).toBeVisible();

  // Fill out the contact form
  await page.type('input[data-qa="name"]', "Test User");
  await page.type('input[data-qa="email"]', "test@test.com");
  await page.type('input[data-qa="subject"]', "Test Subject");
  await page.type('textarea[data-qa="message"]', "Test message");

  // Upload a file
  await page.setInputFiles('input[name="upload_file"]', "./test-Data/test.txt");

  //Handle alert popup
  page.on("dialog", async (dialog) => {
    expect(dialog.message()).toBe("Press OK to proceed!");
    await dialog.accept();
  });

  // Click Submit button
  await page.click('input[data-qa="submit-button"]');

  //Verify success message
  await expect(page.locator('div.status.alert.alert-success', {hasText: "Success! Your details have been submitted successfully."})).toBeVisible();

  // Click 'Home' button and verify that home page is opened
  await page.click('a.btn.btn-success[href="/"]');
  await expect(page).toHaveURL("https://automationexercise.com/");
});
