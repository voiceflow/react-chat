import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import type { PartialDeep } from 'type-fest';

import type { RawAssistantOptions } from '@/dtos/AssistantOptions.dto';
import { AssistantOptions } from '@/dtos/AssistantOptions.dto';
import type { ChatConfig } from '@/dtos/ChatConfig.dto';

export const mergeAssistantOptions = async (
  config: ChatConfig,
  overrides: RawAssistantOptions
): Promise<AssistantOptions> => {
  const { versionID } = config;

  // fetch remote publishing config
  const runtime = new VoiceflowRuntime(config);

  const publishing = await runtime
    .getPublishing({ ...(versionID && { versionID }) })
    .then((x) => x as PartialDeep<AssistantOptions>)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return AssistantOptions.parse({
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
  });
};
