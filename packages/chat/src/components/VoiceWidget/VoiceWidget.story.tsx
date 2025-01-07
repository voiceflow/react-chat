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
    state: 'listening',
    settings: {
      content: {
        talkingText: '',
        endButtonText: '',
        listeningText: '',
        startButtonText: '',
        callToActionText: '',
        imageURL: logo,
      },
      renderMode: 'full',
    },
    footer: {
      text: 'Privacy',
      url: 'https://www.google.com',
      enabled: true,
    },
  },
};

export const Listening: Story = {
  args: {
    ...Base.args,
    state: 'listening',
  },
};

export const Talking: Story = {
  args: {
    ...Base.args,
    state: 'talking',
  },
};

export const Compact: Story = {
  args: {
    ...Base.args,
    settings: {
      content: {
        talkingText: '',
        endButtonText: '',
        listeningText: '',
        startButtonText: '',
        callToActionText: '',
      },
      renderMode: 'compact',
    },
    state: 'listening',
  },
};

export const Expand: Story = {
  args: {
    ...Base.args,
    settings: {
      content: {
        talkingText: '',
        endButtonText: '',
        listeningText: '',
        startButtonText: '',
        callToActionText: '',
      },
      renderMode: 'expand',
    },
    state: 'listening',
  },
};
