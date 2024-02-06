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

const sanitizeRenderOptions = (renderOptions: any): Partial<ChatConfig['render']> => {
  if (!isObject(renderOptions)) {
    return { mode: RenderMode.BUBBLE };
  }
  const { mode, target } = renderOptions;

  if (mode === RenderMode.EMBEDDED && !target) {
    try {
      const chatFrame = document.getElementById('voiceflow-chat-frame');
      if (chatFrame instanceof HTMLElement) {
        return { mode, target: chatFrame };
      }
    } catch (error) {
      // this is never triggered though. It's a dead code.
      console.error('No target found for embedded mode, defaulting to bubble mode. Please provide a valid target.');
    }
  }

  if (mode && Object.values(RenderMode).includes(mode) && target instanceof HTMLElement) {
    return { mode, target };
  }
  return { mode: RenderMode.BUBBLE };
};

export const getAutostart = (mode: RenderMode, autostart?: boolean) => {
  if (typeof autostart === 'boolean') return { autostart };
  if (mode === RenderMode.EMBEDDED) {
    return { autostart: true };
  }
  return { autostart: false };
};

export const getRenderOptions = (render: Partial<ChatConfig['render']>): ChatConfig['render'] => {
  return sanitizeRenderOptions(render || {}) as ChatConfig['render'];
};

export const sanitizeConfig = (config: unknown): Partial<ChatConfig> & Pick<ChatConfig, 'verify' | 'url'> => {
  const ref = isObject(config) ? config : {};
  const { url, user, userID, versionID, verify, assistant, launch, allowDangerousHTML, render, autostart } = ref;

  if (!validateVerify(verify)) {
    throw new Error('no projectID on load');
  }

  const renderOptions = getRenderOptions(render || { mode: RenderMode.BUBBLE });
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
    render: renderOptions,
    ...(isObject(assistant) && ({ assistant } as Partial<Pick<ChatConfig, 'assistant'>>)),
    ...(isObject(launch) && ({ launch } as Pick<ChatConfig, 'launch'>)),
    ...getAutostart(renderOptions!.mode, autostart as boolean),

    // default to true during migration period, turn off later
    ...(typeof allowDangerousHTML === 'boolean' ? { allowDangerousHTML } : { allowDangerousHTML: true }),
  };
};
