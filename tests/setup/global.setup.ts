import { chromium, FullConfig } from '@playwright/test';
import LoginPage from '../pages/login.page';

async function globalSetup(config: FullConfig) {
    const email = process.env.QATESTUSER as string;
    const password = process.env.PASSWORD as string;
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch({ headless: true, timeout: 10000 });
    const context = await browser.newContext();
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    try{
        await context.tracing.start({screenshots: true, snapshots: true});
        await page.goto(baseURL+'/login');
        await loginPage.doLogin(email, password);
        await loginPage.checkLogin();
        await page.context().storageState({ path: storageState as string });
        await context.tracing.stop({
            path: './test-results/setup-trace.zip',
        });
        await browser.close();  
    } catch (error) {
        await context.tracing.stop({
            path: './test-results/failed-setup-trace.zip',
        });
        await browser.close();
        throw error;
    }
}

export default globalSetup;

// https://playwright.dev/docs/test-global-setup-teardown#capturing-trace-of-failures-during-global-setup
// https://playwright.dev/docs/trace-viewer