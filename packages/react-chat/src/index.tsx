import { createRoot } from 'react-dom/client';

import { ChatConfig, RenderMode } from '@/common';
import { RuntimeProvider } from '@/contexts';
import { mergeAssistant } from '@/utils/assistant';
import { sanitizeConfig } from '@/utils/config';
import { noop } from '@/utils/functional';
import ChatWidget from '@/views/ChatWidget';

import { ChatWindow } from './views';

let root;
function stringifyWithoutCycles(obj) {
  var seenObjects = new Set();

  function detect(obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.has(obj)) {
        return '[Cyclic Reference]';
      }

      seenObjects.add(obj);

      var result = Array.isArray(obj) ? [] : {};

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var value = obj[key];
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

  var result = detect(obj);
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

      // set root here
      await new Promise<void>((resolve) => {
        root.render(
          <RuntimeProvider assistant={assistant} config={config} shadowRoot={shadowRoot}>
            {config.render?.mode === RenderMode.EMBEDDED && <ChatWindow />}
            {config.render?.mode === RenderMode.BUBBLE && <ChatWidget chatAPI={window.voiceflow!.chat} ready={resolve} />}
          </RuntimeProvider>
        );
      });
    } else {
      console.log('in bubble');
      const VOICEFLOW_ID = 'voiceflow-chat';

      const rootEl = document.createElement('div');
      rootEl.id = VOICEFLOW_ID;

      document.body.appendChild(rootEl);
      const shadowRoot = rootEl.attachShadow({ mode: 'open' });
      root = createRoot(shadowRoot);

      // set root here
      await new Promise<void>((resolve) => {
        console.log('Before rendering', stringifyWithoutCycles(shadowRoot));

        root.render(
          <RuntimeProvider assistant={assistant} config={config} shadowRoot={shadowRoot}>
            {config.render?.mode === RenderMode.EMBEDDED && <ChatWindow />}
            {config.render?.mode === RenderMode.BUBBLE && <ChatWidget chatAPI={window.voiceflow!.chat} ready={resolve} />}
          </RuntimeProvider>
        );
      });
    }
  },

  destroy: () => root.render(null),
};
