import type { Meta } from '@storybook/react';

import { RuntimeProvider } from '@/contexts';
import { RenderMode } from '@/main';
import { WithDefaultPalette } from '@/storybook/decorators';

import { ChatWidget } from './index';

const meta: Meta<typeof ChatWidget> = {
  title: 'Views/ChatWidget',
  component: ChatWidget,

  decorators: [WithDefaultPalette],
};

export default meta;

export const Base = {
  args: {
    config: {
      type: 'voice',
      chat: {
        voiceInput: true,
        voiceOutput: true,
        renderMode: 'widget',
        headerImage: {
          enabled: true,
        },
        agentImage: {
          enabled: true,
        },
        banner: {
          enabled: true,
          title: 'Your AI agent',
          description: 'How can I help you today?',
        },
        placeholderText: 'Message...',
        aiDisclaimer: {
          enabled: true,
          text: 'Generated by AI, double-check for accuracy.',
        },
        handoffToAgentImageURL: '',
      },
      common: {
        fontFamily: 'UCity Pro',
        launcher: {
          text: 'Your text',
          type: 'both',
        },
        poweredBy: true,
        footerLink: {
          enabled: true,
        },
        position: 'right',
        sideSpacing: '20',
        bottomSpacing: '20',
        primaryColor: {
          color: '#397DFF',
          palette: {
            50: '#E7F5FD',
            100: '#C6E4FB',
            200: '#A2D2FA',
            300: '#87BFFB',
            400: '#659FFD',
            500: '#397DFF',
            600: '#2F68DB',
            700: '#264EB4',
            800: '#1C368E',
            900: '#0F1E61',
          },
        },
        persistence: 'localStorage',
      },
      voice: {
        renderMode: 'full',
        content: {
          callToActionText: 'How can I help you?',
          startButtonText: 'Start a call',
          listeningText: 'Listening',
          talkingText: 'Talk to interrupt',
          endButtonText: 'End',
        },
      },
    },
  },
  render: (props: any) => (
    <RuntimeProvider
      config={{
        url: 'https://general-runtime-review-operator.us-2.development.voiceflow.com',
        user: { name: 'User' },
        render: { mode: RenderMode.OVERLAY },
        verify: { projectID: '676f17ef3cf19c288f4d02f8' },
        versionID: '676f17ef3cf19c288f4d02f9',
        autostart: true,
        allowDangerousHTML: true,
        voice: {
          url: 'https://runtime-api-review-operator.us-2.development.voiceflow.com',
          accessToken: 'VF.DM.67703df8c466f3697baf4df9.OY8scQUFwMJAt3c1',
        },
      }}
      assistant={{
        ...props.config,
        stylesheet: '',
        extensions: [],
      }}
    >
      <ChatWidget chatAPI={undefined} />
    </RuntimeProvider>
  ),
};
