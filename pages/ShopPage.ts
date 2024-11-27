import { BasePage } from "./basePage";

export class ShopPage extends BasePage {
  async openAnyProductWithSKU(sku: string): Promise<void> {
    console.log(`Attempting to locate product with SKU: ${sku}`);

    const cartElement = this.page.locator(
      "#doc > header > div.xf__base > div > div > div.header__wrapper > div.grid-container > div > div.header__wrapper-links-language-selector > div > ul > li.headerlinks__listItem.headerlinks__listItem--cart"
    );

    try {
      // Wait for cart element and hover
      await cartElement.waitFor({ state: "visible", timeout: 5000 });
      await cartElement.hover();

      // Debugging: Wait for any product with a `data-sku` attribute
      await this.page.waitForSelector("[data-sku]", { timeout: 10000 });

      // Debugging: Log all SKUs available on the page
      const availableSKUs = await this.page
        .locator("[data-sku]")
        .evaluateAll((elements) =>
          elements.map((el) => el.getAttribute("data-sku"))
        );
      console.log("Available SKUs on the page:", availableSKUs);

      // Verify if the desired SKU exists
      if (!availableSKUs.includes(sku)) {
        console.error(
          `SKU '${sku}' not found. Available SKUs: ${availableSKUs}`
        );
        throw new Error(
          `Product with SKU '${sku}' is not present on the page.`
        );
      }

      // Locate the product element by SKU
      const productElement = this.page.locator(`[data-sku="${sku}"]`);

      // Debugging: Check if the element is visible and interactable
      const isVisible = await productElement.isVisible();
      const isEnabled = await productElement.isEnabled();
      console.log(`Product visibility: ${isVisible}, enabled: ${isEnabled}`);

      if (!isVisible) {
        console.log(
          `Product with SKU '${sku}' is not visible. Attempting to scroll into view.`
        );
        await this.page.evaluate((sku) => {
          const element = document.querySelector(`[data-sku="${sku}"]`);
          if (element)
            element.scrollIntoView({ block: "center", inline: "center" });
        }, sku);
      }

      // Ensure no covering elements
      const boundingBox = await productElement.boundingBox();
      const coveringElement = await this.page.evaluate(
        ([x, y]) => {
          return document.elementFromPoint(x, y)?.outerHTML;
        },
        [
          boundingBox.x + boundingBox.width / 2,
          boundingBox.y + boundingBox.height / 2,
        ]
      );
      if (coveringElement) {
        console.log("Covering Element HTML:", coveringElement);
      }

      // Click the product element (force click if necessary)
      await productElement.click({ force: true });
      console.log(`Successfully clicked on product with SKU: ${sku}`);
    } catch (error) {
      // Take a full-page screenshot for debugging
      await this.page.screenshot({
        path: "error-screenshot.png",
        fullPage: true,
      });
      console.error(`Error interacting with SKU '${sku}':`, error);
      throw new Error(
        `Failed to interact with product SKU '${sku}'. See screenshot for details.`
      );
    }
  }
}
