import { Page } from 'playwright';

export class LoginPage {
  private page: Page;

  // Home Page selectors
  private acceptCookiesButton = '#onetrust-accept-btn-handler'; // Selector for the "Accept Cookies" button

  // Login Page selectors
  private usernameField = '#username'; // Selector for the username input field
  private passwordField = '#password'; // Selector for the password input field
  private loginButton = '#signInButton'; // Selector for the "Sign In" button
  private errorAlert = '#loginErrorSummary'; // Selector for the error alert

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigates to the home page.
   */
  async navigateToHomePage(): Promise<void> {
    console.log('Navigating to the home page...');
    try {
      await this.page.goto('https://www.jacamo.co.uk/');
      console.log('Successfully navigated to the home page.');
    } catch (error) {
      console.error('Error navigating to the home page:', error);
      throw error;
    }
  }

  /**
   * Accepts cookies if the cookie banner is visible.
   */
  async acceptCookies(): Promise<void> {
    console.log('Checking for cookie banner...');
    try {
      await this.page.waitForSelector(this.acceptCookiesButton, { timeout: 5000 });
      console.log('Cookie banner is visible. Clicking accept...');
      await this.page.click(this.acceptCookiesButton);
      console.log('Cookies accepted successfully.');
    } catch (error) {
      console.log('Cookie banner did not appear. Proceeding without accepting cookies.');
    }
  }

  /**
   * Redirects directly to the login page.
   */
  async redirectToLogin(): Promise<void> {
    const loginUrl = 'https://www.jacamo.co.uk/api/sign-in?redirectTo=https://www.jacamo.co.uk/';
    console.log(`Redirecting to login page: ${loginUrl}`);
    try {
      await this.page.goto(loginUrl);
      await this.page.waitForLoadState('load');
      console.log('Successfully redirected to the login page.');
    } catch (error) {
      console.error('Error redirecting to the login page:', error);
      throw error;
    }
  }

  /**
   * Enters the username into the username field.
   * @param username - The username to enter.
   */
  async enterUsername(username: string): Promise<void> {
    console.log(`Entering username: ${username}`);
    try {
      await this.page.fill(this.usernameField, username);
      console.log('Username entered successfully.');
    } catch (error) {
      console.error('Error entering username:', error);
      throw error;
    }
  }

  /**
   * Enters the password into the password field.
   * @param password - The password to enter.
   */
  async enterPassword(password: string): Promise<void> {
    console.log('Entering password...');
    try {
      await this.page.fill(this.passwordField, password);
      console.log('Password entered successfully.');
    } catch (error) {
      console.error('Error entering password:', error);
      throw error;
    }
  }

  /**
   * Clicks the "Sign In" button to submit the login form.
   */
  async clickLoginButton(): Promise<void> {
    console.log('Clicking the login button...');
    try {
      await this.page.click(this.loginButton);
      console.log('Login button clicked successfully.');
    } catch (error) {
      console.error('Error clicking the login button:', error);
      throw error;
    }
  }

  /**
   * Retrieves the text from the error alert, if visible.
   * @returns The error alert text.
   */
  async getErrorAlertText(): Promise<string> {
    console.log('Checking for error alert visibility...');
    try {
      const alertVisible = await this.page.isVisible(this.errorAlert);
      if (!alertVisible) {
        throw new Error('Error alert is not visible.');
      }
      console.log('Fetching error alert text...');
      const alertText = await this.page.textContent(this.errorAlert);
      console.log(`Error alert text: ${alertText?.trim()}`);
      return alertText?.trim() || '';
    } catch (error) {
      console.error('Error retrieving error alert text:', error);
      throw error;
    }
  }

  /**
   * Performs a login operation by entering the username and password, and clicking the login button.
   * @param username - The username to use for login.
   * @param password - The password to use for login.
   */
  async login(username: string, password: string): Promise<void> {
    console.log('Performing login...');
    try {
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickLoginButton();
      console.log('Login form submitted.');
    } catch (error) {
      console.error('Error during login process:', error);
      throw error;
    }
  }
}
