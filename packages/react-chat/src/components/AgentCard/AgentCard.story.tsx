import type { Meta, StoryObj } from '@storybook/react';

import AgentCard from '.';

const meta: Meta<typeof AgentCard> = {
  title: 'Components/AgentCard',
  component: AgentCard,
  tags: ['autodocs'],
} satisfies Meta<typeof AgentCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    children: <div style={{ padding: '16px' }}>Sample content inside the AgentCard</div>,
  },
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0' }}>Dashboard Title</h3>
        <p style={{ margin: 0 }}>This is a sample dashboard card with multiple elements inside.</p>
        <button style={{ marginTop: '12px' }}>Action Button</button>
      </div>
    ),
  },
};

/**
 * @see {@link https://voiceflow.github.io/react-chat/?path=/story/components-dashboard-card--simple}
 */
