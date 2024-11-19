import type { Meta, StoryObj } from '@storybook/react';

import { WithDefaultPalette } from '@/storybook/decorators';

import { VoiceWidget } from '.';
import { CircularVisualizer } from './AltVisualizer.component';

type Story = StoryObj<typeof VoiceWidget>;
const meta: Meta<typeof VoiceWidget> = {
  title: 'Components/VoiceWidget',
  component: VoiceWidget,
  args: {
    timestamp: Date.now(),
  },
  render: () => <VoiceWidget />,
  decorators: [WithDefaultPalette],
};

export default meta;

export const Base: Story = {
  args: {
    message: 'Lorem ipsum dolor',
  },
};

export const Alt: Story = {
  render: () => <CircularVisualizer />,
};
