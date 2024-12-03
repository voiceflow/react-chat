import type { Meta, StoryObj } from '@storybook/react';

import { DEFAULT_AVATAR, NewChat } from '@/main';
import { WithDefaultPalette, WithRuntimeProvider } from '@/storybook/decorators';

import Indicator from '../SystemResponse/Indicator/Indicator';
import { SystemMessage } from '../SystemResponse/SystemMessage';
import { TypingIndicator } from '.';

type Story = StoryObj<typeof TypingIndicator>;
const meta: Meta<typeof TypingIndicator> = {
  title: 'Components/TypingIndicator',
  component: TypingIndicator,
  decorators: [WithRuntimeProvider, WithDefaultPalette],
};

export default meta;

export const Default: Story = {
  args: {},
};

export const InsideChat: Story = {
  render: () => (
    <div style={{ width: '380px' }}>
      <NewChat
        welcomeMessageProps={{
          enabled: true,
          title: 'Your AI assistant',
          description: "It's tricky to rock a rhyme, to rock a rhyme thats right on time, it's tricky",
        }}
        headerProps={{
          showImage: true,
          title: 'Your AI assistant',
        }}
        footerProps={{
          showPoweredBy: true,
          extraLinkText: 'Privacy',
          extraLinkUrl: 'https://voiceflow.com',
          messageInputProps: {
            onSubmit: async (_) => Promise.resolve(),
            placeholder: 'Message...',
          },
        }}
        isLoading={false}
        hasEnded={false}
      >
        <SystemMessage avatar={DEFAULT_AVATAR} withImage={false} message={{ type: 'text', text: 'Good morning' }} />
        <Indicator avatar={DEFAULT_AVATAR} />
      </NewChat>
    </div>
  ),
};
