import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the 'Forms' section
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

  test('input fields', async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator('nb-card', { hasText: 'Using the Grid' })
      .getByRole('textbox', { name: 'Email' });

    // Fill the Email input field
    await usingTheGridEmailInput.fill('test@test.com');
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially('test2@test.com', { delay: 500 });

    // Get the input value using inputValue() method
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual('test2@test.com');

    // Locator assertion to check input value
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com');
  });

  test('radio buttons', async ({ page }) => {
    const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' });

    // Check the first radio button (Option 1)
    await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true });

    // Verify that Option 1 is checked
    const radioStatus = await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked();
    expect(radioStatus).toBeTruthy();

    // Use locator assertion to verify Option 1 is checked
    await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked();

    // Check the second radio button (Option 2)
    await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true });

    // Verify that Option 1 is no longer checked
    expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy();

    // Verify that Option 2 is now checked
    expect(
      await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked(),
    ).toBeTruthy();
  });
});

test('checkboxes', async ({ page }) => {
  // Navigate to 'Modal & Overlays' and then to 'Toastr'
  await page.getByText('Modal & Overlays').click();
  await page.getByText('Toastr').click();

  // Uncheck the first checkbox ('Hide on click')
  await page.getByRole('checkbox', { name: 'Hide on click' }).uncheck({ force: true });

  // Check the second checkbox ('Prevent arising of duplicate toast')
  await page
    .getByRole('checkbox', { name: 'Prevent arising of duplicate toast' })
    .check({ force: true });

  // Get all checkboxes and uncheck them one by one
  const allBoxes = page.getByRole('checkbox');
  for (const box of await allBoxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});
