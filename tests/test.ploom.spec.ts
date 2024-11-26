import { test } from "@playwright/test";
import { BasePage } from "../pages/basePage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test("test", async ({ page }) => {
  const basePage = new BasePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Navigate and handle cookies
  await basePage.navigateTo("https://www.ploom.co.uk/en");
  await basePage.handleCookieBanner();
  await basePage.confirmAgePrompt();

  // Select product and add to cart
  await productPage.selectProduct("Ploom X Advanced Device--2");
  await productPage.addToCart();

  // Proceed to checkout
  await cartPage.proceedToCheckout();
  await checkoutPage.loginAtCheckout();
});
