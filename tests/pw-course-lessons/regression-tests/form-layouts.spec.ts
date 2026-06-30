import { test } from '../fixtures/test.fixtures';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test('form submittings', async ({ navigationPage, formLayoutsPage }) => {
  await navigationPage.goFormLayoutsPage();

  await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOptions(
    'tesdt@test.com',
    'Welcome1',
    'Option 2',
  );
  await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Smith', 'smith@test.com', false);
});
