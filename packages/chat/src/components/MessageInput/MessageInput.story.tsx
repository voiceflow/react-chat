import type { Meta, StoryObj } from '@storybook/react';

import { MessageInput } from '.';

type Story = StoryObj<typeof MessageInput>;

const meta: Meta<typeof MessageInput> = {
  title: 'Core/MessageInput',
  component: MessageInput,
  argTypes: {},
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
