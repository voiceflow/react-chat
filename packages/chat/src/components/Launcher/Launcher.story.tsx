import type { Meta, StoryObj } from '@storybook/react';

import tiledBg from '../../__fixtures__/tiled-bg.png';
import Launcher from '.';

type Story = StoryObj<typeof Launcher>;

const meta: Meta<typeof Launcher> = {
  title: 'Components/Launcher',
  component: Launcher,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
};

export default meta;

// Show launcher with default icon and no label
export const Default: Story = {};

export const IconOverride: Story = {
  args: {
    image: tiledBg,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Label',
  },
};

export const CustomIconWithLabel: Story = {
  args: {
    // eslint-disable-next-line no-secrets/no-secrets
    image: tiledBg,
    label: 'Label',
  },
};
