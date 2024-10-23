import type { Meta, StoryObj } from '@storybook/react';

import { VF_ICON } from '@/fixtures';
import { WithPalette } from '@/storybook/decorators';

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
  decorators: [(Story) => <WithPalette>{Story()}</WithPalette>],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Base: Story = {};

export const Actionable: Story = {
  args: {
    actions: [{ svg: 'volume' }, { svg: 'reset' }, { svg: 'close' }],
  },
};

export const Themed: Story = {
  args: {
    actions: [{ svg: 'volume' }, { svg: 'reset' }, { svg: 'close' }],
  },
  decorators: [(Story) => <WithPalette color="green">{Story()}</WithPalette>],
};
