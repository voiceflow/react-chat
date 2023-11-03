import { createRoot } from 'react-dom/client';

import { Listeners, PostMessage } from '@/common';
import ChatWindow from '@/views/ChatWindow';

const VOICEFLOW_CHAT_ID = 'vfchat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_CHAT_ID;
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

const initialize: Listeners.MessageListener<PostMessage.Type.SESSION> = {
  type: PostMessage.Type.SESSION,
  action: async ({ payload }) => {
    root.render(<ChatWindow {...payload} />);
  },
};

Listeners.context.listeners.push(initialize);
