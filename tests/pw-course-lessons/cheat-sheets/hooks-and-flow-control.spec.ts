import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe('suite 1: Charts', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Charts', exact: true }).click();
  });

  test('Echarts', async ({ page }) => {
    await page.getByText('Echarts').click();
  });
});

test.describe('suite 2: Forms', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
  });

  test('Form Layouts', async ({ page }) => {
    await page.getByText('Form Layouts').click();
  });

  test('Navigate to datepickers', async ({ page }) => {
    await page.getByText('Datepicker').click();
  });
});
