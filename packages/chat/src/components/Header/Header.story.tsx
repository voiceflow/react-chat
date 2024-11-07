import type { Meta, StoryObj } from '@storybook/react';

import { VF_ICON } from '@/fixtures';
import { WithDefaultPalette } from '@/storybook/decorators';

import { Header } from '.';

const meta: Meta<typeof Header> = {
  title: 'Components/Chat/Header',
  component: Header,
  args: {
    title: 'Agent name',
    image: VF_ICON,
    actions: [],
  },
  render: (args) => <Header {...args} />,
  decorators: [WithDefaultPalette],
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Base: Story = {};

export const Actionable: Story = {
  args: {
    actions: [{ svg: 'volume' }, { svg: 'reset' }],
  },
};

export const Muted: Story = {
  args: {
    actions: [{ svg: 'mute' }, { svg: 'reset' }],
  },
};

export const Themed: Story = {
  args: {
    actions: [{ svg: 'volume' }, { svg: 'reset' }],
  },
  decorators: [WithDefaultPalette],
};

export const NoImage: Story = {
  args: {
    actions: [{ svg: 'volume' }, { svg: 'reset' }],
    image: undefined,
  },
  decorators: [WithDefaultPalette],
};

export const Mobile: Story = {
  args: {
    actions: [{ svg: 'volume' }, { svg: 'reset' }, { svg: 'close' }],
  },
  decorators: [WithDefaultPalette],
};
