import { expect, test } from '@playwright/test';

test('renders launcher and widget appears on click', async ({ page }) => {
  await page.goto('overlay');

  const launcher = page.locator('.vfrc-launcher');
  await launcher.waitFor({ state: 'visible' });
  await launcher.click();
  const chat = page.locator('.vfrc-chat');

  await chat.waitFor({ state: 'visible' });
  await page.locator('.vfrc-chat-input').waitFor({ state: 'visible' });
});

test('control widget visibility and open state', async ({ page }) => {
  await page.goto('overlay');

  const launcher = page.locator('.vfrc-launcher');
  const chat = page.locator('.vfrc-chat');

  await launcher.waitFor({ state: 'visible' });

  await page.evaluate(() => window.voiceflow?.chat?.open());

  await chat.waitFor({ state: 'visible' });

  await page.evaluate(() => window.voiceflow?.chat?.close());

  expect(chat).not.toBeInViewport();

  await page.evaluate(() => window.voiceflow?.chat?.hide());

  await launcher.waitFor({ state: 'hidden' });

  await page.evaluate(() => window.voiceflow?.chat?.show());

  await launcher.waitFor({ state: 'visible' });
});
