import {
  WIDGET_SETTINGS_DEFAULT_PALETTE,
  type WidgetSettings,
  WidgetSettingsChatRenderMode,
  WidgetSettingsLauncherType,
  WidgetSettingsVoiceRenderMode,
  WidgetSettingsWidgetPosition,
  WidgetSettingsWidgetType,
} from '@voiceflow/dtos-interact';

export const WIDGET_SETTINGS_DEFAULT_SETTINGS: WidgetSettings = {
  type: WidgetSettingsWidgetType.CHAT,

  chat: {
    voiceInput: true,
    voiceOutput: true,

    renderMode: WidgetSettingsChatRenderMode.WIDGET,

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
  voice: {
    renderMode: WidgetSettingsVoiceRenderMode.FULL,
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
    launcher: {
      text: 'Your text',
      type: WidgetSettingsLauncherType.ICON,
    },
    poweredBy: true,
    footerLink: {
      enabled: true,
      text: 'Privacy',
    },
    position: WidgetSettingsWidgetPosition.RIGHT,
    sideSpacing: '20',
    bottomSpacing: '20',
    primaryColor: WIDGET_SETTINGS_DEFAULT_PALETTE,
  },
};
