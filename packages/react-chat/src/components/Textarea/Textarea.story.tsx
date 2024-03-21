import { Meta, StoryObj } from '@storybook/react';

import Textarea from '.';

type Story = StoryObj<typeof Textarea>;
const meta: Meta<typeof Textarea> = {
  title: 'Core/Textarea',
  component: Textarea,
  args: {
    value: 'Message text',
    onChange: () => null,
  },
};

export default meta;

export const Base: Story = {
  args: {
    value: 'Message text',
    rows: 1,
  },
};

export const Disabled: Story = {
  args: {
    value: 'Message text',
    rows: 1,
    disabled: true,
  },
};
