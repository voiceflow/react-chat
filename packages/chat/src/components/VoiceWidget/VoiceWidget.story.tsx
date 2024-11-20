import type { Meta, StoryObj } from '@storybook/react';

import { WithDefaultPalette } from '@/storybook/decorators';

import { VoiceWidget } from '.';
import { CircularVisualizer } from './GradientVisualizer.component';
import { VoiceflowLogo } from './logo-animation.component';
import { ShrinkingCircle } from './ShrinkingCircle.component';
import { WaveFormVisualizer } from './WaveformVisualizer.component';

type Story = StoryObj<typeof VoiceWidget>;
const meta: Meta<typeof VoiceWidget> = {
  title: 'Components/VoiceWidget',
  component: VoiceWidget,

  decorators: [WithDefaultPalette],
};

export default meta;

export const Base: Story = {
  args: {
    children: <WaveFormVisualizer />,
  },
};

export const Alt: Story = {
  args: {
    children: <CircularVisualizer />,
  },
};

export const Logo: Story = {
  args: {
    children: <VoiceflowLogo />,
  },
};

export const InnerCircle: Story = {
  args: {
    children: <ShrinkingCircle />,
  },
};
