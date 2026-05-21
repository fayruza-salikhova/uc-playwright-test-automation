import { test, expect } from '@playwright/test';

test.describe('Auto-waiting examples', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
  });

  test('Auto-waiting: click waits for element to be visible', async ({ page }) => {
    const successMessage = page.locator('.bg-success');

    // Playwright automatically waits for the element to be visible (up to 30 seconds by default)
    // This timeout can be changed in playwright.config.ts (e.g. timeout: 10000)
    await successMessage.click();
  });

  test('Auto-waiting: textContent waits for element', async ({ page }) => {
    const successMessage = page.locator('.bg-success');

    // textContent() waits for the element to appear in the DOM
    const text = await successMessage.textContent();

    expect(text).toContain('Data loaded with AJAX get request.');
  });

  test('No auto-waiting: allTextContents requires manual wait', async ({ page }) => {
    const successMessage = page.locator('.bg-success');

    // allTextContents() does NOT implement auto-waiting
    // we need to wait for the element manually
    await successMessage.waitFor({ state: 'attached' });

    const texts = await successMessage.allTextContents();
    expect(texts).toContain('Data loaded with AJAX get request.');
  });

  test('Locator-based assertion timeout overriding', async ({ page }) => {
    const successMessage = page.locator('.bg-success');

    // All locator-based assertions in Playwright (like toHaveText, toBeVisible, etc.) have built-in auto-waiting with a default timeout of about 5 seconds.
    // here we override the timeout to 20 seconds
    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {
      timeout: 20000,
    });
  });

  test.describe('Alternative waits', () => {
    test('WaitForSelector: waits for element to appear', async ({ page }) => {
      const successMessage = page.locator('.bg-success');

      //Wait explicitly for the element to appear in the DOM
      await page.waitForSelector('.bg-success');

      const texts = await successMessage.allTextContents();
      expect(texts).toContain('Data loaded with AJAX get request.');
    });

    test('WaitForResponse: waits for specific network response', async ({ page }) => {
      const successMessage = page.locator('.bg-success');

      //Wait for a specific network response (AJAX request)
      await page.waitForResponse('http://uitestingplayground.com/ajaxdata');

      const texts = await successMessage.allTextContents();
      expect(texts).toContain('Data loaded with AJAX get request.');
    });

    test('WaitForLoadState: networkidle (not recommended)', async ({ page }) => {
      const successMessage = page.locator('.bg-success');

      //Wait until all network requests are finished
      //NOT recommended because it's unreliable and can slow down tests
      await page.waitForLoadState('networkidle');

      const texts = await successMessage.allTextContents();
      expect(texts).toContain('Data loaded with AJAX get request.');
    });
  });
});
