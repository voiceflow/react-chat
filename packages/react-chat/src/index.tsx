import { createRoot, Root } from 'react-dom/client';

import { ChatConfig, RenderMode } from '@/common/types';
import { initStitches } from '@/styles/theme';
import { mergeAssistant } from '@/utils/assistant';
import { sanitizeConfig } from '@/utils/config';
import { noop } from '@/utils/functional';

import { RuntimeProvider } from './contexts/RuntimeContext/index';

let root;

const initBubbleMode = () => {
  const VOICEFLOW_ID = 'voiceflow-chat';
  const rootEl = document.createElement('div');
  rootEl.id = VOICEFLOW_ID;
  document.body.appendChild(rootEl);

  const shadowRoot = rootEl.attachShadow({ mode: 'open' });
  root = createRoot(shadowRoot);
  initStitches(shadowRoot);
  return { shadowRoot, root };
};

const createChatRoot = (config: any): { shadowRoot: ShadowRoot; root: Root } => {
  let shadowRoot;

  if (config.render?.mode === RenderMode.EMBEDDED) {
    try {
      shadowRoot = config.render!.target!.attachShadow({ mode: 'open' });
      root = createRoot(shadowRoot);

      initStitches(shadowRoot);
    } catch (e) {
      console.error(`${e}. \nTarget: ${config.render!.target}`);
    }
  } else {
    const { root: bubbleRoot, shadowRoot: bubbleShadowRoot } = initBubbleMode();
    root = bubbleRoot;
    shadowRoot = bubbleShadowRoot;
  }

  return { shadowRoot, root };
};

(() => {
  window.voiceflow ??= {};
  window.voiceflow.chat ??= {
    open: noop,
    hide: noop,
    show: noop,
    close: noop,
    interact: noop,

    load: async (loadConfig: Partial<ChatConfig>) => {
      const config = sanitizeConfig(loadConfig);
      const { shadowRoot, root: chatRoot } = createChatRoot(config);
      const assistant = await mergeAssistant(config);

      const { default: View } = await (config.render?.mode === RenderMode.EMBEDDED
        ? import('@/views/ChatWindow/ChatWindowStandaloneView')
        : import('@/views/ChatWidget'));

      await new Promise<void>((resolve) => {
        chatRoot.render(
          <RuntimeProvider assistant={assistant} config={config} shadowRoot={shadowRoot}>
            <View chatAPI={window.voiceflow!.chat} ready={resolve} />
          </RuntimeProvider>
        );
      });
    },

    destroy: () => root.render(null),
  };
})();
