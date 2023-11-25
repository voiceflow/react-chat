import { GlobalOptions } from './constants';

// create shadow dom

const VOICEFLOW_ID = 'voiceflow-chat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_ID;

if (GlobalOptions.SHADOW_ROOT) {
  document.body.appendChild(rootEl);
}

export const shadowRoot = rootEl.attachShadow({ mode: 'open' });
