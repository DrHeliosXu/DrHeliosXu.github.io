const { test, expect } = require('@playwright/test');

const routes = ['/cn.html', '/en.html', '/vi.html', '/ar.html', '/cn-news.html', '/vi-news.html', '/ar-news.html', '/en-about.html'];

for (const route of routes) {
  test(`${route} 可正常渲染`, async ({ page }) => {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/.+/);
    await expect(page.locator('body')).not.toBeEmpty();
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });
}
