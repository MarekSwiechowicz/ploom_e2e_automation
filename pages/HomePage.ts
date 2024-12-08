import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  async navigateToShop(): Promise<void> {
    const shopLink = this.page.getByTestId("headerItem-0");
    await shopLink.waitFor({ state: "visible" });
    await shopLink.click();

    // Move the mouse away to hide the dropdown
    await this.page.mouse.move(0, 0);
  }
}
