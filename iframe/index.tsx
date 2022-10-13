import { createRoot } from 'react-dom/client';

import { ChatConfig, isObject } from '@/common';

import { WIDGET_URL } from './config';
import App from './src/app';

const VOICEFLOW_ID = 'voiceflow-chat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_ID;
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

window.voiceflow ??= {} as any;
window.voiceflow.chat ??= {} as any;
window.voiceflow.chat.load = (config: ChatConfig) => {
  root.render(<App {...config} widgetURL={WIDGET_URL} />);
};

// setup check
if (isObject(window.voiceflowChatConfig)) {
  if (!window.voiceflowChatConfig.projectID) {
    throw new Error('window.voiceflow.config.projectID not initialized');
  }

  window.voiceflow.chat.load(window.voiceflowChatConfig);
}
