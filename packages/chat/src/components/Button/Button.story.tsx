import type { Meta, StoryObj } from '@storybook/react';

import Button from '.';

type Story = StoryObj<typeof Button>;
const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  argTypes: {
    variant: {
      options: Object.values(Button.Variant),
      control: { type: 'radio' },
      defaultValue: Button.Variant.PRIMARY,
    },
    type: {
      if: { arg: 'variant', eq: Button.Variant.PRIMARY },
      options: ['info', 'warn', 'subtle'],
      control: { type: 'radio' },
      defaultValue: 'info',
    },
  },
  args: {
    children: 'Button Label',
  },
};

export default meta;

export const PrimaryInfo: Story = {
  args: {
    variant: Button.Variant.PRIMARY,
    type: 'info',
  },
};

export const PrimaryWarn: Story = {
  args: {
    variant: Button.Variant.PRIMARY,
    type: 'warn',
  },
};

export const PrimarySubtle: Story = {
  args: {
    variant: Button.Variant.PRIMARY,
    type: 'subtle',
  },
};

export const Secondary: Story = {
  args: {
    variant: Button.Variant.SECONDARY,
  },
};
