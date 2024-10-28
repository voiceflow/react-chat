import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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

const MockComponent = ({ initialMessage }: { initialMessage: string }) => {
  const [message, setMessage] = useState(initialMessage);

  const onSubmit = () => {
    setMessage('');
  };

  return (
    <div style={{ width: '400px' }}>
      <MessageInput
        placeholder="Message..."
        message={message}
        onSubmit={onSubmit}
        onValueChange={(e) => setMessage(e)}
      />
    </div>
  );
};

export const Base: Story = {
  render: () => <MockComponent initialMessage="" />,
};

export const LongValue: Story = {
  render: () => (
    <MockComponent
      initialMessage={
        "Howdy folk how ya'll doing out there. This input was lovingly crafted by your favourite design engineering team here at Voiceflow. We hope you enjoy using it as much as we enjoyed making it. If you have any feedback, please let us know. We're always looking to improve our products. Thanks for using Voiceflow!"
      }
    />
  ),
};
