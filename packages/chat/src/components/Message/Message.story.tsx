import type { Meta, StoryObj } from '@storybook/react';

import Message from '.';

type Story = StoryObj<typeof Message>;

const meta: Meta<typeof Message> = {
  title: 'Core/Message',
  component: Message,
  argTypes: {
    variant: {
      options: Object.values(Message.Variant),
      control: { type: 'radio' },
      defaultValue: Message.Variant.CHAT,
    },
    from: {
      if: { arg: 'variant', eq: Message.Variant.CHAT },
      options: ['system', 'user'],
      control: { type: 'radio' },
      defaultValue: 'system',
    },
    orientation: {
      if: { arg: 'variant', eq: Message.Variant.DEBUG },
      options: ['left', 'right'],
      control: { type: 'radio' },
      defaultValue: 'left',
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
};

export default meta;

export const SystemChat: Story = {
  args: {
    variant: Message.Variant.CHAT,
    from: 'system',
  },
};

export const UserChat: Story = {
  args: {
    variant: Message.Variant.CHAT,
    from: 'user',
  },
};

export const DebugLeft: Story = {
  args: {
    variant: Message.Variant.DEBUG,
    orientation: 'left',
  },
};

export const DebugRight: Story = {
  args: {
    variant: Message.Variant.DEBUG,
    orientation: 'right',
  },
};
