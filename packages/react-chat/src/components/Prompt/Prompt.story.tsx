import type { Meta, StoryObj } from '@storybook/react';

import Chat from '@/components/Chat';

import Prompt from '.';

type Story = StoryObj<typeof Prompt>;

const meta: Meta<typeof Prompt> = {
  title: 'Components/Chat/Prompt',
  component: Prompt,
  args: {
    cancel: { label: 'Cancel' },
  },
  render: (args) => (
    <Chat.Container withPrompt>
      <div style={{ height: 250, backgroundColor: 'lavender' }} />
      <Prompt {...args} />
    </Chat.Container>
  ),
};

export default meta;

export const Base: Story = {
  args: {
    accept: { label: 'Primary Action' },
  },
};

export const Dangerous: Story = {
  args: {
    accept: { label: 'Dangerous Action', type: 'warn' },
  },
};
