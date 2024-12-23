import { Page } from 'playwright';

export class BagPage {
  private page: Page;

  // Selectors
  private bagPageUrl = '/bag'; // Adjust according to your site's URL structure
  private promoCodeInput = '[data-cy="promo-code-input"]'; // Replace with the actual selector
  private applyPromoCodeButton = '[data-cy="apply-promo-code-button"]'; // Replace with the actual selector
  private promoCodeSuccessMessage = '[data-cy="promo-code-success-message"]'; // Replace with the actual selector

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the shopping bag page.
   * Ensures the page loads completely.
   */
  async navigateToBag(): Promise<void> {
    try {
      console.log('Navigating to the shopping bag page...');
      await this.page.goto(`${this.page.url()}${this.bagPageUrl}`, { waitUntil: 'load' });
      console.log('Successfully navigated to the shopping bag page.');
    } catch (error) {
      console.error('Error while navigating to the shopping bag page:', error);
      throw error;
    }
  }

  /**
   * Fills in the promo code input field.
   * @param promoCode - The promo code to apply.
   */
  async applyPromoCode(promoCode: string): Promise<void> {
    try {
      console.log(`Filling in the promo code: "${promoCode}"`);
      await this.page.fill(this.promoCodeInput, promoCode);
      console.log('Promo code input field filled successfully.');
    } catch (error) {
      console.error('Error while entering the promo code:', error);
      throw error;
    }
  }

  /**
   * Clicks the "Apply Promo Code" button and waits for the success message.
   */
  async clickAddPromoCode(): Promise<void> {
    try {
      console.log('Clicking the "Apply Promo Code" button...');
      await this.page.click(this.applyPromoCodeButton);
      console.log('Waiting for the promo code success message...');
      await this.page.waitForSelector(this.promoCodeSuccessMessage, { timeout: 5000 });
      console.log('Promo code successfully applied.');
    } catch (error) {
      console.error('Error while applying the promo code:', error);
      throw error;
    }
  }

  /**
   * Verifies that the promo code was applied successfully by checking for the success message.
   * @returns True if the promo code success message is visible, otherwise false.
   */
  async verifyPromoCodeApplied(): Promise<boolean> {
    try {
      console.log('Verifying promo code application success...');
      const isVisible = await this.page.isVisible(this.promoCodeSuccessMessage);
      console.log(`Promo code success message visibility: ${isVisible}`);
      return isVisible;
    } catch (error) {
      console.error('Error while verifying the promo code success message:', error);
      throw error;
    }
  }
}
