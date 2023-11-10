import { createRoot } from 'react-dom/client';

import { ChatConfig } from '@/common';
import { RuntimeProvider } from '@/contexts';
import { mergeAssistant } from '@/utils/assistant';
import { sanitizeConfig } from '@/utils/config';
import { noop } from '@/utils/functional';
import ChatWidget from '@/views/ChatWidget';

import { shadowRoot } from './shadow';

const root = createRoot(shadowRoot);

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

    root.render(
      <RuntimeProvider assistant={assistant} config={config}>
        <ChatWidget chatAPI={window.voiceflow!.chat} />
      </RuntimeProvider>
    );
  },

  destroy: () => root.render(null),
};
