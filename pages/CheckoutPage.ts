import { BasePage } from "./basePage";

export class CheckoutPage extends BasePage {
  async loginAtCheckout(): Promise<void> {
    await this.page.getByTestId("loginCheckoutButton").click();
  }
}
