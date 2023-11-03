import { Assistant, ChatWidget, Listeners, PostMessage, RuntimeOptions, useStateRef } from '@voiceflow/react-chat';
import type { PublicVerify } from '@voiceflow/sdk-runtime';
import React, { useCallback, useRef } from 'react';

import { mergeAssistant } from './api/assistant';
import { initializeAPIListeners } from './api/listeners';
import { useSendMessage } from './hooks';
import { getSession, saveSession } from './session';

interface WidgetProps extends React.PropsWithChildren, RuntimeOptions<PublicVerify> {
  assistant?: Assistant;
  widgetURL?: string;
}

const Widget: React.FC<WidgetProps> = ({ children, widgetURL, ...config }) => {
  /** initialization */
  const [assistant, setAssistant, assistantRef] = useStateRef<Assistant | undefined>();

  const chatRef = useRef<HTMLIFrameElement>(null);

  const sendMessage = useSendMessage(chatRef, widgetURL);

  const onLoad = useCallback(async () => {
    const assistant = await mergeAssistant(config);
    setAssistant(assistant);

    const session = getSession(assistant.persistence, config.verify.projectID, config.userID);

    sendMessage({
      type: PostMessage.Type.SESSION,
      payload: {
        ...config,
        assistant,
        session,
      },
    });

    initializeAPIListeners(sendMessage, session, config);
  }, [config]);

  Listeners.useListenMessage(PostMessage.Type.SAVE_SESSION, ({ payload }) => {
    const persistence = assistantRef.current?.persistence;
    if (persistence) {
      saveSession(persistence, config.verify.projectID, payload);
    }
  });

  return (
    <ChatWidget assistant={assistant} sendMessage={sendMessage} chatAPI={window.voiceflow?.chat}>
      <iframe src={widgetURL} title="voiceflow-chat" ref={chatRef} onLoad={onLoad} style={{ height: '100%', width: '100%', border: 'none' }} />
    </ChatWidget>
  );
};

export default Widget;
