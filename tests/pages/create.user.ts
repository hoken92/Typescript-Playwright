import { expect, type Locator, type Page } from '@playwright/test';

export default class CreateUser {
  readonly page: Page;
  readonly SignUpButton: Locator;
  readonly SignUpTitle: Locator;
  readonly NameField: Locator;
  readonly EmailAddressField: Locator;
  readonly CreateUserButton: Locator;
  readonly AccountSignUpTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.SignUpButton = page.locator('a', { hasText: ' Signup / Login' });
    this.SignUpTitle = page.locator('h2', { hasText: 'New User Signup!' });
    this.NameField = page.locator("input[data-qa='signup-name']");
    this.EmailAddressField = page.locator("input[data-qa='signup-email']");
    this.CreateUserButton = page.locator('button', {hasText: 'Signup'});
    this.AccountSignUpTitle = page.locator('h2', { hasText: 'Enter Account Information' });
  }

  async goto() {
    await this.page.goto('/baseURL');
  }

  async SignUpPage() {
    await this.SignUpButton.first().click();
    await expect(this.SignUpTitle).toHaveText("New User Signup!");
  }

  async CreateUser(name, email) {
    await this.NameField.fill(name);
    await this.EmailAddressField.fill(email);
    await this.CreateUserButton.click();
  }

  async Submitform(){
    await expect(this.AccountSignUpTitle).toHaveText("Enter Account Information");
  }
}