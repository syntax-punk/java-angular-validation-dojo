import { expect, test } from '@playwright/test';

test.describe('Login page snapshots', () => {
  test('login page matches snapshot', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('#sign-in')).toBeVisible();
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('login page full page matches snapshot', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('#sign-in')).toBeVisible();
    await expect(page).toHaveScreenshot('login-page-full.png', { fullPage: true });
  });
});
