import { test, expect } from '@playwright/test';

test('Homepage has correct title', async ({ page }) => {
  await page.goto('/');  // Navigate to the homepage

  // Check if the title is correct
  await expect(page).toHaveTitle('');

  // Check if a specific text appears on the homepage
  await expect(page.locator('h1')).toHaveText('Welcome!');
});
