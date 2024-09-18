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
    value: new Date('2024-09-11T08:21:00.000Z').getTime(),
  },
};
