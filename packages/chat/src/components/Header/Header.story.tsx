import type { Meta, StoryObj } from '@storybook/react';

import Chat from '@/components/Chat';
import { VF_ICON } from '@/fixtures';

import Header from '.';

const meta: Meta<typeof Header> = {
  title: 'Components/Chat/Header',
  component: Header,
  args: {
    title: 'Assistant Name',
    image: VF_ICON,
    actions: [],
  },
  render: (args) => (
    <Chat.Container>
      <Header {...args} />
    </Chat.Container>
  ),
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Base: Story = {};

export const Actionable: Story = {
  args: {
    actions: [{ svg: 'minus' }, { svg: 'close' }],
  },
};
