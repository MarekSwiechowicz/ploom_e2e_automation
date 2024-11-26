import { BasePage } from "./basePage";

export class CartPage extends BasePage {
  async proceedToCheckout(): Promise<void> {
    await this.page.getByTestId("miniCartCheckoutButton").click();
  }
}
