import { Assistant, Listeners, PostMessage, RuntimeOptions } from '@voiceflow/react-chat/build/cjs/common';
import ChatWidget from '@voiceflow/react-chat/build/cjs/views/ChatWidget';
import React, { useCallback, useRef, useState } from 'react';

import { useSendMessage } from './hooks';

interface WidgetProps extends React.PropsWithChildren, RuntimeOptions {
  assistant?: Assistant;
  widgetURL?: string;
}

const Widget: React.FC<WidgetProps> = ({ children, widgetURL, ...config }) => {
  /** initialization */
  const chatRef = useRef<HTMLIFrameElement>(null);
  const [assistant, setAssistant] = useState<Assistant | undefined>(config.assistant);

  const sendMessage = useSendMessage(chatRef, widgetURL);
  const onLoad = useCallback(() => sendMessage({ type: PostMessage.Type.LOAD, payload: config }), [config]);

  Listeners.useListenMessage(PostMessage.Type.LOADED, ({ payload }) => setAssistant(payload)); // rely on iframe to fetch assistant configuration

  return (
    <ChatWidget assistant={assistant} sendMessage={sendMessage} chatAPI={window.voiceflow.chat}>
      <iframe src={widgetURL} title="voiceflow-chat" ref={chatRef} onLoad={onLoad} style={{ height: '100%', width: '100%', border: 'none' }} />
    </ChatWidget>
  );
};

export default Widget;
