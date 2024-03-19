import {test, expect} from '@playwright/test';
import LoginPage from '../pages/login.page';

    const email = process.env.QATESTUSER as string;
    const password = process.env.PASSWORD as string;
    let loginPage: LoginPage

test.use({storageState:{ cookies: [], origins: []}})
test.describe.configure({mode: 'serial'});

test.beforeEach(async ({page}) => {
    await page.goto('/baseURL');
    loginPage = new LoginPage(page);
});

test.describe('Login Tests', () => {
    test('Logged in',{
        tag: '@smoke', 
        }, async({}) => {
            await loginPage.doLogin(email, password);
            await loginPage.checkLogin();
        });

        test('Incorrect email',{
            tag: '@smoke', 
            }, async({}) => {
                const invalidEmail = "JimmyJohns@gmail.com";
                await loginPage.doLogin(invalidEmail, password);
                await loginPage.checkFailedLogin();
            });

        test('Incorrect password',{
            tag: '@smoke', 
            }, async({}) => {
                const invalidPassword = "wrongpassword";
                await loginPage.doLogin(email, invalidPassword);
                await loginPage.checkFailedLogin();
            });
});