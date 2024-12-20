import { BasePage } from "./basePage";

export class ShopPage extends BasePage {
  async openAnyProductWithSKU(): Promise<void> {
    // Create a locator for the element with the specific data-sku
    const productElement = this.page.locator('[data-sku="ploom-x-advanced"]');

    // Wait for the element to be attached to the DOM
    await productElement.waitFor({ state: "attached" });

    // Force-click the element regardless of visibility or state
    await productElement.click({ force: true });
  }
}
