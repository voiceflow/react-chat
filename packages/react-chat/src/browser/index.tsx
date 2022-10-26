import { createRoot } from 'react-dom/client';

import { Listeners, PostMessage } from '@/common';
import ChatWidget from '@/views/ChatWindow';

import { fetchAssistant } from './utils';

const VOICEFLOW_CHAT_ID = 'vfchat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_CHAT_ID;
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

const load: Listeners.MessageListener<PostMessage.Type.LOAD> = {
  type: PostMessage.Type.LOAD,
  action: async ({ payload }) => {
    const assistant = await fetchAssistant(payload);
    ChatWidget.sendMessage({ type: PostMessage.Type.LOADED, payload: assistant });

    root.render(<ChatWidget {...payload} assistant={assistant} />);
  },
};

Listeners.context.listeners.push(load);
