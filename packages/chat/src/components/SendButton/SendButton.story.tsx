import type { Meta, StoryObj } from '@storybook/react';

import { WithDefaultPalette } from '@/storybook/decorators';

import { SendButton } from '.';

type Story = StoryObj<typeof SendButton>;

const meta: Meta<typeof SendButton> = {
  title: 'Core/Send Button',
  component: SendButton,
  decorators: [WithDefaultPalette],
};
export default meta;

export const Default: Story = {
  args: {
    disabled: false,
    color: '#387dff',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    color: '#387dff',
  },
};
