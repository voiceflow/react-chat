import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { WithDefaultPalette } from '@/storybook/decorators';

import defaultLauncherImage from '../../__fixtures__/default-launcher-image.png';
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

  return (
    <Launcher
      isOpen={isOpen}
      {...props}
      onClick={() => {
        setIsOpen((prev) => !prev);
        props.onClick?.();
      }}
    />
  );
};

export const Base: Story = {
  render: () => <CollapsableLauncher />,
};

export const WithDefaultImage: Story = {
  render: () => <CollapsableLauncher image={defaultLauncherImage} />,
};

export const WithCustomIcon: Story = { render: () => <CollapsableLauncher image={tiledBg} /> };

export const Disabled: Story = { render: () => <CollapsableLauncher isDisabled /> };

export const Loading: Story = { render: () => <CollapsableLauncher isLoading /> };

export const DisabledAndLoading: Story = {
  render: () => {
    const [counter, setCounter] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);

    return (
      <CollapsableLauncher
        isLoading={isDisabled}
        isDisabled={isDisabled}
        image={tiledBg}
        onClick={() => {
          setCounter((prev) => prev + 1);

          if (counter % 3 === 0) return;

          setIsDisabled(!isDisabled);
        }}
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => (
    <div style={{ position: 'absolute', right: 10 }}>
      <CollapsableLauncher type="label" label="Chat with Tico" />
    </div>
  ),
};

export const WithLabelAndIcon: Story = {
  render: () => (
    <div style={{ position: 'absolute', right: 10 }}>
      <CollapsableLauncher image={tiledBg} label="Chat with Tico" />
    </div>
  ),
};

export const WithLabelOnRight: Story = {
  render: () => (
    <div style={{ position: 'absolute', left: 10 }}>
      <CollapsableLauncher image={tiledBg} label="Chat with Tico" />
    </div>
  ),
};
