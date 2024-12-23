import { Page } from 'playwright';
import { CONFIG } from '../utilities/config';

export class Catalognav {
  private page: Page;

  // Selectors
  private cookieAcceptButton = '#onetrust-accept-btn-handler'; // Selector for the "Accept Cookies" button
  private productSelector = '//a[contains(@href, "/shop/p/")]'; // XPath selector for product links
  private productGridSelector = '.containerGrid'; // Selector for the product grid

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the sale page and ensures cookies are accepted.
   */
  async navigateToSalePage(): Promise<void> {
    console.log('Navigating to the sale page...');
    try {
      // Accept cookies if the banner is visible
      await this.acceptCookies();

      // Navigate to the sale page
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
   * Scrolls through the product list to ensure all products are loaded.
   */
  async scrollThroughProducts(): Promise<void> {
    console.log('Scrolling through the product grid...');
    try {
      // Wait for the product grid container to become visible
      await this.page.waitForSelector(this.productGridSelector, { timeout: 10000 });
      console.log('Product grid is visible.');

      // Scroll incrementally to load all products
      let previousHeight = 0;
      let currentHeight = await this.page.evaluate(() => document.body.scrollHeight);

      while (currentHeight > previousHeight) {
        console.log('Scrolling further to load more products...');
        previousHeight = currentHeight;
        await this.page.evaluate(() => window.scrollBy(0, 500)); // Scroll down incrementally
        await this.page.waitForTimeout(1000); // Allow time for products to load
        currentHeight = await this.page.evaluate(() => document.body.scrollHeight);
      }

      console.log('Finished scrolling through the product grid.');
    } catch (error) {
      console.error('Error while scrolling through the product grid:', error);
      throw error;
    }
  }

  /**
   * Verifies that all products on the page are visible.
   * @returns True if all products are visible, otherwise false.
   */
  async verifyAllProductsVisible(): Promise<boolean> {
    console.log('Verifying visibility of all products...');
    try {
      const productElements = this.page.locator(this.productSelector);
      const productCount = await productElements.count();

      for (let i = 0; i < productCount; i++) {
        const isVisible = await productElements.nth(i).isVisible();
        if (!isVisible) {
          console.error(`Product at index ${i} is not visible.`);
          return false;
        }
      }

      console.log('All products are visible.');
      return true;
    } catch (error) {
      console.error('Error verifying product visibility:', error);
      throw error;
    }
  }
}
