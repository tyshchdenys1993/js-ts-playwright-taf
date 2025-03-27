import { Locator, Page } from "@playwright/test";
import { User } from "../../data/user/User";

export class RegistrationFormFragment {

    private readonly page: Page;
    private readonly fullName: Locator;
    private readonly email: Locator;
    private readonly passwordInput: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly addressInput: Locator;
    private readonly countryDropDown: Locator;
    private readonly stateInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipCodeInput: Locator;
    private readonly mobileInput: Locator;
    private readonly createAccountButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.fullName = page.locator("#name");
        this.email = page.locator("#email");
        this.passwordInput = page.locator("#password");
        this.firstNameInput = page.locator("#first_name");
        this.lastNameInput = page.locator("#last_name");
        this.addressInput = page.locator("#address1");
        this.countryDropDown = page.locator("#country");
        this.stateInput = page.locator("#state");
        this.cityInput = page.locator("#city");
        this.zipCodeInput = page.locator("#zipcode");
        this.mobileInput = page.locator("#mobile_number");
        this.createAccountButton = page.locator("[data-qa='create-account']");
    }

    public async fillRequiredField(user: User){
        await this.passwordInput.fill(user.getPassword());
        await this.firstNameInput.fill(user.getAddressFirstName());
        await this.lastNameInput.fill(user.getAddressLastName());
        await this.addressInput.fill(user.getAddress());
        await this.countryDropDown.selectOption(user.getCountry());
        await this.stateInput.fill(user.getState());
        await this.cityInput.fill(user.getCity());
        await this.zipCodeInput.fill(user.getZipCode());
        await this.mobileInput.fill(user.getPhoneNumber());
    }

    public getFullName(): Locator {
        return this.fullName;
    }

    public getEmail(): Locator {
        return this.email;
    }

    public getCreateAccountButton(): Locator{
        return this.createAccountButton;
    }

    public getPasswordInput(): Locator {
        return this.passwordInput;
    }

    public getFirstNameInput(): Locator {
        return this.firstNameInput;
    }

    public getLastNameInput(): Locator {
        return this.lastNameInput;
    }

    public getAddressInput(): Locator {
        return this.addressInput;
    }

    public getCountryDropDown(): Locator {
        return this.countryDropDown;
    }

    public getStateInput(): Locator {
        return this.stateInput;
    }

    public getCityInput(): Locator {
        return this.cityInput;
    }

    public getZipCodeInput(): Locator {
        return this.zipCodeInput;
    }

    public getMobileInput(): Locator {
        return this.mobileInput;
    }
}