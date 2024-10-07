import type { Meta, StoryObj } from '@storybook/react';

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
    // eslint-disable-next-line no-secrets/no-secrets
    image: 'https://cm4-production-assets.s3.amazonaws.com/1668625107157-vf-nobg.png',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Chat',
  },
};

export const CustomIconWithLabel: Story = {
  args: {
    // eslint-disable-next-line no-secrets/no-secrets
    image: 'https://cm4-production-assets.s3.amazonaws.com/1668625107157-vf-nobg.png',
    label: 'Chat',
  },
};
