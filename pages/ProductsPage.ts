import { BasePage } from "./basePage";

export class ProductsPage extends BasePage {
  async addToCart(): Promise<void> {
    await this.page.getByTestId("pdpAddToProduct").click();
  }
}
