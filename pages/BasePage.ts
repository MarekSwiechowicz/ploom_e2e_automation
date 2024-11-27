import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async handleCookieBanner(): Promise<void> {
    // Locate the button by its unique ID
    const cookieButton = this.page.locator("#onetrust-reject-all-handler");

    // Wait for the button to become visible (firefox workaround)
    await cookieButton.waitFor({ state: "visible" });

    // Click the button
    await cookieButton.click();
  }

  async confirmAgePrompt(): Promise<void> {
    const confirmButton = this.page.locator(
      '.ageconfirmation__confirmBtn [data-testid="customButton"]'
    );
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }
  }
}
