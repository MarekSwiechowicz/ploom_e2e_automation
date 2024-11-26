import { BasePage } from "./basePage";

export class ProductPage extends BasePage {
  async selectProduct(productTestId: string): Promise<void> {
    await this.page.getByTestId(productTestId).click();
  }

  async addToCart(): Promise<void> {
    await this.page.getByTestId("pdpAddToProduct").click();
  }
}
