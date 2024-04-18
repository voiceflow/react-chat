import { expect, test } from '@playwright/test';

import { slateMessage } from './utils';

const RUNTIME_URL = 'https://general-runtime.voiceflow.com/public/projectID/state/user/*/interact';

test('trigger effect extension on incoming trace', async ({ page }) => {
  const systemMessages = [
    'Welcome to the pizza palace!',
    'What kind of pizza do you want?',
    'One cheese pizza coming right up',
  ];
  const userMessages = ['I want to order a pizza', 'Cheese please'];
  const traceType = 'update_order_status';
  let count = 0;

  // eslint-disable-next-line consistent-return
  await page.route(RUNTIME_URL, async (route) => {
    count++;

    switch (count) {
      case 1:
        return route.fulfill({
          json: {
            trace: [{ type: traceType, payload: 'idle' }, slateMessage(systemMessages[0])],
          },
        });

      case 2:
        return route.fulfill({
          json: {
            trace: [{ type: traceType, payload: 'in progress' }, slateMessage(systemMessages[1])],
          },
        });

      case 3:
        return route.fulfill({
          json: {
            trace: [{ type: traceType, payload: 'ordered' }, slateMessage(systemMessages[2])],
          },
        });

      default:
    }
  });

  await page.goto('extensions');

  const chat = page.locator('.vfrc-chat');
  await chat.waitFor({ state: 'visible' });
  expect(chat).toBeInViewport();

  await page.locator('[data-testid="status"]', { hasText: 'idle' }).waitFor({ state: 'visible' });
  await page.locator('.vfrc-message', { hasText: systemMessages[0] }).waitFor({ state: 'visible' });

  const input = page.locator('.vfrc-chat-input textarea');
  await input.waitFor({ state: 'visible' });
  await input.fill(userMessages[0]);

  const submit = page.locator('.vfrc-chat-input .vfrc-bubble');
  await submit.click();

  await page.locator('.vfrc-message', { hasText: userMessages[0] }).waitFor({ state: 'visible' });
  await page.locator('.vfrc-message', { hasText: systemMessages[1] }).waitFor({ state: 'visible' });
  await page.locator('[data-testid="status"]', { hasText: 'in progress' }).waitFor({ state: 'visible' });

  await input.fill(userMessages[1]);
  await submit.click();

  await page.locator('.vfrc-message', { hasText: userMessages[1] }).waitFor({ state: 'visible' });
  await page.locator('.vfrc-message', { hasText: systemMessages[2] }).waitFor({ state: 'visible' });
  await page.locator('[data-testid="status"]', { hasText: 'ordered' }).waitFor({ state: 'visible' });
});

test('render response extension from incoming trace', async ({ page }) => {
  let count = 0;

  await page.route(RUNTIME_URL, (route) => {
    count++;

    switch (count) {
      case 1:
        return route.fulfill({
          json: {
            trace: [slateMessage("Welcome to Sal's Salon! Tell me about yourself."), { type: 'onboarding' }],
          },
        });
      case 2:
      default:
        expect(route.request().postDataJSON()).toEqual({
          action: {
            type: 'submit',
            payload: { name: 'Alex', hair: 'curly' },
          },
        });

        return route.fulfill({ json: { trace: [] } });
    }
  });

  await page.goto('extensions');

  const chat = page.locator('.vfrc-chat');
  await chat.waitFor({ state: 'visible' });
  expect(chat).toBeInViewport();

  await page.locator('.vfrc-message').waitFor({ state: 'visible' });

  const extensionMessage = page.locator('.vfrc-message--extension-onboarding_form');
  await extensionMessage.waitFor({ state: 'visible' });

  await extensionMessage.locator('[name="name"]').fill('Alex');
  await extensionMessage.locator('[name="hair"][id="curly"]').click();
  await extensionMessage.getByRole('button').click();
  await page
    .locator('.vfrc-message--extension-onboarding_form', { hasText: 'submitted ✅' })
    .waitFor({ state: 'visible' });
});
