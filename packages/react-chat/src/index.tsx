import { createRoot } from 'react-dom/client';

import { ChatConfig, RenderMode } from '@/common';
import { RuntimeProvider } from '@/contexts';
import { mergeAssistant } from '@/utils/assistant';
import { sanitizeConfig } from '@/utils/config';
import { noop } from '@/utils/functional';
import ChatWidget from '@/views/ChatWidget';

import { ChatWindow } from './views';

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
      console.log('in embedded');
      root = createRoot(config.render!.target!);

      // set root here
      await new Promise<void>((resolve) => {
        root.render(
          <RuntimeProvider assistant={assistant} config={config}>
            {config.render?.mode === RenderMode.EMBEDDED && <ChatWindow />}
            {config.render?.mode === RenderMode.BUBBLE && <ChatWidget chatAPI={window.voiceflow!.chat} ready={resolve} />}
            bobobo
          </RuntimeProvider>
        );
      });
    } else {
      console.log('in bubble');
      const VOICEFLOW_ID = 'voiceflow-chat';

      const rootEl = document.createElement('div');
      rootEl.id = VOICEFLOW_ID;

      document.body.appendChild(rootEl);
      root = createRoot(rootEl);

      // set root here
      await new Promise<void>((resolve) => {
        console.log('Before rendering');

        root.render(
          <RuntimeProvider assistant={assistant} config={config}>
            {config.render?.mode === RenderMode.EMBEDDED && <ChatWindow />}
            {config.render?.mode === RenderMode.BUBBLE && <ChatWidget chatAPI={window.voiceflow!.chat} ready={resolve} />}
            <div id="bobobo">bobobo</div>
          </RuntimeProvider>
        );
      });
    }
  },

  destroy: () => root.render(null),
};
