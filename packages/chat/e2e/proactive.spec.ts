import { test } from '@playwright/test';
import type { Trace } from '@voiceflow/base-types';

test('renders launcher and widget appears on click', async ({ page }) => {
  const message = 'Welcome to our chat';

  await page.goto('proactive');

  await page.locator('.vfrc-launcher').waitFor({ state: 'visible' });

  await page.evaluate(
    ([message]) =>
      window.voiceflow?.chat?.proactive.push({
        type: 'text' as Trace.TraceType.TEXT,
        payload: { slate: { id: '', content: [] }, message },
      }),
    [message]
  );

  await page.waitForSelector(`text=${message}`);
});
