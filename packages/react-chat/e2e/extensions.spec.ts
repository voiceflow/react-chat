/* eslint-disable sonarjs/no-duplicate-string */
import { expect, test } from '@playwright/test';

const FIRST_MESSAGE = 'Welcome to the pizza palace!';
const FIRST_RESPONSE = 'I want to order a pizza';
const SECOND_MESSAGE = 'What kind of pizza do you want?';
const SECOND_RESPONSE = 'Cheese please';
const THIRD_MESSAGE = 'Your pizza is on the way!';

const slateMessage = (text: string) => ({
  type: 'text',
  payload: {
    slate: {
      id: text,
      content: [{ children: [{ text }] }],
      messageDelayMilliseconds: 100,
    },
    message: text,
    delay: 100,
  },
});

test('trigger effect extension on incoming trace', async ({ page }) => {
  let count = 0;

  // eslint-disable-next-line consistent-return
  await page.route('https://general-runtime.voiceflow.com/public/projectID/state/user/*/interact', async (route) => {
    count++;

    switch (count) {
      case 1:
        return route.fulfill({
          json: {
            trace: [{ type: 'update_order_status', payload: 'idle' }, slateMessage(FIRST_MESSAGE)],
          },
        });

      case 2:
        return route.fulfill({
          json: {
            trace: [{ type: 'update_order_status', payload: 'in progress' }, slateMessage(SECOND_MESSAGE)],
          },
        });

      case 3:
        return route.fulfill({
          json: {
            trace: [{ type: 'update_order_status', payload: 'ordered' }, slateMessage(THIRD_MESSAGE)],
          },
        });

      default:
    }
  });

  await page.goto('extensions');

  const chat = page.locator('.vfrc-chat');
  await chat.waitFor({ state: 'visible' });
  expect(chat).toBeInViewport();

  const status = page.getByTestId('status');
  await status.waitFor({ state: 'visible' });
  expect(status).toHaveText('idle');

  await page.locator('.vfrc-message', { hasText: FIRST_MESSAGE }).waitFor({ state: 'visible' });

  const input = page.locator('.vfrc-chat-input textarea');
  await input.waitFor({ state: 'visible' });
  await input.fill(FIRST_RESPONSE);

  const submit = page.locator('.vfrc-chat-input .vfrc-bubble');
  await submit.click();

  await page.locator('.vfrc-message', { hasText: FIRST_RESPONSE }).waitFor({ state: 'visible' });
  await page.locator('.vfrc-message', { hasText: SECOND_MESSAGE }).waitFor({ state: 'visible' });
  await page.getByTestId('status').waitFor({ state: 'visible' });
  expect(status).toHaveText('in progress');

  await input.fill(SECOND_RESPONSE);
  await submit.click();

  await page.locator('.vfrc-message', { hasText: SECOND_RESPONSE }).waitFor({ state: 'visible' });
  await page.locator('.vfrc-message', { hasText: THIRD_MESSAGE }).waitFor({ state: 'visible' });
  expect(status).toHaveText('ordered');
});
