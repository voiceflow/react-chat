import { VoiceflowRuntime } from '@voiceflow/sdk-runtime';

import { ChatConfig, isObject, RUNTIME_URL } from '@/common';

export const WIDGET_URL = import.meta.env.VITE_WIDGET_URL;

const DEFAULT_ASSISTANT = {
  name: 'Voiceflow Assistant',
  description: '',
  image: 'https://avatars.githubusercontent.com/u/44123967',
  color: '#3D82E2',
};

const validateVerify = (verify: unknown): verify is ChatConfig['verify'] => {
  return isObject(verify) && typeof verify.projectID === 'string';
};

const sanitizeConfig = (config: unknown): Partial<ChatConfig> & Pick<ChatConfig, 'verify'> => {
  const ref = isObject(config) ? config : {};
  const { url, userID, versionID, verify } = ref;

  if (!validateVerify(verify)) {
    throw new Error('no projectID on load');
  }

  return {
    verify,
    ...(typeof url === 'string' && { url }),
    ...(typeof userID === 'string' && { userID }),
    ...(typeof versionID === 'string' && { versionID }),
  };
};

const sanitizeAssistant = (assistant: unknown): Partial<ChatConfig['assistant']> => {
  const ref = isObject(assistant) ? assistant : {};
  const { name, description, image, color } = ref;

  return {
    ...(typeof name === 'string' && { name }),
    ...(typeof image === 'string' && { image }),
    ...(typeof color === 'string' && { color }),
    ...(typeof description === 'string' && { description }),
  };
};

export const fetchConfig = async (unknownConfig: Partial<ChatConfig>): Promise<ChatConfig> => {
  const config = sanitizeConfig(unknownConfig);

  const { url = RUNTIME_URL, versionID } = config;

  // fetch remote publishing config
  const runtime = new VoiceflowRuntime({ ...config, url });
  const publishing = await runtime.getPublishing({ ...(versionID && { versionID }) }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  });

  return {
    ...config,
    assistant: {
      ...DEFAULT_ASSISTANT,
      ...sanitizeAssistant(publishing),
      ...sanitizeAssistant(config.assistant),
    },
  };
};
