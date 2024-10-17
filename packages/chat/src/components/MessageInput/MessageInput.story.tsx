import type { Meta, StoryObj } from '@storybook/react';

import { MessageInput } from '.';

type Story = StoryObj<typeof MessageInput>;

const meta: Meta<typeof MessageInput> = {
  title: 'Core/MessageInput',
  component: MessageInput,
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

export const Base: Story = {
  args: {
    placeholder: 'Message...',
  },
};

export const LongValue: Story = {
  args: {
    placeholder: 'Message...',
    message:
      "Howdy folk how ya'll doing out there. This input was lovingly crafted by your favourite design engineering team here at Voiceflow. We hope you enjoy using it as much as we enjoyed making it. If you have any feedback, please let us know. We're always looking to improve our products. Thanks for using Voiceflow!",
  },
};
