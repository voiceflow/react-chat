import { ChatConfig, isObject } from '@voiceflow/react-chat';

export const WIDGET_URL = process.env.VITE_WIDGET_URL;

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

export const sanitizeConfig = (config: unknown): Partial<ChatConfig> & Pick<ChatConfig, 'verify'> => {
  const ref = isObject(config) ? config : {};
  const { url, user, userID, versionID, verify, assistant, launch } = ref;

  if (!validateVerify(verify)) {
    throw new Error('no projectID on load');
  }

  return {
    verify,
    ...(typeof url === 'string' && { url }),
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
  };
};