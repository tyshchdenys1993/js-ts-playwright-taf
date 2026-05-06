import { UserFactory } from "../main/data/user/factory/UserFactory";
import { test, expect } from "../main/fixtures/fixture";

test("Case 1: Register new user and verify that account is created and user is logged in", async({ page, main, login, signUp, accountCreated}, testInfo) => {
    const user = new UserFactory().create();
    testInfo.annotations.push({ type: "User data", description: user.toString() });
    const headerMenu = main.getHeaderMenuFragment();

    await test.step("Open Main page", async () => {
        await main.open();
    })

    await test.step("Click to Sign Up/Login button and open Login Page", async () => {
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
        await expect(accountCreatedFragment.getPageHeader()).toHaveText("Account Created!");
        await accountCreatedFragment.getContinueButton().click();
        await expect(page).toHaveURL("/");
        await expect(headerMenu.getLoggedInUserField()).toHaveText(user.getFullName());
    })
})  


test("Case 2: Information during signing up is applied to registration form", async({main, login, signUp}, testInfo) => {
    const user = new UserFactory().create();
    testInfo.annotations.push({ type: "User data", description: user.toString() });

    await test.step("Open Main page", async () => {
        await main.open();
    })

    await test.step("Click to Sign Up/Login button and open Login Page", async () => {
        await main.getHeaderMenuFragment().getSignUpLoginButton().click();
    })

    await test.step("Fill Sign Up form and click to Sign Up button", async () => {
        const signUpFragment = login.getSignUpFragment();
        await signUpFragment.fillSignUpForm(user);
        await signUpFragment.getSignUpButton().click();
    })

    await test.step("Verify that information about user name and email is displayed on the form", async () => {
        const registrationForm = signUp.getRegistrationFormFragment();
        await expect(registrationForm.getFullName()).toHaveValue(user.getFullName());
        await expect(registrationForm.getEmail()).toHaveValue(user.getEmail());
    })
})  


test("Case 3: Login with invalid credentials", async({ main, login}, testInfo) => {
    const user = new UserFactory().create();
    testInfo.annotations.push({ type: "User data", description: user.toString() });

    await test.step("Open Main page", async () => {
        await main.open();
    })

    await test.step("Click to Sign Up/Login button and open Login Page", async () => {
        await main.getHeaderMenuFragment().getSignUpLoginButton().click();
    })

    await test.step("Fill Login form, click to login button and verify error", async () => {
        const loginFragment = login.getLoginFragment();
        await loginFragment.fillLoginForm(user);
        await loginFragment.getLoginButton().click();
        await expect(loginFragment.getErrorMessageField()).toHaveText("Your email or password is incorrect!");
    })
})  