import { lazy } from 'react';
import { createRoot } from 'react-dom/client';

import { ChatConfig, RenderMode } from '@/common';
// import { RuntimeProvider } from '@/contexts';
import { mergeAssistant } from '@/utils/assistant';
import { sanitizeConfig } from '@/utils/config';
import { noop } from '@/utils/functional';

// import ChatWidget from '@/views/ChatWidget';
// import { Entrypoint } from './entrypoints';
import { initGlobals } from './globals';
import { RuntimeProvider } from './contexts';
// import { ChatWindow } from './views';

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
    console.log('config', config);
    if (config.render?.mode === RenderMode.EMBEDDED) {
      const shadowRoot = config.render!.target!.attachShadow({ mode: 'open' });
      root = createRoot(shadowRoot);
      initGlobals(shadowRoot);

      // set root here
      await new Promise<void>((resolve) => {
        root.render(<LazyEntrypoint config={config} assistant={assistant} shadowRoot={shadowRoot} resolve={resolve} />);
      });
    } else {
      console.log('in bubble');
      const VOICEFLOW_ID = 'voiceflow-chat';

      const rootEl = document.createElement('div');
      rootEl.id = VOICEFLOW_ID;

      document.body.appendChild(rootEl);
      const shadowRoot = rootEl.attachShadow({ mode: 'open' });
      root = createRoot(shadowRoot);
      initGlobals(shadowRoot);

      // set root here
      await new Promise<void>((resolve) => {
        root.render(<LazyEntrypoint config={config} assistant={assistant} shadowRoot={shadowRoot} resolve={resolve} />);
      });
    }
    // // set root here
    // await new Promise<void>((resolve) => {
    //   root.render(
    //     <RuntimeProvider assistant={assistant} config={config}>
    //       {config.render?.mode === RenderMode.EMBEDDED && <ChatWindow />}
    //       {config.render?.mode === RenderMode.BUBBLE && <ChatWidget chatAPI={window.voiceflow!.chat} ready={resolve} />}
    //     </RuntimeProvider>
    //   );
    // });
  },

  destroy: () => root.render(null),
};
