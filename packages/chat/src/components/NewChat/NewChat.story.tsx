import type { Meta, StoryObj } from '@storybook/react';
import { assignInlineVars } from '@vanilla-extract/dynamic';

import EMPTY_IMAGE from '@/__fixtures__/empty-image.png';
import { DEFAULT_AVATAR, UserMessage } from '@/main';
import { WithDefaultPalette } from '@/storybook/decorators';
import { createPalette } from '@/styles/colors';
import { PALETTE } from '@/styles/colors.css';

import { SystemMessage } from '../SystemResponse/SystemMessage';
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

export const Base = {
  render: () => (
    <NewChat
      title="Your AI assistant"
      image=""
      description="Hello, I am here to help with whatever you need."
      avatar={EMPTY_IMAGE}
      showPoweredBy={true}
      extraLinkText="Privacy"
      extraLinkUrl="https://voiceflow.com"
      isLoading={false}
      hasEnded={false}
      messageInputProps={{ message: '', onSubmit: () => null, placeholder: 'Message...', onValueChange: () => null }}
    >
      <SystemMessage avatar={DEFAULT_AVATAR} message={{ type: 'text', text: 'Good morning' }} withImage />
      <UserMessage message="Hey, how are you today?" />
    </NewChat>
  ),
};

export const Themed: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('red') }) }}>
        <NewChat
          title="Your AI assistant"
          image=""
          description="Hello, I am here to help with whatever you need."
          avatar={EMPTY_IMAGE}
          showPoweredBy={true}
          extraLinkText="Privacy"
          extraLinkUrl="https://voiceflow.com"
          isLoading={false}
          hasEnded={false}
          messageInputProps={{
            message: '',
            onSubmit: () => null,

            placeholder: 'Message...',
            onValueChange: () => null,
          }}
        />
      </div>

      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('green') }) }}>
        <NewChat
          title="Your AI assistant"
          image=""
          description="Hello, I am here to help with whatever you need."
          avatar={EMPTY_IMAGE}
          showPoweredBy={true}
          extraLinkText="Privacy"
          extraLinkUrl="https://voiceflow.com"
          isLoading={false}
          hasEnded={false}
          messageInputProps={{
            message: '',
            onSubmit: () => null,
            placeholder: 'Message...',
            onValueChange: () => null,
          }}
        />
      </div>

      <div style={{ width: '400px', ...assignInlineVars(PALETTE, { colors: createPalette('purple') }) }}>
        <NewChat
          title=""
          image=""
          description=""
          avatar={EMPTY_IMAGE}
          showPoweredBy={true}
          extraLinkText="Privacy"
          extraLinkUrl="https://voiceflow.com"
          isLoading={false}
          hasEnded={false}
          messageInputProps={{
            message: '',
            onSubmit: () => null,
            placeholder: 'Message...',
            onValueChange: () => null,
          }}
        />
      </div>
    </div>
  ),
};

export const NoPoweredBy = {
  render: () => (
    <NewChat
      title="Your AI assistant"
      image=""
      description="Let's get this party started already!"
      avatar={EMPTY_IMAGE}
      buttons={[]}
      extraLinkText="Privacy"
      extraLinkUrl="https://voiceflow.com"
      showPoweredBy={false}
      isLoading={false}
      hasEnded={false}
      messageInputProps={{ message: '', onSubmit: () => null, placeholder: 'Message...', onValueChange: () => null }}
    />
  ),
};
