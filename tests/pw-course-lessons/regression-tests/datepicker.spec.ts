import { test } from '../fixtures/test.fixtures';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test.describe('Datepickers', () => {
  test.beforeEach(async ({ navigationPage }) => {
    await navigationPage.goDatepickerPage();
  });

  test('today', async ({ datepickerPage }) => {
    const date = new Date();

    await datepickerPage.selectDate(date);
    await datepickerPage.expectSelectedDate(date);
  });

  test('+1 month', async ({ datepickerPage }) => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);

    await datepickerPage.selectDate(date);
    await datepickerPage.expectSelectedDate(date);
  });

  test('-1 month', async ({ datepickerPage }) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);

    await datepickerPage.selectDate(date);
    await datepickerPage.expectSelectedDate(date);
  });

  test('+12 months', async ({ datepickerPage }) => {
    const date = new Date();
    date.setMonth(date.getMonth() + 12);

    await datepickerPage.selectDate(date);
    await datepickerPage.expectSelectedDate(date);
  });

  test('-12 months', async ({ datepickerPage }) => {
    const date = new Date();
    date.setMonth(date.getMonth() - 12);

    await datepickerPage.selectDate(date);
    await datepickerPage.expectSelectedDate(date);
  });
});
