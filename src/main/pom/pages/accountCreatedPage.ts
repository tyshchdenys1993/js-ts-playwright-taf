import { Page } from "@playwright/test";
import { AccountCreatedFragment } from "../fragments/accountCreatedFragment";
import { AbstractPage } from "../interfaces/AbstractPage";


export class AccountCreatedPage implements AbstractPage {
    
    private readonly page: Page;
    private readonly baseUrl: string;
    private readonly accountCreatedFragment: AccountCreatedFragment;

    constructor(page: Page, baseUrl: string){
        this.page = page;
        this.baseUrl = baseUrl;
        this.accountCreatedFragment = new AccountCreatedFragment(page);
    }
    
    
    
    open(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public getAccountCreatedFragment(): AccountCreatedFragment{
        return this.accountCreatedFragment
    }

    
}