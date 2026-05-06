import { RegistrationFormFragment } from "../fragments/registrationFormFragment";
import { NavigablePage } from "../interfaces/AbstractPage";
import { Page } from "@playwright/test";

export class SignUpPage implements NavigablePage {

    private readonly page: Page;
    private readonly baseUrl: string;
    private readonly registrationFormFragment: RegistrationFormFragment;

    constructor(page: Page, baseUrl: string){
        this.page = page;
        this.baseUrl = baseUrl;
        this.registrationFormFragment = new RegistrationFormFragment(page);
    }

    public async open(): Promise<void> {
        await this.page.goto(this.baseUrl);
    }

    public getRegistrationFormFragment(): RegistrationFormFragment{
        return this.registrationFormFragment;
    }
}