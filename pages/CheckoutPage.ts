import { BasePage } from "./basePage";

export class CheckoutPage extends BasePage {
  async isProductInCart(productName: string): Promise<boolean> {
    // Create a locator for the product name
    const productElement = this.page.locator(
      '[data-testid="regular-cart-list"] .ProductMiniature-module-productName-cu7Vu',
      {
        hasText: productName,
      }
    );

    // Check if the product element is visible
    return await productElement.isVisible();
  }

  async goToCheckout(): Promise<void> {}
}
