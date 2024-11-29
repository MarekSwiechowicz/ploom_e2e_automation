import { expect, test } from "@playwright/test";
import { BasePage } from "../pages/basePage";
import { ProductsPage } from "../pages/ProductsPage";
import { HomePage } from "../pages/HomePage";
import { ShopPage } from "../pages/ShopPage";
import { CheckoutPage2 } from "../pages/CheckoutPage2";

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
      const productsPage = new ProductsPage(page);
      const checkoutPage2 = new CheckoutPage2(page);

      await basePage.navigateTo(url);
      await basePage.handleCookieBanner();
      await basePage.confirmAgePrompt();

      await homePage.navigateToShop();
      await shopPage.openAnyProductWithSKU();
      await productsPage.addToCart();
      await basePage.checkBasket();
      await productsPage.goToCheckout();
      await checkoutPage2.isProductInCart("Ploom X Advanced Black");
    });
  }
});
