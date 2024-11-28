import { BasePage } from "./basePage";

export class ShopPage extends BasePage {
  async openAnyProductWithSKU(): Promise<void> {
    const productElement = this.page.locator('[data-sku="16154414"]');

    await productElement.scrollIntoViewIfNeeded();

    await productElement.click();
  }
}
