import { BasePage } from "./basePage";

export class CheckoutPage2 extends BasePage {
  async isProductInCart(productName: string): Promise<boolean> {
    // Create a locator for the product name
    const productElement = this.page.locator(
      '[data-testid="regular-cart-list"] .ProductMiniature-module-productName-cu7Vu',
      {
        hasText: productName,
      }
    );

    // Wait for the product element to be attached to the DOM
    await productElement.waitFor({ state: "attached" });

    // Check if the product element is visible
    return await productElement.isVisible();
  }
}
