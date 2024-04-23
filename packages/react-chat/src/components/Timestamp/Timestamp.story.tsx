import type { Meta, StoryObj } from '@storybook/react';

import Timestamp from '.';

type Story = StoryObj<typeof Timestamp>;
const meta: Meta<typeof Timestamp> = {
  title: 'Core/Timestamp',
  component: Timestamp,
  argTypes: {
    value: { control: 'date' },
  },
};

export default meta;

export const Default: Story = {
  args: {
    value: Date.now(),
  },
};
