import { BasePage } from "./basePage";

export class ProductsPage extends BasePage {
  async addToCart(): Promise<void> {
    await this.page.getByTestId("pdpAddToProduct").click();
  }
  async goToCheckout(): Promise<void> {
    const checkoutButton = this.page.locator(
      'button[data-testid="miniCartCheckoutButton"]'
    );
    await checkoutButton.waitFor({ state: "visible" });
    await checkoutButton.click();
  }
}
