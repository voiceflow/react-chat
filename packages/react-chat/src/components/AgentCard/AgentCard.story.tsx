import type { Meta, StoryObj } from '@storybook/react';

import AgentCard from '.';

const meta: Meta<typeof AgentCard> = {
  title: 'Components/AgentCard',
  component: AgentCard,
  tags: ['autodocs'],
  args: {
    name: 'John Smith',
    timestamp: '2 hours ago',
    initials: 'JS',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomColor: Story = {
  args: {
    avatarColor: '#ff6b6b',
  },
};

export const LongName: Story = {
  args: {
    name: 'Alexandra Richardson-Montgomery III',
    initials: 'AR',
  },
};

/**
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-agent-card--default}
 */
