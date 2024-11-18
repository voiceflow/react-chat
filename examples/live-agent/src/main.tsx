import { ChatWidget } from '@voiceflow/react-chat-legacy';
import { createRoot } from 'react-dom/client';

import { RuntimeProvider } from './context';

createRoot(document.getElementById('root')!).render(
  <RuntimeProvider>
    <ChatWidget chatAPI={undefined} />
  </RuntimeProvider>
);
