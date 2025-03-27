import { Page } from "@playwright/test";
import { HeaderMenuFragment } from "../fragments/headerMenuFragment";
import { AbstractPage } from "../interfaces/AbstractPage";


export class MainPage implements AbstractPage {
    private readonly page: Page;
    private readonly headerMenuFragment: HeaderMenuFragment;
    private readonly baseUrl: string;

    constructor(page: Page, baseUrl: string){
        this.page = page;
        this.headerMenuFragment = new HeaderMenuFragment(page);
        this.baseUrl = baseUrl;
    }

    public async open(): Promise<void> {
        await this.page.goto(this.baseUrl);
    }

    public getHeaderMenuFragment(): HeaderMenuFragment{
        return this.headerMenuFragment;
    }
    
}