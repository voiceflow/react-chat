import { createRoot } from 'react-dom/client';

import { ChatConfig, RenderMode } from '@/common';
import { RuntimeProvider } from '@/contexts';
import { mergeAssistant } from '@/utils/assistant';
import { sanitizeConfig } from '@/utils/config';
import { noop } from '@/utils/functional';
import ChatWidget from '@/views/ChatWidget';

import { shadowRoot } from './shadow';
import { ChatWindow } from './views';

let root = createRoot(shadowRoot);

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
      const { target } = config.render;
      root = createRoot(target!.attachShadow({ mode: 'open' }));
    }
    // set root here
    await new Promise<void>((resolve) => {
      root.render(
        <RuntimeProvider assistant={assistant} config={config}>
          {config.render?.mode === RenderMode.EMBEDDED && <ChatWindow />}
          {config.render?.mode === RenderMode.BUBBLE && <ChatWidget chatAPI={window.voiceflow!.chat} ready={resolve} />}
        </RuntimeProvider>
      );
    });
  },

  destroy: () => root.render(null),
};
