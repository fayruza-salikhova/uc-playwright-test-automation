import { test as base } from '@playwright/test';

export type TestOptions = {
  apiURL: string;
};

export const test = base.extend<TestOptions>({
  apiURL: ['', { option: true }],
});
