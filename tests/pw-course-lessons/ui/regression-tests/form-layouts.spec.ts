import { test } from '../fixtures/test.fixtures';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('form submittings', async ({ navigationPage, formLayoutsPage }) => {
  await navigationPage.goFormLayoutsPage();

  const randomFullName = faker.person.fullName({ firstName: 'TestPerson' });
  const randomEmail = `${randomFullName.replace(/\s/g, '')}${faker.number.int({ max: 1000 })}@test.com`;
  await formLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOptions(
    'tesdt@test.com',
    'Welcome1',
    'Option 2',
  );
  await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox(
    randomFullName,
    randomEmail,
    false,
  );
});
