import { ChatConfig, RenderMode } from '../common/types';
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
//  ChatConfig['render']

const sanitizeRenderOptions = (renderOptions: any): Partial<ChatConfig['render']> => {
  if (!isObject(renderOptions)) {
    // TODO revisit this default
    return { mode: RenderMode.BUBBLE };
  }
  const { mode, target } = renderOptions;
  // TODO check for valid target, if none - default to document.getElementById('voiceflow-chat-frame')
  if (Object.values(RenderMode).includes(mode) && target instanceof HTMLElement) {
    return { mode, target };
  }
  return { mode: RenderMode.BUBBLE };
};

export const sanitizeConfig = (config: unknown): Partial<ChatConfig> & Pick<ChatConfig, 'verify' | 'url'> => {
  const ref = isObject(config) ? config : {};
  const { url, user, userID, versionID, verify, assistant, launch, allowDangerousHTML, render } = ref;

  if (!validateVerify(verify)) {
    throw new Error('no projectID on load');
  }
  // TODO consult w Ben on what sanitization is needed for `render` options

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
    ...{ render: sanitizeRenderOptions(render as ChatConfig['render']) as any },
    ...(isObject(assistant) && ({ assistant } as Partial<Pick<ChatConfig, 'assistant'>>)),
    ...(isObject(launch) && ({ launch } as Pick<ChatConfig, 'launch'>)),

    // default to true during migration period, turn off later
    ...(typeof allowDangerousHTML === 'boolean' ? { allowDangerousHTML } : { allowDangerousHTML: true }),
  };
};
