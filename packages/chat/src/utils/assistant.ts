import type { WidgetSettings } from '@voiceflow/dtos-interact';
import { WIDGET_SETTINGS_DEFAULT_SETTINGS, WidgetSettingsChatRenderMode } from '@voiceflow/dtos-interact';
import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import { ChatPersistence } from '@voiceflow/voiceflow-types/build/cjs/version';

import type { ChatConfig } from '@/dtos/ChatConfig.dto';
import type { WidgetOverrides } from '@/dtos/WidgetOverrides.dto';
import { createPalette, DEFAULT_PRIMARY } from '@/styles/colors';
import type { ChatWidgetSettings } from '@/types/settings';

export const mergeAssistantOptions = async (
  config: ChatConfig, // general chat configurations
  overrides?: WidgetOverrides // user's snippet assistant configurations to override
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

  if (!publishing)
    return {
      ...WIDGET_SETTINGS_DEFAULT_SETTINGS,
      stylesheet: overrides?.stylesheet ?? '',
      extensions: overrides?.extensions ?? [],
    };

  return {
    type: overrides?.type ?? publishing?.type ?? 'chat',
    chat: mergeChatSettings(publishing, overrides),
    voice: mergeVoiceSettings(publishing, overrides),
    common: mergeCommonSettings(publishing, overrides),

    stylesheet: overrides?.stylesheet ?? '',
    extensions: overrides?.extensions ?? [],
  };
};

const mergeChatSettings = (publishedSettings: WidgetSettings, overrides?: WidgetOverrides) => {
  return {
    // TODO: Not implemented yet
    voiceInput: false,
    voiceOutput: false,

    renderMode: overrides?.renderMode ?? publishedSettings?.chat?.renderMode ?? WidgetSettingsChatRenderMode.WIDGET,
    headerImage: {
      enabled: overrides?.header.hideImage ? false : (publishedSettings?.chat?.headerImage?.enabled ?? true),
      url: overrides?.header.imageUrl ?? publishedSettings?.chat?.headerImage?.url,
    },
    agentImage: {
      enabled: overrides?.avatar.hide ?? publishedSettings?.chat?.agentImage?.enabled ?? true,
      url: overrides?.avatar.imageUrl ?? publishedSettings?.chat?.agentImage?.url,
    },
    banner: {
      title: overrides?.banner.title ?? publishedSettings?.chat?.banner?.title ?? '',
      description: overrides?.banner.description ?? publishedSettings?.chat?.banner?.description ?? '',
      enabled: overrides?.banner.hide ? false : (publishedSettings?.chat?.banner?.enabled ?? true),
      imageURL: overrides?.banner.imageUrl ?? publishedSettings?.chat?.banner?.imageURL,
    },
    placeholderText: overrides?.inputPlaceholder ?? publishedSettings?.chat?.placeholderText ?? '',
    aiDisclaimer: {
      text: overrides?.aiDisclaimer.text ?? publishedSettings?.chat?.aiDisclaimer?.text ?? '',
      enabled: overrides?.aiDisclaimer.hide ? false : (publishedSettings?.chat?.aiDisclaimer?.enabled ?? true),
    },

    // TODO: This isn't implemented yet in the chat
    handoffToAgentImageURL: publishedSettings?.chat?.handoffToAgentImageURL,
  };
};

const mergeVoiceSettings = (publishedSettings: WidgetSettings, overrides?: WidgetOverrides) => {
  // TODO: fix this
  return {
    renderMode: publishedSettings?.voice?.renderMode ?? 'compact',
    content: {
      ...publishedSettings?.voice?.content,
    },
  };
};

const mergeCommonSettings = (publishedSettings: WidgetSettings, overrides?: WidgetOverrides) => {
  const color = overrides?.color ?? publishedSettings?.common?.primaryColor?.color ?? DEFAULT_PRIMARY;
  const palette = overrides?.palette ?? publishedSettings.common?.primaryColor?.palette ?? createPalette(color);

  return {
    sideSpacing: overrides?.spacing.side ?? publishedSettings?.common?.sideSpacing ?? '30px',
    bottomSpacing: overrides?.spacing.bottom ?? publishedSettings?.common?.bottomSpacing ?? '30px',
    position: overrides?.side ?? publishedSettings?.common?.position ?? 'right',
    fontFamily: overrides?.fontFamily ?? publishedSettings?.common?.fontFamily ?? '',
    primaryColor: { color, palette },
    poweredBy: publishedSettings?.common?.poweredBy, // This can't be overriden by user!
    launcher: {
      type: overrides?.launcher.type ?? publishedSettings?.common?.launcher?.type ?? 'icon',
      text: overrides?.launcher.label ?? publishedSettings?.common?.launcher?.text,
      imageURL: overrides?.launcher.imageUrl ?? publishedSettings?.common?.launcher?.imageURL,
    },
    footerLink: {
      enabled: overrides?.footer.hide ? false : (publishedSettings?.common?.footerLink?.enabled ?? false),
      text: overrides?.footer.linkText && publishedSettings?.common?.footerLink?.text,
      url: overrides?.footer.linkUrl && publishedSettings?.common?.footerLink?.url,
    },
    persistence: overrides?.persistence ?? publishedSettings?.common?.persistence ?? ChatPersistence.LOCAL_STORAGE,
  };
};
