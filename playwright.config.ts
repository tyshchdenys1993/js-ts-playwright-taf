import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: "https://www.automationexercise.com/",
    trace: "on",
    video: "on",
    screenshot: "on",
    ignoreHTTPSErrors: true
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        javaScriptEnabled: false,
        launchOptions: {
          args: [
            "--mute-audio",
            "--use-fake-ui-for-media-stream",
            "--disable-translate"
          ],
          ignoreDefaultArgs: ["--enable-automation"]
        },
      },
    },
  ],
});