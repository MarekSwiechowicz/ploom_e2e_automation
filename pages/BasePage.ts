import { Page, expect } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  private getCookieBannerButton() {
    return this.page.locator("#onetrust-reject-all-handler");
  }

  private getAgeConfirmButton() {
    return this.page.locator(
      '.ageconfirmation__confirmBtn [data-testid="customButton"]'
    );
  }

  private getCartIcon() {
    return this.page.locator(".mini-cart__icon-label");
  }

  async handleCookieBanner(): Promise<void> {
    try {
      const cookieButton = this.getCookieBannerButton();
      if (await cookieButton.isVisible()) {
        await cookieButton.click();
      }
    } catch (error) {
      console.warn("Cookie banner not found, skipping.");
    }
  }

  async confirmAgePrompt(): Promise<void> {
    const confirmButton = this.getAgeConfirmButton();
    if (await confirmButton.isVisible()) {
      await confirmButton.click();
    }
  }

  async checkBasket(expectedItemCount: number): Promise<void> {
    const cartIconElement = this.getCartIcon();

    const cartText = await cartIconElement.textContent();
    const actualCount = parseInt(cartText?.trim() || "0", 10);
    if (actualCount !== expectedItemCount) {
      throw new Error(
        `Expected ${expectedItemCount} items, but found ${actualCount}.`
      );
    }
  }
}
