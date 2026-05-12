# Automation AQA — JS/TS + Playwright

End-to-end test automation framework for [automationexercise.com](https://www.automationexercise.com), built with Playwright and TypeScript.

## Table of contents

- [Preconditions](#preconditions)
- [Installation](#installation)
- [Commands](#commands)
- [Reports](#reports)
- [CI](#ci)
- [Project structure](#project-structure)
- [Architecture](#architecture)
- [How to add a new test](#how-to-add-a-new-test)

## Preconditions

- [Node.js](https://nodejs.org/uk/download/) v22+

## Installation

```bash
npm install
npx playwright install
```

## Commands

| Command | Description |
|---|---|
| `npm test` | Run all tests (headless) |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:debug` | Run tests in debug mode |
| `npm run report` | Open Playwright HTML report |
| `npm run allure:generate` | Generate Allure report from results |
| `npm run allure:open` | Open generated Allure report |
| `npm run typecheck` | Type-check without emitting files |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |

Run a specific browser only:
```bash
npm test -- --project=chromium
npm test -- --project=firefox
npm test -- --project=webkit
```

## Reports

Each test run produces two reports:

**Playwright HTML report** — built-in, opens with `npm run report`.

**Allure report** — richer report with test steps, attachments, and history. To view locally:
```bash
npm test
npm run allure:generate
npm run allure:open
```

## CI

Tests run automatically on push/PR to `master` and can be triggered manually via GitHub Actions (`workflow_dispatch`) with a browser selector.

After a pipeline run, both reports are uploaded as artifacts (retained for 30 days):
- `allure-report` — download the zip, unzip, open `index.html`
- `playwright-report` — same approach

## Project structure

```
src/
├── main/
│   ├── data/
│   │   └── user/
│   │       ├── User.ts               # User model (Builder pattern)
│   │       ├── constants/
│   │       │   └── UserConstants.ts  # Sex and Country enums
│   │       └── factory/
│   │           └── UserFactory.ts    # Generates random user via Faker
│   ├── fixtures/
│   │   └── fixture.ts                # Playwright fixtures (page injection)
│   └── pom/
│       ├── interfaces/
│       │   ├── AbstractPage.ts       # NavigablePage interface
│       │   └── Factory.ts            # Generic Factory interface
│       ├── pages/
│       │   ├── mainPage.ts
│       │   ├── loginPage.ts
│       │   ├── signUpPage.ts
│       │   └── accountCreatedPage.ts
│       └── fragments/               # Reusable UI components
│           ├── headerMenuFragment.ts
│           ├── signUpFragment.ts
│           ├── loginFragment.ts
│           ├── registrationFormFragment.ts
│           └── accountCreatedFragment.ts
└── tests/
    └── signUpLoginTest.test.ts
```

## Architecture

**Page Object Model + Fragments**
Pages encapsulate navigation and expose fragments. Fragments represent reusable UI sections (e.g. the header menu appears on multiple pages). Tests interact only with fragments, never with raw locators.

**Fixtures**
Each page is injected into tests via Playwright fixtures defined in `fixture.ts`. No manual `new Page()` in tests. The `page` fixture is extended to suppress the Google Funding Choices consent banner before any navigation: `addInitScript` stubs the IAB TCF API so the banner never initialises, and `page.route()` blocks the banner script at the network level.

**Builder + Factory**
`User` is constructed via a fluent Builder API. `UserFactory` generates a random valid user using Faker for every test run.

## How to add a new test

1. If a new page is needed — create a class in `src/main/pom/pages/` implementing `NavigablePage` (if directly navigable) and add it to `fixture.ts`
2. If a new UI section is needed — create a fragment in `src/main/pom/fragments/`
3. Add new test cases to an existing file or create a new `*.test.ts` in `src/tests/`
4. Generate test data via `new UserFactory().create()` — never hardcode user data in tests
