import {test, expect} from '@playwright/test';

test('Register User', async ({ page }) => {
    // Navigate to the website, accept cookies and verify title
    await page.goto('https://automationexercise.com');
    await page.click('button[aria-label="Consent"]');
    await expect(page).toHaveTitle('Automation Exercise');

    // Click on 'Signup / Login' button and verify 'New User Signup!' is visible
    await page.click('a[href="/login"]');
    await expect(page.getByRole('heading', { name: 'New User Signup!'})).toBeVisible();

    //Enter name and email address and click 'Signup' button
    let firstName: string = 'Kristiyan';
    await page.fill('input[data-qa="signup-name"]', firstName);
    await page.fill('input[data-qa="signup-email"]', '123123@test.com');
    await page.click('button[data-qa="signup-button"]');

    //Verify that 'ENTER ACCOUNT INFORMATION' is visible
    await expect(page.getByRole('heading', { name: 'Enter Account Information'})).toBeVisible();

    // Fill details: Title, Password, Date of birth
    await page.check('input[id="id_gender1"]');
    await page.fill('input[id="password"]', '123456!');
    await page.selectOption('select[id="days"]', '15');
    await page.selectOption('select[id="months"]', '9');
    await page.selectOption('select[id="years"]', '1999');

    //Select both checkboxes: Sign up for our newsletter! and Receive special offers from our partners!
    await page.check('input[id="newsletter"]');
    await page.check('input[id="optin"]');

    // Fill details: First name, Last name, Company, Address, Address2, Country, State, City, Zipcode, Mobile Number
    await page.fill('input[data-qa="first_name"]', 'Kristiyan');
    await page.fill('input[data-qa="last_name"]', 'Draganov');
    await page.fill('input[data-qa="company"]', 'CompanyTest');
    await page.fill('input[data-qa="address"]', 'Address 123');
    await page.fill('input[data-qa="address2"]', 'Address 456');
    await page.selectOption('select[data-qa="country"]', 'Canada');
    await page.fill('input[data-qa="state"]', 'State1');
    await page.fill('input[data-qa="city"]', 'Toronto');
    await page.fill('input[data-qa="zipcode"]', '1234');
    await page.fill('input[data-qa="mobile_number"]', '1234567890');

    // Click 'Create Account' button
    await page.click('button[data-qa="create-account"]');

    // Verify that 'ACCOUNT CREATED!' is visible and click 'Continue' button
    await expect(page.getByRole('heading', { name: 'Account Created!'})).toBeVisible();
    await page.click('a[data-qa="continue-button"]');

    // Verify that 'Logged in as username' is visible
    await expect(page.getByText(`Logged in as ${firstName}`)).toBeVisible();

    // Click 'Delete Account' button and verify that 'ACCOUNT DELETED!' is visible
    await page.click('a[href="/delete_account"]');
    await expect(page.getByRole('heading', { name: 'Account Deleted!'})).toBeVisible();
    await page.pause();
});