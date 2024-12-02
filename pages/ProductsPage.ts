import { BasePage } from "./basePage";

export class ProductsPage extends BasePage {
  // Define locators as class properties
  private addToCartButton = this.page.getByTestId("pdpAddToProduct");
  private removeFromCartButton = this.page.getByTestId("cartRemoveButton");
  private checkoutButton = this.page.locator(
    'button[data-testid="miniCartCheckoutButton"]'
  );

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeProductFromCart(): Promise<void> {
    await this.removeFromCartButton.click();
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutButton.waitFor({ state: "visible" });
    await this.checkoutButton.click();
  }
}
