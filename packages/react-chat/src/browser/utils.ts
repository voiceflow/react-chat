/* eslint-disable no-console */
import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';

import { Assistant, ChatConfig, isObject } from '@/common';
import { RUNTIME_URL } from '@/constants';

const DEFAULT_ASSISTANT = {
  title: 'Voiceflow Assistant',
  image: 'https://avatars.githubusercontent.com/u/44123967',
  color: '#3D82E2',
  description: '',
};

const sanitizeAssistant = (assistant: unknown): Partial<ChatConfig['assistant']> => {
  const ref = isObject(assistant) ? assistant : {};
  const { title, description, image, color } = ref;

  return {
    ...(typeof title === 'string' && { title }),
    ...(typeof image === 'string' && { image }),
    ...(typeof color === 'string' && { color }),
    ...(typeof description === 'string' && { description }),
  };
};

export const fetchAssistant = async (config: ChatConfig): Promise<Assistant> => {
  const { url = RUNTIME_URL, versionID } = config;

  // fetch remote publishing config
  const runtime = new VoiceflowRuntime({ ...config, url });
  const publishing = await runtime.getPublishing({ ...(versionID && { versionID }) }).catch((error) => {
    console.error(error);
    return null;
  });

  return {
    ...DEFAULT_ASSISTANT,
    ...sanitizeAssistant(publishing),
    ...sanitizeAssistant(config.assistant),
  };
};
