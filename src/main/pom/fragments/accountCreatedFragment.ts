import { Locator, Page } from "@playwright/test";


export class AccountCreatedFragment {

     private readonly page: Page;
     private readonly pageHeader: Locator;
     private readonly continueButton: Locator;

     constructor(page: Page){
        this.page = page;
        this.pageHeader = page.locator("b");
        this.continueButton = page.locator("[data-qa='continue-button']")
     }

     public getPageHeader(): Locator{
        return this.pageHeader;
     }

     public getContinueButton(): Locator{
        return this.continueButton;
     }
     
}