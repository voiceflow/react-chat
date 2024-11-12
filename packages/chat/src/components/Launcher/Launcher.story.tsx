import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { WithDefaultPalette } from '@/storybook/decorators';

import tiledBg from '../../__fixtures__/tiled-bg.png';
import { Launcher } from '.';

type Story = StoryObj<typeof Launcher>;

const meta: Meta<typeof Launcher> = {
  title: 'Components/Launcher',
  component: Launcher,
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  decorators: [WithDefaultPalette],
};

export default meta;

const CollapsableLauncher = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return <Launcher isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} {...props} />;
};

export const Base: Story = {
  render: () => <CollapsableLauncher />,
};

export const WithCustomIcon: Story = { render: () => <CollapsableLauncher image={tiledBg} /> };

export const WithLabel: Story = {
  render: () => <CollapsableLauncher image={tiledBg} label="Label" />,
};
