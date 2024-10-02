import type { Meta, StoryObj } from '@storybook/react';

import { VF_ICON } from '@/fixtures';

import { Message } from './Message.component';

type Story = StoryObj<typeof Message>;

const meta: Meta<typeof Message> = {
  title: 'Core/Message',
  component: Message,
  argTypes: {
    size: {
      options: ['small', 'large'],
      control: { type: 'radio' },
      defaultValue: 'small',
    },
  },
  args: {
    Message: VF_ICON,
  },
};
export default meta;

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};
