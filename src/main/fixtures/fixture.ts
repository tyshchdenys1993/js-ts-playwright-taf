import { test as base, Page } from '@playwright/test';
import { AccountCreatedPage } from '../pom/pages/accountCreatedPage';
import { LoginPage } from '../pom/pages/loginPage';
import { MainPage } from '../pom/pages/mainPage';
import { SignUpPage } from '../pom/pages/signUpPage';
import { User } from '../data/user/User';
import { UserFactory } from '../data/user/factory/UserFactory';

type Fixtures = {
    main: MainPage;
    login: LoginPage;
    signUp: SignUpPage;
    accountCreated: AccountCreatedPage;
    user: User;
};

async function suppressConsentBanner(page: Page): Promise<void> {
    await page.addInitScript(() => {
        // Stub IAB TCF API — signals "no GDPR consent required" before banner scripts run
        (window as Window & { __tcfapi?: unknown }).__tcfapi = (
            _cmd: string,
            _version: number,
            callback: (data: object, success: boolean) => void
        ) => callback({ gdprApplies: false }, true);
    });
    // Block the Google Funding Choices script that renders the fc-consent-root banner
    await page.route('**/fundingchoicesmessages.google.com/**', route => route.abort());
}

export const test = base.extend<Fixtures>({
    page: async ({ page }, use) => {
        await suppressConsentBanner(page);
        await use(page);
    },
    main: async ({ page }, use) => {
        const main = new MainPage(page, "/");
        await use(main);
      },
      login: async ({ page }, use) => {
        const login = new LoginPage(page, "/login");
        await use(login);
      },
      signUp: async ({ page }, use) => {
        const signUp = new SignUpPage(page, "/signup");
        await use(signUp);
      },
      accountCreated: async ({ page }, use) => {
        const accountCreated = new AccountCreatedPage(page, "/account_created");
        await use(accountCreated);
      },
      user: async ({}, use, testInfo) => {
        const user = new UserFactory().create();
        testInfo.annotations.push({ type: "User data", description: user.toString() });
        await use(user);
      },
})

export const expect = test.expect;