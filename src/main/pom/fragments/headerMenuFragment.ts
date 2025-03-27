import { Page, Locator } from "@playwright/test";

export class HeaderMenuFragment {

    private readonly page: Page;
    private readonly signUpLoginButton: Locator;
    private readonly loggedInUserField: Locator;

    constructor(page: Page){
        this.page = page;
        this.signUpLoginButton = page.locator(".navbar-nav a[href='/login']");
        this.loggedInUserField = page.locator("i.fa-user~b");
    }

    public getSignUpLoginButton(): Locator {
        return this.signUpLoginButton;
    }

    public getLoggedInUserField(): Locator {
        return this.loggedInUserField;
    }
}