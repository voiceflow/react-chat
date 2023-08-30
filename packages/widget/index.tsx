import type { ChatConfig } from '@voiceflow/react-chat';
import { Listeners, noop, PostMessage } from '@voiceflow/react-chat';
import { createRoot } from 'react-dom/client';

import Widget from './src';
import { sanitizeConfig, WIDGET_URL } from './src/config';

const VOICEFLOW_ID = 'voiceflow-chat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_ID;
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

window.voiceflow ??= {};
window.voiceflow.chat ??= {
  open: noop,
  hide: noop,
  show: noop,
  close: noop,
  interact: noop,

  load: async (loadConfig: Partial<ChatConfig>) => {
    const config = sanitizeConfig(loadConfig);

    const promise = new Promise<void>((resolve) => {
      const action = {
        type: PostMessage.Type.SESSION,
        action: () => {
          resolve();

          Listeners.context.listeners = Listeners.context.listeners.filter((listener) => listener !== action);
        },
      };

      Listeners.context.listeners.push(action);
    });

    root.render(<Widget {...config} widgetURL={WIDGET_URL!} />);

    return promise;
  },

  destroy: () => root.render(null),
};
