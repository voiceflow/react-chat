'use client';

import { ChatWidget } from '@voiceflow/chat';
export const ChatComponent = () => {
  return <div>{globalThis.window && <ChatWidget chatAPI={undefined} />}</div>;
};
