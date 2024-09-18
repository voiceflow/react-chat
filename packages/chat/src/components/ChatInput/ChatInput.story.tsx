import type { Meta, StoryObj } from '@storybook/react';

import ChatInput from '.';

type Story = StoryObj<typeof ChatInput>;

const meta: Meta<typeof ChatInput> = {
  title: 'Components/Chat/ChatInput',
  component: ChatInput,
  args: {
    value: '',
    placeholder: '',
  },
  parameters: {
    controls: { include: ['value', 'placeholder', 'onValueChange'] },
  },
  render: (args) => <ChatInput.Controlled {...args} />,
};

export default meta;

export const Default: Story = {};

export const Placeholder: Story = {
  args: {
    placeholder: 'Message…',
  },
};
