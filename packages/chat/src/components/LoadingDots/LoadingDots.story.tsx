import type { Meta, StoryObj } from '@storybook/react';

import { LoadingDots } from '.';

type Story = StoryObj<typeof LoadingDots>;

const meta: Meta<typeof LoadingDots> = {
  title: 'Loaders/LoadingDots',
  component: LoadingDots,
};

export default meta;

export const Base: Story = {};
