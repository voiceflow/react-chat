import { ChatConfig, isObject } from '@voiceflow/react-chat';

export const WIDGET_URL = process.env.VITE_WIDGET_URL;

const validateVerify = (verify: unknown): verify is ChatConfig['verify'] => {
  return isObject(verify) && typeof verify.projectID === 'string';
};

export const sanitizeConfig = (config: unknown): Partial<ChatConfig> & Pick<ChatConfig, 'verify'> => {
  const ref = isObject(config) ? config : {};
  const { url, user, userID, versionID, verify, assistant } = ref;

  if (!validateVerify(verify)) {
    throw new Error('no projectID on load');
  }

  return {
    verify,
    ...(typeof url === 'string' && { url }),
    ...(typeof userID === 'string' && { userID }),
    ...(typeof userID === 'number' && { userID: userID.toString() }),
    ...(typeof versionID === 'string' && { versionID }),
    ...(isObject(user) && {
      user: {
        ...(typeof user.name === 'string' && { name: user.name }),
        ...(typeof user.image === 'string' && { image: user.image }),
      },
    }),
    ...(isObject(assistant) && ({ assistant } as Partial<Pick<ChatConfig, 'assistant'>>)),
  };
};
