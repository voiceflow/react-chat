import type {
  WidgetSettings,
  WidgetSettingsChatSettings,
  WidgetSettingsCommonSettings,
  WidgetSettingsVoiceSettings,
} from '@voiceflow/dtos-interact';
import {
  WidgetSettingsChatSettingsDTO,
  WidgetSettingsCommonSettingsDTO,
  WidgetSettingsDTO,
  WidgetSettingsVoiceSettingsDTO,
} from '@voiceflow/dtos-interact';
import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import type { PartialDeep } from 'type-fest';

import type { ChatConfig } from '@/dtos/ChatConfig.dto';
import type {
  ChatWidgetSettings,
  RawWidgetSettingsChatSettings,
  RawWidgetSettingsCommonSettings,
  RawWidgetSettingsVoiceSettings,
} from '@/types/settings';

export const mergeAssistantOptions = async (
  config: ChatConfig,
  overrides?: ChatWidgetSettings
): Promise<ChatWidgetSettings> => {
  const { versionID } = config;

  // fetch remote publishing config
  const runtime = new VoiceflowRuntime(config);
  const publishing = await runtime
    // chatVersion: 2 - will return the new WidgetSettings object
    .getPublishing<WidgetSettings>({ ...(versionID && { versionID }), chatVersion: 2 })
    .catch((error: any) => {
      console.error(error);
      return null;
    });

  // TODO: make sure we get some default object, or define it here
  if (!publishing) return { ...WidgetSettingsDTO.parse({}), stylesheet: '', extensions: [] };

  return {
    type: overrides?.type ?? publishing.type,
    chat: mergeChatSettings(publishing.chat, overrides?.chat),
    voice: mergeVoiceSettings(publishing.voice, overrides?.voice),
    common: mergeCommonSettings(publishing.common, overrides?.common),

    stylesheet: overrides?.stylesheet ?? '',
    extensions: overrides?.extensions ?? [],
  };
};

const mergeChatSettings = (
  publishedSettings: PartialDeep<WidgetSettingsChatSettings>,
  overrides?: RawWidgetSettingsChatSettings
) => {
  return WidgetSettingsChatSettingsDTO.parse({
    ...publishedSettings,
    ...overrides,
    headerImage: { ...publishedSettings.headerImage, ...overrides?.headerImage },
    agentImage: {
      enabled: overrides?.agentImage?.enabled ?? publishedSettings.agentImage?.enabled,
      url: overrides?.agentImage?.url ?? publishedSettings.agentImage?.url,
    },
    banner: { ...publishedSettings.banner, ...overrides?.banner },
    aiDisclaimer: { ...publishedSettings.aiDisclaimer, ...overrides?.aiDisclaimer },
  });
};

const mergeVoiceSettings = (
  publishedSettings: PartialDeep<WidgetSettingsVoiceSettings>,
  overrides?: RawWidgetSettingsVoiceSettings
) => {
  return WidgetSettingsVoiceSettingsDTO.parse({
    renderMode: overrides?.renderMode ?? publishedSettings.renderMode,
    content: {
      ...publishedSettings.content,
      ...overrides?.content,
    },
  });
};

const mergeCommonSettings = (
  publishedSettings: PartialDeep<WidgetSettingsCommonSettings>,
  overrides?: RawWidgetSettingsCommonSettings
) => {
  return WidgetSettingsCommonSettingsDTO.parse({
    ...publishedSettings,
    ...overrides,
    launcher: { ...publishedSettings.launcher, ...overrides?.launcher },
    footerLink: { ...publishedSettings.footerLink, ...overrides?.footerLink },

    // This can't be overridden by local configuration
    poweredBy: publishedSettings.poweredBy,
  });
};
