import type { Meta, StoryObj } from '@storybook/react';

import { UserMessage } from './index';

type Story = StoryObj<typeof UserMessage>;

const shortMessage = 'Howdy folks how yall doing out there?';

const meta: Meta<typeof UserMessage> = {
  title: 'Core/UserMessage',
  component: UserMessage,
};
export default meta;

export const Short: Story = {
  args: {
    children: shortMessage,
  },
};

export const Long: Story = {
  args: {
    children:
      'Howdy folks how yall doing out there? Howdy folks how yall doing out there? Howdy folks how yall doing out there? Howdy folks how yall doing out there? Howdy folks how yall doing out there? Howdy folks how yall doing out there?',
  },
};
