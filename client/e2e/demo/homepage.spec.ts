import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Client/);
  });

  test('has login button', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('#sign-in')).toBeVisible();
  });

  test('navigates to register', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Register' }).click();
    await expect(page).toHaveURL('users/new');
  });
});
