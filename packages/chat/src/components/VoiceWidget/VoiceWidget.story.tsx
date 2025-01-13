import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

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

const CustomVoiceWidget = (args: React.ComponentProps<typeof VoiceWidget>) => {
  const [isLoading, setIsLoading] = useState(false);

  return <VoiceWidget {...args} isLoading={isLoading} onStartCall={() => setIsLoading((prev) => !prev)} />;
};

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

  render: CustomVoiceWidget,
};

export const Listening: Story = {
  args: {
    ...Base.args,
    state: 'LISTENING',
  },
  render: CustomVoiceWidget,
};

export const Talking: Story = {
  args: {
    ...Base.args,
    state: 'TALKING',
  },
  render: CustomVoiceWidget,
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
    state: 'IDLE',
  },
  render: CustomVoiceWidget,
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
    state: 'IDLE',
  },
  render: CustomVoiceWidget,
};
