import type { Meta, StoryObj } from '@storybook/react';

import { VF_ICON } from '@/fixtures';

import Header from '.';

const meta: Meta<typeof Header> = {
  title: 'Components/Chat/Header',
  component: Header,
  args: {
    title: 'Agent name',
    image: VF_ICON,
    actions: [],
  },
  render: (args) => <Header {...args} />,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Base: Story = {};

export const Actionable: Story = {
  args: {
    actions: [{ svg: 'volume' }, { svg: 'reset' }, { svg: 'close' }],
  },
};
