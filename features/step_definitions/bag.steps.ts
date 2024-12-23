import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CatalogPage } from '../../page_objects/CatalogPage';
import { Browser, chromium, Page } from 'playwright';

let browser: Browser; // Browser instance
let page: Page; // Page instance
let catalogPage: CatalogPage; // CatalogPage object

/**
 * Launches the browser, navigates to the sale page, and accepts cookies.
 */
Given('I am on the products page', async function () {
  try {
    console.log('Launching browser and navigating to the sale page...');
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    catalogPage = new CatalogPage(page);

    console.log('Navigating to the sale page...');
    await catalogPage.navigateToSalePage();

    console.log('Successfully navigated to the sale page.');

    console.log('Accepting cookies...');
    await page.click('button#onetrust-accept-btn-handler');
    await catalogPage.acceptCookies();

    console.log('Waiting to ensure cookies are accepted...');
    await page.waitForTimeout(2000); // Ensure any cookie-related actions are completed
    console.log('Successfully handled cookies.');
  } catch (error) {
    console.error('Error in "Given I am on the products page" step:', error);
    throw error;
  }
});

/**
 * Selects a random product from the product list.
 */
When('I select a product from the list', async function () {
  try {
    console.log('Selecting a product from the list...');
    await catalogPage.selectRandomProduct();
    console.log('Product successfully selected.');
  } catch (error) {
    console.error('Error in "When I select a product from the list" step:', error);
    throw error;
  }
});

/**
 * Chooses a size for the selected product.
 */
When('I choose a size for the product', async function () {
  try {
    console.log('Choosing a size for the product...');
    await catalogPage.selectSize();
    console.log('Size successfully chosen.');
  } catch (error) {
    console.error('Error in "When I choose a size for the product" step:', error);
    throw error;
  }
});

/**
 * Adds the selected product to the bag.
 */
When('I add the product to the bag', async function () {
  try {
    console.log('Adding the product to the bag...');
    await catalogPage.addToBag();
    console.log('Product successfully added to the bag.');
  } catch (error) {
    console.error('Error in "When I add the product to the bag" step:', error);
    throw error;
  }
});

/**
 * Verifies the confirmation message displayed after adding a product to the bag.
 */
Then('I should see a confirmation message {string}', async function (expectedMessage) {
  try {
    console.log('Verifying the confirmation message...');
    const actualMessage = await catalogPage.getBagConfirmationMessage();
    expect(actualMessage).toEqual(expectedMessage);
    console.log(`Confirmation message verified: "${actualMessage}"`);
  } catch (error) {
    console.error('Error in "Then I should see a confirmation message" step:', error);
    throw error;
  } finally {
    console.log('Closing the browser...');
    if (browser) {
      await browser.close();
    }
  }
});
