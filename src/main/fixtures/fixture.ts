import {test as base} from '@playwright/test';
import { AccountCreatedPage } from '../pom/pages/accountCreatedPage';
import { LoginPage } from '../pom/pages/loginPage';
import { MainPage } from '../pom/pages/mainPage';
import { SignUpPage } from '../pom/pages/signUpPage';

type Fixtures = {
    main: MainPage;
    login: LoginPage;
    signUp: SignUpPage;
    accountCreated: AccountCreatedPage;
};

export const test = base.extend<Fixtures>({
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

})

export const expect = test.expect;