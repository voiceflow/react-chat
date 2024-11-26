import type { Meta, StoryObj } from '@storybook/react';

import { WithDefaultPalette } from '@/storybook/decorators';

import { VoiceWidget } from '.';
import { MockImage } from './MockVoiceWidgetImage';

type Story = StoryObj<typeof VoiceWidget>;
const meta: Meta<typeof VoiceWidget> = {
  title: 'Components/VoiceWidget',
  component: VoiceWidget,

  decorators: [WithDefaultPalette],
};

export default meta;

export const Base: Story = {
  args: {
    children: <MockImage />,
  },
};

// export const InnerCircle: Story = {
//   args: {
//     children: <ShrinkingCircle />,
//   },
// };

// export const Gradient: Story = {
//   args: {
//     children: <MovingGradient />,
//   },
// };
