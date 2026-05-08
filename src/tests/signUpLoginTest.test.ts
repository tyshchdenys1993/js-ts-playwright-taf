import { test, expect } from "../main/fixtures/fixture";

test.beforeEach(async ({ main }) => {
    await test.step("Open Main page", async () => {
        await main.open();
    });

    await test.step("Click to Sign Up/Login button and open Login Page", async () => {
        await main.getHeaderMenuFragment().getSignUpLoginButton().click();
    });
});


test("Case 1: Register new user and verify that account is created and user is logged in", async ({ page, main, login, signUp, accountCreated, user }) => {
    const headerMenu = main.getHeaderMenuFragment();

    await test.step("Fill Sign Up form and click to Sign Up button", async () => {
        const signUpFragment = login.getSignUpFragment();
        await signUpFragment.fillSignUpForm(user);
        await signUpFragment.getSignUpButton().click();
    });

    await test.step("Fill all required fields and create account", async () => {
        const registrationForm = signUp.getRegistrationFormFragment();
        await registrationForm.fillRequiredField(user);
        await registrationForm.getCreateAccountButton().click();
    });

    await test.step("Verify that account is created and user is logged in", async () => {
        const accountCreatedFragment = accountCreated.getAccountCreatedFragment();
        await expect(accountCreatedFragment.getPageHeader()).toHaveText("Account Created!");
        await accountCreatedFragment.getContinueButton().click();
        await expect(page).toHaveURL("/");
        await expect(headerMenu.getLoggedInUserField()).toHaveText(user.getFullName());
    });
});


test("Case 2: Information during signing up is applied to registration form", async ({ login, signUp, user }) => {
    await test.step("Fill Sign Up form and click to Sign Up button", async () => {
        const signUpFragment = login.getSignUpFragment();
        await signUpFragment.fillSignUpForm(user);
        await signUpFragment.getSignUpButton().click();
    });

    await test.step("Verify that information about user name and email is displayed on the form", async () => {
        const registrationForm = signUp.getRegistrationFormFragment();
        await expect(registrationForm.getFullName()).toHaveValue(user.getFullName());
        await expect(registrationForm.getEmail()).toHaveValue(user.getEmail());
    });
});


test("Case 3: Login with invalid credentials", async ({ login, user }) => {
    await test.step("Fill Login form, click to login button and verify error", async () => {
        const loginFragment = login.getLoginFragment();
        await loginFragment.fillLoginForm(user);
        await loginFragment.getLoginButton().click();
        await expect(loginFragment.getErrorMessageField()).toHaveText("Your email or password is incorrect!");
    });
});


test("Case 4: Logout after login", async ({ main, login, signUp, accountCreated, user }) => {
    const headerMenu = main.getHeaderMenuFragment();

    await test.step("Register new user", async () => {
        const signUpFragment = login.getSignUpFragment();
        await signUpFragment.fillSignUpForm(user);
        await signUpFragment.getSignUpButton().click();
        await signUp.getRegistrationFormFragment().fillRequiredField(user);
        await signUp.getRegistrationFormFragment().getCreateAccountButton().click();
    });

    await test.step("Continue to main page and verify user is logged in", async () => {
        await accountCreated.getAccountCreatedFragment().getContinueButton().click();
        await expect(headerMenu.getLoggedInUserField()).toHaveText(user.getFullName());
    });

    await test.step("Click Logout and verify user is logged out", async () => {
        await headerMenu.getLogoutButton().click();
        await expect(headerMenu.getSignUpLoginButton()).toBeVisible();
        await expect(headerMenu.getLoggedInUserField()).not.toBeVisible();
    });
});


test("Case 5: Login with valid credentials", async ({ main, login, signUp, accountCreated, user }) => {
    const headerMenu = main.getHeaderMenuFragment();

    await test.step("Register new user and logout", async () => {
        const signUpFragment = login.getSignUpFragment();
        await signUpFragment.fillSignUpForm(user);
        await signUpFragment.getSignUpButton().click();
        await signUp.getRegistrationFormFragment().fillRequiredField(user);
        await signUp.getRegistrationFormFragment().getCreateAccountButton().click();
        await accountCreated.getAccountCreatedFragment().getContinueButton().click();
        await headerMenu.getLogoutButton().click();
    });

    await test.step("Login with registered credentials", async () => {
        await headerMenu.getSignUpLoginButton().click();
        const loginFragment = login.getLoginFragment();
        await loginFragment.fillLoginForm(user);
        await loginFragment.getLoginButton().click();
    });

    await test.step("Verify user is logged in", async () => {
        await expect(headerMenu.getLoggedInUserField()).toBeVisible();
        await expect(headerMenu.getLoggedInUserField()).toHaveText(user.getFullName());
    });
});


test("Case 6 [Negative]: Registration with already existing email", async ({ main, login, signUp, accountCreated, user }) => {
    const headerMenu = main.getHeaderMenuFragment();

    await test.step("Register new user and logout", async () => {
        const signUpFragment = login.getSignUpFragment();
        await signUpFragment.fillSignUpForm(user);
        await signUpFragment.getSignUpButton().click();
        await signUp.getRegistrationFormFragment().fillRequiredField(user);
        await signUp.getRegistrationFormFragment().getCreateAccountButton().click();
        await accountCreated.getAccountCreatedFragment().getContinueButton().click();
        await headerMenu.getLogoutButton().click();
    });

    await test.step("Try to sign up with the same email and verify error", async () => {
        await headerMenu.getSignUpLoginButton().click();
        const signUpFragment = login.getSignUpFragment();
        await signUpFragment.fillSignUpForm(user);
        await signUpFragment.getSignUpButton().click();
        await expect(signUpFragment.getExistingEmailError()).toHaveText("Email Address already exist!");
    });
});


test("Case 7 [Negative]: Registration with empty required fields", async ({ login, signUp, user }) => {
    await test.step("Fill Sign Up form and navigate to registration form", async () => {
        const signUpFragment = login.getSignUpFragment();
        await signUpFragment.fillSignUpForm(user);
        await signUpFragment.getSignUpButton().click();
    });

    await test.step("Click Create Account without filling required fields and verify form is not submitted", async () => {
        await signUp.getRegistrationFormFragment().getCreateAccountButton().click();
        await expect(signUp.getRegistrationFormFragment().getPasswordInput()).toBeVisible();
    });
});
