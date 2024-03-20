import {expect, type Locator, type Page} from '@playwright/test';

export default class ContactUsPage {
    //Locators
    readonly page: Page;
    readonly contactUsButton: Locator;
    readonly contactUsTitle: Locator;
    readonly note: Locator;
    readonly getInTouchHeader: Locator;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly subjectField: Locator;
    readonly messageField: Locator;
    readonly fileUploadButton: Locator;
    readonly submitButton: Locator;
    readonly feedbackTitle: Locator;
    readonly feedbackBody: Locator;
    readonly contactUsTitleText: string;
    readonly noteText: string;
    readonly getInTouchHeaderText: string;
    readonly feedbackTitleText: string; 
    readonly feedbackBodyText: string;
    readonly successmessage: Locator;
    

    constructor(page: Page){
        this.page = page;
        this.contactUsButton = page.locator('a', { hasText: 'Contact us' });
        this.contactUsTitle = page.locator('h2', { hasText: 'Contact Us' });
        this.note = page.locator('div').filter({hasText: 'Note: Below contact form is' });
        this.getInTouchHeader = page.locator('h2', { hasText: 'Get In Touch' });
        this.nameField = page.getByPlaceholder('Name');
        this.emailField = page.getByPlaceholder('Email');
        this.subjectField = page.getByPlaceholder('Subject');
        this.messageField = page.getByPlaceholder('Your Message Here');
        this.fileUploadButton = page.getByLabel('form-control');
        this.submitButton = page.locator('input', { hasText: 'Submit' });
        this.feedbackTitle = page.locator('h2', { hasText: 'Feedback For Us' });
        this.feedbackBody = page.locator('address', { hasText: 'We really appreciate your response to our website.'});
        this.successmessage = page.locator('div', {hasText: 'Success! Your details have been submitted successfully.'});

        //String assertions
        this.contactUsTitleText = 'Contact Us';
        this.noteText = 'Note: Below contact form is for testing purpose.';
        this.getInTouchHeaderText = 'Get In Touch';
        this.feedbackTitleText = 'Feedback For Us'; 
        this.feedbackBodyText = 'We really appreciate your response to our website. Kindly share your feedback with us at feedback@automationexercise.com.' +
        'If you have any suggestion areas or improvements, do let us know. We will definitely work on it. Thank you';
        }
        
        //Submits contact info and issue message 
        async submitContactUs(name: string, email: string, subjectText: string, message: string){
            //Asserts page text elements
            await expect(this.page).toHaveURL('https://www.automationexercise.com/');
            await this.contactUsButton.click();
            await expect(this.contactUsTitle).toHaveText(this.contactUsTitleText);
            //await expect(this.note).toHaveText(this.noteText);
            await expect(this.getInTouchHeader).toHaveText(this.getInTouchHeaderText);
            await expect(this.feedbackTitle).toHaveText(this.feedbackTitleText);
            //await expect(this.feedbackBody).toHaveText(this.feedbackBodyText);

            //Inserts and submits contact info and issue
            await expect(this.nameField).toBeEditable();
            await this.nameField.fill(name);
            await expect(this.emailField.first()).toBeEditable();
            await this.emailField.first().fill(email);
            await expect(this.subjectField).toBeEditable();
            await this.subjectField.fill(subjectText);
            await expect(this.messageField).toBeEditable();
            await this.messageField.fill(message);
            //await expect(this.fileUploadButton).toBeVisible();
            await expect(this.submitButton).toBeEnabled();
            await this.submitButton.click();

            //waits for success message
            //await this.page.on('dialog', dialog => dialog.accept());
            //await this.page.getByRole('button').click();
            //await expect(this.successmessage).toBeVisible();
        }
}