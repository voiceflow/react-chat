import type { Meta, StoryObj } from '@storybook/react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import TEXT_TREATMENT_MARKDOWN from '@/__fixtures__/markdown/text-treatment.md?raw';
import { WithDefaultPalette } from '@/storybook/decorators';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import { NewChat } from '.';

const meta: Meta = {
  title: 'Widget',
  decorators: [WithDefaultPalette],

  parameters: {
    layout: 'centered',
  },
};

type Story = StoryObj<typeof NewChat>;

export default meta;

const messages = [
  {
    from: 'system',
    text: "Hey there! I'm a chatbot. I can help you with a lot of things. Try me out!",
  },

  { from: 'user', text: 'Howdy!' },
  { from: 'user', text: 'What kinda sick stuff can you do?' },
  { from: 'system', text: "You're in for a treat. We can do some pretty sick stuff." },
  { from: 'user', text: 'What kinda sick stuff can you do?' },
  { from: 'user', text: 'Rapid fire follow up' },
  { from: 'system', text: "You're in for a treat. We can do some pretty sick stuff." },
];

export const Base = {
  render: () => (
    <NewChat
      messages={messages}
      footerProps={{
        showPoweredBy: true,
        privacyURL: 'https://voiceflow.com',

        messageInputProps: { message: '', onSubmit: () => null, placeholder: 'Message...', onValueChange: () => null },
      }}
    />
  ),
};

export const Themed: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('red') }) }}>
        <NewChat
          color="orange"
          messages={messages}
          footerProps={{
            showPoweredBy: true,
            privacyURL: 'https://voiceflow.com',

            messageInputProps: {
              message: '',
              onSubmit: () => null,

              placeholder: 'Message...',
              onValueChange: () => null,
            },
          }}
        />
      </div>

      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('green') }) }}>
        <NewChat
          color="orange"
          messages={messages}
          footerProps={{
            showPoweredBy: true,
            privacyURL: 'https://voiceflow.com',

            messageInputProps: {
              message: '',
              onSubmit: () => null,
              placeholder: 'Message...',
              onValueChange: () => null,
            },
          }}
        />
      </div>

      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('purple') }) }}>
        <NewChat
          color="orange"
          messages={messages}
          footerProps={{
            showPoweredBy: true,
            privacyURL: 'https://voiceflow.com',

            messageInputProps: {
              message: '',
              onSubmit: () => null,
              placeholder: 'Message...',
              onValueChange: () => null,
            },
          }}
        />
      </div>
    </div>
  ),
};

export const NoPoweredBy = {
  render: () => (
    <NewChat
      messages={[{ from: 'system', text: TEXT_TREATMENT_MARKDOWN }, ...messages]}
      footerProps={{
        buttons: [],
        privacyURL: 'https://voiceflow.com',
        showPoweredBy: false,
        messageInputProps: { message: '', onSubmit: () => null, placeholder: 'Message...', onValueChange: () => null },
      }}
    />
  ),
};
