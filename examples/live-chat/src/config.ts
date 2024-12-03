import { ChatConfig } from '@voiceflow/react-chat';
import type { ChatWidgetSettings } from '@voiceflow/react-chat/build/types';

const IMAGE = 'https://picsum.photos/seed/1/200/300';
const AVATAR = 'https://picsum.photos/seed/1/80/80';

export const ASSISTANT: ChatWidgetSettings = {
  type: 'chat',
  chat: {
    voiceOutput: true,
    voiceInput: true,
    renderMode: 'widget',
    headerImage: { enabled: true, url: IMAGE },
    agentImage: { enabled: true, url: AVATAR },
    banner: { enabled: true, title: 'Your AI Agent', description: 'How can I help you today?' },
    placeholderText: 'Type a message...',
    aiDisclaimer: { enabled: true, text: 'This is AI!!!' },
  },
  voice: {
    renderMode: 'compact',
    content: {
      callToActionText: 'How can I help you?',
      startButtonText: 'Start a call',
      listeningText: 'Listening',
      talkingText: 'Talk to interrupt',
      endButtonText: 'End',
    },
  },
  common: {
    fontFamily: 'UCity Pro',
    launcher: { type: 'icon' },
    poweredBy: true,
    footerLink: { enabled: true, text: 'Privacy', url: 'https://voiceflow.com' },
    position: 'right',
    sideSpacing: '30px',
    bottomSpacing: '30px',
    primaryColor: {
      color: 'blue',
      palette: { 50: '', 100: '', 200: '', 300: '', 400: '', 500: '', 600: '', 700: '', 800: '', 900: '' },
    },
    persistence: 'LOCAL_STORAGE',
  },

  stylesheet: '',
  extensions: [],
};

export const CONFIG = ChatConfig.parse({
  verify: { projectID: import.meta.env.VF_PROJECT_ID },
});
