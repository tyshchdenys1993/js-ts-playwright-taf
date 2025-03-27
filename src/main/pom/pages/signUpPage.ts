import { RegistrationFormFragment } from "../fragments/registrationFormFragment";
import { AbstractPage } from "../interfaces/AbstractPage";
import { Page } from "@playwright/test";

export class SignUpPage implements AbstractPage {

    private readonly page: Page;
    private readonly baseUrl: string;
    private readonly registrationFormFragment: RegistrationFormFragment;

    constructor(page: Page, baseUrl: string){
        this.page = page;
        this.baseUrl = baseUrl;
        this.registrationFormFragment = new RegistrationFormFragment(page);
    }

    public async open(): Promise<void> {
        this.page.goto(this.baseUrl);
    }

    public getRegistrationFormFragment(): RegistrationFormFragment{
        return this.registrationFormFragment;
    }
}