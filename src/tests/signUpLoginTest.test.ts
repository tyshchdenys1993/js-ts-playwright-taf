import { UserFactory } from "../main/data/user/factory/UserFactory";
import {test, expect} from "../main/fixtures/fixture";

test("Case 1: Register new user and verify that account is created and user is logged in", async({page, baseURL, main, login, signUp, accountCreated}) => {
    const user = new UserFactory().create();
    const headerMenu = main.getHeaderMenuFragment();

    await test.step("Open Main page", async () => {
        await main.open();
    })

    await test.step("Click to Sign Up/Login buttin and open Login Page", async () => {
        await headerMenu.getSignUpLoginButton().click();
    })

    await test.step("Fill Sign Up form and click to Sign Up button", async () => {
        const signUpFragment = login.getSignUpFragment();
        await signUpFragment.fillSignUpForm(user);
        await signUpFragment.getSignUpButton().click();
    
    })

    await test.step("Fill all required fields and create account", async () => {
        const registrationForm = signUp.getRegistrationFormFragment();
        await registrationForm.fillRequiredField(user);
        await registrationForm.getCreateAccountButton().click();
    })

    await test.step("Verify that account is created and user is logged in", async () => {  
        const accountCreatedFragment = accountCreated.getAccountCreatedFragment();
        expect(await accountCreatedFragment.getPageHeader().textContent()).toBe("Account Created!");
        await accountCreatedFragment.getContinueButton().click();
        expect(await page.url()).toBe(baseURL);
        expect(await headerMenu.getLoggedInUserField().textContent()).toBe(user.getFullName());
    })
})  


test("Case 2: Information during signing up is applied to registration form", async({main, login, signUp}) => {
    const user = new UserFactory().create();

    await test.step("Open Main page", async () => {
        await main.open();
    })

    await test.step("Click to Sign Up/Login buttin and open Login Page", async () => {
        await main.getHeaderMenuFragment().getSignUpLoginButton().click();
    })

    await test.step("Fill Sign Up form and click to Sign Up button", async () => {
        const signUpFragment = login.getSignUpFragment();
        await signUpFragment.fillSignUpForm(user);
        await signUpFragment.getSignUpButton().click();
    })

    await test.step("Verify that information about user name and email is displayed on the form", async () => {
        const registrationForm = signUp.getRegistrationFormFragment();
        expect (await registrationForm.getFullName().getAttribute("value")).toBe(user.getFullName());
        expect (await registrationForm.getEmail().getAttribute("value")).toBe(user.getEmail());
    })
})  


test("Case 3: Login with invalid credentials", async({ main, login}) => {
    const user = new UserFactory().create();

    await test.step("Open Main page", async () => {
        await main.open();
    })

    await test.step("Click to Sign Up/Login buttin and open Login Page", async () => {
        await main.getHeaderMenuFragment().getSignUpLoginButton().click();
    })

    await test.step("Fill Login form, click to login button and verify error", async () => {
        const loginFragment = login.getLoginFragment();
        await loginFragment.fillLoginForm(user);
        await loginFragment.getLoginButton().click();
        expect (await loginFragment.getErrorMessageField().textContent()).toBe("Your email or password is incorrect!");
    })
})  