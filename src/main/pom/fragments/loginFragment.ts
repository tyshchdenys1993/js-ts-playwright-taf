import { Page, Locator } from "@playwright/test";
import { User } from "../../data/user/User";

export class LoginFragment {

    private readonly page: Page;
    private readonly loginEmailInput: Locator;
    private readonly loginPasswordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessageField: Locator;

    constructor(page: Page){
        this.page = page;
        this.loginEmailInput = page.locator("[data-qa='login-email']");
        this.loginPasswordInput = page.locator("[data-qa='login-password']");
        this.loginButton = page.locator("[data-qa='login-button']");
        this.errorMessageField = page.locator("p[style='color: red;']");
    }

    public async fillLoginForm(user: User) {
        await this.loginEmailInput.fill(user.getEmail());
        await this.loginPasswordInput.fill(user.getPassword());
    }

    public getLoginButton(): Locator{
        return this.loginButton;
    }

    public getErrorMessageField(): Locator {
        return this.errorMessageField;
    }


}