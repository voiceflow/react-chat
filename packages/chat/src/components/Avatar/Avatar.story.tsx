import type { Meta, StoryObj } from '@storybook/react';

import { VF_ICON } from '@/fixtures';

import Avatar from '.';

type Story = StoryObj<typeof Avatar>;

const meta: Meta<typeof Avatar> = {
  title: 'Core/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      options: ['small', 'large'],
      control: { type: 'radio' },
      defaultValue: 'small',
    },
  },
  args: {
    avatar: VF_ICON,
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
