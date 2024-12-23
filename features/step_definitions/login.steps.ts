import { Given, When, Then, setDefaultTimeout, AfterAll } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../../page_objects/LoginPage';
import { CONFIG } from '../../utilities/config';
import { logger } from '../../utilities/logger';

// Set the default timeout for test steps
setDefaultTimeout(CONFIG.timeout);

let browser: Browser; // Browser instance
let page: Page; // Page instance
let loginPage: LoginPage; // LoginPage object

/**
 * Launches the browser, navigates to the home page, and redirects to the login page.
 */
Given('I navigate to the login page from the home page', async function () {
  try {
    logger.info('Launching browser...');
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    loginPage = new LoginPage(page);

    logger.info('Navigating to the home page...');
    await page.goto(CONFIG.baseURL);

    logger.info('Accepting cookies...');
    await page.click('button#onetrust-accept-btn-handler');
    await loginPage.acceptCookies();

    logger.info('Redirecting to the login page...');
    await page.goto(`${CONFIG.baseURL}${CONFIG.loginURL}`);
    logger.info('Navigation to the login page completed.');
  } catch (error) {
    logger.error('Error during navigation to the login page:', error);
    throw error;
  }
});

/**
 * Enters valid login credentials and submits the login form.
 */
When('I enter a valid username and password', async function () {
  try {
    logger.info('Entering valid credentials...');
    const { username, password } = CONFIG.credentials.valid;
    await loginPage.login(username, password);
    logger.info('Login submitted with valid credentials.');
  } catch (error) {
    logger.error('Error while entering valid credentials:', error);
    throw error;
  }
});

/**
 * Validates that the user is redirected to the dashboard after login.
 */
Then('I should be redirected to the dashboard', async function () {
  try {
    logger.info('Validating redirection to the dashboard...');
    const currentUrl = page.url();
    const title = await page.title();
    const isDashboard = currentUrl.includes('/?justLoggedIn=true') ||
      title.includes('Men’s Clothing in Sizes S to 6XL – For Every Man | Jacamo');

    expect(isDashboard).toBeTruthy();
    logger.info('User successfully redirected to the dashboard.');
  } catch (error) {
    logger.error('Error during dashboard validation:', error);
    throw error;
  } finally {
    await browser.close();
  }
});

/**
 * Enters invalid login credentials and submits the login form.
 */
When('I enter an invalid username or password', async function () {
  try {
    logger.info('Entering invalid credentials...');
    const { username, password } = CONFIG.credentials.invalid;
    await loginPage.login(username, password);
    logger.info('Invalid credentials submitted.');
  } catch (error) {
    logger.error('Error while entering invalid credentials:', error);
    throw error;
  }
});

/**
 * Validates that an error message is displayed for invalid login attempts.
 */
Then('I should see an error message', async function () {
  try {
    logger.info('Validating error message...');
    const errorMessageSelector = '.alert__text_error';
    const isVisible = await page.isVisible(errorMessageSelector);
    expect(isVisible).toBeTruthy();
    logger.info('Error message is visible.');
  } catch (error) {
    logger.error('Error during error message validation:', error);
    throw error;
  } finally {
    await browser.close();
  }
});

/**
 * Validates that the user sees a confirmation prompt or is redirected to the dashboard.
 */
Then('I should see the confirmation prompt or be redirected to the dashboard', async function () {
  try {
    logger.info('Validating confirmation prompt or dashboard redirection...');
    const confirmationMessageSelector = '.mfa-details';
    const dashboardUrlFragment = 'https://www.jacamo.co.uk/';

    const isConfirmationVisible = await page.isVisible(confirmationMessageSelector).catch(() => false);
    const currentUrl = page.url();
    const isDashboard = currentUrl.includes(dashboardUrlFragment);

    if (isConfirmationVisible) {
      logger.info('Confirmation prompt is visible.');
      const confirmationText = await page.textContent(confirmationMessageSelector);
      expect(confirmationText).toContain(
        "To make sure only you can sign in, we'll send you a one-time security code to a method of your choice"
      );
      logger.info('Confirmation prompt text is valid.');
    } else if (isDashboard) {
      logger.info('User successfully redirected to the dashboard.');
    } else {
      throw new Error(`Neither confirmation prompt nor dashboard detected. Current URL: ${currentUrl}`);
    }
  } catch (error) {
    logger.error('Error during confirmation or dashboard validation:', error);
    throw error;
  }
});

/**
 * Ensures the browser is closed after all tests.
 */
AfterAll(async function () {
  if (browser) {
    logger.info('Closing the browser...');
    await browser.close();
  }
});
