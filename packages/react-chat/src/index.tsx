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
// import { ChatWindow } from './views';

const LazyEntrypoint = lazy(async () => {
  const { Entrypoint } = await import('./entrypoints');

  return { default: Entrypoint };
});

let root;
function stringifyWithoutCycles(obj) {
  const seenObjects = new Set();

  function detect(obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.has(obj)) {
        return '[Cyclic Reference]';
      }

      seenObjects.add(obj);

      const result = Array.isArray(obj) ? [] : {};

      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];
          if (typeof value === 'object') {
            result[key] = detect(value);
            if (result[key] === '[Cyclic Reference]') {
              return result;
            }
          } else {
            result[key] = value;
          }
        }
      }

      return result;
    }

    return obj;
  }

  const result = detect(obj);
  return JSON.stringify(result, null, 2);
}

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
        console.log('Before rendering', stringifyWithoutCycles(shadowRoot));

        root.render(<LazyEntrypoint config={config} assistant={assistant} shadowRoot={shadowRoot} resolve={resolve} />);
      });
    }
  },

  destroy: () => root.render(null),
};
