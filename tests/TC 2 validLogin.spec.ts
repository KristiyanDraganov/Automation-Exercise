import {test, expect} from '@playwright/test';

test('Valid login', async ({ page }) => {
    // Navigate to the website, accept cookies and verify title
    await page.goto('https://automationexercise.com');
    await page.click('button[aria-label="Consent"]');
    await expect(page).toHaveTitle('Automation Exercise');

    // Click on 'Signup / Login' button and verify 'Login to your account' is visible
    await page.click('a[href="/login"]');
    await expect(page.getByRole('heading', { name: 'Login to your account'})).toBeVisible();

    //Enter valid email address and password and click 'Login' button
    await page.fill('input[data-qa="login-email"]', '123test@test.com');
    await page.fill('input[data-qa="login-password"]', '123test@test.com');
    await page.click('button[data-qa="login-button"]');

    // Verify that 'Logged in as username' is visible
    await expect(page.getByText(`Logged in as 123`)).toBeVisible();

    // Account deletion will be skipped in this test to preserve the user for future login tests
});