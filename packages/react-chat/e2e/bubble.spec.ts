import { test } from '@playwright/test';

test('renders launcher and widget appears on click', async ({ page }) => {
  await page.goto('bubble');

  const launcher = page.locator('.vfrc-launcher');
  await launcher.waitFor({ state: 'visible' });
  await launcher.click();

  const widget = page.locator('.vfrc-widget');
  await widget.waitFor({ state: 'visible' });

  page.locator('.vfrc-footer .vfrc-button').click();

  await page.locator('.vfrc-chat-input').waitFor({ state: 'visible' });
});
