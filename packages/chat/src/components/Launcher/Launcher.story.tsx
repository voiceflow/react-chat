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
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    // eslint-disable-next-line no-console
    console.log('toggle');
  };
  return <Launcher isOpen={isOpen} onClick={handleToggle} {...props} />;
};

export const Base: Story = {
  render: () => <CollapsableLauncher />,
};

export const WithCustomIcon: Story = { render: () => <CollapsableLauncher image={tiledBg} /> };

export const WithLabel: Story = {
  render: () => <CollapsableLauncher image={tiledBg} label="Label" />,
};
