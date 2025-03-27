import { Page } from "@playwright/test";
import { AbstractPage } from "../interfaces/AbstractPage";
import { SignUpFragment } from "../fragments/signUpFragment";
import { LoginFragment } from "../fragments/loginFragment";
import { th } from "@faker-js/faker";

export class LoginPage implements AbstractPage {
    private readonly page: Page;
    private readonly baseUrl: string;
    private readonly signUpFragment: SignUpFragment;
    private readonly loginFragment: LoginFragment;

    constructor(page: Page, baseUrl: string){
        this.page = page;
        this.baseUrl = baseUrl;
        this.signUpFragment = new SignUpFragment(page);
        this.loginFragment = new LoginFragment(page);
    }

    public async open(): Promise<void> {
        await this.page.goto(this.baseUrl);
    }

    public getSignUpFragment(): SignUpFragment {
        return this.signUpFragment;
    }

    public getLoginFragment(): LoginFragment {
        return this.loginFragment;
    }

}