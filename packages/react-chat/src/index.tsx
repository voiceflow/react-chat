import { createRoot, Root } from 'react-dom/client';

import { ChatConfig, RenderMode } from '@/common/types';
import { stitches } from '@/styles/theme';
import { mergeAssistant } from '@/utils/assistant';
import { sanitizeConfig } from '@/utils/config';

import { RuntimeProvider } from './contexts';
import { createPlaceholderMethods } from './utils/chat';
import { ChatWidget, ChatWindowStandaloneView } from './views';

let reactRoot: Root;

const initBubbleMode = () => {
  const VOICEFLOW_ID = 'voiceflow-chat';
  const rootEl = document.createElement('div');
  rootEl.id = VOICEFLOW_ID;
  document.body.appendChild(rootEl);

  const shadowRoot = rootEl.attachShadow({ mode: 'open' });
  reactRoot = createRoot(shadowRoot);
  stitches.transplant(shadowRoot);

  return { shadowRoot, reactRoot };
};

const initEmbeddedMode = (rootEl: HTMLElement) => {
  try {
    const shadowRoot = rootEl.attachShadow({ mode: 'open' });
    reactRoot = createRoot(shadowRoot);
    stitches.transplant(shadowRoot);

    return { shadowRoot, reactRoot };
  } catch (e) {
    console.error(`${e}. \nTarget: ${rootEl}`);
    return null;
  }
};

const createChatRoot = (config: ChatConfig) => {
  if (config.render?.mode === RenderMode.EMBEDDED) {
    return initEmbeddedMode(config.render.target!);
  }

  return initBubbleMode();
};

const methods = createPlaceholderMethods((method: string) => `Method '${method}' will have no effect until 'load' has been called.`);

window.voiceflow ??= {};
window.voiceflow.chat ??= {
  ...methods,
  proactive: { ...methods.proactive },

  load: async (loadConfig: Partial<ChatConfig>) => {
    const config = sanitizeConfig(loadConfig);
    const assistant = await mergeAssistant(config);

    const chatRoot = createChatRoot(config);
    if (!chatRoot) return;

    // set root here
    await new Promise<void>((resolve) => {
      chatRoot.reactRoot.render(
        <RuntimeProvider assistant={assistant} config={config} shadowRoot={chatRoot.shadowRoot}>
          {config.render?.mode === RenderMode.EMBEDDED && <ChatWindowStandaloneView chatAPI={window.voiceflow!.chat} ready={resolve} />}
          {config.render?.mode === RenderMode.BUBBLE && <ChatWidget chatAPI={window.voiceflow!.chat} ready={resolve} />}
        </RuntimeProvider>
      );
    });
  },

  destroy: () => reactRoot.render(null),
};
