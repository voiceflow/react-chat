import type { Meta, StoryObj } from '@storybook/react';

import AgentCard from '.';

const meta: Meta<typeof AgentCard> = {
  title: 'Components/AgentCard',
  component: AgentCard,
  tags: ['autodocs'],
  argTypes: {
    avatarColor: {
      control: 'color',
      description: 'Background color of the avatar',
    },
    name: {
      control: 'text',
      description: 'Name of the agent',
    },
    timestamp: {
      control: 'text',
      description: 'Timestamp to display',
    },
    initials: {
      control: 'text',
      description: 'Initials to show in the avatar',
    },
  },
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

export const Interactive: Story = {
  args: {
    name: 'Jane Doe',
    timestamp: '5 minutes ago',
    initials: 'JD',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * A button component that displays agent information with an avatar.
 * 
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-agent-card--default}
 */
