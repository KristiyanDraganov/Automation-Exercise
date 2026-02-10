import { test, expect } from '@playwright/test';

test('Verify product pages', async ({ page }) => {
    // Navigate to the website, accept cookies and verify title
    await page.goto('https://automationexercise.com');
    await page.click('button[aria-label="Consent"]');
    await expect(page).toHaveTitle('Automation Exercise');

    // Click on 'Products' button and verify that user is navigated to products page successfully
    await page.click('a[href="/products"]');
    await expect(page).toHaveURL('https://automationexercise.com/products');
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

    // Click on 'View Product' of first product and verify that user is navigated to product detail page successfully
    await page.click('a[href="/product_details/1"]');
    await expect(page).toHaveURL('https://automationexercise.com/product_details/1');
    await expect(page.getByRole('heading', { name: 'Blue Top' })).toBeVisible();
    await expect(page.locator('p', { hasText: 'Category: Women > Tops' })).toBeVisible();
    await expect(page.locator('span span', { hasText: 'Rs. 500' })).toBeVisible();
    await expect(page.getByText('Availability: In Stock')).toBeVisible();
    await expect(page.getByText('Condition: New')).toBeVisible();
    await expect(page.getByText('Brand: Polo')).toBeVisible();
});