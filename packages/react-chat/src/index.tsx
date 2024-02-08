import { lazy } from 'react';
import { createRoot, Root } from 'react-dom/client';

import { ChatConfig, RenderMode } from '@/common/types';
import { initStitches } from '@/styles/theme';
import { mergeAssistant } from '@/utils/assistant';
import { sanitizeConfig } from '@/utils/config';
import { noop } from '@/utils/functional';

import { RuntimeProvider } from './contexts';

const LazyEntrypoint = lazy(async () => {
  const { Entrypoint } = await import('./entrypoints');

  return { default: Entrypoint };
});

let root;

const initBubbleMode = async () => {
  const VOICEFLOW_ID = 'voiceflow-chat';
  const rootEl = document.createElement('div');
  rootEl.id = VOICEFLOW_ID;
  document.body.appendChild(rootEl);

  const shadowRoot = rootEl.attachShadow({ mode: 'open' });
  root = createRoot(shadowRoot);
  await initStitches(shadowRoot);
  return { shadowRoot, root };
};

const createChatRoot = async (config: any): { shadowRoot: ShadowRoot; root: Root } => {
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
    const { root: bubbleRoot, shadowRoot: bubbleShadowRoot } = await initBubbleMode();
    root = bubbleRoot;
    shadowRoot = bubbleShadowRoot;
  }

  return { shadowRoot, root };
};

window.voiceflow ??= {};
window.voiceflow.chat ??= {
  open: noop,
  hide: noop,
  show: noop,
  close: noop,
  interact: noop,

  load: async (loadConfig: Partial<ChatConfig>) => {
    const config = sanitizeConfig(loadConfig);
    const assistant = await mergeAssistant(config);

    const { shadowRoot, root: chatRoot } = await createChatRoot(config);

    console.log('>>> LOADED File: index BEFORE def view BEFORE THE CRASH', import('@/views/ChatWidget'), '<<');
    // crashes here
    const { default: View } = await (config.render?.mode === RenderMode.EMBEDDED
      ? import('@/views/ChatWindow/ChatWindowStandaloneView')
      : import('@/views/ChatWidget'));

    console.log('>>> LOADED File: index after def view');

    await new Promise<void>((resolve) => {
      chatRoot.render(
        <RuntimeProvider assistant={assistant} config={config} shadowRoot={shadowRoot}>
          <View chatAPI={window.voiceflow!.chat} ready={resolve} />
        </RuntimeProvider>
      );
    });

    // // set root here
    // await new Promise<void>((resolve) => {
    //   chatRoot.render(<LazyEntrypoint config={config} assistant={assistant} shadowRoot={shadowRoot} resolve={resolve} />);
    // });
  },

  destroy: () => root.render(null),
};
