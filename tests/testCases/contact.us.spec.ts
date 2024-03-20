import {test} from '@playwright/test'
import ContactUsPage from '../pages/contact.us'

    let contactPage: ContactUsPage;
    const name: string = 'Peter';
    const email: string = 'petertestqa492@gmail.com';
    const subjectText: string = 'Test Issue';
    const message: string = 'Hello, I am currently having an issue making an account with a paid subscription.';

test.beforeEach(async ({page}) => {
    await page.goto('/baseURL');
    contactPage = new ContactUsPage(page);
});

test.describe('Submit Contact us form', () => {
    test('Logged in',{
        tag: '@qa', 
        }, async({}) => {
            await contactPage.submitContactUs(name, email, subjectText, message);
        });
    });
