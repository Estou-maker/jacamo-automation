import { Given, Then, AfterAll } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';

let browser: Browser; // Browser instance
let page: Page; // Page instance

/**
 * Opens the Jacamo homepage and handles cookies.
 */
Given('I open the Jacamo homepage', async function () {
  try {
    console.log('Launching browser and navigating to the Jacamo homepage...');
    browser = await chromium.launch(); // Launch the browser
    const context = await browser.newContext(); // Create a new browser context
    page = await context.newPage(); // Open a new page
    await page.goto('https://www.jacamo.co.uk'); // Navigate to the Jacamo homepage

    console.log('Checking for and accepting cookies...');
    const acceptCookiesButton = await page.$('button#onetrust-accept-btn-handler');
    if (acceptCookiesButton) {
      await acceptCookiesButton.click(); // Click the "Accept Cookies" button if it exists
      console.log('Cookies accepted.');
    } else {
      console.log('No cookies button found.');
    }
  } catch (error) {
    console.error('Error in "Given I open the Jacamo homepage" step:', error);
    throw error;
  }
});

/**
 * Verifies that the page title contains the expected string.
 */
Then('the title should contain {string}', async function (expectedTitle: string) {
  try {
    console.log('Retrieving the page title...');
    const actualTitle = await page.title(); // Get the page title
    console.log(`Actual title: "${actualTitle}"`);

    console.log(`Validating the title contains: "${expectedTitle}"`);
    expect(actualTitle).toContain(expectedTitle); // Assert that the title contains the expected string
    console.log('Title validation passed.');
  } catch (error) {
    console.error('Error in "Then the title should contain {string}" step:', error);
    throw error;
  }
});

/**
 * Ensures the browser is closed after all tests.
 */
AfterAll(async function () {
  try {
    if (browser) {
      console.log('Closing the browser...');
      await browser.close(); // Close the browser
      console.log('Browser closed successfully.');
    }
  } catch (error) {
    console.error('Error while closing the browser:', error);
    throw error;
  }
});
