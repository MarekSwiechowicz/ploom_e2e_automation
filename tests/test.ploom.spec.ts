import { expect, test } from "@playwright/test";
import { BasePage } from "../pages/basePage";
import { ProductsPage } from "../pages/ProductsPage";
import { HomePage } from "../pages/HomePage";
import { ShopPage } from "../pages/ShopPage";
import { CheckoutPage } from "../pages/CheckoutPage";

// Define test data for different versions
const testVersions = [
  { url: "https://www.ploom.co.uk/en", language: "en" },
  // { url: "https://www.ploom.pl/pl", language: "pl" },
];

test.describe("Test 1: Verify if it is possible to add a product to the cart.", () => {
  for (const { url, language } of testVersions) {
    test(`Test site in ${language} version`, async ({ page }) => {
      const viewportSize = page.viewportSize();
      expect(viewportSize).toEqual({ width: 1440, height: 1098 });
      const basePage = new BasePage(page);
      const homePage = new HomePage(page);
      const shopPage = new ShopPage(page);
      const productsPage = new ProductsPage(page);
      const checkoutPage2 = new CheckoutPage(page);

      await basePage.navigateTo(url);
      await basePage.handleCookieBanner();
      await basePage.confirmAgePrompt();

      await homePage.navigateToShop();
      await shopPage.openAnyProductWithSKU();
      await productsPage.addToCart();
      await basePage.checkBasket(1);
      await productsPage.goToCheckout();
      await checkoutPage2.isProductInCart("Ploom X Advanced Black");
    });
  }
});

test.describe("Test 2: Verify if it is possible to remove a product from the cart.", () => {
  for (const { url, language } of testVersions) {
    test(`Test site in ${language} version`, async ({ page }) => {
      const basePage = new BasePage(page);
      const homePage = new HomePage(page);
      const shopPage = new ShopPage(page);
      const productsPage = new ProductsPage(page);
      const checkoutPage = new CheckoutPage(page);

      // Precondition: Add a product to the cart
      await basePage.navigateTo(url);
      await basePage.handleCookieBanner();
      await basePage.confirmAgePrompt();

      await homePage.navigateToShop();
      await shopPage.openAnyProductWithSKU();
      await productsPage.addToCart();

      // Remove the product from the cart
      await productsPage.removeProductFromCart();

      // Verify that the product is no longer in the cart
      const isInCart = await checkoutPage.isProductInCart(
        "Ploom X Advanced Black"
      );
      expect(isInCart).toBe(false);

      // Check if the basket count is updated correctly
      const basketCount = await basePage.checkBasket(0);
      expect(basketCount).toBe(0);
    });
  }
});

test.describe("Test 3: Verify if there are any broken links or images on the product page.", () => {
  for (const { url, language } of testVersions) {
    test(`Test site in ${language} version`, async ({ page }) => {});
  }
});
