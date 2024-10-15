import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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

const CollapsableLauncher = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return <Launcher isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} {...props} />;
};

export const Default: Story = { render: () => <CollapsableLauncher /> };

export const IconOverride: Story = {
  render: () => <CollapsableLauncher image={tiledBg} />,
};

export const WithLabel: Story = {
  render: () => <CollapsableLauncher label="Label" />,
};

export const CustomIconWithLabel: Story = {
  render: () => <CollapsableLauncher image={tiledBg} label="Label" />,
};
