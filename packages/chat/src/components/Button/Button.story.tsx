import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';
import { ButtonVariant } from './constants';

type Story = StoryObj<typeof Button>;
const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  argTypes: {
    variant: {
      options: Object.values(ButtonVariant),
      control: { type: 'radio' },
      defaultValue: ButtonVariant.PRIMARY,
    },
  },
  args: {
    children: 'Button label',
    round: false,
  },
};

export default meta;

export const Primary: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
  },
};

export const Inline: Story = {
  args: {
    variant: ButtonVariant.INLINE,
  },
};
