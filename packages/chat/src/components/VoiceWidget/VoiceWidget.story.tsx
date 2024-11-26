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
    footer: {
      extraLinkText: 'Privacy',
      extraLinkUrl: 'https://www.google.com',
      showPoweredBy: true,
    },
  },
};

export const Listening: Story = {
  args: {
    ...Base.args,
    isListening: true,
  },
};

export const Talking: Story = {
  args: {
    ...Base.args,
    isTalking: true,
  },
};
