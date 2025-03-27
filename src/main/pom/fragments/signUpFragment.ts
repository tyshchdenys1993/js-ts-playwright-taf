import { Page, Locator } from "@playwright/test";
import { User } from "../../data/user/User";

export class SignUpFragment {

    private readonly page: Page;
    private readonly signUpName: Locator;
    private readonly signUpEmail: Locator;
    private readonly signUpButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.signUpName = page.locator("[data-qa='signup-name']");
        this.signUpEmail = page.locator("[data-qa='signup-email']");
        this.signUpButton = page.locator("[data-qa='signup-button']");
    }


    public async fillSignUpForm(user: User) {
        await this.signUpName.fill(user.getFullName());
        await this.signUpEmail.fill(user.getEmail());
    }

    public getSignUpButton(): Locator{
        return this.signUpButton;
    }


}