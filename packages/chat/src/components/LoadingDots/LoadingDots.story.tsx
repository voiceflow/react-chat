import type { Meta, StoryObj } from '@storybook/react';

import AgentMessage from '../AgentMessage';
import { LoadingDots } from '.';

type Story = StoryObj<typeof LoadingDots>;

const meta: Meta<typeof LoadingDots> = {
  title: 'Loaders/LoadingDots',
  component: LoadingDots,
};

export default meta;

export const Base: Story = {};

export const InMessage: Story = {
  render: () => {
    return (
      <div>
        <AgentMessage from="system">
          <LoadingDots />
        </AgentMessage>
      </div>
    );
  },
};
