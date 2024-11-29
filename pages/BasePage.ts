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
  async checkBasket(): Promise<void> {
    const cartIconElement = this.page.locator(
      ".IconLabeled-module-label-fmiDL.mini-cart__icon-label",
      { hasText: "1" }
    );

    // Wait for 3 seconds
    await this.page.waitForTimeout(3000);

    // Wait for the element to be visible
    await cartIconElement.waitFor({ state: "visible" });

    // Safely extract and log text content
    const cartText = await cartIconElement.evaluate(
      (el) => el.textContent?.trim() || ""
    );
    console.log(`Cart icon text: "${cartText}"`);

    // Count the elements
    const elementCount = await cartIconElement.count();
    console.log(`Cart icon count: ${elementCount}`);

    // Fail the test if no matching elements are found
    if (elementCount < 1) {
      throw new Error("Cart icon with '1' was not found.");
    }
  }
}
