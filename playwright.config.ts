import { defineConfig } from '@playwright/test';
import type { TestOptions } from './test-options';
import 'dotenv/config';

export default defineConfig<TestOptions>({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.CI ? process.env.PROD_BASE_URL : process.env.BASE_URL,
    apiURL: process.env.API_URL,
    screenshot: 'only-on-failure',
    video: 'off',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'playground',
      testDir: './tests/pw-course-lessons/ui/playground-cheat-sheet-tests',
      use: {
        browserName: 'chromium',
        baseURL: process.env.BASE_URL,
      },
    },
    {
      name: 'regression-chromium',
      testDir: './tests/pw-course-lessons/ui/regression-tests',
      use: {
        browserName: 'chromium',
      },
    },
    {
      name: 'regression-firefox',
      testDir: './tests/pw-course-lessons/ui/regression-tests',
      use: {
        browserName: 'firefox',
      },
    },
  ],
});
