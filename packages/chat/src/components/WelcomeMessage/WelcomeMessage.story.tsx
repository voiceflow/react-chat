import type { Meta, StoryObj } from '@storybook/react';

import { VF_ICON } from '@/fixtures';

import { WelcomeMessage } from '.';

type Story = StoryObj<typeof WelcomeMessage>;

const meta: Meta<typeof WelcomeMessage> = {
  title: 'Core/WelcomeMessage',
  component: WelcomeMessage,
  args: {
    avatar: VF_ICON,
  },
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Base: Story = {
  args: {
    avatar: VF_ICON,
    title: 'Agent name',
    description: 'Agent description',
  },
};
