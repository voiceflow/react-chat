import type { Meta, StoryObj } from '@storybook/react';

import Input from '.';

type Story = StoryObj<typeof Input>;

const meta: Meta<typeof Input> = {
  title: 'Core/Input',
  component: Input,
  args: {
    value: '',
    placeholder: '',
  },
  parameters: {
    controls: { include: ['value', 'placeholder', 'onValueChange'] },
  },
  render: (args) => <Input.Controlled {...args} />,
};

export default meta;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Message…',
  },
};
