import { lazy } from 'react';
import { createRoot, Root } from 'react-dom/client';

import { ChatConfig, RenderMode } from '@/common/types';
import { initStitches } from '@/styles/theme';
import { mergeAssistant } from '@/utils/assistant';
import { sanitizeConfig } from '@/utils/config';
import { noop } from '@/utils/functional';

const LazyEntrypoint = lazy(async () => {
  const { Entrypoint } = await import('./entrypoints');

  return { default: Entrypoint };
});

let root;

const createChatRoot = (config: any): { shadowRoot: ShadowRoot; root: Root } => {
  const VOICEFLOW_ID = 'voiceflow-chat';

  let shadowRoot;

  if (config.render?.mode === RenderMode.EMBEDDED) {
    shadowRoot = config.render!.target!.attachShadow({ mode: 'open' });
    root = createRoot(shadowRoot);
    initStitches(shadowRoot);
  } else {
    const rootEl = document.createElement('div');
    rootEl.id = VOICEFLOW_ID;
    document.body.appendChild(rootEl);

    shadowRoot = rootEl.attachShadow({ mode: 'open' });
    root = createRoot(shadowRoot);
    initStitches(shadowRoot);
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

    const { shadowRoot, root: chatRoot } = createChatRoot(config);

    // set root here
    await new Promise<void>((resolve) => {
      chatRoot.render(<LazyEntrypoint config={config} assistant={assistant} shadowRoot={shadowRoot} resolve={resolve} />);
    });
  },

  destroy: () => root.render(null),
};
