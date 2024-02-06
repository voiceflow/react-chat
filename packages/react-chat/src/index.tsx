import { lazy } from 'react';
import { createRoot } from 'react-dom/client';

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

window.voiceflow ??= {};
window.voiceflow.chat ??= {
  open: noop,
  hide: noop,
  show: noop,
  close: noop,
  interact: noop,

  load: async (loadConfig: Partial<ChatConfig>) => {
    const config = sanitizeConfig(loadConfig);
    // extract config here from sanitize config
    const assistant = await mergeAssistant(config);

    if (config.render?.mode === RenderMode.EMBEDDED) {
      const shadowRoot = config.render!.target!.attachShadow({ mode: 'open' });
      root = createRoot(shadowRoot);
      initStitches(shadowRoot);

      // set root here
      await new Promise<void>((resolve) => {
        root.render(<LazyEntrypoint config={config} assistant={assistant} shadowRoot={shadowRoot} resolve={resolve} />);
      });
    } else {
      const VOICEFLOW_ID = 'voiceflow-chat';

      const rootEl = document.createElement('div');
      rootEl.id = VOICEFLOW_ID;

      document.body.appendChild(rootEl);
      const shadowRoot = rootEl.attachShadow({ mode: 'open' });
      console.log('shadowRoot', shadowRoot);

      root = createRoot(shadowRoot);
      initStitches(shadowRoot);

      // set root here
      await new Promise<void>((resolve) => {
        root.render(<LazyEntrypoint config={config} assistant={assistant} shadowRoot={shadowRoot} resolve={resolve} />);
      });
    }
  },

  destroy: () => root.render(null),
};
