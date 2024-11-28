import { expect, test } from "@playwright/test";
import { BasePage } from "../pages/basePage";
import { ProductsPage } from "../pages/ProductsPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { HomePage } from "../pages/HomePage";
import { ShopPage } from "../pages/ShopPage";

// Define test data for different versions
const testVersions = [
  { url: "https://www.ploom.co.uk/en", language: "en" },
  // { url: "https://www.ploom.pl/pl", language: "pl" },
];

test.describe("Test 1", () => {
  for (const { url, language } of testVersions) {
    test(`Test site in ${language} version`, async ({ page }) => {
      const viewportSize = page.viewportSize();
      expect(viewportSize).toEqual({ width: 1440, height: 1098 });
      const basePage = new BasePage(page);
      const homePage = new HomePage(page);
      const shopPage = new ShopPage(page);
      const productPage = new ProductsPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      await basePage.navigateTo(url);
      await basePage.handleCookieBanner();
      await basePage.confirmAgePrompt();

      await homePage.navigateToShop();
      await shopPage.openAnyProductWithSKU();
    });
  }
});
