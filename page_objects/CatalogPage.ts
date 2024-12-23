import { Page } from 'playwright';
import { CONFIG } from '../utilities/config';

export class CatalogPage {
  private page: Page;

  // Selectors
  private cookieAcceptButton = '#onetrust-accept-btn-handler';
  private productSelector = '//a[contains(@href, "/shop/p/")]';
  private selectSizeButton = 'button:has-text("Select size")';
  private sizeOptionsContainer = '[data-cy="selected-size-options"]';
  private sizeOption = '[data-cy="selected-size-options"] li';
  private addToBagButton = 'button:has-text("Add to bag")';
  private bagConfirmationSelector = 'h3:has-text("It\'s in the bag")';

  constructor(page: Page) {
    this.page = page;
    this.acceptCookies().catch(console.error); // Ensure cookies are accepted on instantiation
  }

  /**
   * Navigates to the sale page.
   */
  async navigateToSalePage(): Promise<void> {
    console.log('Navigating to the sale page...');
    try {
      await this.page.goto(`${CONFIG.baseURL}/shop/c/sale`, { waitUntil: 'load' });
      console.log('Sale page loaded successfully.');
    } catch (error) {
      console.error('Error navigating to the sale page:', error);
      throw error;
    }
  }

  /**
   * Accepts cookies if the cookie banner is visible.
   */
  async acceptCookies(): Promise<void> {
    console.log('Checking for cookie banner...');
    try {
      const isCookieBannerVisible = await this.page.isVisible(this.cookieAcceptButton);
      if (isCookieBannerVisible) {
        console.log('Cookie banner is visible. Clicking accept...');
        await this.page.click(this.cookieAcceptButton);
        console.log('Cookies accepted successfully.');
      } else {
        console.log('No cookie banner detected. Proceeding...');
      }
    } catch (error) {
      console.error('Error handling cookies:', error);
      throw error;
    }
  }

  /**
   * Selects a random product from the product list.
   */
  async selectRandomProduct(): Promise<void> {
    console.log('Selecting a random product from the list...');
    try {
      const productElements = await this.page.locator(this.productSelector).elementHandles();
      if (productElements.length === 0) {
        throw new Error('No products found on the sale page!');
      }

      const randomIndex = Math.floor(Math.random() * productElements.length);
      const randomProduct = productElements[randomIndex];

      await randomProduct.scrollIntoViewIfNeeded();
      console.log(`Clicking on product at index ${randomIndex}...`);
      await randomProduct.click();
      console.log('Product selected and redirected to the product detail page.');
    } catch (error) {
      console.error('Error selecting a random product:', error);
      throw error;
    }
  }

  /**
   * Selects a size for the product.
   */
  async selectSize(): Promise<void> {
    console.log('Attempting to select a size...');
    try {
      await this.page.click(this.selectSizeButton);
      console.log('Opened the size selection menu.');

      await this.page.waitForSelector(this.sizeOptionsContainer);
      const sizeOptions = this.page.locator(this.sizeOption);
      const sizeCount = await sizeOptions.count();

      if (sizeCount === 0) {
        throw new Error('No sizes available for selection!');
      }

      for (let i = 0; i < sizeCount; i++) {
        const sizeElement = sizeOptions.nth(i);
        const sizeText = await sizeElement.textContent();
        const isClickable = await sizeElement.isVisible() && await sizeElement.isEnabled();

        if (isClickable && !sizeText?.toLowerCase().includes('out of stock')) {
          console.log(`Clicking on available size at index ${i}: ${sizeText?.trim()}`);
          await sizeElement.click();
          console.log('Size selected.');
          return;
        } else {
          console.log(`Size at index ${i} is not clickable or out of stock: ${sizeText?.trim()}`);
        }
      }

      throw new Error('No available sizes could be selected.');
    } catch (error) {
      console.error('Error selecting a size:', error);
      throw error;
    }
  }

  /**
   * Clicks the "Add to Bag" button.
   */
  async addToBag(): Promise<void> {
    console.log('Clicking "Add to Bag" button...');
    try {
      await this.page.click(this.addToBagButton);
      console.log('Product added to the bag.');
    } catch (error) {
      console.error('Error clicking "Add to Bag" button:', error);
      throw error;
    }
  }

  /**
   * Retrieves the confirmation message after adding to the bag.
   * @returns The confirmation message text
   */
  async getBagConfirmationMessage(): Promise<string> {
    console.log('Retrieving the bag confirmation message...');
    try {
      await this.page.waitForSelector(this.bagConfirmationSelector, { timeout: 5000 });
      const message = await this.page.textContent(this.bagConfirmationSelector);
      console.log(`Bag confirmation message: ${message}`);
      return message?.trim() ?? '';
    } catch (error) {
      console.error('Error retrieving the bag confirmation message:', error);
      throw error;
    }
  }
}
