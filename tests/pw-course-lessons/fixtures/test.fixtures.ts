import { test as base } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation.page';
import { FormLayoutsPage } from '../page-objects/form-layouts.page';

type TestFixtures = {
  navigationPage: NavigationPage;
  formLayoutsPage: FormLayoutsPage;
};

export const test = base.extend<TestFixtures>({
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },

  formLayoutsPage: async ({ page }, use) => {
    await use(new FormLayoutsPage(page));
  },
});

export { expect } from '@playwright/test';
