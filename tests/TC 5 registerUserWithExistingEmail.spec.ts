import {test, expect} from '@playwright/test';

test('Register User with existing email', async ({ page }) => {
    // Navigate to the website, accept cookies and verify title
    await page.goto('https://automationexercise.com');
    await page.click('button[aria-label="Consent"]');
    await expect(page).toHaveTitle('Automation Exercise');

    // Click on 'Signup / Login' button and verify 'New User Signup!' is visible
    await page.click('a[href="/login"]');
    await expect(page.getByRole('heading', { name: 'New User Signup!'})).toBeVisible();


    //Enter name and existing email address and click 'Signup' button
    await page.fill('input[data-qa="signup-name"]', '123');
    await page.fill('input[data-qa="signup-email"]', '123test@test.com');
    await page.click('button[data-qa="signup-button"]');

    // Verify that error 'Email Address already exist!' is visible
    await expect(page.getByText('Email Address already exist!')).toBeVisible();
});