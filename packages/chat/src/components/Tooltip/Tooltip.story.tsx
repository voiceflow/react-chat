import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from '.';

type Story = StoryObj<typeof Tooltip>;
const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    onClick: { table: { disable: true } },
    orientation: {
      options: ['left', 'right'],
      control: { type: 'radio' },
      defaultValue: 'left',
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  },
};

export default meta;

export const LeftOrientation: Story = {
  args: {
    orientation: 'left',
  },
};

export const RightOrientation: Story = {
  args: {
    orientation: 'right',
  },
};

export const Actionable: Story = {
  args: {
    label: 'Action Label',
  },
};
