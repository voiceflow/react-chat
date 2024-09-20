import { cpus } from 'node:os';

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : cpus().length - 1,
  reporter: [['junit', { outputFile: 'e2e.report.xml' }]],
  timeout: 5000,
  use: {
    baseURL: 'http://127.0.0.1:8080/e2e/',

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  webServer: {
    command: 'yarn start:e2e',
    url: 'http://127.0.0.1:8080',
    reuseExistingServer: !process.env.CI,
  },
});
