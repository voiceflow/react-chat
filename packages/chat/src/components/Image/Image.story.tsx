import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_IMAGE } from '@/fixtures';

import Image from '.';

type Story = StoryObj<typeof Image>;

const meta: Meta<typeof Image> = {
  title: 'Core/Image',
  component: Image,
  args: {
    image: MOCK_IMAGE,
    isRounded: true,
  },
};

export default meta;

export const RoundCorners: Story = {};

export const StraightCorners: Story = {
  args: {
    isRounded: false,
  },
};
