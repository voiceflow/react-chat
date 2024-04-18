import type { Meta, StoryObj } from '@storybook/react';

import Chat from '@/components/Chat';

import Footer from '.';

type Story = StoryObj<typeof Footer>;

const meta: Meta<typeof Footer> = {
  title: 'Components/Chat/Footer',
  component: Footer,
  argTypes: {
    onStart: { action: 'onStart' },
    onSend: { action: 'send' },
  },
  args: {
    hasEnded: false,
    withWatermark: false,
  },
  render: (args) => (
    <Chat.Container>
      <Footer {...args} />
    </Chat.Container>
  ),
};

export default meta;

export const Running: Story = {};

export const Ended: Story = {
  args: {
    hasEnded: true,
  },
};

export const WithWatermark: Story = {
  args: {
    withWatermark: true,
  },
};
