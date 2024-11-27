import { type WidgetSettings, WidgetSettingsChatSettingsDTO, WidgetSettingsDTO } from '@voiceflow/dtos-interact';
import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import type { PartialDeep } from 'type-fest';
import type { z } from 'zod';

import type { ChatConfig } from '@/dtos/ChatConfig.dto';

type RawWidgetSettings = z.input<typeof WidgetSettingsDTO>;

export const mergeAssistantOptions = async (
  config: ChatConfig,
  overrides: RawWidgetSettings
): Promise<WidgetSettings> => {
  const { versionID } = config;

  // fetch remote publishing config
  const runtime = new VoiceflowRuntime(config);

  const publishing = await runtime
    .getPublishing({ ...(versionID && { versionID }), chatVersion: 2 })
    .then((x) => x as PartialDeep<WidgetSettings>)
    .catch((error) => {
      console.error(error);
      return null;
    });

  const commonSettings = WidgetSettingsChatSettingsDTO.parse({
    ...publishing?.common,
    ...overrides.common,
    // watermark can not be overridden with local config
    poweredBy: publishing?.common?.poweredBy,
  });

  return WidgetSettingsDTO.parse({
    ...publishing,
    ...overrides,
    common: commonSettings,
    // TODO: Make sure 'extensions' are added
  });

  /* return AssistantOptions.parse({
    ...publishing,
    ...overrides,
    // watermark can not be overridden with local config
    watermark: publishing?.watermark,
    feedback: publishing?.feedback,
    spacing: {
      ...publishing?.spacing,
      ...overrides?.spacing,
    },
    extensions: [...(publishing?.extensions ?? []), ...(overrides?.extensions ?? [])],
  }); */
};
