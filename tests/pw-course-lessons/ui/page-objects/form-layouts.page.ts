import type { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class FormLayoutsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get usingTheGridForm() {
    return this.page.locator('nb-card', {
      hasText: 'Using the Grid',
    });
  }

  private get inlineForm() {
    return this.page.locator('nb-card', {
      hasText: 'Inline form',
    });
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOptions(
    email: string,
    password: string,
    optionText: string,
  ) {
    await this.usingTheGridForm.getByRole('textbox', { name: 'Email' }).fill(email);
    await this.usingTheGridForm.getByRole('textbox', { name: 'Password' }).fill(password);
    await this.usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true });
    await this.usingTheGridForm.getByRole('button').click();
  }
  /**
   * This method fill out the Inline form with user details
   * @param name - should be first and last name
   * @param email - valid email for the test user
   * @param rememberMe -  true or false if user session to be safed
   */
  async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
    await this.inlineForm.getByRole('textbox', { name: 'Jane Doe' }).fill(name);
    await this.inlineForm.getByRole('textbox', { name: 'Email' }).fill(email);

    if (rememberMe) await this.inlineForm.getByRole('checkbox').check({ force: true });

    await this.inlineForm.getByRole('button').click();
  }
}
