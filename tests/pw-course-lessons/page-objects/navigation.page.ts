import type { Page } from '@playwright/test';

export class NavigationPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goFormLayoutsPage() {
    await this.selectGoupMenuItem('Forms');
    await this.page.getByText('Form Layouts').click();
  }

  async goDatepickerPage() {
    await this.selectGoupMenuItem('Forms');
    await this.page.getByText('Datepicker').click();
  }

  async goSmartTablePage() {
    await this.selectGoupMenuItem('Tables & Data');
    await this.page.getByText('Smart Table').click();
  }

  async goToastrPage() {
    await this.selectGoupMenuItem('Modal & Overlays');
    await this.page.getByText('Toastr').click();
  }

  async goTooltipPage() {
    await this.selectGoupMenuItem('Modal & Overlays');
    await this.page.getByText('Tooltip').click();
  }

  private async selectGoupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    await groupMenuItem.waitFor({ state: 'visible' });
    const expandedState = await groupMenuItem.getAttribute('aria-expanded');
    if (expandedState == 'false') await groupMenuItem.click();
  }
}
