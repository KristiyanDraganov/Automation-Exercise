import {test, expect} from '@playwright/test';

test('Invalid login', async ({ page }) => {
    // Navigate to the website, accept cookies and verify title
    await page.goto('https://automationexercise.com');
    await page.click('button[aria-label="Consent"]');
    await expect(page).toHaveTitle('Automation Exercise');

    // Click on 'Signup / Login' button and verify 'Login to your account' is visible
    await page.click('a[href="/login"]');
    await expect(page.getByRole('heading', { name: 'Login to your account'})).toBeVisible();

    //Enter invalid email address and password and click 'Login' button
    await page.fill('input[data-qa="login-email"]', 'invalid@test.com');
    await page.fill('input[data-qa="login-password"]', 'invalid@test.com');
    await page.click('button[data-qa="login-button"]');

    // Verify that error 'Your email or password is incorrect!' is visible
    await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
});