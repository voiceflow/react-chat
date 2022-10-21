import { Assistant, Listeners, PostMessage, RuntimeOptions, useTheme } from '@voiceflow/react-chat/build/cjs/common';
import type { RuntimeAction } from '@voiceflow/sdk-runtime';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import Launch from './assets/launch.svg';
import { useSendMessage } from './hooks';
import { Button, ButtonContainer, ChatContainer, ChatIframe, Container } from './styled';

interface ChatWidgetProps extends React.PropsWithChildren, RuntimeOptions {
  assistant?: Assistant;
  widgetURL?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ children, widgetURL, ...config }) => {
  /** initialization */
  const chatRef = useRef<HTMLIFrameElement>(null);
  const [isOpen, setOpen] = useState(false);
  const [isHidden, setHidden] = useState(false);
  const [assistant, setAssistant] = useState<Assistant | undefined>(config.assistant);

  const theme = useTheme(assistant);
  const sendMessage = useSendMessage(chatRef, widgetURL);
  const onLoad = useCallback(() => sendMessage({ type: PostMessage.Type.LOAD, payload: config }), [config]);

  /** listeners */
  Listeners.useListenMessage(PostMessage.Type.LOADED, ({ payload }) => setAssistant(payload)); // rely on iframe to fetch assistant configuration
  Listeners.useListenMessage(PostMessage.Type.CLOSE, () => setOpen(false));
  Listeners.useListenMessage(PostMessage.Type.OPEN, () => setOpen(true));

  const open = React.useCallback(() => sendMessage({ type: PostMessage.Type.OPEN }), []);
  const close = React.useCallback(() => sendMessage({ type: PostMessage.Type.CLOSE }), []);

  /** initialize window */
  useEffect(() => {
    Object.assign(window.voiceflow.chat, {
      open,
      close,
      hide: () => setHidden(true),
      show: () => setHidden(false),
      interact: (action: RuntimeAction) => sendMessage({ type: PostMessage.Type.INTERACT, payload: action }),
    });
  }, []);

  return (
    <Container withChat={isOpen} isHidden={isHidden} className={theme}>
      {!!assistant && (
        <ButtonContainer>
          <Button onClick={open}>
            <img src={Launch} alt="launch" />
          </Button>
        </ButtonContainer>
      )}
      <ChatContainer>{children ?? <ChatIframe src={widgetURL} title="voiceflow-chat" ref={chatRef} onLoad={onLoad} />}</ChatContainer>
    </Container>
  );
};

export default Object.assign(ChatWidget, {
  Container,
  ChatIframe,
  ChatContainer,
  ButtonContainer,
});
