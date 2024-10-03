import type { Meta, StoryObj } from '@storybook/react';

import SendButton from '.';

type Story = StoryObj<typeof SendButton>;

const meta: Meta<typeof SendButton> = {
  title: 'Core/Send Button',
  component: SendButton,
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
