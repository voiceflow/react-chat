import { createRoot } from 'react-dom/client';

import { Listeners, PostMessage } from '@/common';
import ChatWindow from '@/views/ChatWindow';

import { mergeAssistant } from './utils';

const VOICEFLOW_CHAT_ID = 'vfchat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_CHAT_ID;
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

const fetchAssistant: Listeners.MessageListener<PostMessage.Type.FETCH_ASSISTANT> = {
  type: PostMessage.Type.FETCH_ASSISTANT,
  action: async ({ payload }) => {
    const assistant = await mergeAssistant(payload);
    ChatWindow.sendMessage({ type: PostMessage.Type.FETCHED_ASSISTANT, payload: assistant });
  },
};

Listeners.context.listeners.push(fetchAssistant);

const initialize: Listeners.MessageListener<PostMessage.Type.SESSION> = {
  type: PostMessage.Type.SESSION,
  action: async ({ payload }) => {
    root.render(<ChatWindow {...payload} />);
  },
};

Listeners.context.listeners.push(initialize);
