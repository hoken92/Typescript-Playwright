import { expect, type Locator, type Page } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  readonly signUpButton: Locator;
  readonly loginTitle: Locator;
  readonly emailAddressField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly logOutButton: Locator;
  readonly failedLoginMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpButton = page.locator('a', { hasText: ' Signup / Login' });
    this.loginTitle = page.locator('h2', { hasText: 'Login to your account' });
    this.emailAddressField = page.locator("input[data-qa='login-email']");
    this.passwordField = page.locator("input[data-qa='login-password']");
    this.loginButton = page.locator('button', {hasText: 'Login'});
    this.logOutButton = page.locator('a', { hasText: 'Logout' });
    this.failedLoginMessage = page.locator('p', { hasText: 'Your email or password is incorrect!' });
  }

  async doLogin(email, password) {
    await this.signUpButton.first().click();
    await expect(this.loginTitle).toHaveText("Login to your account");
    await this.emailAddressField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async checkLogin(){
    await expect(this.logOutButton).toBeVisible();
  }

  async checkFailedLogin(){
    await expect(this.failedLoginMessage).toHaveText("Your email or password is incorrect!");
  }
}