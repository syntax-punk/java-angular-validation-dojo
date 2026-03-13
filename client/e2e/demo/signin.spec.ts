import { expect, test } from '@playwright/test';

test.describe('Sign in flow', () => {
  test('Sign as Bobby Less', async ({ page }) => {
    await page.goto('https://localhost:4200/login');
    await page.locator('#sign-in').getByRole('button', { name: 'Sign in' }).click({ timeout: 5000 });
    await page.getByRole('textbox', { name: 'Email or Username' }).click();
    await page.getByRole('textbox', { name: 'Email or Username' }).fill('bobby@origin.no');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.getByRole('textbox', { name: 'Please enter your password' }).fill('Pass123$');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByText('Welcome back, @bobbylee')).toBeVisible({
      timeout: 10000
    });
  });
});
