import { test } from '../fixtures/test.fixtures';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('navigate to form page', async ({ navigationPage }) => {
  await navigationPage.goFormLayoutsPage();
  await navigationPage.goDatepickerPage();
  await navigationPage.goSmartTablePage();
  await navigationPage.goToastrPage();
  await navigationPage.goTooltipPage();
});
