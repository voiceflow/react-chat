import type { Meta, StoryObj } from '@storybook/react';

import { WithPalette } from '@/storybook/decorators';

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
  decorators: [WithPalette],
};

export default meta;

export const Primary: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
  },
};

export const PrimaryLarge: Story = {
  args: {
    variant: ButtonVariant.PRIMARY,
    large: true,
  },
};

export const Secondary: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
  },
};

export const SecondaryLarge: Story = {
  args: {
    variant: ButtonVariant.SECONDARY,
    large: true,
  },
};

export const Inline: Story = {
  args: {
    variant: ButtonVariant.INLINE,
  },
};
