import type { Meta, StoryObj } from '@storybook/react';

import EMPTY_IMAGE from '../../__fixtures__/empty-image.png';
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
    avatar: EMPTY_IMAGE,
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
