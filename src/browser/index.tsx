import { createRoot } from 'react-dom/client';

import { Listeners, PostMessage } from '@/common';
import ChatWidget from '@/views/ChatWidget';

const VOICEFLOW_CHAT_ID = 'vfchat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_CHAT_ID;
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

const load: Listeners.MessageListener<PostMessage.Type.LOAD> = {
  type: PostMessage.Type.LOAD,
  action: ({ payload }) => {
    root.render(<ChatWidget {...payload} />);
  },
};

Listeners.context.listeners.push(load);
