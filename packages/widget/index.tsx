import type { ChatConfig } from '@voiceflow/react-chat';
import ReactDOM from 'react-dom';

import Widget from './src';
import { sanitizeConfig, WIDGET_URL } from './src/config';

const VOICEFLOW_ID = 'voiceflow-chat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_ID;
document.body.appendChild(rootEl);

window.voiceflow ??= {} as any;
window.voiceflow.chat ??= {} as any;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
window.voiceflow.chat.open ??= noop;
window.voiceflow.chat.close ??= noop;
window.voiceflow.chat.show ??= noop;
window.voiceflow.chat.hide ??= noop;
window.voiceflow.chat.interact ??= noop;

window.voiceflow.chat.load = async (loadConfig: Partial<ChatConfig>) => {
  const config = sanitizeConfig(loadConfig);

  ReactDOM.render(<Widget {...config} widgetURL={WIDGET_URL} />, rootEl);
};
