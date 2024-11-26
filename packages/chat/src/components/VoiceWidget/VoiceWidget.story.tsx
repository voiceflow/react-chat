import type { Meta, StoryObj } from '@storybook/react';

import { WithDefaultPalette } from '@/storybook/decorators';

import logo from '../../assets/vf_logo.png';
import { VoiceWidget } from '.';

type Story = StoryObj<typeof VoiceWidget>;
const meta: Meta<typeof VoiceWidget> = {
  title: 'Components/VoiceWidget',
  component: VoiceWidget,

  decorators: [WithDefaultPalette],
};

export default meta;

export const Base: Story = {
  args: {
    // from our live agent, public

    imageSrc: logo,
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

export const Compact: Story = {
  args: {
    ...Base.args,
    variant: 'compact',
    isListening: true,
  },
};

export const Expand: Story = {
  args: {
    ...Base.args,
    variant: 'expanded',
    isListening: true,
  },
};
