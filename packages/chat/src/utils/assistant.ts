import type {
  WidgetSettings,
  WidgetSettingsChatSettings,
  WidgetSettingsChatSettingsDTO,
  WidgetSettingsCommonSettings,
  WidgetSettingsCommonSettingsDTO,
  WidgetSettingsVoiceSettings,
  WidgetSettingsVoiceSettingsDTO,
} from '@voiceflow/dtos-interact';
import { WidgetSettingsDTO } from '@voiceflow/dtos-interact';
import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import type { PartialDeep } from 'type-fest';
import type { z } from 'zod';

import type { ChatConfig } from '@/dtos/ChatConfig.dto';

export type RawWidgetSettings = z.input<typeof WidgetSettingsDTO>;
type RawWidgetSettingsChatSettings = z.input<typeof WidgetSettingsChatSettingsDTO>;
type RawWidgetSettingsVoiceSettings = z.input<typeof WidgetSettingsVoiceSettingsDTO>;
type RawWidgetSettingsCommonSettings = z.input<typeof WidgetSettingsCommonSettingsDTO>;

export const mergeAssistantOptions = async (
  config: ChatConfig,
  overrides?: RawWidgetSettings
): Promise<WidgetSettings> => {
  const { versionID } = config;

  // fetch remote publishing config
  const runtime = new VoiceflowRuntime(config);

  const publishing = await runtime
    .getPublishing<WidgetSettings>({ ...(versionID && { versionID }), chatVersion: 2 })
    .catch((error) => {
      console.error(error);
      return null;
    });

  if (!publishing) return WidgetSettingsDTO.parse({});

  return WidgetSettingsDTO.parse({
    type: overrides?.type ?? publishing.type,
    chat: mergeChatSettings(publishing.chat, overrides?.chat),
    voice: mergeVoiceSettings(publishing.voice, overrides?.voice),
    common: mergeCommonSettings(publishing.common, overrides?.common),

    // TODO: Make sure 'extensions' are added
  });
};

const mergeChatSettings = (
  publishedSettings: PartialDeep<WidgetSettingsChatSettings>,
  overrides?: RawWidgetSettingsChatSettings
) => {
  // TODO: Define default agent image
  const DEFAULT_AGENT_IMAGE = '...';
  return {
    ...publishedSettings,
    ...overrides,
    headerImage: { ...publishedSettings.headerImage, ...overrides?.headerImage },
    agentImage: {
      enabled: overrides?.agentImage?.enabled ?? publishedSettings.agentImage?.enabled,
      url: overrides?.agentImage?.url ?? publishedSettings.agentImage?.url ?? DEFAULT_AGENT_IMAGE,
    },
    banner: { ...publishedSettings.banner, ...overrides?.banner },
    aiDisclaimer: { ...publishedSettings.aiDisclaimer, ...overrides?.aiDisclaimer },
  };
};

const mergeVoiceSettings = (
  publishedSettings: PartialDeep<WidgetSettingsVoiceSettings>,
  overrides?: RawWidgetSettingsVoiceSettings
) => {
  return {
    renderMode: overrides?.renderMode ?? publishedSettings.renderMode,
    content: {
      ...publishedSettings.content,
      ...overrides?.content,
    },
  };
};

const mergeCommonSettings = (
  publishedSettings: PartialDeep<WidgetSettingsCommonSettings>,
  overrides?: RawWidgetSettingsCommonSettings
) => {
  return {
    ...publishedSettings,
    ...overrides,
    launcher: { ...publishedSettings.launcher, ...overrides?.launcher },
    footerLink: { ...publishedSettings.footerLink, ...overrides?.footerLink },
    // This can't be overridden by local configuration
    poweredBy: publishedSettings.poweredBy,
  };
};
