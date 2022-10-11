import { createRoot } from 'react-dom/client';

import { isObject } from '@/common';

import App from './src/app';

// setup check
if (!isObject(window.voiceflow) || !window.voiceflow.config) {
  throw new Error('window.voiceflow config not initialized');
}
if (!window.voiceflow.config.projectID) {
  throw new Error('window.voiceflow.config.projectID not initialized');
}

const VOICEFLOW_ID = 'voiceflow-chat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_ID;
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

root.render(<App {...window.voiceflow.config} />);
