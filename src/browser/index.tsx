import { createRoot } from 'react-dom/client';

import ChatWidget from '../views/ChatWidget';

const VOICEFLOW_CHAT_ID = 'vfchat';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_CHAT_ID;
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

root.render(<ChatWidget />);
