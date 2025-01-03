import 'regenerator-runtime/runtime';
import '@voiceflow/react-chat/dist/style.css';

import { ChatWidget } from '@voiceflow/react-chat';
import { createRoot } from 'react-dom/client';

import { RuntimeProvider } from './context';

createRoot(document.getElementById('root')!).render(
  <RuntimeProvider>
    <ChatWidget chatAPI={undefined} />
  </RuntimeProvider>
);
