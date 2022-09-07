import { createRoot } from 'react-dom/client';

import ChatWidget, { ChatWidgetProps } from './views/ChatWidget';

interface VFChatAPI {
  show: (options: ChatWidgetProps) => void;
  hide: () => void;
}

declare global {
  interface Window {
    vf: {
      chat: VFChatAPI;
    };
  }
}

const VOICEFLOW_CHAT_ID = 'vfchat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_CHAT_ID;
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

const vfChatAPI: VFChatAPI = {
  show: (options: ChatWidgetProps) => root.render(<ChatWidget {...options} />),
  hide: () => root.unmount(),
};

Object.assign((window.vf ??= {} as Window['vf']), { chat: vfChatAPI });
