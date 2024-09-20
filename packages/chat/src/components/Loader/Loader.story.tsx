import type { Meta, StoryObj } from '@storybook/react';

import Loader from '.';

type Story = StoryObj<typeof Loader>;

const meta: Meta<typeof Loader> = {
  title: 'Core/Loader',
  component: Loader,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};
export default meta;

export const Default: Story = {};
