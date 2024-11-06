import type { Meta, StoryObj } from '@storybook/react';

import { WithDefaultPalette } from '@/storybook/decorators';

import { MessageInput } from '.';

type Story = StoryObj<typeof MessageInput>;

const meta: Meta<typeof MessageInput> = {
  title: 'Core/MessageInput',
  component: MessageInput,
  decorators: [
    WithDefaultPalette,
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

const MockComponent = () => {
  return (
    <div style={{ width: '380px' }}>
      <MessageInput placeholder="Message..." onSubmit={() => Promise.resolve()} />
    </div>
  );
};

export const Base: Story = {
  render: () => <MockComponent />,
};

export const WithAudioInput: Story = {
  render: () => (
    <div style={{ width: '380px' }}>
      <MessageInput
        placeholder="Message..."
        disableSend={false}
        audioInterface={true}
        onSubmit={() => Promise.resolve()}
      />
    </div>
  ),
};
