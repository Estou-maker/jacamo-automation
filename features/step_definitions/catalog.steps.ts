import { Given, When, Then, AfterAll } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';
import { Catalognav } from '../../page_objects/Catalognav';

let browser: Browser; // Browser instance
let page: Page; // Page instance
let catalogPage: Catalognav; // Catalog navigation page object

/**
 * Navigates to the sale page and accepts cookies.
 */
Given('I am on the sale page', async function () {
  try {
    console.log('Launching browser and navigating to the sale page...');
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    catalogPage = new Catalognav(page);

    console.log('Navigating to the sale page...');
    await catalogPage.navigateToSalePage();

    console.log('Accepting cookies...');
    await page.click('button#onetrust-accept-btn-handler');
    await catalogPage.acceptCookies();

    console.log('Waiting for the sale page to load...');
    await page.waitForLoadState('domcontentloaded');

    console.log('Successfully navigated to the sale page.');
  } catch (error) {
    console.error('Error in "Given I am on the sale page" step:', error);
    throw error;
  }
});

/**
 * Scrolls through the product list on the sale page.
 */
When('I scroll through the product list', async function () {
  try {
    console.log('Scrolling through the product list...');
    await catalogPage.scrollThroughProducts();
    console.log('Successfully scrolled through the product list.');
  } catch (error) {
    console.error('Error in "When I scroll through the product list" step:', error);
    throw error;
  }
});

/**
 * Verifies that all products are visible on the page.
 */
Then('all products should be visible on the page', async function () {
  try {
    console.log('Verifying all products are visible...');
    const allProductsVisible = await catalogPage.verifyAllProductsVisible();
    expect(allProductsVisible).toBeTruthy();
    console.log('All products are visible on the page.');
  } catch (error) {
    console.error('Error in "Then all products should be visible on the page" step:', error);
    throw error;
  }
});

/**
 * Closes the browser after all tests.
 */
AfterAll(async function () {
  if (browser) {
    console.log('Closing the browser...');
    await browser.close();
  }
});
