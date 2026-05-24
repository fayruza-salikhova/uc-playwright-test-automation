import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Datepickers', () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
  });

  test('Datepicker - today', async ({ page }) => {
    let date = new Date();
    await selectDate(page, date);
  });

  test('Datepicker - +1 month', async ({ page }) => {
    let date = new Date();
    date.setMonth(date.getMonth() + 1);

    await selectDate(page, date);
  });

  test('Datepicker - -1 month', async ({ page }) => {
    let date = new Date();
    date.setMonth(date.getMonth() - 1);

    await selectDate(page, date);
  });

  test('Datepicker - +12 months', async ({ page }) => {
    let date = new Date();
    date.setMonth(date.getMonth() + 12);

    await selectDate(page, date);
  });

  test('Datepicker - -12 months', async ({ page }) => {
    let date = new Date();
    date.setMonth(date.getMonth() - 12);

    await selectDate(page, date);
  });
});

async function selectDate(page: import('@playwright/test').Page, date: Date) {
  const expectedDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' });
  const expectedMonthLong = date.toLocaleString('En-US', { month: 'long' });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

  const calendarInputField = page.getByPlaceholder('Form Picker');
  await calendarInputField.click();

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`;

  const today = new Date();

  const monthDiff =
    (date.getFullYear() - today.getFullYear()) * 12 + (date.getMonth() - today.getMonth());

  const clicks = Math.abs(monthDiff);

  const arrow =
    monthDiff > 0
      ? page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      : page.locator('nb-calendar-pageable-navigation [data-name="chevron-left"]');

  for (let i = 0; i < clicks; i++) {
    await arrow.click();
  }

  await page
    .locator('.day-cell.ng-star-inserted:not(.bounding-month)')
    .getByText(expectedDate, { exact: true })
    .click();

  await expect(calendarInputField).toHaveValue(dateToAssert);
}
