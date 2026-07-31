const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:5501',
    screenshot: 'only-on-failure'
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } }
  ],
  webServer: {
    command: 'python3 -m http.server 5501',
    port: 5501,
    reuseExistingServer: true
  }
});
