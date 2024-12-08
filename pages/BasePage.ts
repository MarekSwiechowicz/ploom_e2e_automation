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

  async checkBasketCount(expectedItemCount: number): Promise<void> {
    const cartIconElement = this.getCartIcon();

    const cartText = await cartIconElement.textContent();
    const actualCount = parseInt(cartText?.trim() || "0", 10);
    if (actualCount !== expectedItemCount) {
      throw new Error(
        `Expected ${expectedItemCount} items, but found ${actualCount}.`
      );
    }
  }
  async isBasketEmpty(): Promise<boolean> {
    // Check if the mini-cart is already visible
    const isMiniCartVisible = await this.page.isVisible(
      '[data-testid="mini-cart-header"]'
    );

    // If not visible, click on the cart icon to open it
    if (!isMiniCartVisible) {
      await this.page.click('[data-testid="miniCart"]');

      // Wait for the mini-cart container to appear
      await this.page.waitForSelector('[data-testid="mini-cart-header"]');
    }

    // Get the text content of the element displaying the item count
    const itemCountText = await this.page.textContent(
      '[data-testid="mini-cart-header"] [data-testid=""]'
    );

    // Parse the item count from the text
    const itemCount = parseInt(
      itemCountText?.replace("Items", "").trim() || "0"
    );

    // Return true if the item count is 0, otherwise false
    return itemCount === 0;
  }
}
