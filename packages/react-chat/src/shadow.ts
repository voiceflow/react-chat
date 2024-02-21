// create shadow dom

const VOICEFLOW_ID = 'voiceflow-chat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_ID;

document.body.appendChild(rootEl);
export const shadowRoot = rootEl.attachShadow({ mode: 'open' });
