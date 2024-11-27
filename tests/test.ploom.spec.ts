import { test } from "@playwright/test";
import { BasePage } from "../pages/basePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { HomePage } from "../pages/HomePage";
import { ShopPage } from "../pages/ShopPage";

// Define test data for different versions
const testVersions = [
  { url: "https://www.ploom.co.uk/en", language: "en" },
  { url: "https://www.ploom.pl/pl", language: "pl" },
];

test.describe("Test 1", () => {
  for (const { url, language } of testVersions) {
    test(`Test site in ${language} version`, async ({ page }) => {
      const basePage = new BasePage(page);
      const homePage = new HomePage(page);
      const shopPage = new ShopPage(page);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      // Navigate and handle cookies
      await basePage.navigateTo(url);
      await basePage.handleCookieBanner();
      await basePage.confirmAgePrompt();

      // Select product and add to cart
      await homePage.navigateToShop();
      await shopPage.openAnyProductWithSKU("ploom-x-advanced");

      // // Proceed to checkout
      // await cartPage.proceedToCheckout();
      // await checkoutPage.loginAtCheckout();
    });
  }
});
