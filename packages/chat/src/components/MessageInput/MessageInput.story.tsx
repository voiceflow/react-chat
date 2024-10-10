import type { Meta, StoryObj } from '@storybook/react';

import { MessageInput } from '.';

type Story = StoryObj<typeof MessageInput>;

const meta: Meta<typeof MessageInput> = {
  title: 'Core/MessageInput',
  component: MessageInput,
  argTypes: {
    size: {
      options: ['small', 'large'],
      control: { type: 'radio' },
      defaultValue: 'small',
    },
  },
};
export default meta;

export const Base: Story = {
  args: {
    size: 'small',
  },
};
