import { ChatConfig } from '../common/types';
import { isObject } from '../common/utils';

export const RUNTIME_URL = 'https://general-runtime.voiceflow.com';

const validateVerify = (verify: unknown): verify is ChatConfig['verify'] => {
  return isObject(verify) && typeof verify.projectID === 'string';
};

const tryDecodeURIComponent = (str: string) => {
  try {
    return decodeURIComponent(str);
  } catch {
    return str;
  }
};

export const sanitizeConfig = (config: unknown): Partial<ChatConfig> & Pick<ChatConfig, 'verify' | 'url'> => {
  const ref = isObject(config) ? config : {};
  const { url, user, userID, versionID, verify, assistant, launch, allowDangerousHTML } = ref;

  if (!validateVerify(verify)) {
    throw new Error('no projectID on load');
  }

  return {
    verify,
    url: typeof url === 'string' ? url : RUNTIME_URL,
    // decodeURIComponent incase the userID is already encodeURIComponent'd
    ...(typeof userID === 'string' && { userID: tryDecodeURIComponent(userID) }),
    ...(typeof userID === 'number' && { userID: userID.toString() }),
    ...(typeof versionID === 'string' && { versionID }),
    ...(isObject(user) && {
      user: {
        ...(typeof user.name === 'string' && { name: user.name }),
        ...(typeof user.image === 'string' && { image: user.image }),
      },
    }),
    ...(isObject(assistant) && ({ assistant } as Partial<Pick<ChatConfig, 'assistant'>>)),
    ...(isObject(launch) && ({ launch } as Pick<ChatConfig, 'launch'>)),

    // default to true during migration period, turn off later
    ...(typeof allowDangerousHTML === 'boolean' ? { allowDangerousHTML } : { allowDangerousHTML: true }),
  };
};
