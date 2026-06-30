import type { Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class DatepickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get calendarInput() {
    return this.page.getByPlaceholder('Form Picker');
  }

  async selectDate(date: Date) {
    await this.calendarInput.click();
    await this.selectDateInTheCalendar(date);
  }

  async expectSelectedDate(date: Date) {
    await expect(this.calendarInput).toHaveValue(this.formatDate(date));
  }

  private async selectDateInTheCalendar(date: Date) {
    const expectedDate = date.getDate().toString();

    const today = new Date();

    const monthDiff =
      (date.getFullYear() - today.getFullYear()) * 12 + (date.getMonth() - today.getMonth());

    const arrow =
      monthDiff >= 0
        ? this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        : this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-left"]');

    for (let i = 0; i < Math.abs(monthDiff); i++) {
      await arrow.click();
    }

    await this.page
      .locator('.day-cell.ng-star-inserted:not(.bounding-month)')
      .getByText(expectedDate, { exact: true })
      .click();
  }

  private formatDate(date: Date): string {
    return `${date.toLocaleString('en-US', {
      month: 'short',
    })} ${date.getDate()}, ${date.getFullYear()}`;
  }
}
