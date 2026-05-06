import { Page } from "@playwright/test";
import { AccountCreatedFragment } from "../fragments/accountCreatedFragment";

export class AccountCreatedPage {

    private readonly accountCreatedFragment: AccountCreatedFragment;

    constructor(page: Page, _baseUrl: string){
        this.accountCreatedFragment = new AccountCreatedFragment(page);
    }

    public getAccountCreatedFragment(): AccountCreatedFragment {
        return this.accountCreatedFragment;
    }
}