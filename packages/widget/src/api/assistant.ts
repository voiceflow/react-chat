/* eslint-disable no-console */
import { Assistant, ChatConfig, ChatPersistence, ChatPosition, isEnumValue, isObject } from '@voiceflow/react-chat';
import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';
import type { PartialDeep } from 'type-fest';

import { DEFAULT_ASSISTANT, RUNTIME_URL } from './constants';

const sanitizeAssistant = (assistant: unknown): PartialDeep<Assistant> => {
  const ref = isObject(assistant) ? assistant : {};
  const { title, watermark, description, image, launcher, avatar, spacing, color, position, persistence, feedback, stylesheet } = ref;

  return {
    ...(typeof title === 'string' && { title }),
    ...(typeof color === 'string' && { color }),
    ...(typeof image === 'string' && { image }),
    ...(typeof avatar === 'string' && { avatar }),
    ...(typeof launcher === 'string' && { launcher }),
    ...(typeof watermark === 'boolean' && { watermark }),
    ...(typeof feedback === 'boolean' && { feedback }),
    ...(typeof stylesheet === 'string' && { stylesheet }),
    ...(typeof description === 'string' && { description }),
    ...(isEnumValue(position, ChatPosition) && { position }),
    ...(isEnumValue(persistence, ChatPersistence) && { persistence }),
    ...(isObject(spacing) && {
      spacing: {
        ...(typeof spacing?.side === 'number' && { side: spacing.side }),
        ...(typeof spacing?.bottom === 'number' && { bottom: spacing.bottom }),
      },
    }),
  };
};

export const mergeAssistant = async (config: ChatConfig): Promise<Assistant> => {
  const { url = RUNTIME_URL, versionID } = config;

  // fetch remote publishing config
  const runtime = new VoiceflowRuntime({ ...config, url });
  const publishing = await runtime.getPublishing({ ...(versionID && { versionID }) }).catch((error) => {
    console.error(error);
    return null;
  });

  const configAssistant = sanitizeAssistant(config.assistant);
  const publishingAssistant = sanitizeAssistant(publishing);

  return {
    ...DEFAULT_ASSISTANT,
    ...publishingAssistant,
    ...configAssistant,
    watermark: publishingAssistant.watermark ?? DEFAULT_ASSISTANT.watermark, // watermark can not be determined by config
    feedback: publishingAssistant.feedback ?? DEFAULT_ASSISTANT.feedback,
    spacing: {
      ...DEFAULT_ASSISTANT.spacing,
      ...publishingAssistant.spacing,
      ...configAssistant.spacing,
    },
  };
};
